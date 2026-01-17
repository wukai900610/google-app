
import React from 'react';

const SplashView: React.FC = () => {
  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-between py-12 bg-background-light dark:bg-background-dark">
      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[30%] bg-primary/5 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-[-5%] left-[-10%] w-[60%] h-[40%] bg-cream-yellow dark:bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md px-6">
        <div className="relative mb-8 flex flex-col items-center justify-center">
          <div className="absolute inset-0 bg-cream-yellow dark:bg-primary/10 rounded-full blur-2xl transform scale-150 opacity-80"></div>
          <div className="relative z-10 w-32 h-32 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-[100px]" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}>
              eco
            </span>
          </div>
        </div>

        <h1 className="text-primary text-[42px] font-extrabold tracking-tight leading-tight px-4 text-center mb-2">
          NutriScan
        </h1>
        <p className="text-sage dark:text-sage/80 text-xl font-medium leading-relaxed text-center mb-12">
          Eat Smart. Track Instantly.
        </p>

        <div className="w-full max-w-[220px] flex flex-col gap-3">
          <div className="h-2 w-full bg-cream dark:bg-white/10 rounded-full overflow-hidden shadow-inner ring-1 ring-inset ring-black/5">
            <div className="h-full bg-primary rounded-full animate-pulse transition-all duration-1000 ease-out" style={{ width: '45%' }}></div>
          </div>
          <div className="flex justify-center">
            <p className="text-sage/70 dark:text-sage/60 text-xs font-medium tracking-wide">Initializing AI...</p>
          </div>
        </div>
      </div>

      <div className="flex-none pb-4">
        <p className="text-sage/40 dark:text-sage/30 text-[10px] font-semibold tracking-widest uppercase text-center">v1.0 Beta Build</p>
      </div>
    </div>
  );
};

export default SplashView;
