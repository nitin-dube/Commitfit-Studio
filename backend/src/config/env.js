import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export const config = {
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || 'development',
    mongodbUri: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpire: process.env.JWT_EXPIRE || '7d',
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000'
};

// Validate required environment variables
const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET'];

requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
        console.error(`❌ Error: ${envVar} environment variable is required`);
        process.exit(1);
    }
});

export default config;
