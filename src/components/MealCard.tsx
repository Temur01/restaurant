import React from 'react';
import { Meal } from '../types';

interface MealCardProps {
  meal: Meal;
}

const MealCard: React.FC<MealCardProps> = ({ meal }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={meal.image}
          alt={meal.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1 rounded-full font-bold shadow-lg">
          ${meal.price.toFixed(2)}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Category Badge */}
        <span className="inline-block bg-orange-100 text-orange-600 text-xs px-3 py-1 rounded-full mb-2 font-semibold">
          {meal.category}
        </span>

        {/* Meal Name */}
        <h3 className="text-xl font-bold text-gray-800 mb-2">{meal.name}</h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-3 leading-relaxed">
          {meal.description}
        </p>

        {/* Ingredients Section */}
        <div className="border-t pt-3">
          <h4 className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
            Tarkibi:
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {meal.ingredients.map((ingredient, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-md"
              >
                {ingredient}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default MealCard;

