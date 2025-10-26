import React, { useState } from 'react';
import { Meal } from '../types';

interface MealCardProps {
  meal: Meal;
}

const MealCard: React.FC<MealCardProps> = ({ meal }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {/* Simplified Card View */}
      <div 
        className="group bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 hover:scale-105"
        onClick={openModal}
      >
        {/* Image Section */}
        <div 
          className="relative h-40 sm:h-48 lg:h-56 overflow-hidden min-h-[160px]"
          style={{
            backgroundImage: `url(${meal.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
          
        </div>

        {/* Name Section */}
        <div className="p-3 sm:p-6 text-center">
          <h3 className="text-base sm:text-xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors leading-tight">
            {meal.name}
          </h3>
          <div className="text-gray-500 text-xs sm:text-sm mt-1 mb-2">{meal.category}</div>
          <div className="text-orange-500 font-bold text-sm sm:text-base">{meal.price.toLocaleString()} so'm</div>
        </div>
      </div>

      {/* Enhanced Modal for Full Details */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[95vh] overflow-y-auto shadow-2xl animate-scale-in">
            {/* Modal Header */}
            <div className="relative bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white">
              <div className="absolute inset-0 bg-black/10 rounded-t-2xl"></div>
              <div className="relative flex justify-between items-center">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-1">{meal.name}</h2>
                  <p className="text-orange-100">{meal.category}</p>
                </div>
                <button
                  onClick={closeModal}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Image */}
              <div 
                className="relative mb-6 rounded-xl overflow-hidden min-h-[288px]"
                style={{
                  backgroundImage: `url(${meal.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                  <span className="text-orange-600 font-bold text-lg">
                    {meal.price === 0 ? 'Bepul' : `${meal.price.toLocaleString()} so'm`}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Tavsif
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {meal.description}
                </p>
              </div>

              {/* Ingredients */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm8 0a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V8zm0 4a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1v-2z" clipRule="evenodd" />
                  </svg>
                  Tarkibi
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {meal.ingredients.map((ingredient, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 text-orange-800 px-4 py-3 rounded-lg text-sm font-medium flex items-center gap-2"
                    >
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      {ingredient}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t bg-gray-50 rounded-b-2xl">
              <div className="flex gap-3">
                <button
                  onClick={closeModal}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                >
                  Yopish
                </button>
                <button className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all shadow-lg hover:shadow-xl">
                  Buyurtma berish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MealCard;

