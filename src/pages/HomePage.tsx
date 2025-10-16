import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MealCard from '../components/MealCard';
import { Meal } from '../types';
import { mealsAPI } from '../services/api';

const HomePage: React.FC = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      const data = await mealsAPI.getAll();
      setMeals(data?.meals || []);
    } catch (err) {
      setError('Backend serverga ulanib bo\'lmadi. Namuna ma\'lumotlar ko\'rsatilmoqda.');
      setMeals(getSampleMeals());
    } finally {
      setLoading(false);
    }
  };

  const getSampleMeals = (): Meal[] => {
    return [
      {
        id: 1,
        name: "O'sh (Palov)",
        image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&q=80',
        ingredients: ['Guruch', "Qo'y go'shti", 'Sabzi', 'Piyoz', 'Noxat', 'Zira', "Yog'"],
        description: 'Milliy taomimiz, to\'ylar va bayramlarda tayyorlanadigan, guruch, go\'sht va sabzi asosida pishiriladigan mazali palov.',
        price: 25000,
        category: 'Milliy taomlar'
      },
      {
        id: 2,
        name: 'Shashlik',
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80',
        ingredients: ["Qo'y go'shti", 'Piyoz', 'Ziravorlar', 'Sirka', 'Tuz'],
        description: 'Cho\'g\' ustida pishirilgan, nozik va yumshoq qo\'y go\'shti shashlik.',
        price: 30000,
        category: "Go'sht taomlar"
      },
      {
        id: 3,
        name: "Lag'mon",
        image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&q=80',
        ingredients: ["Qo'l lag'mon", "Go'sht", 'Sabzavotlar', 'Kartoshka'],
        description: 'Qo\'lda cho\'zilgan maxsus lag\'mon, go\'sht va sabzavotlar bilan.',
        price: 22000,
        category: "Sho'rvalar"
      },
      {
        id: 4,
        name: 'Manti',
        image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=800&q=80',
        ingredients: ['Un', "Go'sht", 'Piyoz', 'Tuz'],
        description: 'Bug\'da pishirilgan, ichiga go\'sht va piyoz solingan manti.',
        price: 18000,
        category: 'Milliy taomlar'
      },
      {
        id: 5,
        name: 'Somsa',
        image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80',
        ingredients: ['Xamir', "Qo'y go'shti", 'Piyoz'],
        description: 'Tandirda pishirilgan, mazali go\'sht va piyoz solingan somsa.',
        price: 8000,
        category: 'Non mahsulotlari'
      },
      {
        id: 6,
        name: 'Tandir non',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80',
        ingredients: ['Un', 'Suv', 'Tuz', 'Kunjut'],
        description: 'Tandirda pishirilgan, issiq va mazali milliy non.',
        price: 3000,
        category: 'Non mahsulotlari'
      }
    ];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-500 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Yuklanmoqda...</p>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded-lg text-center">
            <p className="font-semibold">⚠️ {error}</p>
            <button
              onClick={fetchMeals}
              className="mt-2 text-sm underline hover:text-yellow-900"
            >
              Qayta urinish
            </button>
          </div>
        )}

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Bizning Mazali Menyumiz
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            Eng sifatli mahsulotlardan tayyorlangan va malakali oshpazlarimiz tomonidan mehr bilan pishirilgan milliy taomlarimizni kashf eting.
          </p>
        </div>

        {/* Responsive Grid Layout */}
        {meals && meals.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {meals.map((meal) => (
              <MealCard key={meal.id} meal={meal} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">Hozircha taomlar mavjud emas</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;

