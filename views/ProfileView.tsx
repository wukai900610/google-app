
import React from 'react';
import { UserProfile } from '../types';

interface ProfileProps {
  user: UserProfile;
  onBack: () => void;
}

const ProfileView: React.FC<ProfileProps> = ({ user, onBack }) => {
  return (
    <div className="flex-1 flex flex-col h-full bg-background-light dark:bg-background-dark overflow-y-auto no-scrollbar">
      {/* Top Bar */}
      <div className="sticky top-0 z-50 flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md p-4 pb-2 justify-between">
        <button onClick={onBack} className="size-12 flex items-center justify-start">
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </button>
        <h2 className="text-lg font-bold flex-1 text-center">Profile</h2>
        <button className="size-12 flex items-center justify-end">
          <span className="material-symbols-outlined">settings</span>
        </button>
      </div>

      <div className="px-6 pb-32">
        {/* Profile Header */}
        <div className="flex flex-col items-center pt-2 pb-6">
          <div className="relative group cursor-pointer">
            <div className="p-1 rounded-full border-2 border-primary/30">
              <img src={user.avatar} className="size-28 rounded-full object-cover shadow-lg" />
            </div>
            <div className="absolute bottom-1 right-1 bg-white dark:bg-gray-800 rounded-full p-1.5 shadow-md border border-gray-100 dark:border-gray-700">
              <span className="material-symbols-outlined text-primary text-sm font-bold">edit</span>
            </div>
          </div>
          <div className="mt-4 text-center">
            <h1 className="text-2xl font-extrabold">{user.name}</h1>
            <p className="text-sage font-bold text-xs uppercase tracking-widest mt-1">Member since 2023</p>
            <div className="mt-4 flex items-center gap-2 bg-cream-yellow dark:bg-yellow-900/20 px-4 py-2 rounded-full border border-primary/10 mx-auto w-fit">
              <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
              <p className="text-sm font-black text-slate-800 dark:text-white">Goal: {user.dailyGoal.toLocaleString()} kcal</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-8">
          <button className="flex-1 h-12 bg-primary text-white rounded-2xl font-bold text-sm shadow-lg shadow-primary/20">Edit Profile</button>
          <button className="flex-1 h-12 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-slate-900 dark:text-white rounded-2xl font-bold text-sm">Share Stats</button>
        </div>

        {/* Stats Row */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 mb-8">
          <div className="min-w-[130px] flex-1 flex flex-col gap-1 p-4 bg-cream-yellow dark:bg-gray-800 rounded-2xl border border-primary/5 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-sage text-lg">bolt</span>
              <p className="text-sage text-[10px] font-black uppercase tracking-wider">Streak</p>
            </div>
            <p className="text-2xl font-black">{user.streak} <span className="text-xs font-bold text-sage">Days</span></p>
          </div>
          <div className="min-w-[130px] flex-1 flex flex-col gap-1 p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-sage text-lg">equalizer</span>
              <p className="text-sage text-[10px] font-black uppercase tracking-wider">Avg Cal</p>
            </div>
            <p className="text-2xl font-black">{user.avgCalories.toLocaleString()}</p>
          </div>
          <div className="min-w-[130px] flex-1 flex flex-col gap-1 p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-sage text-lg">qr_code_scanner</span>
              <p className="text-sage text-[10px] font-black uppercase tracking-wider">Scans</p>
            </div>
            <p className="text-2xl font-black">{user.totalScans}</p>
          </div>
        </div>

        {/* History / Calendar Mock */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700/50">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg">History</h3>
            <div className="flex items-center gap-3 bg-background-light dark:bg-gray-700 px-3 py-1.5 rounded-xl">
              <span className="material-symbols-outlined text-sm">chevron_left</span>
              <span className="text-xs font-bold">Oct 2023</span>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-y-3 gap-x-1">
            {['S','M','T','W','T','F','S'].map(d => (
              <div key={d} className="text-sage text-[10px] font-black text-center mb-1">{d}</div>
            ))}
            {Array.from({length: 31}, (_, i) => i + 1).map(day => (
              <div key={day} className="flex items-center justify-center">
                <div className={`size-8 flex items-center justify-center rounded-full text-xs font-bold transition-all
                  ${day === 15 ? 'bg-cream-yellow border-2 border-primary text-primary' : 
                    day < 15 ? 'bg-primary text-white shadow-md shadow-primary/20' : 
                    'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                  {day}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Menu Options */}
        <div className="mt-8 flex flex-col gap-3">
          <button className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 group">
            <div className="flex items-center gap-4">
              <div className="size-10 rounded-full bg-cream-yellow dark:bg-gray-700 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">nutrition</span>
              </div>
              <div className="text-left">
                <p className="text-sm font-bold">Dietary Preferences</p>
                <p className="text-[10px] text-sage font-bold uppercase">Vegan, Gluten-free</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors">chevron_right</span>
          </button>
          <button className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 group">
            <div className="flex items-center gap-4">
              <div className="size-10 rounded-full bg-cream-yellow dark:bg-gray-700 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">notifications</span>
              </div>
              <div className="text-left">
                <p className="text-sm font-bold">Notifications</p>
                <p className="text-[10px] text-sage font-bold uppercase">Daily reminders enabled</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
