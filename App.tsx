
import React, { useState, useEffect } from 'react';
import { AppView, FoodItem, UserProfile } from './types';
import SplashView from './views/SplashView';
import DashboardView from './views/DashboardView';
import CameraView from './views/CameraView';
import ResultView from './views/ResultView';
import ProfileView from './views/ProfileView';

const MOCK_USER: UserProfile = {
  name: "Alex Johnson",
  dailyGoal: 2100,
  streak: 12,
  totalScans: 142,
  avgCalories: 1850,
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"
};

const MOCK_MEALS: FoodItem[] = [
  {
    id: '1',
    name: 'Grilled Chicken Salad',
    calories: 320,
    time: '12:30 PM',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=200&q=80',
    macros: { protein: 45, carbs: 12, fats: 8 },
    weight: 250,
    confidence: 99
  },
  {
    id: '2',
    name: 'Fresh Apple',
    calories: 95,
    time: '03:15 PM',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6bcd6?auto=format&fit=crop&w=200&q=80',
    macros: { protein: 1, carbs: 25, fats: 0 },
    weight: 180,
    confidence: 100
  },
  {
    id: '3',
    name: 'Oatmeal & Berries',
    calories: 240,
    time: '08:30 AM',
    image: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=200&q=80',
    macros: { protein: 12, carbs: 45, fats: 6 },
    weight: 220,
    confidence: 98
  }
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.SPLASH);
  const [user, setUser] = useState<UserProfile>(MOCK_USER);
  const [history, setHistory] = useState<FoodItem[]>(MOCK_MEALS);
  const [scanResult, setScanResult] = useState<Partial<FoodItem> | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  useEffect(() => {
    if (currentView === AppView.SPLASH) {
      const timer = setTimeout(() => {
        setCurrentView(AppView.DASHBOARD);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentView]);

  const handleScanComplete = (data: any, image: string) => {
    setScanResult({
      name: data.name,
      calories: data.calories,
      macros: {
        protein: data.protein,
        carbs: data.carbs,
        fats: data.fats
      },
      weight: data.weight,
      confidence: data.confidence,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    setCapturedImage(image);
    setCurrentView(AppView.RESULT);
  };

  const addToDiary = () => {
    if (scanResult && capturedImage) {
      const newMeal: FoodItem = {
        ...scanResult as FoodItem,
        id: Date.now().toString(),
        image: capturedImage
      };
      setHistory([newMeal, ...history]);
      setCurrentView(AppView.DASHBOARD);
      setScanResult(null);
      setCapturedImage(null);
    }
  };

  return (
    <div className="max-w-md mx-auto h-screen relative bg-background-light dark:bg-background-dark overflow-hidden flex flex-col shadow-2xl">
      {currentView === AppView.SPLASH && <SplashView />}
      
      {currentView === AppView.DASHBOARD && (
        <DashboardView 
          user={user} 
          meals={history} 
          onOpenScanner={() => setCurrentView(AppView.CAMERA)}
          onOpenProfile={() => setCurrentView(AppView.PROFILE)}
        />
      )}

      {currentView === AppView.CAMERA && (
        <CameraView 
          onClose={() => setCurrentView(AppView.DASHBOARD)}
          onScanComplete={handleScanComplete}
        />
      )}

      {currentView === AppView.RESULT && scanResult && capturedImage && (
        <ResultView 
          item={scanResult as FoodItem} 
          image={capturedImage}
          onRetake={() => setCurrentView(AppView.CAMERA)}
          onBack={() => setCurrentView(AppView.DASHBOARD)}
          onAdd={addToDiary}
        />
      )}

      {currentView === AppView.PROFILE && (
        <ProfileView 
          user={user} 
          onBack={() => setCurrentView(AppView.DASHBOARD)}
        />
      )}
    </div>
  );
};

export default App;
