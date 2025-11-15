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
      {/* Card */}
      <div
        className="group bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 hover:scale-105"
        onClick={openModal}
      >
        {/* Image */}
        {meal.image && (
          <div className="relative w-full overflow-hidden">
            <img
              src={meal.image}
              alt={meal.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
          </div>
        )}

        {/* Name */}
        <div className="p-3 sm:p-6 text-center">
          <h3 className="text-base sm:text-xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors">
            {meal.name}
          </h3>
          <div className="text-gray-500 text-xs sm:text-sm mt-1 mb-2">{meal.category}</div>
          <div className="text-orange-500 font-bold text-sm sm:text-base">
            {meal.price.toLocaleString()} so'm
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[95vh] overflow-y-auto shadow-2xl">
            
            {/* Modal Header */}
            <div className="relative bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white rounded-t-2xl">
              <div className="relative flex justify-between items-center">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold">{meal.name}</h2>
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
              {meal.image && (
                <div className="relative mb-6 rounded-xl overflow-hidden">
                  <img
                    src={meal.image}
                    alt={meal.name}
                    className="w-full object-cover"
                  />

                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                    <span className="text-orange-600 font-bold text-lg">
                      {meal.price === 0 ? 'Bepul' : `${meal.price.toLocaleString()} so'm`}
                    </span>
                  </div>
                </div>
              )}

              {/* Price when no image */}
              {!meal.image && (
                <div className="mb-6 text-center">
                  <div className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full shadow-lg">
                    <span className="text-xl font-bold">
                      {meal.price === 0 ? 'Bepul' : `${meal.price.toLocaleString()} so'm`}
                    </span>
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  Tavsif
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {meal.description}
                </p>
              </div>

              {/* Ingredients */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
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
                <button className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all shadow-lg">
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