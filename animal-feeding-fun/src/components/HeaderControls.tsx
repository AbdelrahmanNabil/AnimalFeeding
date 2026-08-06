import React, { useState } from 'react';
import { motion } from 'motion/react';
import { sound } from '../utils/sound';

interface HeaderControlsProps {
  onOpenStickers: () => void;
  onResetFeeds: () => void;
  stickerCount: number;
}

export const HeaderControls: React.FC<HeaderControlsProps> = ({
  onOpenStickers,
  onResetFeeds,
  stickerCount,
}) => {
  const [isMuted, setIsMuted] = useState<boolean>(sound.getMuted());
  const [isBgm, setIsBgm] = useState<boolean>(sound.getBgmPlaying());
  const [isSpeech, setIsSpeech] = useState<boolean>(sound.getSpeechEnabled());

  const handleToggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const handleToggleBgm = () => {
    const bgm = sound.toggleBgm();
    setIsBgm(bgm);
  };

  const handleToggleSpeech = () => {
    const speech = sound.toggleSpeech();
    setIsSpeech(speech);
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <header className="w-full max-w-6xl mx-auto px-4 py-2 flex items-center justify-between select-none z-30">
      {/* Title / Logo Badge */}
      <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-3xl shadow-[0_5px_0_#CBD5E1] border-4 border-white">
        <div className="bg-yellow-400 p-1.5 rounded-2xl border-2 border-yellow-500 shadow-[0_2px_0_#EAB308]">
          <span className="text-2xl sm:text-3xl animate-bounce inline-block">🦁</span>
        </div>
        <span className="text-2xl sm:text-3xl">🍎</span>
      </div>

      {/* Action Control Buttons */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Sticker Album Badge Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpenStickers}
          className="relative flex items-center justify-center bg-orange-400 hover:bg-orange-300 text-white font-black p-2.5 sm:p-3 rounded-2xl shadow-[0_4px_0_#C2410C] border-2 border-orange-300 text-xl"
        >
          <span>🏆</span>
          <span className="absolute -top-2 -right-2 bg-yellow-300 text-orange-950 text-xs w-6 h-6 rounded-full font-black flex items-center justify-center border-2 border-white shadow-sm">
            {stickerCount}
          </span>
        </motion.button>

        {/* Music Toggle */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleToggleBgm}
          title="Background Music"
          className={`p-2.5 sm:p-3 rounded-2xl font-black text-lg transition-all ${
            isBgm
              ? 'bg-pink-400 text-white border-2 border-pink-300 shadow-[0_4px_0_#DB2777]'
              : 'bg-white text-slate-700 border-2 border-slate-200 shadow-[0_4px_0_#CBD5E1] hover:bg-slate-50'
          }`}
        >
          🎵
        </motion.button>

        {/* Voice Speech Toggle */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleToggleSpeech}
          title="Voice Guidance"
          className={`p-2.5 sm:p-3 rounded-2xl font-black text-lg transition-all ${
            isSpeech
              ? 'bg-purple-400 text-white border-2 border-purple-300 shadow-[0_4px_0_#7E22CE]'
              : 'bg-white text-slate-700 border-2 border-slate-200 shadow-[0_4px_0_#CBD5E1] hover:bg-slate-50'
          }`}
        >
          🗣️
        </motion.button>

        {/* Sound FX Mute Toggle */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleToggleSound}
          title="Sound Effects"
          className={`p-2.5 sm:p-3 rounded-2xl font-black text-lg transition-all ${
            !isMuted
              ? 'bg-emerald-400 text-white border-2 border-emerald-300 shadow-[0_4px_0_#047857]'
              : 'bg-rose-500 text-white border-2 border-rose-300 shadow-[0_4px_0_#BE123C]'
          }`}
        >
          {!isMuted ? '🔊' : '🔇'}
        </motion.button>

        {/* Clean Plate / Reset */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={onResetFeeds}
          title="Reset Progress"
          className="p-2.5 sm:p-3 bg-white text-slate-700 font-bold rounded-2xl shadow-[0_4px_0_#CBD5E1] border-2 border-slate-200 text-lg hover:bg-slate-50"
        >
          🔄
        </motion.button>

        {/* Fullscreen Button */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleToggleFullscreen}
          title="Toggle Fullscreen"
          className="hidden md:flex p-2.5 sm:p-3 bg-white text-slate-700 font-bold rounded-2xl shadow-[0_4px_0_#CBD5E1] border-2 border-slate-200 text-lg hover:bg-slate-50"
        >
          ⛶
        </motion.button>
      </div>
    </header>
  );
};
