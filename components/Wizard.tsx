import React from 'react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Question, UserProfile } from '../types.ts';
import Button from './Button.tsx';

interface WizardProps {
  questions: Question[];
  currentQuestionIndex: number;
  profile: UserProfile;
  onAnswer: (questionId: string, value: string) => void;
  onNext: () => void;
  onBack: () => void;
  isLastQuestion: boolean;
}

const Wizard: React.FC<WizardProps> = ({
  questions,
  currentQuestionIndex,
  profile,
  onAnswer,
  onNext,
  onBack,
  isLastQuestion
}) => {
  const currentQuestion = questions[currentQuestionIndex];
  // Safe access to profile using keyof UserProfile assertion since we know the IDs match keys
  const selectedValue = profile[currentQuestion.id as keyof UserProfile];

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center justify-between text-zinc-500 mb-4 text-sm font-medium">
          <button 
            onClick={onBack}
            className="flex items-center gap-1 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} /> Atrás
          </button>
          <span>Paso {currentQuestionIndex + 1} de {questions.length}</span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-lime-400 h-full transition-all duration-500 ease-out"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <h2 className="text-3xl font-bold text-white mb-8 leading-tight">
        {currentQuestion.text}
      </h2>

      <div className="grid gap-3 mb-8">
        {currentQuestion.options.map((option) => (
          <button
            key={option.value}
            onClick={() => onAnswer(currentQuestion.id, option.value)}
            className={`
              w-full text-left p-5 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group
              ${selectedValue === option.value 
                ? 'border-lime-400 bg-lime-400/10 text-white' 
                : 'border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-600 hover:bg-zinc-800'
              }
            `}
          >
            <span className="font-medium text-lg">{option.label}</span>
            {selectedValue === option.value && (
              <CheckCircle2 className="text-lime-400" size={24} />
            )}
          </button>
        ))}
      </div>

      <div className="flex justify-end">
        <Button 
          onClick={onNext} 
          disabled={!selectedValue}
          className="w-full md:w-auto"
        >
          {isLastQuestion ? 'Finalizar Perfil' : 'Siguiente Pregunta'}
        </Button>
      </div>
    </div>
  );
};

export default Wizard;