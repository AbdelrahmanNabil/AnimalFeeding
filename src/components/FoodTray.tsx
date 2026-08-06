import React, { useState } from 'react';
import { motion, PanInfo } from 'motion/react';
import { Food, Animal, DoctorTool } from '../types';
import { FoodItem } from './FoodItem';
import { FOODS } from '../data/animalsAndFoods';
import { DOCTOR_TOOLS } from '../data/doctorTools';

interface FoodTrayProps {
  currentAnimal: Animal;
  onDragStart: () => void;
  onDragFood: (food: Food, event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
  onDragEndFood: (food: Food, event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
  onTapFeedFood: (food: Food) => void;
  onDragDoctorTool: (tool: DoctorTool, event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
  onDragEndDoctorTool: (tool: DoctorTool, event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
  onTapUseDoctorTool: (tool: DoctorTool) => void;
}

export const FoodTray: React.FC<FoodTrayProps> = ({
  currentAnimal,
  onDragStart,
  onDragFood,
  onDragEndFood,
  onTapFeedFood,
  onDragDoctorTool,
  onDragEndDoctorTool,
  onTapUseDoctorTool,
}) => {
  const [activeTab, setActiveTab] = useState<'food' | 'doctor'>('food');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredFoods = selectedCategory === 'all'
    ? FOODS
    : selectedCategory === 'favorite'
    ? FOODS.filter(f => currentAnimal.favoriteFoods.includes(f.id))
    : FOODS.filter(f => f.category === selectedCategory);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pb-4 select-none">
      <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-[0_8px_0_#CBD5E1] border-4 border-white relative">
        {/* Top Main Mode Selector: Food vs Doctor Care */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('food')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-black text-sm sm:text-base uppercase tracking-wide transition-all border-4 ${
              activeTab === 'food'
                ? 'bg-amber-400 text-amber-950 border-amber-500 shadow-[0_4px_0_#D97706]'
                : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
            }`}
          >
            <span className="text-xl">🍲</span>
            <span>Yummy Foods</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('doctor')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-black text-sm sm:text-base uppercase tracking-wide transition-all border-4 ${
              activeTab === 'doctor'
                ? 'bg-rose-400 text-white border-rose-500 shadow-[0_4px_0_#E11D48]'
                : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
            }`}
          >
            <span className="text-xl">🩺</span>
            <span>Pet Vet Tools</span>
          </motion.button>
        </div>

        {/* Tray Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3 border-b-4 border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{activeTab === 'food' ? '🧺' : '🧰'}</span>
            <h3 className="font-black text-slate-700 text-lg sm:text-xl tracking-tight uppercase">
              {activeTab === 'food' ? `Food Basket for ${currentAnimal.name}` : `Doctor Clinic Care Kit`}
            </h3>
          </div>

          {activeTab === 'food' && (
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
          )}
        </div>

        {/* Drag Helper Tip for Kids */}
        <p className="text-xs text-slate-700 font-black mb-3 uppercase tracking-wide flex items-center justify-center sm:justify-start gap-1">
          <span className="animate-bounce">👇</span>
          {activeTab === 'food'
            ? "DRAG FOOD TO ANIMAL'S MOUTH, OR TAP TO FEED!"
            : 'DRAG DOCTOR TOOL TO PET TO CHECK & HEAL!'}
        </p>

        {/* Items Grid */}
        {activeTab === 'food' ? (
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
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {DOCTOR_TOOLS.map((tool) => (
              <motion.div key={tool.id} layout>
                <motion.div
                  drag
                  dragSnapToOrigin
                  onDragStart={onDragStart}
                  onDrag={(e, info) => onDragDoctorTool(tool, e, info)}
                  onDragEnd={(e, info) => onDragEndDoctorTool(tool, e, info)}
                  onClick={() => onTapUseDoctorTool(tool)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-rose-50 border-2 border-rose-200 rounded-2xl p-3 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing shadow-[0_4px_0_#FECDD3] hover:bg-rose-100 transition-colors"
                >
                  <span className="text-3xl sm:text-4xl mb-1">{tool.icon}</span>
                  <span className="text-xs font-black text-rose-900 tracking-tight text-center uppercase">
                    {tool.name}
                  </span>
                </motion.div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
