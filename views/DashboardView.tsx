
import React from 'react';
import { UserProfile, FoodItem } from '../types';

interface DashboardProps {
  user: UserProfile;
  meals: FoodItem[];
  onOpenScanner: () => void;
  onOpenProfile: () => void;
}

const DashboardView: React.FC<DashboardProps> = ({ user, meals, onOpenScanner, onOpenProfile }) => {
  const consumedCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
  const leftCalories = Math.max(0, user.dailyGoal - consumedCalories);
  const progressPercent = Math.min(100, (consumedCalories / user.dailyGoal) * 100);

  // SVG ring calculations
  const radius = 85;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  const totalProtein = meals.reduce((sum, meal) => sum + meal.macros.protein, 0);
  const totalCarbs = meals.reduce((sum, meal) => sum + meal.macros.carbs, 0);
  const totalFats = meals.reduce((sum, meal) => sum + meal.macros.fats, 0);

  return (
    <div className="flex-1 flex flex-col h-full bg-background-light dark:bg-background-dark">
      {/* Header */}
      <header className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
        <div className="flex items-center gap-3 cursor-pointer" onClick={onOpenProfile}>
          <div className="relative">
            <img src={user.avatar} className="size-10 rounded-full border-2 border-white dark:border-background-dark shadow-sm object-cover" />
            <div className="absolute bottom-0 right-0 size-3 bg-primary rounded-full border-2 border-white dark:border-background-dark"></div>
          </div>
          <div>
            <p className="text-xs font-medium text-sage dark:text-gray-400 uppercase tracking-wider">Good Morning</p>
            <h2 className="text-gray-900 dark:text-white text-lg font-bold leading-none">{user.name.split(' ')[0]}</h2>
          </div>
        </div>
        <button className="flex items-center justify-center size-10 rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <span className="material-symbols-outlined text-[24px]">notifications</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto no-scrollbar px-6 pb-32">
        {/* Calorie Ring */}
        <div className="relative w-full aspect-square max-w-[300px] mx-auto my-6 flex items-center justify-center">
          <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl transform scale-75"></div>
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
            <circle className="text-cream-accent dark:text-gray-800" cx="100" cy="100" fill="transparent" r={radius} stroke="currentColor" strokeWidth="18"></circle>
            <circle 
              className="text-primary drop-shadow-[0_0_8px_rgba(99,207,23,0.4)] transition-all duration-1000 ease-out" 
              cx="100" cy="100" fill="transparent" r={radius} 
              stroke="currentColor" 
              strokeWidth="18" 
              strokeDasharray={circumference} 
              strokeDashoffset={strokeDashoffset} 
              strokeLinecap="round"
            ></circle>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="material-symbols-outlined text-3xl text-primary mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
            <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white tracking-tighter">{consumedCalories.toLocaleString()}</h1>
            <p className="text-sage dark:text-gray-400 font-medium text-sm mt-1">of {user.dailyGoal.toLocaleString()} kcal</p>
            <div className="mt-4 px-4 py-1.5 bg-cream-yellow dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 rounded-full text-xs font-bold uppercase tracking-wide">
              {leftCalories.toLocaleString()} kcal left
            </div>
          </div>
        </div>

        {/* Macro Summary */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/50">
            <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Protein</p>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-lg font-bold text-gray-900 dark:text-white">{totalProtein}</span>
              <span className="text-[10px] text-gray-400">/140g</span>
            </div>
            <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.min(100, (totalProtein / 140) * 100)}%` }}></div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/50">
            <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Carbs</p>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-lg font-bold text-gray-900 dark:text-white">{totalCarbs}</span>
              <span className="text-[10px] text-gray-400">/200g</span>
            </div>
            <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: `${Math.min(100, (totalCarbs / 200) * 100)}%` }}></div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/50">
            <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Fats</p>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-lg font-bold text-gray-900 dark:text-white">{totalFats}</span>
              <span className="text-[10px] text-gray-400">/70g</span>
            </div>
            <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-orange-400 rounded-full" style={{ width: `${Math.min(100, (totalFats / 70) * 100)}%` }}></div>
            </div>
          </div>
        </div>

        {/* Recent Meals */}
        <div className="w-full flex items-center justify-between mb-4">
          <h3 className="text-gray-900 dark:text-white text-lg font-bold">Recent Meals</h3>
          <button className="text-primary text-sm font-bold">See all</button>
        </div>
        <div className="flex flex-col gap-3">
          {meals.map((meal) => (
            <div key={meal.id} className="flex items-center gap-4 p-3 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/50">
              <img src={meal.image} className="size-16 rounded-xl object-cover shrink-0 shadow-inner" />
              <div className="flex-1 min-w-0">
                <p className="text-gray-900 dark:text-white text-base font-bold truncate">{meal.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-sage dark:text-gray-400 bg-background-light dark:bg-gray-700 px-2 py-0.5 rounded-full uppercase">
                    <span className="material-symbols-outlined text-[14px]">schedule</span> {meal.time}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end shrink-0">
                <span className="text-primary font-bold text-lg">{meal.calories}</span>
                <span className="text-xs text-gray-400 font-medium">kcal</span>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Floating Shutter Action */}
      <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-30">
        <button 
          onClick={onOpenScanner}
          className="group relative flex items-center justify-center size-16 bg-primary text-white rounded-full shadow-[0_8px_20px_rgba(99,207,23,0.4)] hover:shadow-[0_12px_24px_rgba(99,207,23,0.6)] hover:scale-110 transition-all duration-300"
        >
          <span className="material-symbols-outlined text-[32px] font-bold">photo_camera</span>
        </button>
      </div>

      {/* Nav Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-20 bg-white/95 dark:bg-gray-900/95 backdrop-blur border-t border-gray-100 dark:border-gray-800 h-[88px] flex items-center justify-around px-6 pb-2">
        <button className="flex flex-col items-center gap-1 text-primary">
          <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
          <span className="text-[10px] font-bold">Home</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-400">
          <span className="material-symbols-outlined text-[28px]">description</span>
          <span className="text-[10px] font-medium">Log</span>
        </button>
        <div className="w-16"></div>
        <button className="flex flex-col items-center gap-1 text-gray-400">
          <span className="material-symbols-outlined text-[28px]">bar_chart</span>
          <span className="text-[10px] font-medium">Stats</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-400" onClick={onOpenProfile}>
          <span className="material-symbols-outlined text-[28px]">person</span>
          <span className="text-[10px] font-medium">Profile</span>
        </button>
      </nav>
    </div>
  );
};

export default DashboardView;
