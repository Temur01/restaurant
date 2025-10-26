import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MealCard from '../components/MealCard';
import ImageSlider from '../components/ImageSlider';
import { Meal, Category } from '../types';
import { mealsAPI, categoriesAPI } from '../services/api';

const HomePage: React.FC = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Barchasi');

  // Slider images
  const sliderImages = [
    '/src/assets/slider_1.JPG',
    '/src/assets/slider_2.JPG',
    '/src/assets/slider_3.JPG'
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await Promise.all([fetchMeals(), fetchCategories()]);
  };

  const fetchMeals = async () => {
    try {
      const data = await mealsAPI.getAll();
      setMeals(data?.meals || []);
    } catch (err) {
      setError('Backend serverga ulanib bo\'lmadi. Namuna ma\'lumotlar ko\'rsatilmoqda.');
      setMeals(getSampleMeals());
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await categoriesAPI.getAll();
      setCategories(data?.categories || []);
    } catch (err) {
      console.error('Categories fetch error:', err);
      // Use sample categories if API fails
      setCategories(getSampleCategories());
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
        orderNumber: 1,
        category: 'Milliy taomlar'
      },
      {
        id: 2,
        name: 'Shashlik',
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80',
        ingredients: ["Qo'y go'shti", 'Piyoz', 'Ziravorlar', 'Sirka', 'Tuz'],
        description: 'Cho\'g\' ustida pishirilgan, nozik va yumshoq qo\'y go\'shti shashlik.',
        price: 30000,
        orderNumber: 2,
        category: "Go'sht taomlar"
      },
      {
        id: 3,
        name: "Lag'mon",
        image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&q=80',
        ingredients: ["Qo'l lag'mon", "Go'sht", 'Sabzavotlar', 'Kartoshka'],
        description: 'Qo\'lda cho\'zilgan maxsus lag\'mon, go\'sht va sabzavotlar bilan.',
        price: 22000,
        orderNumber: 3,
        category: "Sho'rvalar"
      },
      {
        id: 4,
        name: 'Manti',
        image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=800&q=80',
        ingredients: ['Un', "Go'sht", 'Piyoz', 'Tuz'],
        description: 'Bug\'da pishirilgan, ichiga go\'sht va piyoz solingan manti.',
        price: 18000,
        orderNumber: 4,
        category: 'Milliy taomlar'
      },
      {
        id: 5,
        name: 'Somsa',
        image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80',
        ingredients: ['Xamir', "Qo'y go'shti", 'Piyoz'],
        description: 'Tandirda pishirilgan, mazali go\'sht va piyoz solingan somsa.',
        price: 8000,
        orderNumber: 5,
        category: 'Non mahsulotlari'
      },
      {
        id: 6,
        name: 'Tandir non',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80',
        ingredients: ['Un', 'Suv', 'Tuz', 'Kunjut'],
        description: 'Tandirda pishirilgan, issiq va mazali milliy non.',
        price: 3000,
        orderNumber: 6,
        category: 'Non mahsulotlari'
      }
    ];
  };

  const getSampleCategories = (): Category[] => {
    return [
      { id: 1, name: 'Milliy taomlar' },
      { id: 2, name: 'Go\'sht taomlar' },
      { id: 3, name: 'Sho\'rvalar' },
      { id: 4, name: 'Non mahsulotlari' },
      { id: 5, name: 'Salatlar' },
      { id: 6, name: 'Ichimliklar' }
    ];
  };

  // Get categories for filter
  const getCategoriesForFilter = (): string[] => {
    if (categories.length > 0) {
      return ['Barchasi', ...categories.map(cat => cat.name)];
    }
    // Fallback to meal categories if API categories not available
    const mealCategories = meals.map(meal => meal.category);
    return ['Barchasi', ...Array.from(new Set(mealCategories))];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-gray-200 mx-auto mb-6"></div>
            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-orange-500 absolute top-0 left-1/2 transform -translate-x-1/2"></div>
          </div>
          <div className="space-y-2">
            <p className="text-2xl font-semibold text-gray-800">Yuklanmoqda...</p>
            <p className="text-gray-600">Bizning mazali taomlarimizni tayyorlayapmiz</p>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Header />
      
      {/* Image Slider Section */}
      <section className="w-full mt-8">
        <div className="px-3 sm:px-6 lg:px-8">
          <ImageSlider 
            images={sliderImages}
            autoPlay={true}
            autoPlayInterval={4000}
            showDots={true}
            className="w-full"
          />
        </div>
      </section>
      
      <main className="px-3 sm:px-6 lg:px-8 py-4 sm:py-8 lg:py-16">
        {/* Error Message */}
        {error && (
          <div className="mb-8 bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400 rounded-lg shadow-sm animate-fade-in">
            <div className="p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3 flex-1">
                  <p className="font-semibold text-yellow-800">⚠️ {error}</p>
                  <button
                    onClick={fetchMeals}
                    className="mt-2 text-sm text-yellow-700 underline hover:text-yellow-900 transition-colors"
                  >
                    Qayta urinish
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Simple Menu Title */}
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-orange-600 to-red-600 bg-clip-text text-transparent mb-6">
            Menu
          </h2>
        </div>

        {/* Enhanced Categories Filter */}
        {meals && meals.length > 0 && (
          <div className="mb-6 sm:mb-12">
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:gap-4">
              {getCategoriesForFilter().map((category, index) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`group relative px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/25 scale-105'
                      : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-orange-300 hover:bg-orange-50 hover:shadow-md'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="relative z-10">{category}</span>
                  {selectedCategory === category && (
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-pulse"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Meals Grouped by Category */}
        {meals && meals.length > 0 ? (
          <div className="space-y-8 sm:space-y-12">
            {getCategoriesForFilter().slice(1).map((category, categoryIndex) => {
              const categoryMeals = meals
                .filter(meal => meal.category === category)
                .sort((a, b) => (a.orderNumber || 0) - (b.orderNumber || 0));
              
              if (categoryMeals.length === 0) return null;
              
              return (
                <div key={category} className="animate-fade-in-up" style={{ animationDelay: `${categoryIndex * 200}ms` }}>
                  {/* Category Title */}
                  <h3 className="text-2xl text-center sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
                    {category}
                  </h3>
                  
                  {/* Meals Grid for this Category */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:gap-8">
                    {categoryMeals.map((meal, mealIndex) => (
                      <div
                        key={meal.id}
                        className="animate-fade-in-up"
                        style={{ animationDelay: `${(categoryIndex * 200) + (mealIndex * 100)}ms` }}
                      >
                        <MealCard meal={meal} />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Hozircha taomlar mavjud emas</h3>
              <p className="text-gray-600 mb-6">Tez orada yangi taomlar qo'shiladi. Kuting!</p>
              <button
                onClick={fetchMeals}
                className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Yangilash
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;

