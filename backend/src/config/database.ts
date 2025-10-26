import { Pool, PoolConfig } from 'pg';

const isProduction = process.env.NODE_ENV === 'production';

const poolConfig: PoolConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'scihub',
  user: process.env.DB_USER || 'scihub_user',
  password: process.env.DB_PASSWORD,
  max: parseInt(process.env.DB_POOL_MAX || '20'),
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};

// For Google Cloud SQL, add Unix socket support
if (process.env.DB_SOCKET_PATH) {
  poolConfig.host = process.env.DB_SOCKET_PATH;
}

// For Cloud SQL Proxy
if (process.env.INSTANCE_CONNECTION_NAME) {
  poolConfig.host = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
}

// SSL configuration for production
if (isProduction && !process.env.DB_SOCKET_PATH) {
  poolConfig.ssl = {
    rejectUnauthorized: false // Cloud SQL handles cert validation
  };
}

export const pool = new Pool(poolConfig);

// Test connection
pool.on('connect', () => {
  console.log('✅ Database connected successfully');
});

pool.on('error', (err) => {
  console.error('❌ Unexpected database error:', err);
  process.exit(-1);
});

// Helper function for queries
export const query = async (text: string, params?: any[]) => {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Executed query', { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error('Query error:', error);
    throw error;
  }
};

// Transaction helper
export const transaction = async (callback: (client: any) => Promise<any>) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

// Graceful shutdown
export const closePool = async () => {
  await pool.end();
  console.log('Database pool closed');
};
