import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Animal, Expression, Food } from '../types';
import { sound } from '../utils/sound';

interface AnimalCharacterProps {
  animal: Animal;
  expression: Expression;
  isNearMouth: boolean;
  onTap: () => void;
  fullnessLevel: number; // 0 to 3
  chewingFood?: Food | null;
}

export const AnimalCharacter: React.FC<AnimalCharacterProps> = ({
  animal,
  expression,
  isNearMouth,
  onTap,
  fullnessLevel,
  chewingFood,
}) => {
  // Effective expression
  const currentExpression = isNearMouth && expression !== 'chewing' ? 'mouth_open' : expression;

  const handleAnimalClick = () => {
    sound.playAnimalSound(animal.soundType);
    onTap();
  };

  // Render character full-body SVG illustration
  const renderSvgBody = () => {
    switch (animal.id) {
      case 'dog':
        return (
          <g>
            {/* Wagging Tail */}
            <motion.path
              d="M 210 190 Q 250 170, 260 210"
              fill="none"
              stroke="#b45309"
              strokeWidth="12"
              strokeLinecap="round"
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ repeat: Infinity, duration: 0.5 }}
            />
            {/* Paws */}
            <ellipse cx="85" cy="255" rx="22" ry="15" fill="#fef3c7" stroke="#b45309" strokeWidth="4" />
            <ellipse cx="215" cy="255" rx="22" ry="15" fill="#fef3c7" stroke="#b45309" strokeWidth="4" />

            {/* Dog Body */}
            <ellipse cx="150" cy="200" rx="55" ry="48" fill="#d97706" stroke="#b45309" strokeWidth="4" />
            <ellipse cx="150" cy="200" rx="36" ry="32" fill="#fef3c7" />

            {/* Collar with Bell */}
            <rect x="110" y="148" width="80" height="12" rx="6" fill="#ef4444" />
            <circle cx="150" cy="162" r="8" fill="#eab308" stroke="#ca8a04" strokeWidth="2" />

            {/* Dog Head */}
            <circle cx="150" cy="105" r="50" fill="#d97706" stroke="#b45309" strokeWidth="4" />
            {/* Muzzle Patch */}
            <ellipse cx="150" cy="118" rx="24" ry="18" fill="#fef3c7" />

            {/* Floppy Ears */}
            <ellipse cx="90" cy="105" rx="16" ry="32" fill="#b45309" transform="rotate(20 90 105)" />
            <ellipse cx="210" cy="105" rx="16" ry="32" fill="#b45309" transform="rotate(-20 210 105)" />

            {/* Nose */}
            <ellipse cx="150" cy="110" rx="10" ry="7" fill="#1e293b" />
            <circle cx="147" cy="108" r="2" fill="#ffffff" />
          </g>
        );

      case 'cat':
        return (
          <g>
            {/* Curved Cat Tail */}
            <path
              d="M 200 210 C 250 190, 270 230, 250 250"
              fill="none"
              stroke="#ea580c"
              strokeWidth="9"
              strokeLinecap="round"
            />
            {/* Paws */}
            <ellipse cx="90" cy="255" rx="20" ry="14" fill="#ffedd5" stroke="#ea580c" strokeWidth="3" />
            <ellipse cx="210" cy="255" rx="20" ry="14" fill="#ffedd5" stroke="#ea580c" strokeWidth="3" />

            {/* Cat Body */}
            <ellipse cx="150" cy="200" rx="52" ry="46" fill="#f97316" stroke="#ea580c" strokeWidth="4" />
            <ellipse cx="150" cy="200" rx="34" ry="30" fill="#ffedd5" />

            {/* Cat Head */}
            <circle cx="150" cy="105" r="48" fill="#f97316" stroke="#ea580c" strokeWidth="4" />

            {/* Pointy Ears */}
            <polygon points="98,75 80,35 122,60" fill="#f97316" stroke="#ea580c" strokeWidth="3" />
            <polygon points="102,70 88,42 118,60" fill="#f472b6" />
            <polygon points="202,75 220,35 178,60" fill="#f97316" stroke="#ea580c" strokeWidth="3" />
            <polygon points="198,70 212,42 182,60" fill="#f472b6" />

            {/* Whiskers */}
            <line x1="85" y1="112" x2="120" y2="114" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="88" y1="122" x2="120" y2="118" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="215" y1="112" x2="180" y2="114" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="212" y1="122" x2="180" y2="118" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />

            {/* Nose */}
            <polygon points="144,106 156,106 150,112" fill="#f43f5e" />
          </g>
        );

      case 'cow':
        return (
          <g>
            {/* Tail */}
            <path
              d="M 205 190 Q 240 200, 235 240"
              fill="none"
              stroke="#0284c7"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <circle cx="235" cy="240" r="8" fill="#1e293b" />

            {/* Hooves */}
            <rect x="70" y="242" width="28" height="18" rx="6" fill="#1e293b" />
            <rect x="202" y="242" width="28" height="18" rx="6" fill="#1e293b" />

            {/* Cow Body (White with black spots) */}
            <ellipse cx="150" cy="200" rx="58" ry="48" fill="#ffffff" stroke="#0284c7" strokeWidth="4" />
            {/* Cow Spots */}
            <path d="M 110 180 Q 130 160, 120 210 Q 95 220, 110 180 Z" fill="#1e293b" />
            <path d="M 170 190 Q 190 170, 195 220 Q 165 210, 170 190 Z" fill="#1e293b" />

            {/* Pink Udder/Belly Patch */}
            <ellipse cx="150" cy="215" rx="22" ry="14" fill="#fbcfe8" />

            {/* Cow Head */}
            <circle cx="150" cy="105" r="48" fill="#ffffff" stroke="#0284c7" strokeWidth="4" />

            {/* Small Cute Horns */}
            <path d="M 115 62 Q 105 45, 120 48 Z" fill="#f59e0b" stroke="#d97706" strokeWidth="2" />
            <path d="M 185 62 Q 195 45, 180 48 Z" fill="#f59e0b" stroke="#d97706" strokeWidth="2" />

            {/* Floppy Cow Ears */}
            <ellipse cx="90" cy="95" rx="20" ry="10" fill="#1e293b" transform="rotate(-15 90 95)" />
            <ellipse cx="210" cy="95" rx="20" ry="10" fill="#ffffff" stroke="#0284c7" strokeWidth="2" transform="rotate(15 210 95)" />

            {/* Big Pink Snout */}
            <ellipse cx="150" cy="120" rx="28" ry="18" fill="#fbcfe8" stroke="#f472b6" strokeWidth="2" />
            <circle cx="140" cy="118" r="4" fill="#831843" />
            <circle cx="160" cy="118" r="4" fill="#831843" />
          </g>
        );

      case 'sheep':
        return (
          <g>
            {/* Black Hooves */}
            <rect x="75" y="242" width="22" height="18" rx="6" fill="#334155" />
            <rect x="203" y="242" width="22" height="18" rx="6" fill="#334155" />

            {/* Fluffy Wool Body (Cloud shape) */}
            <ellipse cx="150" cy="200" rx="60" ry="50" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="4" />
            <circle cx="100" cy="180" r="25" fill="#f8fafc" />
            <circle cx="200" cy="180" r="25" fill="#f8fafc" />
            <circle cx="110" cy="225" r="22" fill="#f8fafc" />
            <circle cx="190" cy="225" r="22" fill="#f8fafc" />
            <circle cx="150" cy="235" r="22" fill="#f8fafc" />

            {/* Black Face & Head */}
            <circle cx="150" cy="110" r="42" fill="#334155" />

            {/* Wool Cap on Head */}
            <ellipse cx="150" cy="72" rx="26" ry="16" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
            <circle cx="138" cy="70" r="12" fill="#ffffff" />
            <circle cx="162" cy="70" r="12" fill="#ffffff" />

            {/* Floppy Sheep Ears */}
            <ellipse cx="98" cy="108" rx="22" ry="10" fill="#334155" transform="rotate(-20 98 108)" />
            <ellipse cx="202" cy="108" rx="22" ry="10" fill="#334155" transform="rotate(20 202 108)" />

            {/* Cheeks */}
            <ellipse cx="122" cy="120" rx="8" ry="5" fill="#f472b6" opacity="0.6" />
            <ellipse cx="178" cy="120" rx="8" ry="5" fill="#f472b6" opacity="0.6" />

            {/* Cute Y-Nose */}
            <path d="M 146 112 L 154 112 L 150 118 Z" fill="#f472b6" />
          </g>
        );

      case 'goat':
        return (
          <g>
            {/* Tail */}
            <circle cx="215" cy="200" r="10" fill="#a16207" />

            {/* Hooves */}
            <rect x="75" y="242" width="22" height="18" rx="6" fill="#78350f" />
            <rect x="203" y="242" width="22" height="18" rx="6" fill="#78350f" />

            {/* Goat Body */}
            <ellipse cx="150" cy="200" rx="55" ry="46" fill="#fef08a" stroke="#ca8a04" strokeWidth="4" />
            <ellipse cx="150" cy="200" rx="36" ry="30" fill="#ffffff" />

            {/* Goat Head */}
            <ellipse cx="150" cy="105" rx="44" ry="48" fill="#fef08a" stroke="#ca8a04" strokeWidth="4" />

            {/* Goat Horns */}
            <path d="M 125 65 Q 100 25, 115 20 C 122 25, 130 50, 132 62 Z" fill="#a16207" />
            <path d="M 175 65 Q 200 25, 185 20 C 178 25, 170 50, 168 62 Z" fill="#a16207" />

            {/* Floppy Goat Ears */}
            <ellipse cx="92" cy="100" rx="20" ry="11" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" transform="rotate(-30 92 100)" />
            <ellipse cx="208" cy="100" rx="20" ry="11" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" transform="rotate(30 208 100)" />

            {/* Cute Little Beard */}
            <polygon points="144,142 156,142 150,165" fill="#ffffff" stroke="#eab308" strokeWidth="2" />

            {/* Nose */}
            <ellipse cx="150" cy="115" rx="9" ry="6" fill="#78350f" />
          </g>
        );

      case 'horse':
        return (
          <g>
            {/* Swishing Tail */}
            <path
              d="M 205 190 Q 255 200, 245 250"
              fill="none"
              stroke="#451a03"
              strokeWidth="12"
              strokeLinecap="round"
            />

            {/* Hooves */}
            <rect x="70" y="242" width="28" height="18" rx="6" fill="#1e293b" />
            <rect x="202" y="242" width="28" height="18" rx="6" fill="#1e293b" />

            {/* Horse Body */}
            <ellipse cx="150" cy="200" rx="58" ry="48" fill="#92400e" stroke="#78350f" strokeWidth="4" />
            <ellipse cx="150" cy="200" rx="36" ry="30" fill="#fef3c7" />

            {/* Mane */}
            <path d="M 150 40 Q 120 70, 130 110" stroke="#451a03" strokeWidth="18" strokeLinecap="round" fill="none" />

            {/* Horse Head */}
            <ellipse cx="150" cy="105" rx="42" ry="52" fill="#92400e" stroke="#78350f" strokeWidth="4" />

            {/* Horse Ears */}
            <polygon points="122,65 110,25 138,52" fill="#92400e" stroke="#78350f" strokeWidth="3" />
            <polygon points="178,65 190,25 162,52" fill="#92400e" stroke="#78350f" strokeWidth="3" />

            {/* White Star/Blaze on Forehead */}
            <polygon points="150,70 156,82 150,90 144,82" fill="#ffffff" />

            {/* Snout */}
            <ellipse cx="150" cy="128" rx="22" ry="16" fill="#fef3c7" stroke="#78350f" strokeWidth="2" />
            <circle cx="140" cy="126" r="4" fill="#451a03" />
            <circle cx="160" cy="126" r="4" fill="#451a03" />
          </g>
        );

      case 'lion':
        return (
          <g>
            {/* Tail */}
            <path
              d="M 200 200 C 260 180, 270 230, 250 240"
              fill="none"
              stroke="#d97706"
              strokeWidth="10"
              strokeLinecap="round"
            />
            {/* Fluffy Tail Tuft */}
            <circle cx="250" cy="240" r="14" fill="#b45309" />

            {/* Back Feet / Paws */}
            <ellipse cx="85" cy="255" rx="24" ry="16" fill="#fef3c7" stroke="#d97706" strokeWidth="4" />
            <ellipse cx="215" cy="255" rx="24" ry="16" fill="#fef3c7" stroke="#d97706" strokeWidth="4" />
            {/* Toe pads */}
            <circle cx="75" cy="255" r="4" fill="#d97706" />
            <circle cx="85" cy="258" r="4" fill="#d97706" />
            <circle cx="95" cy="255" r="4" fill="#d97706" />
            <circle cx="205" cy="255" r="4" fill="#d97706" />
            <circle cx="215" cy="258" r="4" fill="#d97706" />
            <circle cx="225" cy="255" r="4" fill="#d97706" />

            {/* Full Body Torso */}
            <ellipse cx="150" cy="205" rx="55" ry="48" fill="#fef3c7" stroke="#d97706" strokeWidth="4" />
            {/* Lighter Belly Patch */}
            <ellipse cx="150" cy="205" rx="38" ry="32" fill="#fffbeb" />

            {/* Front Arms / Paws */}
            <ellipse cx="108" cy="205" rx="14" ry="26" fill="#fef3c7" stroke="#d97706" strokeWidth="3" />
            <ellipse cx="192" cy="205" rx="14" ry="26" fill="#fef3c7" stroke="#d97706" strokeWidth="3" />

            {/* Big Lion Mane */}
            <circle cx="150" cy="110" r="70" fill="#b45309" />
            <path
              d="M 150 35 C 180 40, 210 30, 225 60 C 245 75, 255 105, 245 135 C 255 165, 235 195, 205 205 C 175 215, 125 215, 95 205 C 65 195, 45 165, 55 135 C 45 105, 55 75, 75 60 C 90 30, 120 40, 150 35 Z"
              fill="#d97706"
            />

            {/* Lion Head */}
            <circle cx="150" cy="110" r="50" fill="#fef3c7" stroke="#f59e0b" strokeWidth="4" />

            {/* Lion Ears */}
            <circle cx="105" cy="65" r="16" fill="#d97706" />
            <circle cx="105" cy="65" r="9" fill="#fef3c7" />
            <circle cx="195" cy="65" r="16" fill="#d97706" />
            <circle cx="195" cy="65" r="9" fill="#fef3c7" />

            {/* Cheeks */}
            <ellipse cx="115" cy="120" rx="12" ry="8" fill="#fca5a5" opacity="0.6" />
            <ellipse cx="185" cy="120" rx="12" ry="8" fill="#fca5a5" opacity="0.6" />

            {/* Nose */}
            <polygon points="142,102 158,102 150,112" fill="#78350f" />
          </g>
        );

      case 'panda':
        return (
          <g>
            {/* Stubby Tail */}
            <circle cx="212" cy="225" r="12" fill="#1e293b" />

            {/* Black Feet Sitting */}
            <ellipse cx="85" cy="255" rx="24" ry="16" fill="#1e293b" />
            <ellipse cx="215" cy="255" rx="24" ry="16" fill="#1e293b" />
            {/* White Paw Pads */}
            <circle cx="85" cy="255" r="7" fill="#ffffff" opacity="0.8" />
            <circle cx="215" cy="255" r="7" fill="#ffffff" opacity="0.8" />

            {/* White Body */}
            <ellipse cx="150" cy="200" rx="58" ry="50" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="4" />

            {/* Black Arms resting on tummy */}
            <path
              d="M 92 170 C 80 200, 110 225, 130 215 C 135 200, 110 170, 92 170 Z"
              fill="#1e293b"
            />
            <path
              d="M 208 170 C 220 200, 190 225, 170 215 C 165 200, 190 170, 208 170 Z"
              fill="#1e293b"
            />

            {/* Panda Head */}
            <circle cx="150" cy="105" r="54" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="4" />

            {/* Panda Ears */}
            <circle cx="95" cy="55" r="18" fill="#1e293b" />
            <circle cx="95" cy="55" r="10" fill="#475569" />
            <circle cx="205" cy="55" r="18" fill="#1e293b" />
            <circle cx="205" cy="55" r="10" fill="#475569" />

            {/* Eye Patches */}
            <ellipse cx="120" cy="98" rx="16" ry="20" fill="#1e293b" transform="rotate(-15 120 98)" />
            <ellipse cx="180" cy="98" rx="16" ry="20" fill="#1e293b" transform="rotate(15 180 98)" />

            {/* Cheeks */}
            <ellipse cx="102" cy="118" rx="12" ry="8" fill="#f472b6" opacity="0.6" />
            <ellipse cx="198" cy="118" rx="12" ry="8" fill="#f472b6" opacity="0.6" />

            {/* Nose */}
            <ellipse cx="150" cy="110" rx="10" ry="7" fill="#1e293b" />
            <ellipse cx="148" cy="108" rx="3" ry="2" fill="#ffffff" />
          </g>
        );

      case 'monkey':
        return (
          <g>
            {/* Curly Tail */}
            <path
              d="M 200 200 C 260 170, 280 240, 240 250 C 220 255, 230 225, 250 220"
              fill="none"
              stroke="#b45309"
              strokeWidth="8"
              strokeLinecap="round"
            />

            {/* Feet Sitting */}
            <ellipse cx="88" cy="255" rx="22" ry="14" fill="#b45309" />
            <ellipse cx="212" cy="255" rx="22" ry="14" fill="#b45309" />
            <circle cx="88" cy="255" r="6" fill="#fef3c7" />
            <circle cx="212" cy="255" r="6" fill="#fef3c7" />

            {/* Torso */}
            <ellipse cx="150" cy="200" rx="52" ry="46" fill="#b45309" />
            {/* Belly Patch */}
            <ellipse cx="150" cy="200" rx="34" ry="30" fill="#fef3c7" />

            {/* Arms */}
            <path
              d="M 98 175 C 80 200, 105 220, 120 210"
              fill="none"
              stroke="#b45309"
              strokeWidth="12"
              strokeLinecap="round"
            />
            <path
              d="M 202 175 C 220 200, 195 220, 180 210"
              fill="none"
              stroke="#b45309"
              strokeWidth="12"
              strokeLinecap="round"
            />

            {/* Head */}
            <circle cx="150" cy="105" r="50" fill="#b45309" />

            {/* Ears */}
            <circle cx="85" cy="105" r="18" fill="#b45309" />
            <circle cx="85" cy="105" r="11" fill="#fef3c7" />
            <circle cx="215" cy="105" r="18" fill="#b45309" />
            <circle cx="215" cy="105" r="11" fill="#fef3c7" />

            {/* Face Plate */}
            <path
              d="M 120 90 C 120 70, 150 70, 150 90 C 150 70, 180 70, 180 90 C 190 120, 170 138, 150 138 C 130 138, 110 120, 120 90 Z"
              fill="#fef3c7"
            />

            {/* Nose */}
            <ellipse cx="150" cy="105" rx="9" ry="6" fill="#78350f" />
          </g>
        );

      case 'bunny':
        return (
          <g>
            {/* Cotton Tail */}
            <circle cx="215" cy="215" r="16" fill="#ffffff" stroke="#f472b6" strokeWidth="3" />

            {/* Big Hind Feet */}
            <ellipse cx="80" cy="255" rx="26" ry="15" fill="#fce7f3" stroke="#f472b6" strokeWidth="3" />
            <ellipse cx="220" cy="255" rx="26" ry="15" fill="#fce7f3" stroke="#f472b6" strokeWidth="3" />
            <circle cx="70" cy="255" r="4" fill="#f472b6" />
            <circle cx="80" cy="257" r="4" fill="#f472b6" />
            <circle cx="90" cy="255" r="4" fill="#f472b6" />
            <circle cx="210" cy="255" r="4" fill="#f472b6" />
            <circle cx="220" cy="257" r="4" fill="#f472b6" />
            <circle cx="230" cy="255" r="4" fill="#f472b6" />

            {/* Chubby Body */}
            <ellipse cx="150" cy="200" rx="54" ry="48" fill="#fce7f3" stroke="#f472b6" strokeWidth="4" />
            {/* White Chest Patch */}
            <ellipse cx="150" cy="200" rx="36" ry="32" fill="#ffffff" />

            {/* Front Bunny Paws */}
            <ellipse cx="122" cy="195" rx="10" ry="18" fill="#fce7f3" stroke="#f472b6" strokeWidth="3" />
            <ellipse cx="178" cy="195" rx="10" ry="18" fill="#fce7f3" stroke="#f472b6" strokeWidth="3" />

            {/* Long Ears */}
            <motion.g
              animate={currentExpression === 'happy' ? { rotate: [-5, 5, -5] } : { rotate: 0 }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              <ellipse cx="120" cy="35" rx="14" ry="38" fill="#f472b6" stroke="#e11d48" strokeWidth="3" />
              <ellipse cx="120" cy="35" rx="8" ry="26" fill="#fce7f3" />

              <ellipse cx="180" cy="35" rx="14" ry="38" fill="#f472b6" stroke="#e11d48" strokeWidth="3" />
              <ellipse cx="180" cy="35" rx="8" ry="26" fill="#fce7f3" />
            </motion.g>

            {/* Bunny Head */}
            <circle cx="150" cy="105" r="48" fill="#fce7f3" stroke="#f472b6" strokeWidth="4" />

            {/* Cheeks */}
            <circle cx="112" cy="115" r="12" fill="#fda4af" opacity="0.7" />
            <circle cx="188" cy="115" r="12" fill="#fda4af" opacity="0.7" />

            {/* Nose */}
            <polygon points="144,102 156,102 150,110" fill="#e11d48" />
          </g>
        );

      case 'frog':
      default:
        return (
          <g>
            {/* Bent Frog Back Legs */}
            <path
              d="M 95 210 C 50 200, 45 250, 70 260 C 85 265, 95 250, 105 230"
              fill="#22c55e"
              stroke="#15803d"
              strokeWidth="4"
            />
            <path
              d="M 205 210 C 250 200, 255 250, 230 260 C 215 265, 205 250, 195 230"
              fill="#22c55e"
              stroke="#15803d"
              strokeWidth="4"
            />
            {/* Webbed Feet */}
            <ellipse cx="65" cy="260" rx="18" ry="8" fill="#16a34a" />
            <ellipse cx="235" cy="260" rx="18" ry="8" fill="#16a34a" />

            {/* Tummy */}
            <ellipse cx="150" cy="205" rx="55" ry="45" fill="#4ade80" stroke="#16a34a" strokeWidth="4" />
            {/* Yellow Tummy Patch */}
            <ellipse cx="150" cy="205" rx="36" ry="28" fill="#fef08a" />

            {/* Front Arms */}
            <ellipse cx="112" cy="210" rx="9" ry="20" fill="#4ade80" stroke="#16a34a" strokeWidth="3" />
            <ellipse cx="188" cy="210" rx="9" ry="20" fill="#4ade80" stroke="#16a34a" strokeWidth="3" />

            {/* Frog Head */}
            <ellipse cx="150" cy="110" rx="68" ry="46" fill="#4ade80" stroke="#16a34a" strokeWidth="4" />

            {/* Eye Stalks */}
            <circle cx="100" cy="62" r="22" fill="#22c55e" stroke="#15803d" strokeWidth="3" />
            <circle cx="200" cy="62" r="22" fill="#22c55e" stroke="#15803d" strokeWidth="3" />

            {/* Cheeks */}
            <ellipse cx="102" cy="118" rx="12" ry="8" fill="#86efac" />
            <ellipse cx="198" cy="118" rx="12" ry="8" fill="#86efac" />

            {/* Nostrils */}
            <circle cx="144" cy="100" r="2.5" fill="#14532d" />
            <circle cx="156" cy="100" r="2.5" fill="#14532d" />
          </g>
        );
    }
  };

  // Render eyes based on expression
  const renderEyes = () => {
    // Frog eyes are positioned on the eye stalks at (100, 62) and (200, 62)
    if (animal.id === 'frog') {
      if (currentExpression === 'happy' || currentExpression === 'chewing') {
        return (
          <g>
            <path d="M 88 62 Q 100 50, 112 62" stroke="#14532d" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M 188 62 Q 200 50, 212 62" stroke="#14532d" strokeWidth="4" fill="none" strokeLinecap="round" />
          </g>
        );
      }
      return (
        <g>
          <circle cx="100" cy="62" r="14" fill="#ffffff" />
          <circle cx="102" cy="62" r="7" fill="#022c22" />
          <circle cx="104" cy="58" r="2.5" fill="#ffffff" />

          <circle cx="200" cy="62" r="14" fill="#ffffff" />
          <circle cx="198" cy="62" r="7" fill="#022c22" />
          <circle cx="200" cy="58" r="2.5" fill="#ffffff" />
        </g>
      );
    }

    if (currentExpression === 'chewing' || currentExpression === 'happy') {
      return (
        <g>
          {/* Closed Happy Eyes ^ ^ */}
          <path d="M 108 95 Q 120 80, 132 95" stroke="#1e293b" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M 168 95 Q 180 80, 192 95" stroke="#1e293b" strokeWidth="4" fill="none" strokeLinecap="round" />
        </g>
      );
    }

    if (currentExpression === 'surprised') {
      return (
        <g>
          {/* Big Surprised Eyes */}
          <circle cx="120" cy="92" r="13" fill="#ffffff" stroke="#1e293b" strokeWidth="3" />
          <circle cx="120" cy="92" r="5" fill="#1e293b" />
          <circle cx="180" cy="92" r="13" fill="#ffffff" stroke="#1e293b" strokeWidth="3" />
          <circle cx="180" cy="92" r="5" fill="#1e293b" />
        </g>
      );
    }

    if (currentExpression === 'mouth_open') {
      return (
        <g>
          {/* Sparkling Excited Eyes */}
          <circle cx="120" cy="92" r="11" fill="#1e293b" />
          <circle cx="116" cy="88" r="4" fill="#ffffff" />
          <circle cx="122" cy="94" r="1.5" fill="#ffffff" />

          <circle cx="180" cy="92" r="11" fill="#1e293b" />
          <circle cx="176" cy="88" r="4" fill="#ffffff" />
          <circle cx="182" cy="94" r="1.5" fill="#ffffff" />
        </g>
      );
    }

    // Default Idle Eyes
    return (
      <g>
        <circle cx="120" cy="94" r="9" fill="#1e293b" />
        <circle cx="117" cy="91" r="3" fill="#ffffff" />

        <circle cx="180" cy="94" r="9" fill="#1e293b" />
        <circle cx="177" cy="91" r="3" fill="#ffffff" />
      </g>
    );
  };

  // Render Mouth based on expression
  const renderMouth = () => {
    const mouthY = 125;

    if (currentExpression === 'mouth_open') {
      return (
        <g>
          {/* Big Open O-mouth drop target */}
          <ellipse cx="150" cy={mouthY + 10} rx="28" ry="22" fill="#991b1b" stroke="#f87171" strokeWidth="4" />
          {/* Cute Tongue */}
          <path d={`M 132 ${mouthY + 18} Q 150 ${mouthY + 32}, 168 ${mouthY + 18} Z`} fill="#f43f5e" />
        </g>
      );
    }

    if (currentExpression === 'chewing') {
      const foodEmoji = chewingFood ? chewingFood.emoji : '🍎';
      return (
        <g>
          {/* Animated Chewing Mouth opening and closing */}
          <motion.ellipse
            cx="150"
            cy={mouthY + 4}
            animate={{ ry: [6, 18, 6], rx: [16, 24, 16] }}
            transition={{ repeat: Infinity, duration: 0.22, ease: 'easeInOut' }}
            fill="#be123c"
            stroke="#1e293b"
            strokeWidth="3"
          />
          {/* Tongue inside chewing mouth */}
          <motion.path
            d={`M 138 ${mouthY + 6} Q 150 ${mouthY + 16}, 162 ${mouthY + 6} Z`}
            animate={{ scale: [0.8, 1.1, 0.8] }}
            transition={{ repeat: Infinity, duration: 0.22 }}
            fill="#f43f5e"
          />

          {/* Food item sitting right in the mouth being chomped & eaten! */}
          <motion.g
            animate={{
              scale: [1.3, 1.1, 0.8, 0.5, 0.1],
              rotate: [0, -12, 12, -8, 0],
              y: [0, 3, -2, 4, 8],
            }}
            transition={{ duration: 1.15, ease: 'easeInOut' }}
            style={{ transformOrigin: `150px ${mouthY}px` }}
          >
            <text
              x="150"
              y={mouthY + 2}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="34"
              className="select-none pointer-events-none"
            >
              {foodEmoji}
            </text>
          </motion.g>

          {/* Animated Chewing Food Crumbs flying around */}
          <motion.circle
            cx="125"
            cy={mouthY - 5}
            r="4"
            fill="#f59e0b"
            animate={{ y: [-5, -15, -5], x: [-5, -15, -5], opacity: [1, 0, 1], scale: [1, 1.5, 0.5] }}
            transition={{ repeat: Infinity, duration: 0.3 }}
          />
          <motion.circle
            cx="175"
            cy={mouthY - 5}
            r="4"
            fill="#22c55e"
            animate={{ y: [-5, -18, -5], x: [5, 15, 5], opacity: [1, 0, 1], scale: [1, 1.4, 0.5] }}
            transition={{ repeat: Infinity, duration: 0.35 }}
          />
          <motion.circle
            cx="150"
            cy={mouthY + 18}
            r="5"
            fill="#ef4444"
            animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1], scale: [1, 1.3, 0.6] }}
            transition={{ repeat: Infinity, duration: 0.28 }}
          />
        </g>
      );
    }

    if (currentExpression === 'surprised') {
      return (
        <circle cx="150" cy={mouthY} r="8" fill="#1e293b" />
      );
    }

    if (currentExpression === 'happy') {
      return (
        <g>
          {/* Big Happy Smile */}
          <path d={`M 130 ${mouthY - 4} Q 150 ${mouthY + 20}, 170 ${mouthY - 4}`} fill="#be123c" stroke="#1e293b" strokeWidth="3.5" />
          <path d={`M 138 ${mouthY + 4} Q 150 ${mouthY + 18}, 162 ${mouthY + 4} Z`} fill="#f43f5e" />
        </g>
      );
    }

    // Default smile
    return (
      <path
        d={`M 135 ${mouthY - 4} Q 150 ${mouthY + 12}, 165 ${mouthY - 4}`}
        stroke="#1e293b"
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round"
      />
    );
  };

  return (
    <div className="relative flex flex-col items-center justify-center select-none cursor-pointer bg-white rounded-[40px] md:rounded-[50px] border-8 border-sky-100 shadow-[0_8px_0_#CBD5E1] p-4 sm:p-6 my-2">
      {/* Fullness Indicator Stars */}
      <div className="absolute -top-7 flex items-center justify-center gap-1.5 z-20 bg-amber-400 px-6 py-2 rounded-full shadow-[0_4px_0_#D97706] border-4 border-white">
        {[1, 2, 3].map((star) => (
          <motion.span
            key={star}
            animate={{ scale: star <= fullnessLevel ? [1, 1.4, 1] : 1 }}
            className={`text-2xl sm:text-3xl transition-all ${
              star <= fullnessLevel ? 'text-white drop-shadow-md' : 'text-amber-200/60'
            }`}
          >
            ★
          </motion.span>
        ))}
      </div>

      {/* Floating Reaction Visual Icons */}
      <AnimatePresence>
        {currentExpression === 'chewing' && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.5 }}
            animate={{ opacity: 1, y: -20, scale: 1.1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute -top-12 z-30 bg-yellow-300 p-2 sm:p-2.5 rounded-full shadow-[0_4px_0_#EAB308] border-4 border-white text-2xl sm:text-3xl animate-bounce"
          >
            😋
          </motion.div>
        )}

        {currentExpression === 'happy' && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.5 }}
            animate={{ opacity: 1, y: -25, scale: 1.1 }}
            exit={{ opacity: 0 }}
            className="absolute -top-12 z-30 bg-pink-400 p-2 sm:p-2.5 rounded-full shadow-[0_4px_0_#DB2777] border-4 border-white text-2xl sm:text-3xl"
          >
            ❤️
          </motion.div>
        )}

        {currentExpression === 'surprised' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: -20 }}
            exit={{ opacity: 0 }}
            className="absolute -top-12 z-30 bg-purple-400 p-2 sm:p-2.5 rounded-full shadow-[0_4px_0_#7E22CE] border-4 border-white text-2xl sm:text-3xl"
          >
            😜
          </motion.div>
        )}

        {currentExpression === 'tickled' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: -20 }}
            exit={{ opacity: 0 }}
            className="absolute -top-12 z-30 bg-teal-400 p-2 sm:p-2.5 rounded-full shadow-[0_4px_0_#0D9488] border-4 border-white text-2xl sm:text-3xl"
          >
            💖
          </motion.div>
        )}

        {(currentExpression === 'idle' || currentExpression === 'mouth_open') && (
          <motion.button
            onClick={handleAnimalClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute -top-12 z-30 bg-sky-400 hover:bg-sky-300 p-2 sm:p-2.5 rounded-full shadow-[0_4px_0_#0284C7] border-4 border-white text-xl sm:text-2xl cursor-pointer active:scale-95 transition-transform"
          >
            🔊
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main Animal Graphic Wrapper */}
      <motion.div
        onClick={handleAnimalClick}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.95 }}
        animate={
          currentExpression === 'happy'
            ? { y: [0, -25, 0], scale: [1, 1.08, 1] }
            : currentExpression === 'tickled'
            ? { rotate: [-5, 5, -5, 5, 0], scale: [1, 1.05, 1] }
            : currentExpression === 'chewing'
            ? { y: [0, -6, 0] }
            : { y: [0, -4, 0] }
        }
        transition={{
          repeat: currentExpression === 'chewing' ? Infinity : 0,
          duration: currentExpression === 'chewing' ? 0.3 : 1.5,
          ease: 'easeInOut',
        }}
        className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-88 md:h-88 filter drop-shadow-xl"
      >
        <svg viewBox="0 0 300 300" className="w-full h-full">
          {renderSvgBody()}
          {renderEyes()}
          {renderMouth()}
        </svg>

        {/* Mouth Drop Target Glow Indicator when food is dragged */}
        {isNearMouth && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [1, 1.2, 1], opacity: 1 }}
            transition={{ repeat: Infinity, duration: 0.6 }}
            className="absolute top-[40%] left-[38%] w-[24%] h-[24%] rounded-full border-4 border-dashed border-sky-400 bg-sky-300/40 pointer-events-none z-10"
          />
        )}
      </motion.div>
    </div>
  );
};
