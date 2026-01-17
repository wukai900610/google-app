
import React, { useRef, useState, useEffect } from 'react';
import { recognizeFood } from '../services/geminiService';

interface CameraViewProps {
  onClose: () => void;
  onScanComplete: (data: any, image: string) => void;
}

const CameraView: React.FC<CameraViewProps> = ({ onClose, onScanComplete }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' }, 
        audio: false 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera error:", err);
      setError("Unable to access camera. Please upload an image instead.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
    }
  };

  const captureAndAnalyze = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    setIsLoading(true);
    const context = canvasRef.current.getContext('2d');
    if (!context) return;

    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0);
    
    const base64Image = canvasRef.current.toDataURL('image/jpeg', 0.8);
    const base64Data = base64Image.split(',')[1];

    try {
      const result = await recognizeFood(base64Data);
      onScanComplete(result, base64Image);
    } catch (err) {
      console.error(err);
      setError("Recognition failed. Please try again.");
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    const reader = new FileReader();
    reader.onload = async (event) => {
      const dataUrl = event.target?.result as string;
      const base64Data = dataUrl.split(',')[1];
      try {
        const result = await recognizeFood(base64Data);
        onScanComplete(result, dataUrl);
      } catch (err) {
        console.error(err);
        setError("Recognition failed. Please try again.");
        setIsLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="absolute inset-0 z-50 bg-black flex flex-col overflow-hidden">
      {/* Background/Camera Stream */}
      <div className="absolute inset-0 bg-gray-900">
        <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover opacity-80" />
        <div className="absolute inset-0 camera-grid pointer-events-none"></div>
        
        {/* Viewfinder Reticle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-primary/50 rounded-3xl flex items-center justify-center shadow-[0_0_20px_rgba(99,207,23,0.2)]">
          <div className={`w-2 h-2 bg-primary rounded-full ${isLoading ? 'animate-ping' : 'animate-pulse'}`}></div>
          <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-white rounded-tl-lg -mt-1 -ml-1"></div>
          <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-white rounded-tr-lg -mt-1 -mr-1"></div>
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-white rounded-bl-lg -mb-1 -ml-1"></div>
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-white rounded-br-lg -mb-1 -mr-1"></div>
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />

      {/* Top Bar */}
      <div className="relative z-10 p-6 pt-12 flex items-center justify-between bg-gradient-to-b from-black/60 to-transparent">
        <button onClick={onClose} className="size-10 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center">
          <span className="material-symbols-outlined">close</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white">
          <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>flash_on</span>
          <span className="text-sm font-medium">Auto</span>
        </button>
        <button className="size-10 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center">
          <span className="material-symbols-outlined">help</span>
        </button>
      </div>

      <div className="flex-grow"></div>

      {/* Controls Area */}
      <div className="relative z-10 w-full flex flex-col items-center">
        {error && (
          <div className="mb-4 bg-red-500/80 text-white px-4 py-2 rounded-full text-sm font-bold backdrop-blur">
            {error}
          </div>
        )}

        <div className="mb-4">
          <div className="inline-flex bg-black/40 backdrop-blur-md rounded-full p-1 border border-white/10">
            <button className="px-6 py-2 rounded-full bg-primary text-white text-xs font-bold shadow-lg">Single Item</button>
            <button className="px-6 py-2 rounded-full text-white/50 text-xs font-bold">Full Meal</button>
          </div>
        </div>

        <div className="w-full bg-cream-yellow rounded-t-[2.5rem] pt-6 pb-12 px-8 shadow-[0_-10px_40px_rgba(0,0,0,0.3)]">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-4">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-primary-sage font-bold animate-pulse">Analyzing your meal...</p>
            </div>
          ) : (
            <>
              <p className="text-primary-sage text-center text-sm font-bold mb-6">
                Snap a photo of your meal
              </p>
              <div className="flex items-center justify-between px-4 sm:px-12">
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="size-14 rounded-2xl overflow-hidden border-2 border-white shadow-md bg-white flex items-center justify-center"
                >
                  <span className="material-symbols-outlined text-primary">add_photo_alternate</span>
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleFileUpload} 
                />

                <button 
                  onClick={captureAndAnalyze}
                  className="relative group size-20 rounded-full border-4 border-primary/20 flex items-center justify-center"
                >
                  <div className="size-16 rounded-full bg-primary shadow-lg shadow-primary/30 flex items-center justify-center active:scale-90 transition-all">
                    <span className="material-symbols-outlined text-white text-3xl">photo_camera</span>
                  </div>
                </button>

                <button className="size-14 rounded-full bg-white border border-primary/10 flex items-center justify-center shadow-md">
                  <span className="material-symbols-outlined text-primary">cached</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CameraView;
