import React, { useState, useRef, useEffect } from 'react';
import { PanInfo, motion, AnimatePresence } from 'motion/react';
import { ANIMALS } from './data/animalsAndFoods';
import { Animal, Food, Expression, AnimalId } from './types';
import { sound } from './utils/sound';
import { AnimalCharacter } from './components/AnimalCharacter';
import { FoodTray } from './components/FoodTray';
import { AnimalSelector } from './components/AnimalSelector';
import { BackgroundScene } from './components/BackgroundScene';
import { HeaderControls } from './components/HeaderControls';
import { StickerBookModal } from './components/StickerBookModal';

export default function App() {
  const [currentAnimal, setCurrentAnimal] = useState<Animal>(ANIMALS[0]);
  const [expression, setExpression] = useState<Expression>('idle');
  const [fullnessLevel, setFullnessLevel] = useState<number>(0);
  const [timesFed, setTimesFed] = useState<Record<AnimalId, number>>({
    panda: 0,
    bunny: 0,
    monkey: 0,
    lion: 0,
    pig: 0,
    frog: 0,
    elephant: 0,
    cat: 0,
    dog: 0,
    penguin: 0,
  });

  const [isNearMouth, setIsNearMouth] = useState<boolean>(false);
  const [isStickerModalOpen, setIsStickerModalOpen] = useState<boolean>(false);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);
  const [flyingFood, setFlyingFood] = useState<{ food: Food; key: number } | null>(null);
  const [chewingFood, setChewingFood] = useState<Food | null>(null);

  const animalContainerRef = useRef<HTMLDivElement>(null);

  // Greet & ask for food when animal changes
  useEffect(() => {
    sound.playAnimalSound(currentAnimal.soundType);
    const timer = setTimeout(() => {
      sound.speak(currentAnimal.greeting);
    }, 350);
    setFullnessLevel(0);
    setExpression('idle');
    return () => clearTimeout(timer);
  }, [currentAnimal]);

  const handleSelectAnimal = (animal: Animal) => {
    sound.playPop();
    setCurrentAnimal(animal);
  };

  // Helper to test if touch/drag coordinates are inside animal mouth target
  const checkIsNearMouth = (pointX: number, pointY: number): boolean => {
    if (!animalContainerRef.current) return false;
    const rect = animalContainerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distance = Math.hypot(pointX - centerX, pointY - centerY);
    return distance < 130; // 130px radius target
  };

  const handleDragFood = (
    _food: Food,
    event: MouseEvent | TouchEvent | PointerEvent,
    _info: PanInfo
  ) => {
    let x = 0;
    let y = 0;

    if ('clientX' in event) {
      x = event.clientX;
      y = event.clientY;
    } else if ('touches' in event && event.touches[0]) {
      x = event.touches[0].clientX;
      y = event.touches[0].clientY;
    }

    const near = checkIsNearMouth(x, y);
    setIsNearMouth(near);
  };

  const executeFeeding = (food: Food) => {
    const isFavorite = currentAnimal.favoriteFoods.includes(food.id);
    const isDisliked = currentAnimal.dislikedFoods?.includes(food.id);

    // Play animal chewing & crunching sound along with animal sound
    sound.playChewSoundForAnimal(currentAnimal.soundType);

    if (isFavorite) {
      sound.speak(`Yum! ${currentAnimal.name.split(' ')[0]} loves ${food.name}!`);
    } else if (isDisliked) {
      sound.speak(`Silly! ${currentAnimal.name.split(' ')[0]} prefers ${currentAnimal.favoriteFoods[0]}!`);
    } else {
      sound.speak(`Tasty ${food.name}!`);
    }

    // Set Expression to chewing with the current food
    setChewingFood(food);
    setExpression('chewing');

    setTimeout(() => {
      setChewingFood(null);
      if (isFavorite) {
        setExpression('happy');
        sound.playSparkle();
      } else if (isDisliked) {
        setExpression('surprised');
        sound.playDislike();
      } else {
        setExpression('happy');
      }

      // Update feeds count
      setTimesFed((prev) => {
        const next = { ...prev, [currentAnimal.id]: (prev[currentAnimal.id] || 0) + 1 };
        return next;
      });

      // Update Fullness
      setFullnessLevel((prev) => {
        const nextFullness = prev + 1;
        if (nextFullness >= 3) {
          // Trigger Party Celebration!
          setTimeout(() => {
            setShowCelebration(true);
            sound.playSparkle();
            sound.speak(`${currentAnimal.name} is full and super happy!`);
          }, 400);
        }
        return nextFullness > 3 ? 3 : nextFullness;
      });

      // Reset expression after 2s
      setTimeout(() => {
        setExpression('idle');
      }, 2000);
    }, 1200);
  };

  const handleDragEndFood = (
    food: Food,
    event: MouseEvent | TouchEvent | PointerEvent,
    _info: PanInfo
  ) => {
    setIsNearMouth(false);

    let x = 0;
    let y = 0;

    if ('clientX' in event) {
      x = event.clientX;
      y = event.clientY;
    } else if ('changedTouches' in event && event.changedTouches[0]) {
      x = event.changedTouches[0].clientX;
      y = event.changedTouches[0].clientY;
    }

    if (checkIsNearMouth(x, y)) {
      executeFeeding(food);
    } else {
      sound.playPop();
    }
  };

  const handleTapFeedFood = (food: Food) => {
    setFlyingFood({ food, key: Date.now() });
    setTimeout(() => {
      executeFeeding(food);
      setFlyingFood(null);
    }, 500);
  };

  const handleTapAnimal = () => {
    if (expression === 'idle') {
      sound.playAnimalSound(currentAnimal.soundType);
      sound.speak(currentAnimal.greeting);
      setExpression('tickled');
      setTimeout(() => setExpression('idle'), 1500);
    }
  };

  const handleResetFeeds = () => {
    sound.playPop();
    setFullnessLevel(0);
    setTimesFed({
      panda: 0,
      bunny: 0,
      monkey: 0,
      lion: 0,
      pig: 0,
      frog: 0,
      elephant: 0,
      cat: 0,
      dog: 0,
      penguin: 0,
    });
  };

  const unlockedStickersCount = (Object.values(timesFed) as number[]).filter((c) => c >= 3).length;

  return (
    <BackgroundScene animal={currentAnimal}>
      {/* Header Bar */}
      <HeaderControls
        onOpenStickers={() => setIsStickerModalOpen(true)}
        onResetFeeds={handleResetFeeds}
        stickerCount={unlockedStickersCount}
      />

      {/* Animal Selector Slider */}
      <AnimalSelector
        selectedAnimalId={currentAnimal.id}
        onSelectAnimal={handleSelectAnimal}
        timesFed={timesFed}
      />

      {/* Center Stage: Animal Character & Dinner Plate */}
      <main className="flex-1 flex flex-col items-center justify-center relative py-1 my-auto w-full">
        <div ref={animalContainerRef} className="relative">
          <AnimalCharacter
            animal={currentAnimal}
            expression={expression}
            isNearMouth={isNearMouth}
            onTap={handleTapAnimal}
            fullnessLevel={fullnessLevel}
            chewingFood={chewingFood}
          />
        </div>

        {/* Flying Food Animation on Tap */}
        <AnimatePresence>
          {flyingFood && (
            <motion.div
              key={flyingFood.key}
              initial={{ opacity: 1, scale: 1, y: 150, x: 0 }}
              animate={{ opacity: 0.8, scale: 1.4, y: -60, x: 0 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="absolute z-40 text-6xl pointer-events-none filter drop-shadow-2xl"
            >
              {flyingFood.food.emoji}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dinner Plate with Favorite Food in Front of the Animal */}
        <FoodTray
          currentAnimal={currentAnimal}
          onDragStart={() => sound.playPop()}
          onDragFood={handleDragFood}
          onDragEndFood={handleDragEndFood}
          onTapFeedFood={handleTapFeedFood}
        />
      </main>

      {/* Sticker Album Modal */}
      <StickerBookModal
        isOpen={isStickerModalOpen}
        onClose={() => setIsStickerModalOpen(false)}
        timesFed={timesFed}
      />

      {/* Fullness Celebration Modal Banner */}
      <AnimatePresence>
        {showCelebration && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm select-none">
            <motion.div
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.3, opacity: 0 }}
              className="bg-yellow-300 rounded-3xl p-8 shadow-[0_12px_0_#EAB308] border-8 border-white text-center max-w-md"
            >
              <span className="text-7xl block animate-bounce mb-3">🎉 🥳 🌟</span>
              <h2 className="text-3xl font-black text-slate-900 mb-2 uppercase tracking-tight">
                {currentAnimal.name} is Full & Happy!
              </h2>
              <p className="text-slate-800 font-black text-sm mb-6 uppercase tracking-wider">
                You earned a special sticker in your Sticker Album!
              </p>
              <button
                onClick={() => {
                  sound.playPop();
                  setShowCelebration(false);
                  setFullnessLevel(0);
                }}
                className="bg-pink-500 hover:bg-pink-400 text-white font-black px-8 py-3.5 rounded-2xl text-xl shadow-[0_4px_0_#BE123C] border-2 border-pink-300 uppercase tracking-wider active:scale-95 transition-transform"
              >
                Feed Another Animal! 🐾
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </BackgroundScene>
  );
}
