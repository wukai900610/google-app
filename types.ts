
export enum AppView {
  SPLASH = 'SPLASH',
  DASHBOARD = 'DASHBOARD',
  CAMERA = 'CAMERA',
  RESULT = 'RESULT',
  PROFILE = 'PROFILE'
}

export interface MacroData {
  protein: number;
  carbs: number;
  fats: number;
}

export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  time: string;
  image: string;
  macros: MacroData;
  weight: number;
  confidence: number;
}

export interface UserProfile {
  name: string;
  dailyGoal: number;
  streak: number;
  totalScans: number;
  avgCalories: number;
  avatar: string;
}
