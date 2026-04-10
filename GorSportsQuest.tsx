import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  Star,
  Sparkles,
  Award,
  Target,
  Zap,
  Dribbble,
  Medal,
  ChevronRight
} from 'lucide-react';

// --- Types ---
interface Question {
  id: number;
  sentence: string;
  hySentence: string;
  correct: string;
  options: string[];
  explanation: string;
}

// --- Data ---
const QUESTIONS: Question[] = [
  {
    id: 1,
    sentence: "Para ser un campeón, ___ entrenar duro.",
    hySentence: "Չեմպիոն լինելու համար պետք է քրտնաջան մարզվել (ընդհանուր):",
    correct: "hay que",
    options: ["hay que", "tengo que", "tiene que"],
    explanation: "'Hay que' is used for general rules or requirements."
  },
  {
    id: 2,
    sentence: "Yo ___ ganar este partido hoy.",
    hySentence: "Ես պետք է հաղթեմ այս խաղը այսօր (անձնական):",
    correct: "tengo que",
    options: ["hay que", "tengo que", "tenemos que"],
    explanation: "'Tengo que' is personal obligation for 'Yo'."
  },
  {
    id: 3,
    sentence: "En el fútbol ___ respetar al árbitro.",
    hySentence: "Ֆուտբոլում պետք է հարգել մրցավարին (բոլորի համար):",
    correct: "hay que",
    options: ["hay que", "tienes que", "tengo que"],
    explanation: "'Hay que' expresses a general rule in sports."
  },
  {
    id: 4,
    sentence: "Tú ___ correr más rápido, Gor.",
    hySentence: "Դու պետք է ավելի արագ վազես, Գոռ (անձնական):",
    correct: "tienes que",
    options: ["hay que", "tengo que", "tienes que"],
    explanation: "'Tienes que' is the conjugation for 'Tú'."
  },
  {
    id: 5,
    sentence: "Nosotros ___ beber agua después de jugar.",
    hySentence: "Մենք պետք է ջուր խմենք խաղալուց հետո:",
    correct: "tenemos que",
    options: ["hay que", "tenemos que", "tienen que"],
    explanation: "'Tenemos que' is for 'Nosotros'."
  },
  {
    id: 6,
    sentence: "Para marcar un gol ___ chutar fuerte.",
    hySentence: "Գոլ խփելու համար պետք է ուժեղ հարվածել (ընդհանուր):",
    correct: "hay que",
    options: ["hay que", "tengo que", "tiene que"],
    explanation: "'Hay que' is used for general advice."
  },
  {
    id: 7,
    sentence: "Gor, tú ___ descansar un poco ahora.",
    hySentence: "Գոռ, դու պետք է մի փոքր հանգստանաս հիմա:",
    correct: "tienes que",
    options: ["hay que", "tienes que", "tengo que"],
    explanation: "Personal advice for Gor (Tú)."
  },
  {
    id: 8,
    sentence: "Ellos ___ ganar el trofeo este año.",
    hySentence: "Նրանք պետք է հաղթեն գավաթը այս տարի:",
    correct: "tienen que",
    options: ["hay que", "tenemos que", "tienen que"],
    explanation: "'Tienen que' is for 'Ellos'."
  }
];

