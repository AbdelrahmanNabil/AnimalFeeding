export type AnimalId = 
  | 'dog' 
  | 'cat' 
  | 'cow' 
  | 'sheep' 
  | 'goat' 
  | 'horse'
  | 'lion'
  | 'panda'
  | 'bunny'
  | 'frog';

export type FoodId = 
  | 'bone' 
  | 'fish' 
  | 'carrot' 
  | 'apple' 
  | 'grass' 
  | 'milk' 
  | 'meat' 
  | 'watermelon' 
  | 'bamboo' 
  | 'fly';

export type Expression = 'idle' | 'hungry' | 'mouth_open' | 'chewing' | 'happy' | 'tickled' | 'surprised';

export interface Food {
  id: FoodId;
  name: string;
  emoji: string;
  color: string;
  category: 'veggie' | 'fruit' | 'meat' | 'snack' | 'special';
}

export interface Animal {
  id: AnimalId;
  name: string;
  favoriteFoods: FoodId[];
  dislikedFoods?: FoodId[];
  soundType: 'dog' | 'cat' | 'cow' | 'sheep' | 'goat' | 'horse' | 'lion' | 'panda' | 'bunny' | 'frog';
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  environment: 'farm' | 'meadow' | 'bamboo' | 'savannah' | 'pond';
  greeting: string;
  happySoundName: string;
}

export interface Sticker {
  id: string;
  animalId: AnimalId;
  title: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface GameStats {
  timesFed: Record<AnimalId, number>;
  totalFeeds: number;
  unlockedStickers: string[];
}
