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
      {/* Compact Card View */}
      <div 
        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
        onClick={openModal}
      >
        {/* Image Section */}
        <div className="relative h-32 sm:h-40 lg:h-48 overflow-hidden">
          <img
            src={meal.image}
            alt={meal.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Section - Name and Price */}
        <div className="p-4">
          <h3 className="text-lg font-bold text-center text-gray-800 md:mb-2 mb-0">{meal.name}</h3>
          <div className='text-center'>
            <span className="  text-orange-500 px-4 py-2 rounded-full font-bold text-sm">
              {meal.price === 0 ? 'Bepul' : `${meal.price.toLocaleString()} so'm`}
            </span>
          </div>
        </div>
      </div>

      {/* Modal for Full Details */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800">{meal.name}</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Image */}
              <div className="relative mb-6">
                <img
                  src={meal.image}
                  alt={meal.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="absolute top-4 right-4 bg-orange-500 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                  {meal.price === 0 ? 'Bepul' : `${meal.price.toLocaleString()} so'm`}
                </div>
              </div>

              {/* Category */}
              <div className="mb-4">
                <span className="inline-block bg-orange-100 text-orange-600 text-sm px-4 py-2 rounded-full font-semibold">
                  {meal.category}
                </span>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Tavsif:</h3>
                <p className="text-gray-600 leading-relaxed">
                  {meal.description}
                </p>
              </div>

              {/* Ingredients */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Tarkibi:</h3>
                <div className="flex flex-wrap gap-2">
                  {meal.ingredients.map((ingredient, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 text-sm px-3 py-2 rounded-md"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t bg-gray-50 rounded-b-xl">
              <button
                onClick={closeModal}
                className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MealCard;

