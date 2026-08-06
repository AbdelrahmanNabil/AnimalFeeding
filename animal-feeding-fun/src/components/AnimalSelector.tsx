import React from 'react';
import { motion } from 'motion/react';
import { Animal, AnimalId } from '../types';
import { ANIMALS } from '../data/animalsAndFoods';

interface AnimalSelectorProps {
  selectedAnimalId: AnimalId;
  onSelectAnimal: (animal: Animal) => void;
  timesFed: Record<AnimalId, number>;
}

export const AnimalSelector: React.FC<AnimalSelectorProps> = ({
  selectedAnimalId,
  onSelectAnimal,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-1 select-none">
      <div className="flex items-center justify-center gap-2.5 sm:gap-4 overflow-x-auto py-2 no-scrollbar scroll-smooth">
        {ANIMALS.map((animal) => {
          const isSelected = animal.id === selectedAnimalId;

          return (
            <motion.button
              key={animal.id}
              onClick={() => onSelectAnimal(animal)}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              className={`flex-shrink-0 flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full transition-all border-4 ${
                isSelected
                  ? 'bg-yellow-300 border-white shadow-[0_5px_0_#EAB308] ring-4 ring-yellow-400 scale-110'
                  : 'bg-white/90 border-sky-300 shadow-[0_4px_0_#38BDF8] hover:bg-white'
              }`}
            >
              <span className="text-3xl sm:text-4xl filter drop-shadow">
                {getAnimalEmoji(animal.id)}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

function getAnimalEmoji(id: AnimalId): string {
  switch (id) {
    case 'dog': return '🐶';
    case 'cat': return '🐱';
    case 'cow': return '🐮';
    case 'sheep': return '🐑';
    case 'goat': return '🐐';
    case 'horse': return '🐴';
    case 'lion': return '🦁';
    case 'panda': return '🐼';
    case 'bunny': return '🐰';
    case 'frog': return '🐸';
    default: return '🐾';
  }
}
