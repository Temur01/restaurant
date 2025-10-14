import pool from '../config/database';
import dotenv from 'dotenv';

dotenv.config();

async function seedMeals() {
  try {
    console.log('🌱 Seeding meal data...');

    // Clear existing meals
    await pool.query('DELETE FROM meals');
    console.log('🗑️  Cleared existing meals');

    // Sample Uzbek/Turkish meals
    const meals = [
      // Milliy taomlar (National dishes)
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
      },
      {
        name: 'Manti',
        image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80',
        description: 'Qo\'lda tayyorlangan nozik xamir va go\'sht qiymasi bilan to\'ldirilgan manti. Yog\' va qatiq bilan xizmat qilinadi.',
        price: 18000,
        category: 'Milliy taomlar',
        ingredients: ['Xamir', "Go'sht qiymasi", 'Piyoz', 'Karam', "Yog'", 'Qatiq', 'Qalampir']
      },
      {
        name: 'Somsa',
        image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&q=80',
        description: 'Tandirda pishirilgan, go\'sht va piyoz bilan to\'ldirilgan mazali somsa. Issiq va xushbo\'y.',
        price: 15000,
        category: 'Milliy taomlar',
        ingredients: ['Xamir', "Go'sht", 'Piyoz', 'Zira', 'Tuz', 'Yog\'']
      },

      // Fast Food
      {
        name: 'Burger',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
        description: 'Yumshoq non, go\'sht kotleti, pomidor, piyoz va maxsus sous bilan tayyorlangan mazali burger.',
        price: 20000,
        category: 'Fast Food',
        ingredients: ['Non', "Go'sht kotleti", 'Pomidor', 'Piyoz', 'Sous', 'Karam']
      },
      {
        name: 'Lavash',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&q=80',
        description: 'Yupqa non, go\'sht, sabzavotlar va maxsus sous bilan o\'ralgan lavash. Tez va mazali.',
        price: 16000,
        category: 'Fast Food',
        ingredients: ['Yupqa non', "Go'sht", 'Sabzavotlar', 'Sous', 'Karam']
      },
      {
        name: 'Hot Dog',
        image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80',
        description: 'Sosiska, non va turli souslar bilan tayyorlangan klassik hot dog.',
        price: 12000,
        category: 'Fast Food',
        ingredients: ['Sosiska', 'Non', 'Ketçup', 'Mayonez', 'Piyoz']
      },

      // Nonushta (Breakfast)
      {
        name: 'Osh (Nonushta)',
        image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&q=80',
        description: 'Tuxum, go\'sht, sabzavotlar va non bilan tayyorlangan to\'liq nonushta.',
        price: 14000,
        category: 'Nonushta',
        ingredients: ['Tuxum', "Go'sht", 'Sabzavotlar', 'Non', 'Yog\'', 'Sut']
      },
      {
        name: 'Menemen',
        image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&q=80',
        description: 'Tuxum, pomidor va ziravorlar bilan tayyorlangan turkcha nonushta taomi.',
        price: 13000,
        category: 'Nonushta',
        ingredients: ['Tuxum', 'Pomidor', 'Piyoz', 'Ziravorlar', 'Yog\'', 'Non']
      },
      {
        name: 'Sucuklu Yumurta',
        image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&q=80',
        description: 'Sucuk (turkcha kolbasa) va tuxum bilan tayyorlangan mazali nonushta.',
        price: 15000,
        category: 'Nonushta',
        ingredients: ['Tuxum', 'Sucuk', 'Yog\'', 'Non', 'Ziravorlar']
      },

      // Ichimliklar (Beverages)
      {
        name: 'Choy',
        image: 'https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=800&q=80',
        description: 'Issiq va xushbo\'y choy. Qand va limon bilan xizmat qilinadi.',
        price: 3000,
        category: 'Ichimliklar',
        ingredients: ['Choy bargi', 'Suv', 'Qand']
      },
      {
        name: 'Kofe',
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',
        description: 'Mazali va xushbo\'y kofe. Sut va qand bilan xizmat qilinadi.',
        price: 8000,
        category: 'Ichimliklar',
        ingredients: ['Kofe', 'Suv', 'Sut', 'Qand']
      },
      {
        name: 'Ayran',
        image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&q=80',
        description: 'Sovuq va yangi ayran. Go\'sht taomlari bilan ajoyib uyg\'unlashadi.',
        price: 5000,
        category: 'Ichimliklar',
        ingredients: ['Qatiq', 'Suv', 'Tuz', 'Nana']
      }
    ];

    // Insert meals
    for (const meal of meals) {
      await pool.query(
        `INSERT INTO meals (name, image, description, price, category, ingredients)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [meal.name, meal.image, meal.description, meal.price, meal.category, meal.ingredients]
      );
    }

    console.log(`✅ ${meals.length} ta taom qo'shildi`);
    console.log('🎉 Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seedMeals();
