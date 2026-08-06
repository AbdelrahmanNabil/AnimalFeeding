import React, { useState } from 'react';
import { motion, PanInfo } from 'motion/react';
import { Food, Animal } from '../types';
import { FoodItem } from './FoodItem';
import { FOODS } from '../data/animalsAndFoods';

interface FoodTrayProps {
  currentAnimal: Animal;
  onDragStart: () => void;
  onDragFood: (food: Food, event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
  onDragEndFood: (food: Food, event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
  onTapFeedFood: (food: Food) => void;
}

export const FoodTray: React.FC<FoodTrayProps> = ({
  currentAnimal,
  onDragStart,
  onDragFood,
  onDragEndFood,
  onTapFeedFood,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredFoods = selectedCategory === 'all'
    ? FOODS
    : selectedCategory === 'favorite'
    ? FOODS.filter(f => currentAnimal.favoriteFoods.includes(f.id))
    : FOODS.filter(f => f.category === selectedCategory);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pb-4 select-none">
      <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-[0_8px_0_#CBD5E1] border-4 border-white relative">
        {/* Tray Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3 border-b-4 border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🧺</span>
            <h3 className="font-black text-slate-700 text-lg sm:text-xl tracking-tight uppercase">
              Food Basket for {currentAnimal.name}
            </h3>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto py-1">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider transition-all border-2 ${
                selectedCategory === 'all'
                  ? 'bg-sky-500 text-white border-sky-600 shadow-[0_2px_0_#0284C7]'
                  : 'bg-sky-100 text-sky-800 border-sky-200 hover:bg-sky-200'
              }`}
            >
              All Foods
            </button>
            <button
              onClick={() => setSelectedCategory('favorite')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider transition-all border-2 ${
                selectedCategory === 'favorite'
                  ? 'bg-pink-500 text-white border-pink-600 shadow-[0_2px_0_#BE123C]'
                  : 'bg-pink-100 text-pink-800 border-pink-200 hover:bg-pink-200'
              }`}
            >
              ❤️ Favorites
            </button>
          </div>
        </div>

        {/* Drag Helper Tip for Kids */}
        <p className="text-xs text-slate-700 font-black mb-3 uppercase tracking-wide flex items-center justify-center sm:justify-start gap-1">
          <span className="animate-bounce">👇</span>
          DRAG FOOD TO ANIMAL'S MOUTH, OR TAP TO FEED!
        </p>

        {/* Items Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-3">
          {filteredFoods.map((food) => {
            const isFavorite = currentAnimal.favoriteFoods.includes(food.id);
            return (
              <motion.div key={food.id} layout>
                <FoodItem
                  food={food}
                  isFavorite={isFavorite}
                  onDragStart={onDragStart}
                  onDrag={(e, info) => onDragFood(food, e, info)}
                  onDragEnd={(e, info) => onDragEndFood(food, e, info)}
                  onTapToFeed={() => onTapFeedFood(food)}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
