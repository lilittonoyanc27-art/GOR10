import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  GraduationCap, 
  RotateCcw, 
  Trophy, 
  CheckCircle2, 
  XCircle, 
  User,
  Star,
  Sparkles,
  AlertTriangle,
  ChevronRight,
  Heart
} from 'lucide-react';

// --- Types ---
interface Question {
  id: number;
  verb: 'hablar' | 'comer' | 'vivir';
  sentence: string;
  hySentence: string;
  correct: string;
  options: string[];
  context: string;
}

// --- Data ---
const QUESTIONS: Question[] = [
  {
    id: 1,
    verb: 'hablar',
    sentence: "Yo ___ español con mis amigos.",
    hySentence: "Ես իսպաներեն եմ խոսում ընկերներիս հետ:",
    correct: "hablo",
    options: ["hablo", "hablas", "habla"],
    context: "Hablar (-AR)"
  },
  {
    id: 2,
    verb: 'comer',
    sentence: "Tú ___ una pizza deliciosa.",
    hySentence: "Դու համեղ պիցցա ես ուտում:",
    correct: "comes",
    options: ["como", "comes", "come"],
    context: "Comer (-ER)"
  },
  {
    id: 3,
    verb: 'vivir',
    sentence: "Nosotros ___ en una ciudad grande.",
    hySentence: "Մենք ապրում ենք մեծ քաղաքում:",
    correct: "vivimos",
    options: ["vivimos", "vivís", "viven"],
    context: "Vivir (-IR)"
  },
  {
    id: 4,
    verb: 'hablar',
    sentence: "Ellos ___ mucho en clase.",
    hySentence: "Նրանք շատ են խոսում դասի ժամանակ:",
    correct: "hablan",
    options: ["hablamos", "habláis", "hablan"],
    context: "Hablar (-AR)"
  },
  {
    id: 5,
    verb: 'comer',
    sentence: "Él ___ una manzana roja.",
    hySentence: "Նա կարմիր խնձոր է ուտում:",
    correct: "come",
    options: ["como", "comes", "come"],
    context: "Comer (-ER)"
  },
  {
    id: 6,
    verb: 'vivir',
    sentence: "Yo ___ en Armenia.",
    hySentence: "Ես ապրում եմ Հայաստանում:",
    correct: "vivo",
    options: ["vivo", "vives", "vive"],
    context: "Vivir (-IR)"
  },
  {
    id: 7,
    verb: 'hablar',
    sentence: "Nosotros ___ por teléfono.",
    hySentence: "Մենք խոսում ենք հեռախոսով:",
    correct: "hablamos",
    options: ["hablamos", "habláis", "hablan"],
    context: "Hablar (-AR)"
  },
  {
    id: 8,
    verb: 'comer',
    sentence: "Ellas ___ ensalada para el almuerzo.",
    hySentence: "Նրանք աղցան են ուտում ճաշին:",
    correct: "comen",
    options: ["comemos", "coméis", "comen"],
    context: "Comer (-ER)"
  },
  {
    id: 9,
    verb: 'vivir',
    sentence: "Tú ___ cerca de la escuela.",
    hySentence: "Դու ապրում ես դպրոցի մոտ:",
    correct: "vives",
    options: ["vivo", "vives", "vive"],
    context: "Vivir (-IR)"
  },
  {
    id: 10,
    verb: 'hablar',
    sentence: "Ustedes ___ muy bien el español.",
    hySentence: "Դուք շատ լավ եք խոսում իսպաներեն:",
    correct: "hablan",
    options: ["hablamos", "habláis", "hablan"],
    context: "Hablar (-AR)"
  }
];