export default function GorSportsQuest() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<'idle' | 'kicking' | 'goal' | 'miss'>('idle');
  const [isFinished, setIsFinished] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const currentQuestion = QUESTIONS[step];

  const handleKick = (option: string) => {
    if (gameState !== 'idle' || isFinished) return;
    
    setSelectedOption(option);
    setGameState('kicking');
    
    const isCorrect = option === currentQuestion.correct;
    
    setTimeout(() => {
      if (isCorrect) {
        setGameState('goal');
        setScore(s => s + 1);
      } else {
        setGameState('miss');
      }
      
      setTimeout(() => {
        if (step < QUESTIONS.length - 1) {
          setStep(s => s + 1);
          setGameState('idle');
          setSelectedOption(null);
        } else {
          setIsFinished(true);
        }
      }, 2000);
    }, 800);
  };

  const restart = () => {
    setStep(0);
    setScore(0);
    setGameState('idle');
    setIsFinished(false);
    setSelectedOption(null);
  };

  return (
    <div className="min-h-screen bg-sky-500 text-white font-sans p-4 md:p-8 flex flex-col items-center justify-start md:justify-center relative overflow-x-hidden">
      {/* Stadium Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute bottom-0 w-full h-1/2 bg-emerald-600" />
        <div className="absolute bottom-0 w-full h-1/2 bg-[repeating-linear-gradient(90deg,transparent,transparent_40px,rgba(255,255,255,0.05)_40px,rgba(255,255,255,0.05)_80px)]" />
        <div className="absolute top-0 w-full h-full bg-gradient-to-b from-blue-600/50 to-transparent" />
        
        {/* Stadium Lights */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/20 rounded-full blur-3xl" />
        <div className="absolute top-10 right-10 w-32 h-32 bg-white/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl w-full relative z-10 py-8">
        {!isFinished ? (
          <motion.div 
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Scoreboard */}
            <div className="bg-blue-900/80 backdrop-blur-md p-6 rounded-3xl border-4 border-blue-400 shadow-2xl flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white rounded-2xl p-1 shadow-lg overflow-hidden border-4 border-blue-400">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Gor&backgroundColor=b6e3f4" alt="Gor" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h1 className="text-2xl font-black italic tracking-tighter">ԳՈՌԻ ՄԱՐԶԱԿԱՆ ՔՎԵՍԹ</h1>
                  <p className="text-blue-300 text-xs font-black uppercase tracking-widest">Hay que vs Tener que</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-[10px] font-black uppercase tracking-widest text-blue-300 mb-1">ԳՈԼԵՐ</p>
                  <p className="text-4xl font-black text-yellow-400">{score}</p>
                </div>
                <div className="h-12 w-1 bg-blue-700 rounded-full" />
                <div className="text-center">
                  <p className="text-[10px] font-black uppercase tracking-widest text-blue-300 mb-1">ՓՈՒԼ</p>
                  <p className="text-4xl font-black">{step + 1}/{QUESTIONS.length}</p>
                </div>
              </div>
            </div>

            {/* Question Bubble */}
            <motion.div 
              key={step}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white p-6 rounded-3xl shadow-2xl text-blue-900 border-4 border-blue-100 relative"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                ԼՐԱՑՐՈՒ ԲԱՑԹՈՂՈՒՄԸ
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-center italic mb-2">
                "{currentQuestion.sentence.replace("___", selectedOption || "____")}"
              </h2>
              <p className="text-sm font-bold text-blue-400 text-center italic">
                {currentQuestion.hySentence}
              </p>
            </motion.div>

            {/* Game Arena */}
            <div className="relative h-[300px] md:h-[400px] bg-emerald-500/30 rounded-[3rem] border-4 border-white/20 overflow-hidden shadow-inner flex flex-col items-center justify-end pb-12">
              
              {/* Soccer Goal */}
              <div className="absolute top-10 w-80 h-48 border-8 border-white border-b-0 rounded-t-xl flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,255,255,0.1)_100%)] bg-[size:10px_10px] bg-[repeat:repeat]" />
                
                {/* Goalkeeper (Simplified) */}
                <motion.div 
                  animate={{ x: gameState === 'idle' ? [-40, 40, -40] : 0 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-12 h-20 bg-red-500 rounded-full border-4 border-white shadow-lg relative z-10"
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-6 bg-red-400 rounded-full" />
                </motion.div>
              </div>

              {/* The Ball */}
              <motion.div
                animate={
                  gameState === 'goal' ? { y: -250, x: 0, scale: 0.5, rotate: 720 } :
                  gameState === 'miss' ? { y: -250, x: 150, scale: 0.5, rotate: 720, opacity: 0 } :
                  { y: 0, x: 0, scale: 1, rotate: 0 }
                }
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-20 w-12 h-12 bg-white rounded-full border-4 border-zinc-800 shadow-xl flex items-center justify-center overflow-hidden"
              >
                <div className="w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.1)_100%)] bg-[size:15px_15px] bg-[repeat:repeat] rotate-45" />
              </motion.div>

              {/* Feedback Overlay */}
              <AnimatePresence>
                {gameState === 'goal' && (
                  <motion.div 
                    initial={{ scale: 0, opacity: 0, rotate: -20 }}
                    animate={{ scale: 1.5, opacity: 1, rotate: 0 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute top-20 z-50 pointer-events-none"
                  >
                    <div className="bg-yellow-400 text-blue-900 px-10 py-4 rounded-full font-black text-6xl shadow-[0_0_50px_rgba(250,204,21,0.5)] border-8 border-white italic">
                      GOAL!!!
                    </div>
                  </motion.div>
                )}
                {gameState === 'miss' && (
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1.2, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute top-20 z-50 pointer-events-none"
                  >
                    <div className="bg-red-500 text-white px-10 py-4 rounded-full font-black text-4xl shadow-2xl border-8 border-white italic">
                      MISS!
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Options Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentQuestion.options.map((option, i) => (
                <button
                  key={i}
                  disabled={gameState !== 'idle'}
                  onClick={() => handleKick(option)}
                  className={`py-6 px-8 rounded-3xl border-4 transition-all text-2xl font-black shadow-xl flex items-center justify-center gap-3 group relative overflow-hidden ${
                    selectedOption === option
                      ? gameState === 'goal'
                        ? 'bg-emerald-500 border-white text-white'
                        : gameState === 'miss'
                        ? 'bg-red-500 border-white text-white'
                        : 'bg-blue-700 border-blue-400 text-white'
                      : 'bg-white text-blue-900 border-blue-100 hover:border-yellow-400 hover:scale-105 active:scale-95'
                  }`}
                >
                  <Dribbble className={`w-6 h-6 ${gameState === 'idle' ? 'group-hover:rotate-180 transition-transform duration-500' : ''}`} />
                  {option}
                </button>
              ))}
            </div>

            {/* Hint Box */}
            <div className="bg-blue-800/50 p-4 rounded-2xl border-2 border-blue-400/30 flex items-center gap-4">
              <Zap className="w-6 h-6 text-yellow-400 animate-pulse" />
              <p className="text-xs font-bold text-blue-100 italic">
                Հիշի՛ր, Գոռ. <strong>Hay que</strong>-ն օգտագործվում է ընդհանուր կանոնների համար, իսկ <strong>Tener que</strong>-ն՝ երբ խոսքը կոնկրետ մարդու մասին է:
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="finish"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center bg-blue-900/90 backdrop-blur-2xl p-12 md:p-20 rounded-[4rem] border-8 border-blue-400 shadow-[0_0_100px_rgba(59,130,246,0.3)] max-w-3xl mx-auto relative overflow-hidden"
          >
            {/* Confetti Effect (Simplified) */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    y: [0, 600], 
                    x: [Math.random() * 600 - 300, Math.random() * 600 - 300],
                    rotate: [0, 360]
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: Math.random() * 2 }}
                  className="absolute top-0 left-1/2 w-3 h-3 bg-yellow-400 rounded-sm"
                />
              ))}
            </div>

            <div className="relative z-10">
              <motion.div 
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block bg-yellow-400 p-10 rounded-full border-8 border-white shadow-[0_0_60px_rgba(250,204,21,0.6)] mb-10"
              >
                <Medal className="w-24 h-24 text-blue-900" />
              </motion.div>

              <h2 className="text-6xl font-black uppercase italic mb-6 tracking-tighter text-white">
                ՉԵՄՊԻՈՆ ԳՈՌ!
              </h2>
              
              <p className="text-2xl font-bold text-blue-200 italic mb-10">
                Դու հաղթեցիր ոսկե մեդալը և սովորեցիր իսպաներենի բոլոր կանոնները:
              </p>

              <div className="bg-white/10 p-10 rounded-[3rem] border-4 border-white/20 mb-12">
                <p className="text-blue-300 font-black text-sm uppercase tracking-widest mb-4">ՔՈ ՄԱՐԶԱԿԱՆ ԱՐԴՅՈՒՆՔԸ</p>
                <div className="flex justify-center items-baseline gap-2">
                  <span className="text-9xl font-black text-yellow-400 drop-shadow-2xl">{score}</span>
                  <span className="text-4xl font-black text-white">/ {QUESTIONS.length}</span>
                </div>
                <p className="text-xl font-black text-white mt-6 uppercase tracking-tighter">
                  {score === QUESTIONS.length ? 'ԲԱՑԱՐՁԱԿ ՀԱՂԹԱՆԱԿ!' : 'ՀՐԱՇԱԼԻ ԽԱՂ!'}
                </p>
              </div>

              <button 
                onClick={restart}
                className="w-full py-8 bg-white text-blue-900 rounded-full font-black text-3xl uppercase tracking-widest hover:bg-yellow-400 hover:text-blue-900 transition-all shadow-2xl flex items-center justify-center gap-6 group"
              >
                <RotateCcw className="w-10 h-10 group-hover:rotate-180 transition-transform duration-700" />
                ՆՈՐԻՑ ԽԱՂԱԼ
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Global Style */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        body { 
          font-family: 'Inter', sans-serif; 
          background: #0ea5e9;
          margin: 0;
        }
      `}} />
    </div>
  );
}
