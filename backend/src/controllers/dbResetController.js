import { initDb, writeDb } from '../db.js';
import { successResponse } from '../utils/apiResponse.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// @desc    Reset database (development only)
// @route   POST /api/auth/reset-db
// @access  Public (should be protected in production)
export const resetDatabase = async (req, res, next) => {
    try {
        const DB_PATH = path.join(__dirname, '..', '..', 'data', 'db.json');

        // Delete existing database file
        if (fs.existsSync(DB_PATH)) {
            fs.unlinkSync(DB_PATH);
            console.log('🗑️ Old database deleted');
        }

        // Reinitialize database with new bcrypt rounds
        await initDb();

        return successResponse(res, null, 'Database reset successfully. Admin user recreated with optimized bcrypt.', 200);
    } catch (error) {
        next(error);
    }
};
