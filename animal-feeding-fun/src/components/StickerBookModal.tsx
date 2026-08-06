import React from 'react';
import { motion } from 'motion/react';
import { ANIMALS } from '../data/animalsAndFoods';
import { AnimalId } from '../types';

interface StickerBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  timesFed: Record<AnimalId, number>;
}

export const StickerBookModal: React.FC<StickerBookModalProps> = ({
  isOpen,
  onClose,
  timesFed,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm select-none">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="relative w-full max-w-2xl bg-white rounded-3xl p-6 shadow-[0_12px_0_#CBD5E1] border-8 border-sky-100 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b-4 border-sky-100">
          <div className="flex items-center gap-2">
            <span className="text-4xl">🏆</span>
            <span className="text-3xl font-black text-amber-500">⭐</span>
          </div>
          <button
            onClick={onClose}
            className="w-12 h-12 bg-rose-500 hover:bg-rose-600 text-white font-black text-2xl rounded-2xl shadow-[0_4px_0_#9F1239] border-2 border-white flex items-center justify-center active:scale-95"
          >
            ✕
          </button>
        </div>

        {/* Sticker Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 py-4 max-h-[60vh] overflow-y-auto pr-1">
          {ANIMALS.map((animal) => {
            const count = timesFed[animal.id] || 0;
            const isUnlocked = count >= 3;

            return (
              <div
                key={animal.id}
                className={`relative flex flex-col items-center justify-center p-3 rounded-2xl border-4 transition-all ${
                  isUnlocked
                    ? 'bg-yellow-100 border-yellow-400 shadow-[0_4px_0_#EAB308]'
                    : 'bg-slate-100 border-slate-200 opacity-50'
                }`}
              >
                {/* Sticker Badge Icon */}
                <span className={`text-5xl filter ${isUnlocked ? 'drop-shadow scale-110' : 'grayscale opacity-40'}`}>
                  {getStickerEmoji(animal.id)}
                </span>

                {/* Star / Lock Badge */}
                {isUnlocked ? (
                  <span className="mt-2 text-2xl text-amber-400 drop-shadow">
                    ⭐
                  </span>
                ) : (
                  <span className="mt-2 text-xl text-slate-400">
                    🔒
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-2 text-center">
          <button
            onClick={onClose}
            className="bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-black px-10 py-3 rounded-full text-2xl shadow-[0_5px_0_#EAB308] border-2 border-yellow-500 active:scale-95 transition-transform"
          >
            ▶️
          </button>
        </div>
      </motion.div>
    </div>
  );
};

function getStickerEmoji(id: AnimalId): string {
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
