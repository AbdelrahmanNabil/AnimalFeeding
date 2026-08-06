import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Animal } from '../types';
import { sound } from '../utils/sound';

interface BackgroundSceneProps {
  animal: Animal;
  children: React.ReactNode;
}

interface InteractiveBubble {
  id: number;
  x: number;
  y: number;
  size: number;
  emoji: string;
}

export const BackgroundScene: React.FC<BackgroundSceneProps> = ({ animal, children }) => {
  const [bubbles, setBubbles] = useState<InteractiveBubble[]>([
    { id: 1, x: 15, y: 20, size: 40, emoji: '✨' },
    { id: 2, x: 80, y: 15, size: 48, emoji: '🎈' },
    { id: 3, x: 85, y: 40, size: 36, emoji: '🌸' },
    { id: 4, x: 10, y: 55, size: 44, emoji: '⭐' },
  ]);

  const popBubble = (id: number) => {
    sound.playPop();
    setBubbles((prev) => prev.filter((b) => b.id !== id));

    // Respawn new bubble after 2 seconds
    setTimeout(() => {
      setBubbles((prev) => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          x: Math.floor(Math.random() * 80) + 10,
          y: Math.floor(Math.random() * 50) + 10,
          size: Math.floor(Math.random() * 20) + 35,
          emoji: ['✨', '🎈', '🌸', '⭐', '☁️', '🍬'][Math.floor(Math.random() * 6)],
        },
      ]);
    }, 2000);
  };

  const getEnvironmentStyles = () => {
    switch (animal.environment) {
      case 'bamboo':
        return {
          bgGradient: 'from-emerald-300 via-teal-200 to-green-400',
          decorEmojis: ['🎋', '🌿', '🌱', '🎋'],
          groundColor: 'bg-emerald-600',
        };
      case 'meadow':
        return {
          bgGradient: 'from-sky-300 via-emerald-200 to-lime-300',
          decorEmojis: ['🌻', '🦋', '🌸', '🌼'],
          groundColor: 'bg-lime-500',
        };
      case 'jungle':
        return {
          bgGradient: 'from-green-400 via-amber-200 to-emerald-600',
          decorEmojis: ['🌴', '🌺', '🍃', '🍌'],
          groundColor: 'bg-green-700',
        };
      case 'savannah':
        return {
          bgGradient: 'from-amber-200 via-orange-300 to-yellow-400',
          decorEmojis: ['🌾', '🌅', '🏜️', '🌿'],
          groundColor: 'bg-amber-600',
        };
      case 'farm':
        return {
          bgGradient: 'from-amber-100 via-lime-200 to-emerald-300',
          decorEmojis: ['🚜', '🌻', '🌾', '🏡'],
          groundColor: 'bg-emerald-500',
        };
      case 'pond':
        return {
          bgGradient: 'from-cyan-200 via-sky-300 to-teal-400',
          decorEmojis: ['🪷', '🌊', '🌾', '💧'],
          groundColor: 'bg-teal-600',
        };
      case 'ice':
        return {
          bgGradient: 'from-sky-100 via-blue-200 to-indigo-300',
          decorEmojis: ['❄️', '🧊', '☃️', '🌟'],
          groundColor: 'bg-sky-400',
        };
    }
  };

  const env = getEnvironmentStyles();

  return (
    <div className={`relative min-h-screen w-full bg-gradient-to-b ${env.bgGradient} overflow-hidden flex flex-col justify-between transition-colors duration-700`}>
      {/* Animated Clouds in Sky */}
      <motion.div
        animate={{ x: [-50, 50, -50] }}
        transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
        className="absolute top-8 left-10 text-6xl opacity-70 pointer-events-none select-none"
      >
        ☁️
      </motion.div>
      <motion.div
        animate={{ x: [50, -50, 50] }}
        transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
        className="absolute top-16 right-16 text-7xl opacity-60 pointer-events-none select-none"
      >
        ☁️
      </motion.div>

      {/* Interactive Poppable Bubbles / Balloons */}
      <AnimatePresence>
        {bubbles.map((bubble) => (
          <motion.button
            key={bubble.id}
            onClick={() => popBubble(bubble.id)}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 0.9,
              y: [0, -15, 0],
            }}
            exit={{ scale: 1.8, opacity: 0 }}
            transition={{
              y: { repeat: Infinity, duration: 3, ease: 'easeInOut' },
            }}
            style={{
              top: `${bubble.y}%`,
              left: `${bubble.x}%`,
              fontSize: `${bubble.size}px`,
            }}
            whileHover={{ scale: 1.2 }}
            className="absolute z-10 cursor-pointer filter drop-shadow select-none active:scale-90"
          >
            {bubble.emoji}
          </motion.button>
        ))}
      </AnimatePresence>

      {/* Main Game Screen Content */}
      <div className="relative z-10 flex-1 flex flex-col">
        {children}
      </div>

      {/* Cute Ground Mat & Scene Decor */}
      <div className="relative w-full h-24 sm:h-28 mt-auto pointer-events-none">
        {/* Hill Curve Ground */}
        <div className={`absolute bottom-0 w-full h-full ${env.groundColor} rounded-t-[50%] shadow-inner border-t-8 border-white/20`} />

        {/* Environmental Props & Emojis on Ground */}
        <div className="absolute inset-x-0 bottom-2 flex justify-between px-8 text-3xl sm:text-4xl opacity-90 select-none">
          <motion.span animate={{ rotate: [-5, 5, -5] }} transition={{ repeat: Infinity, duration: 2 }}>
            {env.decorEmojis[0]}
          </motion.span>
          <motion.span animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 2.5 }}>
            {env.decorEmojis[1]}
          </motion.span>
          <motion.span animate={{ rotate: [5, -5, 5] }} transition={{ repeat: Infinity, duration: 3 }}>
            {env.decorEmojis[2]}
          </motion.span>
          <motion.span animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
            {env.decorEmojis[3]}
          </motion.span>
        </div>
      </div>
    </div>
  );
};