export default function DiaryQuestGame() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showEarPull, setShowEarPull] = useState(false);

  const currentQuestion = QUESTIONS[step];

  const handleAnswer = (option: string) => {
    if (feedback || isFinished) return;
    setSelectedOption(option);
    
    const isCorrect = option === currentQuestion.correct;
    
    if (isCorrect) {
      setFeedback('correct');
      setScore(s => s + 1);
    } else {
      setFeedback('wrong');
      setShowEarPull(true);
      setTimeout(() => setShowEarPull(false), 1500);
    }

    setTimeout(() => {
      setFeedback(null);
      setSelectedOption(null);
      if (step < QUESTIONS.length - 1) {
        setStep(s => s + 1);
      } else {
        setIsFinished(true);
      }
    }, 2000);
  };

  const getGrade = (score: number) => {
    if (score === 10) return "5+ (Գերազանց)";
    if (score >= 8) return "5 (Շատ լավ)";
    if (score >= 6) return "4 (Լավ)";
    if (score >= 4) return "3 (Բավարար)";
    return "2 (Անբավարար)";
  };

  const restart = () => {
    setStep(0);
    setScore(0);
    setFeedback(null);
    setIsFinished(false);
    setSelectedOption(null);
    setShowEarPull(false);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-zinc-900 font-sans p-4 md:p-8 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px]" />
      </div>

      <div className="max-w-4xl w-full relative z-10">
        {!isFinished ? (
          <motion.div 
            key="playing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Header / Diary Style Progress */}
            <div className="flex justify-between items-center bg-white p-6 rounded-[2.5rem] border-4 border-zinc-100 shadow-xl">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg border-4 border-white">
                  <BookOpen className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="font-black text-[10px] text-zinc-400 uppercase tracking-widest leading-none mb-1">ՕՐԱԳԻՐ</p>
                  <p className="text-xl font-black text-zinc-800 italic">Hablar, Comer, Vivir</p>
                </div>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="bg-zinc-100 px-6 py-2 rounded-full font-black text-zinc-500 text-[10px] uppercase tracking-[0.2em] mb-2">
                  ՀԱՐՑ {step + 1} / {QUESTIONS.length}
                </div>
                <div className="w-48 h-2 bg-zinc-100 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-blue-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 bg-blue-50 px-6 py-3 rounded-2xl border border-blue-100">
                <Star className="w-5 h-5 text-blue-600 fill-current" />
                <span className="font-black text-blue-600">{score}</span>
              </div>
            </div>

            {/* Main Quest Area */}
            <div className="bg-white rounded-[4rem] p-8 md:p-12 shadow-2xl border-4 border-zinc-50 relative overflow-hidden min-h-[500px] flex flex-col justify-center">
              {/* Ear Pull Animation Overlay */}
              <AnimatePresence>
                {showEarPull && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-red-500/10 backdrop-blur-sm"
                  >
                    <motion.div 
                      animate={{ 
                        rotate: [0, -10, 10, -10, 10, 0],
                        x: [0, -5, 5, -5, 5, 0]
                      }}
                      transition={{ duration: 0.5, repeat: 2 }}
                      className="bg-white p-12 rounded-full shadow-2xl border-8 border-red-500 flex flex-col items-center"
                    >
                      <div className="flex gap-8 mb-4">
                        <motion.div animate={{ scale: [1, 1.2, 1] }} className="text-6xl">👂</motion.div>
                        <motion.div animate={{ scale: [1, 1.2, 1] }} className="text-6xl">👂</motion.div>
                      </div>
                      <p className="text-red-600 font-black text-2xl uppercase italic">ԱԿԱՆՋՆԵՐԴ ՔԱՇՈՒՄ ԵՆՔ!</p>
                      <p className="text-zinc-400 font-bold mt-2">Սխալ պատասխան:</p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-1 bg-blue-50 rounded-full text-blue-600 font-black text-[10px] uppercase tracking-widest mb-6">
                  <GraduationCap className="w-3 h-3" />
                  ԼՐԱՑՐՈՒ ՃԻՇՏ ՁԵՎԸ
                </div>
                
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <h3 className="text-4xl md:text-5xl font-black italic leading-tight tracking-tighter text-zinc-800">
                    "{currentQuestion.sentence.replace("___", selectedOption || "___")}"
                  </h3>
                  <p className="text-xl font-bold text-zinc-400 italic">
                    {currentQuestion.hySentence}
                  </p>
                </motion.div>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {currentQuestion.options.map((option, i) => (
                  <button
                    key={i}
                    disabled={!!feedback}
                    onClick={() => handleAnswer(option)}
                    className={`py-8 px-6 rounded-[2.5rem] border-4 transition-all text-3xl font-black shadow-xl flex items-center justify-center group relative overflow-hidden ${
                      selectedOption === option
                        ? feedback === 'correct'
                          ? 'bg-emerald-500 border-white text-white scale-105'
                          : 'bg-red-500 border-white text-white scale-105'
                        : feedback && option === currentQuestion.correct
                        ? 'bg-emerald-50/50 border-emerald-500 text-emerald-600'
                        : 'bg-zinc-50 border-zinc-100 text-zinc-800 hover:border-blue-500 hover:text-blue-600 hover:bg-white'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {/* Feedback Icons */}
              <AnimatePresence>
                {feedback && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="absolute top-8 right-8"
                  >
                    {feedback === 'correct' ? (
                      <div className="bg-emerald-500 p-4 rounded-full shadow-lg border-4 border-white">
                        <CheckCircle2 className="w-8 h-8 text-white" />
                      </div>
                    ) : (
                      <div className="bg-red-500 p-4 rounded-full shadow-lg border-4 border-white">
                        <XCircle className="w-8 h-8 text-white" />
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="finish"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center bg-white p-16 rounded-[5rem] border-4 border-zinc-100 shadow-2xl max-w-3xl mx-auto relative"
          >
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 bg-blue-600 p-12 rounded-[3.5rem] border-8 border-white shadow-2xl rotate-12">
              <Trophy className="w-24 h-24 text-white" />
            </div>

            <h2 className="text-5xl font-black uppercase italic mb-12 mt-16 tracking-tighter text-zinc-800">
              ԱՅՍՕՐՎԱ ԱՐԴՅՈՒՆՔԸ
            </h2>

            <div className="bg-zinc-50 p-12 rounded-[4rem] border-4 border-zinc-100 mb-16 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:10px_10px] opacity-30" />
              
              <div className="relative z-10 space-y-6">
                <p className="text-zinc-400 font-black text-xl uppercase tracking-widest">ԱՅՍՕՐ ԴՈՒ ՍՏԱՆՈՒՄ ԵՍ՝</p>
                <div className="h-px w-24 bg-zinc-200 mx-auto" />
                <p className="text-7xl font-black text-blue-600 drop-shadow-sm">
                  {getGrade(score)}
                </p>
                <p className="text-2xl font-bold text-zinc-500 italic">
                  Ճիշտ պատասխաններ: {score} / {QUESTIONS.length}
                </p>
              </div>

              {/* Diary Stamp Style */}
              <div className="absolute -bottom-4 -right-4 w-48 h-48 border-8 border-blue-600/10 rounded-full flex items-center justify-center rotate-[-15deg]">
                <span className="text-blue-600/10 font-black text-4xl uppercase">ԿԱՏԱՐՎԱԾ Է</span>
              </div>
            </div>

            <button 
              onClick={restart}
              className="w-full py-10 bg-blue-600 text-white rounded-full font-black text-4xl uppercase tracking-widest hover:bg-blue-500 transition-all shadow-2xl border-4 border-white flex items-center justify-center gap-6 group"
            >
              <RotateCcw className="w-12 h-12 group-hover:rotate-180 transition-transform duration-500" />
              ՆՈՐԻՑ ԽԱՂԱԼ
            </button>
            
            <div className="mt-16 flex justify-center gap-12">
              <Sparkles className="text-blue-400 w-12 h-12 animate-pulse" />
              <Heart className="text-red-400 w-12 h-12" />
              <Sparkles className="text-blue-400 w-12 h-12 animate-pulse" />
            </div>
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white/80 backdrop-blur-md px-8 py-3 rounded-full border border-zinc-100 shadow-sm">
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-ping" />
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">
          DIARY QUEST: HABLAR, COMER, VIVIR v1.0
        </span>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        body { 
          font-family: 'Inter', sans-serif; 
          background: #f8fafc;
          overflow-x: hidden;
        }
      `}} />
    </div>
  );
}
