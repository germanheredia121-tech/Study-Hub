
'use client';

import { useState } from 'react';
import { QuizQuestion, StudyPath } from '@/lib/types';
import { markModuleComplete } from '@/lib/utils';

interface QuizProps {
    questions: QuizQuestion[];
    moduleId: string;
    path: StudyPath;
    onComplete: () => void;
}

export default function Quiz({ questions, moduleId, path, onComplete }: QuizProps) {
    const [currentStep, setCurrentStep] = useState<'intro' | 'active' | 'result'>('intro');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);
    const [showExplanation, setShowExplanation] = useState(false);

    const handleAnswer = (optionIndex: number) => {
        const nextAnswers = [...answers, optionIndex];
        setAnswers(nextAnswers);

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setCurrentStep('result');
        }
    };

    const calculateScore = () => {
        let correct = 0;
        answers.forEach((ans, i) => {
            if (ans === questions[i].correctAnswer) correct++;
        });
        return (correct / questions.length) * 100;
    };

    const score = calculateScore();
    const passed = score >= 90;

    if (currentStep === 'intro') {
        return (
            <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-5 md:p-8 text-center space-y-4 md:space-y-6">
                <h3 className="text-xl md:text-2xl font-bold tracking-tight">Validación de Módulo</h3>
                <p className="text-[#888888] text-sm md:text-base font-light">
                    Debes obtener un score de al menos 90% para desbloquear el siguiente módulo.
                    ({questions.length} preguntas)
                </p>
                <button
                    onClick={() => setCurrentStep('active')}
                    className="bg-white hover:bg-gray-200 active:bg-gray-300 text-black px-6 py-2.5 md:px-8 md:py-3 rounded-md font-medium transition-colors text-sm md:text-base min-h-[44px]"
                >
                    Comenzar Quiz
                </button>
            </div>
        );
    }

    if (currentStep === 'result') {
        return (
            <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-5 md:p-8 text-center space-y-4 md:space-y-6">
                <div className={`text-5xl md:text-6xl ${passed ? 'text-white' : 'text-[#888888]'}`}>
                    {passed ? '✅' : '❌'}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight">{passed ? '¡Módulo Superado!' : 'Sigue Intentando'}</h3>
                <p className="text-lg md:text-xl text-[#888888]">Tu score: <span className="font-bold text-white">{score.toFixed(0)}%</span></p>

                {passed ? (
                    <div className="space-y-4">
                        <p className="text-[#888888] text-sm md:text-base font-light">Has desbloqueado el siguiente contenido.</p>
                        <button
                            onClick={() => {
                                markModuleComplete(path, moduleId);
                                onComplete();
                            }}
                            className="bg-white hover:bg-gray-200 active:bg-gray-300 text-black px-6 py-2.5 md:px-8 md:py-3 rounded-md font-medium transition-colors text-sm md:text-base min-h-[44px]"
                        >
                            Continuar al Siguiente
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <p className="text-[#888888] text-sm md:text-base font-light">Necesitas 90% para avanzar.</p>
                        <button
                            onClick={() => {
                                setCurrentStep('intro');
                                setCurrentQuestionIndex(0);
                                setAnswers([]);
                            }}
                            className="bg-transparent border border-white/20 hover:bg-white/5 active:bg-white/10 text-white px-6 py-2.5 md:px-8 md:py-3 rounded-md font-medium transition-colors text-sm md:text-base min-h-[44px]"
                        >
                            Reintentar
                        </button>
                    </div>
                )}
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4 md:p-8 space-y-5 md:space-y-8">
            <div className="flex justify-between items-center text-xs md:text-sm font-mono text-[#888888]">
                <span>PREGUNTA {currentQuestionIndex + 1} DE {questions.length}</span>
                <span>{((currentQuestionIndex / questions.length) * 100).toFixed(0)}%</span>
            </div>

            <div className="space-y-4 md:space-y-6">
                <h4 className="text-base md:text-xl font-medium leading-relaxed tracking-tight">
                    {currentQuestion.question}
                </h4>

                <div className="grid grid-cols-1 gap-3 md:gap-4">
                    {currentQuestion.options.map((option, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleAnswer(idx)}
                            className="text-left bg-black border border-white/10 hover:border-white/30 active:border-white/50 hover:bg-white/5 p-3 md:p-4 rounded-lg transition-all text-sm md:text-base min-h-[44px] group flex items-start gap-3"
                        >
                            <span className="inline-block flex-shrink-0 font-mono text-[#888888] group-hover:text-white transition-colors">{String.fromCharCode(65 + idx)})</span>
                            <span className="text-[#ececec] group-hover:text-white transition-colors">{option}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
