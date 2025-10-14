import pool from '../config/database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

async function migrate() {
  try {

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

    // Insert sample meals
    const sampleMeals = [
      {
        name: "O'sh (Palov)",
        image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&q=80',
        description: 'Milliy taomimiz, to\'ylar va bayramlarda tayyorlanadigan, guruch, go\'sht va sabzi asosida pishiriladigan mazali palov.',
        price: 25000,
        category: 'Milliy taomlar',
        ingredients: ['Guruch', "Qo'y go'shti", 'Sabzi', 'Piyoz', 'Noxat', 'Zira', "Yog'"]
      },
      {
        name: 'Shashlik',
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80',
        description: 'Cho\'g\' ustida pishirilgan, nozik va yumshoq qo\'y go\'shti shashlik. Piyoz va non bilan xizmat qilinadi.',
        price: 30000,
        category: "Go'sht taomlar",
        ingredients: ["Qo'y go'shti", 'Piyoz', 'Ziravorlar', 'Sirka', 'Tuz']
      },
      {
        name: "Lag'mon",
        image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&q=80',
        description: 'Qo\'lda cho\'zilgan maxsus lag\'mon, go\'sht va xilma-xil sabzavotlar bilan pishirilgan sho\'rva.',
        price: 22000,
        category: "Sho'rvalar",
        ingredients: ["Qo'l lag'mon", "Go'sht", 'Sabzavotlar', 'Kartoshka', "Bulg'or qalampiri", 'Sarimsoq']
      }
    ];

    for (const meal of sampleMeals) {
      await pool.query(
        `INSERT INTO meals (name, image, description, price, category, ingredients)
         VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT DO NOTHING`,
        [meal.name, meal.image, meal.description, meal.price, meal.category, meal.ingredients]
      );
    }

    process.exit(0);
  } catch (error) {
    process.exit(1);
  }
}

migrate();

