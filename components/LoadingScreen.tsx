import React from 'react';
import { Dumbbell, BrainCircuit } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-fade-in">
      <div className="relative mb-12">
        <div className="absolute inset-0 bg-lime-400 blur-3xl opacity-20 rounded-full animate-pulse"></div>
        <div className="relative bg-zinc-900 border border-zinc-800 p-8 rounded-full shadow-2xl">
          <BrainCircuit className="text-lime-400 animate-pulse" size={64} />
        </div>
        <div className="absolute -bottom-2 -right-2 bg-zinc-800 p-3 rounded-full border border-zinc-700">
           <Dumbbell className="text-white animate-spin-slow" size={24} />
        </div>
      </div>

      <h2 className="text-3xl font-bold text-white mb-3">Analizando tu Rutina</h2>
      <p className="text-zinc-400 max-w-md mx-auto text-lg">
        Nuestro entrenador IA está detectando volumen basura, desequilibrios y oportunidades de mejora...
      </p>

      <div className="mt-8 flex gap-2">
        <span className="w-2 h-2 bg-lime-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
        <span className="w-2 h-2 bg-lime-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
        <span className="w-2 h-2 bg-lime-400 rounded-full animate-bounce"></span>
      </div>
    </div>
  );
};

export default LoadingScreen;