
import React from 'react';
import { FoodItem } from '../types';

interface ResultProps {
  item: FoodItem;
  image: string;
  onRetake: () => void;
  onBack: () => void;
  onAdd: () => void;
}

const ResultView: React.FC<ResultProps> = ({ item, image, onRetake, onBack, onAdd }) => {
  const total = item.macros.protein + item.macros.carbs + item.macros.fats;
  const pRatio = Math.round((item.macros.protein / total) * 100);
  const cRatio = Math.round((item.macros.carbs / total) * 100);
  const fRatio = 100 - pRatio - cRatio;

  return (
    <div className="flex-1 flex flex-col h-full bg-background-light dark:bg-background-dark overflow-y-auto no-scrollbar">
      {/* Top Bar */}
      <div className="flex items-center px-4 py-4 justify-between sticky top-0 z-10 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm">
        <button onClick={onBack} className="size-12 flex items-center justify-start text-slate-900 dark:text-white">
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </button>
        <h2 className="text-lg font-bold flex-1 text-center">Scan Result</h2>
        <button onClick={onRetake} className="w-12 flex justify-end">
          <span className="text-primary text-base font-bold">Retake</span>
        </button>
      </div>

      <div className="px-6 pb-32">
        {/* Image Card */}
        <div className="relative mt-2 aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border-4 border-white dark:border-gray-800">
          <img src={image} className="w-full h-full object-cover" />
          <button className="absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow-lg">
            <span className="material-symbols-outlined text-sage text-xl">edit</span>
          </button>
        </div>

        {/* Headline */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <h1 className="text-3xl font-extrabold tracking-tight">{item.name}</h1>
            <span className="material-symbols-outlined text-primary">edit_square</span>
          </div>
          <p className="text-sage font-bold text-sm">Breakfast • {item.time}</p>
        </div>

        {/* Nutrition Dashboard */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700/50">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <p className="text-[10px] font-bold text-sage uppercase tracking-widest mb-1">Total Energy</p>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-black">{item.calories}</span>
                <span className="text-lg font-bold text-sage">kcal</span>
              </div>
              <div className="mt-2 flex items-center gap-1 bg-amber-50 dark:bg-amber-900/20 px-3 py-1 rounded-full w-fit">
                <span className="material-symbols-outlined text-amber-500 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300">HIGH ENERGY</span>
              </div>
            </div>

            {/* Macro Donut Chart (Simple CSS implementation) */}
            <div className="relative size-28 rounded-full shadow-inner flex items-center justify-center" 
                 style={{ background: `conic-gradient(#63cf17 0% ${pRatio}%, #728863 ${pRatio}% ${pRatio+fRatio}%, #FDE047 ${pRatio+fRatio}% 100%)` }}>
              <div className="size-20 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
                <span className="text-[10px] font-bold text-sage uppercase">Macros</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-dashed border-gray-100 dark:border-gray-700">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <div className="size-2 rounded-full bg-primary"></div>
                <span className="text-[10px] font-bold text-sage">Protein</span>
              </div>
              <p className="font-bold">{item.macros.protein}g</p>
              <p className="text-[10px] text-sage">{pRatio}%</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <div className="size-2 rounded-full bg-sage"></div>
                <span className="text-[10px] font-bold text-sage">Fats</span>
              </div>
              <p className="font-bold">{item.macros.fats}g</p>
              <p className="text-[10px] text-sage">{fRatio}%</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <div className="size-2 rounded-full bg-cream-yellow"></div>
                <span className="text-[10px] font-bold text-sage">Carbs</span>
              </div>
              <p className="font-bold">{item.macros.carbs}g</p>
              <p className="text-[10px] text-sage">{cRatio}%</p>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="mt-4 flex flex-col gap-3">
          <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-xl text-primary flex items-center justify-center">
                <span className="material-symbols-outlined">auto_awesome</span>
              </div>
              <span className="font-bold text-sm">Confidence Score</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg">{item.confidence}%</span>
              <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50">
            <div className="flex items-center gap-3">
              <div className="bg-sage/10 p-2 rounded-xl text-sage flex items-center justify-center">
                <span className="material-symbols-outlined">scale</span>
              </div>
              <span className="font-bold text-sm">Estimated Weight</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg">{item.weight}g</span>
              <button className="text-[10px] font-black text-sage underline uppercase tracking-widest">Edit</button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-background-light dark:bg-background-dark border-t border-gray-100 dark:border-gray-800 max-w-md mx-auto">
        <button 
          onClick={onAdd}
          className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white py-4 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-primary/30"
        >
          <span className="material-symbols-outlined">add_circle</span>
          Add to Diary
        </button>
      </div>
    </div>
  );
};

export default ResultView;
