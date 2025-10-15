import pool from '../config/database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

async function migrate() {
  try {
    console.log('🚀 Starting database migration...');

    // Create admins table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create meals table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS meals (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(500) NOT NULL,
        description TEXT NOT NULL,
        price INTEGER NOT NULL,
        category VARCHAR(100) NOT NULL,
        ingredients TEXT[] NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create index
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_meals_category ON meals(category)
    `);

    // Insert default admin
    const adminUsername = process.env.ADMIN_USERNAME || 'alibek';
    const adminPassword = process.env.ADMIN_PASSWORD || 'ali_2001';
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    await pool.query(
      `INSERT INTO admins (username, password) 
       VALUES ($1, $2) 
       ON CONFLICT (username) DO NOTHING`,
      [adminUsername, hashedPassword]
    );
    console.log('🎉 Database migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

migrate();

