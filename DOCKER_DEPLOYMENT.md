# 🐳 Docker Deployment Guide for SciHub

## Quick Start (Development)

```bash
# Build and run with Docker Compose
docker-compose up -d

# Access at http://localhost:3000
```

## Production Deployment

### Option 1: Docker Compose (Recommended for Home Server)

**1. Create docker-compose.yml:**

```yaml
version: '3.8'

services:
  scihub-frontend:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:80"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    networks:
      - scihub-network

  # Future: Add backend service
  # scihub-backend:
  #   ...

  # Future: Add database
  # scihub-db:
  #   image: postgres:15
  #   ...

networks:
  scihub-network:
    driver: bridge

volumes:
  scihub-data:
```

**2. Create Dockerfile:**

```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build app
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built app to nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --quiet --tries=1 --spider http://localhost || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
```

**3. Create nginx.conf:**

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Enable gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1000;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Service worker (don't cache)
    location = /sw.js {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    # Manifest
    location = /manifest.json {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    # Health check endpoint
    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }
}
```

**4. Deploy:**

```bash
# Build and start
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop
docker-compose down

# Update to new version
git pull
docker-compose up -d --build
```

### Option 2: Single Docker Container

```bash
# Build image
docker build -t scihub:latest .

# Run container
docker run -d \
  --name scihub \
  -p 3000:80 \
  --restart unless-stopped \
  scihub:latest

# View logs
docker logs -f scihub

# Stop
docker stop scihub
docker rm scihub
```

---

## Home Server Setup

### Prerequisites
- Docker and Docker Compose installed
- Port 3000 available (or change in docker-compose.yml)
- ~500MB disk space
- 512MB RAM minimum (1GB recommended)

### Step-by-Step

**1. Clone repository:**
```bash
cd /home/yourusername
git clone https://github.com/yourusername/SciHub.git
cd SciHub
```

**2. Create necessary files:**
```bash
# Already exist in repo:
# - Dockerfile
# - nginx.conf
# - docker-compose.yml

# No changes needed unless customizing
```

**3. Build and deploy:**
```bash
docker-compose up -d --build
```

**4. Verify:**
```bash
# Check status
docker-compose ps

# Should show:
# NAME              STATE     PORTS
# scihub-frontend   running   0.0.0.0:3000->80/tcp

# Access at http://localhost:3000
# Or http://your-server-ip:3000
```

**5. Access from other devices:**
```bash
# Find your server's IP
hostname -I

# Access from other devices on network:
# http://192.168.1.XXX:3000
```

---

## Making It Accessible to Students

### Option A: Local Network Only (Simplest)
Students access via your local IP:
- **URL**: http://192.168.1.XXX:3000
- **Security**: Only works on your home network
- **Setup**: No additional config needed
- **Best for**: Small classroom, after-school program

### Option B: Port Forwarding (Home Router)
Make accessible from internet:

**1. Set static IP for server:**
```bash
# On Ubuntu/Debian
sudo nano /etc/netplan/01-netcfg.yaml

# Set static IP:
network:
  version: 2
  ethernets:
    eth0:
      dhcp4: no
      addresses: [192.168.1.100/24]
      gateway4: 192.168.1.1
      nameservers:
        addresses: [8.8.8.8, 8.8.4.4]

sudo netplan apply
```

**2. Configure router port forwarding:**
- Login to router (usually 192.168.1.1)
- Find "Port Forwarding" settings
- Forward external port 80 → internal 192.168.1.100:3000
- Save and restart router

**3. Get your public IP:**
```bash
curl ifconfig.me
```

**4. Share with students:**
- **URL**: http://YOUR_PUBLIC_IP
- ⚠️ **Security note**: Exposed to internet! See security section below.

### Option C: Cloudflare Tunnel (Recommended)
Free, secure, no port forwarding needed:

**1. Install cloudflared:**
```bash
wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
sudo dpkg -i cloudflared-linux-amd64.deb
```

**2. Authenticate:**
```bash
cloudflared tunnel login
```

**3. Create tunnel:**
```bash
cloudflared tunnel create scihub
```

**4. Configure tunnel:**
```bash
nano ~/.cloudflared/config.yml

# Add:
tunnel: <TUNNEL_ID>
credentials-file: /home/user/.cloudflared/<TUNNEL_ID>.json

ingress:
  - hostname: scihub.yourdomain.com
    service: http://localhost:3000
  - service: http_status:404
```

**5. Route DNS:**
```bash
cloudflared tunnel route dns scihub scihub.yourdomain.com
```

**6. Run tunnel:**
```bash
cloudflared tunnel run scihub
```

**7. Make persistent:**
```bash
sudo cloudflared service install
sudo systemctl start cloudflared
sudo systemctl enable cloudflared
```

**Now accessible at**: https://scihub.yourdomain.com

✅ **Advantages**:
- Free SSL certificate
- DDoS protection
- No port forwarding
- No public IP exposure
- Professional URL

---

## Monitoring & Maintenance

### View Logs
```bash
# Real-time logs
docker-compose logs -f

# Last 100 lines
docker-compose logs --tail=100

# Specific service
docker-compose logs scihub-frontend
```

### Restart Services
```bash
# Restart all
docker-compose restart

# Restart specific service
docker-compose restart scihub-frontend
```

### Update to New Version
```bash
cd /home/user/SciHub
git pull
docker-compose down
docker-compose up -d --build
```

### Backup Data
```bash
# Backup volumes (when database added)
docker run --rm \
  -v scihub-data:/data \
  -v $(pwd):/backup \
  alpine tar czf /backup/scihub-backup-$(date +%Y%m%d).tar.gz /data
```

### Health Monitoring
```bash
# Check health
curl http://localhost:3000/health

# Should return: healthy

# Auto-restart on failure (already configured in docker-compose)
```

---

## Security Considerations

### If Exposing to Internet

**1. Enable HTTPS (required!):**
- Use Cloudflare Tunnel (automatic SSL)
- Or use Let's Encrypt with Certbot:

```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d scihub.yourdomain.com

# Auto-renewal
sudo systemctl enable certbot.timer
```

**2. Add authentication:**

Add to nginx.conf:
```nginx
auth_basic "SciHub Login";
auth_basic_user_file /etc/nginx/.htpasswd;
```

Create password file:
```bash
sudo apt install apache2-utils
sudo htpasswd -c /etc/nginx/.htpasswd teacher
```

**3. Rate limiting:**

Add to nginx.conf:
```nginx
limit_req_zone $binary_remote_addr zone=one:10m rate=10r/s;

server {
    location / {
        limit_req zone=one burst=20 nodelay;
        ...
    }
}
```

**4. Firewall:**
```bash
# Only allow HTTP/HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

**5. Regular updates:**
```bash
# Update system
sudo apt update && sudo apt upgrade

# Update Docker images
docker-compose pull
docker-compose up -d
```

---

## Troubleshooting

### Container won't start
```bash
# Check logs
docker-compose logs

# Common issues:
# - Port 3000 already in use: Change port in docker-compose.yml
# - Build errors: Check Node version (need 18+)
# - Permission errors: Check file ownership
```

### Can't access from other devices
```bash
# Check firewall
sudo ufw status

# Allow port
sudo ufw allow 3000/tcp

# Check Docker network
docker network inspect scihub_scihub-network
```

### High memory usage
```bash
# Limit container memory
docker-compose.yml:
services:
  scihub-frontend:
    mem_limit: 512m
    memswap_limit: 512m
```

### Slow performance
```bash
# Check resource usage
docker stats

# Check disk space
df -h

# Clean up old images
docker system prune -a
```

---

## Production Readiness Checklist

- [ ] HTTPS enabled (Let's Encrypt or Cloudflare)
- [ ] Authentication configured (if public)
- [ ] Backups automated
- [ ] Monitoring set up
- [ ] Firewall configured
- [ ] Auto-updates enabled
- [ ] Logs being rotated
- [ ] Health checks working
- [ ] Domain name configured (if public)
- [ ] Rate limiting enabled

---

## Cost Estimation

### Home Server (One-Time)
- Raspberry Pi 4 (4GB): $55
- Power supply: $10
- MicroSD card (64GB): $12
- Case: $8
- **Total: ~$85**

OR

- Old laptop/desktop: $0 (reuse)

### Running Costs
- Electricity: ~$2-5/month (10W @ $0.12/kWh)
- Internet: Already have
- Domain (optional): $12/year
- **Total: ~$2-5/month**

### Alternative: Cloud Hosting
- DigitalOcean Droplet: $6/month
- AWS Lightsail: $5/month
- Heroku: $7/month (with DB)

---

## Next Steps

1. **Deploy locally** and test with yourself
2. **Test with 1-2 students** on your network
3. **Choose access method** (local/port forward/Cloudflare)
4. **Set up monitoring** and backups
5. **Deploy to students** with clear instructions
6. **Add backend** when ready for data persistence

Questions? Issues? Check the main README or open an issue on GitHub!
