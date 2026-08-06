import React from 'react';
import { motion, PanInfo } from 'motion/react';
import { Food } from '../types';

interface FoodItemProps {
  food: Food;
  isFavorite: boolean;
  onDragStart?: () => void;
  onDrag?: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
  onDragEnd?: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
  onTapToFeed?: () => void;
}

export const FoodItem: React.FC<FoodItemProps> = ({
  food,
  isFavorite,
  onDragStart,
  onDrag,
  onDragEnd,
  onTapToFeed,
}) => {
  return (
    <motion.div
      drag
      dragSnapToOrigin
      dragElastic={0.2}
      onDragStart={onDragStart}
      onDrag={onDrag}
      onDragEnd={onDragEnd}
      onClick={onTapToFeed}
      whileHover={{ scale: 1.1, rotate: 3 }}
      whileTap={{ scale: 0.9 }}
      whileDrag={{ scale: 1.3, zIndex: 50 }}
      className={`relative flex flex-col items-center justify-center p-4 sm:p-5 rounded-3xl cursor-grab active:cursor-grabbing border-4 bg-gradient-to-b ${food.color} shadow-[0_6px_0_#CBD5E1] hover:shadow-[0_8px_0_#94A3B8] border-white select-none touch-none transition-all w-full`}
    >
      {/* Heart indicator for favorite foods */}
      {isFavorite && (
        <span className="absolute -top-3 -right-2 bg-pink-500 text-white text-sm p-1 rounded-full shadow-md border-2 border-white font-black animate-bounce">
          ❤️
        </span>
      )}

      {/* Extra Large Food Emoji */}
      <span className="text-6xl sm:text-7xl filter drop-shadow-md transform transition-transform group-hover:scale-110">
        {food.emoji}
      </span>
    </motion.div>
  );
};

