import React, { useState } from 'react';
import { AppStep, INITIAL_PROFILE, UserProfile } from './types';
import { QUESTIONS } from './constants';
import { analyzeRoutineWithGemini } from './services/geminiService';
import Wizard from './components/Wizard';
import FileUpload from './components/FileUpload';
import LoadingScreen from './components/LoadingScreen';
import Button from './components/Button';
import { Activity, Dumbbell, AlertTriangle, RefreshCw } from 'lucide-react';

// Helper to convert File to Base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let encoded = reader.result?.toString().replace(/^data:(.*,)?/, '') || '';
      resolve(encoded);
    };
    reader.onerror = (error) => reject(error);
  });
};

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.WELCOME);
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleStart = () => {
    setStep(AppStep.QUESTIONNAIRE);
  };

  const handleAnswer = (questionId: string, value: string) => {
    setProfile(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNextQuestion = () => {
    if (questionIndex < QUESTIONS.length - 1) {
      setQuestionIndex(prev => prev + 1);
    } else {
      setStep(AppStep.UPLOAD);
    }
  };

  const handlePrevQuestion = () => {
    if (questionIndex > 0) {
      setQuestionIndex(prev => prev - 1);
    } else {
      setStep(AppStep.WELCOME);
    }
  };

  const handleFileUpload = async (file: File) => {
    setStep(AppStep.ANALYZING);
    setError(null);

    try {
      const base64 = await fileToBase64(file);
      const result = await analyzeRoutineWithGemini(profile, base64, file.type);
      
      if (result.startsWith("ERROR_INVALID_CONTENT")) {
        setError(result.replace("ERROR_INVALID_CONTENT: ", ""));
        setStep(AppStep.UPLOAD);
      } else {
        setAnalysisResult(result);
        setStep(AppStep.RESULTS);
      }
    } catch (err: any) {
      setError(err.message || "Ocurrió un error inesperado.");
      setStep(AppStep.UPLOAD);
    }
  };

  const resetApp = () => {
    setStep(AppStep.WELCOME);
    setProfile(INITIAL_PROFILE);
    setQuestionIndex(0);
    setAnalysisResult('');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="text-lime-400" />
            <span className="font-bold text-xl tracking-tight text-white">FitAudit<span className="text-lime-400">.AI</span></span>
          </div>
          {step === AppStep.RESULTS && (
             <button onClick={resetApp} className="text-zinc-400 hover:text-white text-sm font-medium flex items-center gap-2">
               <RefreshCw size={14} /> Nueva Auditoría
             </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 relative overflow-hidden">
        
        {/* Ambient Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-lime-500/10 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]"></div>
        </div>

        <div className="relative z-10 w-full max-w-4xl">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-200 flex items-center gap-3">
              <AlertTriangle className="shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {step === AppStep.WELCOME && (
            <div className="text-center animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm mb-8">
                <Dumbbell size={14} className="text-lime-400" />
                <span>Analizador de Rutinas Inteligente 2.0</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
                ¿Tu rutina es <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-400">basura</span>?
              </h1>
              <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                Sube tu plan de entrenamiento. Nuestra IA analizará el volumen, la frecuencia y la selección de ejercicios para optimizar tus ganancias y evitar lesiones.
              </p>
              <Button onClick={handleStart} className="text-lg px-8 py-4 mx-auto">
                Comenzar Auditoría Gratis
              </Button>
            </div>
          )}

          {step === AppStep.QUESTIONNAIRE && (
            <Wizard 
              questions={QUESTIONS}
              currentQuestionIndex={questionIndex}
              profile={profile}
              onAnswer={handleAnswer}
              onNext={handleNextQuestion}
              onBack={handlePrevQuestion}
              isLastQuestion={questionIndex === QUESTIONS.length - 1}
            />
          )}

          {step === AppStep.UPLOAD && (
            <div className="space-y-6">
              <button 
                onClick={() => setStep(AppStep.QUESTIONNAIRE)}
                className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm font-medium"
              >
                <RefreshCw size={14} /> Editar Perfil
              </button>
              <FileUpload onFileSelect={handleFileUpload} />
            </div>
          )}

          {step === AppStep.ANALYZING && <LoadingScreen />}

          {step === AppStep.RESULTS && (
            <div className="animate-fade-in bg-zinc-900/50 backdrop-blur border border-zinc-800 rounded-3xl p-8 md:p-12 shadow-2xl">
              <div className="flex items-center justify-between mb-8 border-b border-zinc-800 pb-6">
                <h2 className="text-3xl font-bold text-white">Resultados del Análisis</h2>
                <div className="px-4 py-1 bg-lime-400/10 border border-lime-400/20 text-lime-400 rounded-full text-sm font-medium">
                  AI Coach Verified
                </div>
              </div>
              
              <div className="prose prose-invert prose-lg max-w-none markdown-prose whitespace-pre-wrap">
                {/* 
                  Note: In a production app with npm access, we would use 'react-markdown' here.
                  Since we are sticking to pure React/TS without extra deps for portability,
                  we render the text preserving whitespace and simple formatting via CSS.
                */}
                {analysisResult}
              </div>

              <div className="mt-12 pt-8 border-t border-zinc-800 flex justify-center">
                <Button onClick={resetApp} variant="outline">
                  Analizar Otra Rutina
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <footer className="py-6 text-center text-zinc-600 text-sm">
        <p>&copy; {new Date().getFullYear()} FitAudit AI. Powered by Google Gemini.</p>
      </footer>
    </div>
  );
};

export default App;