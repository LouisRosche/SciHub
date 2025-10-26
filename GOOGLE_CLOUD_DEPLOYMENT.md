# 🚀 Google Cloud Deployment Guide for SciHub

## Complete Production Deployment

This guide walks you through deploying SciHub to Google Cloud Platform with:
- Frontend on Cloud Run
- Backend API on Cloud Run
- PostgreSQL on Cloud SQL
- Google OAuth integration
- CI/CD with Cloud Build
- Domain with SSL (automatic)

---

## Prerequisites

1. **Google Cloud Account** (create at [cloud.google.com](https://cloud.google.com))
2. **Google Cloud SDK** installed locally
3. **Domain name** (optional but recommended)
4. **Google Workspace for Education** (for SSO)

**Cost Estimate**: $10-30/month (often free with edu credits)

---

## Part 1: Initial Setup (30 minutes)

### 1.1 Create Google Cloud Project

```bash
# Install gcloud CLI if not installed
# https://cloud.google.com/sdk/docs/install

# Login
gcloud auth login

# Create project
gcloud projects create scihub-prod --name="SciHub Production"

# Set as default
gcloud config set project scihub-prod

# Enable billing (required)
# Go to: https://console.cloud.google.com/billing
# Link your billing account to the project

# Enable required APIs
gcloud services enable \
  run.googleapis.com \
  sql-component.googleapis.com \
  sqladmin.googleapis.com \
  cloudbuild.googleapis.com \
  secretmanager.googleapis.com \
  artifactregistry.googleapis.com
```

### 1.2 Set Up Cloud SQL (PostgreSQL)

```bash
# Create PostgreSQL instance
gcloud sql instances create scihub-db \
  --database-version=POSTGRES_15 \
  --tier=db-f1-micro \
  --region=us-central1 \
  --root-password=CHANGE_THIS_PASSWORD

# Create database
gcloud sql databases create scihub \
  --instance=scihub-db

# Create user
gcloud sql users create scihub_user \
  --instance=scihub-db \
  --password=CHANGE_THIS_PASSWORD

# Get connection name
gcloud sql instances describe scihub-db --format="value(connectionName)"
# Save this! Format: project:region:instance
```

**Cost**: ~$7-10/month for db-f1-micro

### 1.3 Run Database Migrations

```bash
# Connect to Cloud SQL
gcloud sql connect scihub-db --user=scihub_user --database=scihub

# Paste the contents of backend/migrations/001_initial_schema.sql
# Or upload and run:
psql -h /cloudsql/[CONNECTION_NAME] -U scihub_user -d scihub -f backend/migrations/001_initial_schema.sql
```

---

## Part 2: Google OAuth Setup (20 minutes)

### 2.1 Create OAuth Consent Screen

1. Go to: https://console.cloud.google.com/apis/credentials
2. Click "OAuth consent screen"
3. Choose "External" (or "Internal" if Google Workspace)
4. Fill in:
   - App name: SciHub
   - User support email: your-email@school.edu
   - Developer contact: your-email@school.edu
5. Add scopes:
   - .../auth/userinfo.email
   - .../auth/userinfo.profile
   - openid
6. Add test users (your email)
7. Save

### 2.2 Create OAuth Client ID

1. Go to: Credentials → Create Credentials → OAuth Client ID
2. Application type: Web application
3. Name: SciHub Web Client
4. Authorized JavaScript origins:
   - http://localhost:3000 (for development)
   - https://your-domain.com (for production)
5. Authorized redirect URIs:
   - http://localhost:3000/auth/google/callback
   - https://your-domain.com/auth/google/callback
6. Save and copy:
   - Client ID
   - Client Secret

### 2.3 Store Secrets in Secret Manager

```bash
# Create secrets
echo -n "your-db-password" | gcloud secrets create scihub-db-password --data-file=-
echo -n "your-jwt-secret-key" | gcloud secrets create scihub-jwt-secret --data-file=-
echo -n "your-google-client-secret" | gcloud secrets create google-client-secret --data-file=-

# Grant Cloud Run access to secrets
PROJECT_NUMBER=$(gcloud projects describe scihub-prod --format="value(projectNumber)")

gcloud secrets add-iam-policy-binding scihub-db-password \
  --member="serviceAccount:${PROJECT_NUMBER}-compute@developer.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"

gcloud secrets add-iam-policy-binding scihub-jwt-secret \
  --member="serviceAccount:${PROJECT_NUMBER}-compute@developer.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"

gcloud secrets add-iam-policy-binding google-client-secret \
  --member="serviceAccount:${PROJECT_NUMBER}-compute@developer.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"
```

---

## Part 3: Deploy Backend (15 minutes)

### 3.1 Build and Deploy

```bash
cd backend

# Build Docker image
gcloud builds submit --tag gcr.io/scihub-prod/scihub-backend

# Deploy to Cloud Run
gcloud run deploy scihub-backend \
  --image gcr.io/scihub-prod/scihub-backend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars NODE_ENV=production,DB_HOST=/cloudsql/[CONNECTION_NAME],DB_NAME=scihub,DB_USER=scihub_user,FRONTEND_URL=https://your-domain.com,GOOGLE_CLIENT_ID=[YOUR_CLIENT_ID] \
  --add-cloudsql-instances [CONNECTION_NAME] \
  --set-secrets DB_PASSWORD=scihub-db-password:latest,JWT_SECRET=scihub-jwt-secret:latest,GOOGLE_CLIENT_SECRET=google-client-secret:latest \
  --memory 512Mi \
  --cpu 1 \
  --max-instances 10 \
  --min-instances 0

# Get backend URL
gcloud run services describe scihub-backend --region us-central1 --format="value(status.url)"
# Save this! You'll need it for frontend
```

**Cost**: ~$0-5/month with free tier, scales with usage

### 3.2 Test Backend

```bash
# Health check
curl https://scihub-backend-xxxxx-uc.a.run.app/health

# Should return: {"status":"healthy",...}
```

---

## Part 4: Deploy Frontend (15 minutes)

### 4.1 Update Frontend Config

Create `src/config/api.ts`:

```typescript
export const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://scihub-backend-xxxxx-uc.a.run.app/api'
  : 'http://localhost:3001/api';

export const GOOGLE_CLIENT_ID = 'your-client-id.apps.googleusercontent.com';
```

### 4.2 Build and Deploy

```bash
# From project root
gcloud builds submit --tag gcr.io/scihub-prod/scihub-frontend

# Deploy to Cloud Run
gcloud run deploy scihub-frontend \
  --image gcr.io/scihub-prod/scihub-frontend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --memory 256Mi \
  --cpu 1 \
  --max-instances 10

# Get frontend URL
gcloud run services describe scihub-frontend --region us-central1 --format="value(status.url)"
```

**Cost**: ~$0-3/month with free tier

---

## Part 5: Custom Domain & SSL (Optional, 20 minutes)

### 5.1 Map Custom Domain

```bash
# Add domain mapping
gcloud run domain-mappings create \
  --service scihub-frontend \
  --domain your-domain.com \
  --region us-central1

# Get DNS records to add
gcloud run domain-mappings describe \
  --domain your-domain.com \
  --region us-central1
```

### 5.2 Update DNS

Add the records shown above to your domain registrar:
- Type: A
- Name: @
- Value: (IP from above)

SSL is automatic! Cloud Run provides free SSL certificates.

### 5.3 Update OAuth Redirect URIs

Go back to Google Cloud Console → Credentials:
- Add https://your-domain.com to authorized origins
- Add https://your-domain.com/auth/google/callback to redirect URIs

---

## Part 6: Set Up CI/CD (20 minutes)

### 6.1 Connect GitHub Repository

```bash
# Install Cloud Build GitHub app
# https://github.com/apps/google-cloud-build

# Create trigger
gcloud builds triggers create github \
  --repo-name=SciHub \
  --repo-owner=yourusername \
  --branch-pattern="^main$" \
  --build-config=cloudbuild.yaml
```

### 6.2 Update cloudbuild.yaml

Edit `cloudbuild.yaml` and replace:
- `$_INSTANCE_CONNECTION_NAME` with your Cloud SQL connection name
- Project ID placeholders

### 6.3 Test CI/CD

```bash
# Push to main branch
git push origin main

# Watch build
gcloud builds list --limit 5
gcloud builds log [BUILD_ID] --stream
```

Now every push to `main` automatically deploys! 🎉

---

## Part 7: Monitoring & Logging

### 7.1 View Logs

```bash
# Backend logs
gcloud run services logs read scihub-backend --region us-central1

# Frontend logs
gcloud run services logs read scihub-frontend --region us-central1

# Database logs
gcloud sql operations list --instance scihub-db
```

### 7.2 Set Up Alerts

Go to: https://console.cloud.google.com/monitoring

Create alerts for:
- Error rate > 5%
- Response time > 2s
- CPU usage > 80%
- Database connections > 80%

### 7.3 View Metrics

```bash
# Open Cloud Console
open https://console.cloud.google.com/run?project=scihub-prod
```

---

## Part 8: Database Backups

### 8.1 Automated Backups

```bash
# Enable automated backups (enabled by default)
gcloud sql instances patch scihub-db \
  --backup-start-time=03:00 \
  --retained-backups-count=7

# Test backup
gcloud sql backups create --instance scihub-db
```

### 8.2 Manual Backup

```bash
# Export database
gcloud sql export sql scihub-db gs://[BUCKET_NAME]/backup-$(date +%Y%m%d).sql \
  --database=scihub

# Import (if needed)
gcloud sql import sql scihub-db gs://[BUCKET_NAME]/backup.sql \
  --database=scihub
```

---

## Part 9: Cost Optimization

### 9.1 Current Setup Costs

- Cloud SQL (db-f1-micro): ~$7-10/month
- Cloud Run Frontend: ~$0-3/month (free tier)
- Cloud Run Backend: ~$0-5/month (scales with usage)
- Cloud Build: 120 builds/day free
- **Total: ~$10-20/month**

### 9.2 Free Tier Eligible

- First 2 million requests/month free (Cloud Run)
- First 180,000 vCPU-seconds/month free
- First 360,000 GiB-seconds/month free

### 9.3 Education Credits

Apply for Google Cloud education credits:
- https://cloud.google.com/edu
- Usually $300-500/year for teachers
- Can cover entire year of SciHub hosting!

---

## Part 10: Security Checklist

- ✅ Secrets stored in Secret Manager (not code)
- ✅ SSL/HTTPS enabled (automatic on Cloud Run)
- ✅ Database not publicly accessible
- ✅ OAuth properly configured
- ✅ CORS restricted to your domain
- ✅ Rate limiting enabled (in backend)
- ✅ SQL injection prevention (parameterized queries)
- ✅ Automated backups enabled
- ✅ Error logging enabled
- ✅ Non-root Docker user

---

## Common Issues & Solutions

### Issue: "Cloud SQL connection failed"

```bash
# Check Cloud SQL is running
gcloud sql instances list

# Verify connection name
gcloud sql instances describe scihub-db --format="value(connectionName)"

# Ensure Cloud Run has access
gcloud run services describe scihub-backend --region us-central1 | grep cloudsql
```

### Issue: "OAuth redirect_uri_mismatch"

- Check OAuth credentials redirect URIs match exactly
- Include both http://localhost:3000 (dev) and https://your-domain.com (prod)
- No trailing slashes!

### Issue: "Secret not found"

```bash
# List secrets
gcloud secrets list

# Check IAM permissions
gcloud secrets get-iam-policy [SECRET_NAME]
```

### Issue: "Cloud Run out of memory"

```bash
# Increase memory
gcloud run services update scihub-backend \
  --memory 1Gi \
  --region us-central1
```

---

## Maintenance Tasks

### Weekly
- Check error logs for issues
- Review usage/costs

### Monthly
- Review and optimize database queries
- Check for dependency updates
- Review security alerts

### As Needed
- Scale resources during heavy usage
- Update database backup retention
- Add more teachers/classes

---

## Useful Commands

```bash
# View all resources
gcloud run services list
gcloud sql instances list
gcloud secrets list

# Get service URLs
gcloud run services describe scihub-backend --region us-central1 --format="value(status.url)"
gcloud run services describe scihub-frontend --region us-central1 --format="value(status.url)"

# Tail logs
gcloud run services logs tail scihub-backend --region us-central1

# Check costs
gcloud billing accounts list
gcloud alpha billing accounts get-iam-policy [ACCOUNT_ID]

# Scale to zero (stop incurring costs)
gcloud run services update scihub-backend --min-instances 0
gcloud run services update scihub-frontend --min-instances 0
```

---

## Need Help?

1. **Google Cloud Documentation**: https://cloud.google.com/docs
2. **Cloud Run Docs**: https://cloud.google.com/run/docs
3. **Cloud SQL Docs**: https://cloud.google.com/sql/docs
4. **SciHub Issues**: https://github.com/yourusername/SciHub/issues

---

## Next Steps

✅ **Deployed!** Now you can:
1. Share the URL with your students
2. Print notecard templates
3. Run the onboarding tutorial with students
4. Start your first project!

**Your SciHub is live at**: https://your-domain.com

🎉 **Congratulations! You're running a production science learning platform!**
