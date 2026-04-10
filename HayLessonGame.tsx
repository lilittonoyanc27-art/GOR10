import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  GraduationCap, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Trophy, 
  Info,
  Lightbulb,
  ArrowRight,
  Sparkles,
  MapPin,
  List,
  Users
} from 'lucide-react';

// --- Types ---
interface Question {
  id: number;
  sentence: string;
  hySentence: string;
  correct: string;
  options: string[];
  explanation: string;
  type: 'hay' | 'hay que' | 'tener que';
}

// --- Data ---
const QUESTIONS: Question[] = [
  {
    id: 1,
    sentence: "En la cocina ___ mucha comida.",
    hySentence: "Խոհանոցում շատ ուտելիք կա:",
    correct: "hay",
    options: ["hay", "hay que", "tengo que"],
    explanation: "'Hay' is used for existence (there is/are).",
    type: 'hay'
  },
  {
    id: 2,
    sentence: "Para aprender español ___ practicar mucho.",
    hySentence: "Իսպաներեն սովորելու համար պետք է շատ պրակտիկա անել (ընդհանուր):",
    correct: "hay que",
    options: ["hay", "hay que", "tiene que"],
    explanation: "'Hay que' expresses impersonal obligation (it is necessary to).",
    type: 'hay que'
  },
  {
    id: 3,
    sentence: "Yo ___ estudiar para el examen de mañana.",
    hySentence: "Ես պետք է սովորեմ վաղվա քննության համար (անձնական):",
    correct: "tengo que",
    options: ["hay", "hay que", "tengo que"],
    explanation: "'Tener que' is used for personal obligation (I have to).",
    type: 'tener que'
  },
  {
    id: 4,
    sentence: "¿___ un hospital cerca de aquí?",
    hySentence: "Այստեղ մոտակայքում հիվանդանոց կա՞:",
    correct: "Hay",
    options: ["Hay", "Hay que", "Tiene que"],
    explanation: "Use 'Hay' to ask about existence.",
    type: 'hay'
  },
  {
    id: 5,
    sentence: "En este museo ___ guardar silencio.",
    hySentence: "Այս թանգարանում պետք է լռություն պահպանել (բոլորի համար):",
    correct: "hay que",
    options: ["hay", "hay que", "tienes que"],
    explanation: "'Hay que' is for general rules or obligations.",
    type: 'hay que'
  },
  {
    id: 6,
    sentence: "Tú ___ comer más verduras.",
    hySentence: "Դու պետք է ավելի շատ բանջարեղեն ուտես (անձնական):",
    correct: "tienes que",
    options: ["hay", "hay que", "tienes que"],
    explanation: "'Tener que' is conjugated for the person (Tú tienes que).",
    type: 'tener que'
  },
  {
    id: 7,
    sentence: "Nosotros ___ trabajar hoy.",
    hySentence: "Մենք պետք է աշխատենք այսօր:",
    correct: "tenemos que",
    options: ["hay", "hay que", "tenemos que"],
    explanation: "'Tener que' changes based on the subject (Nosotros tenemos que).",
    type: 'tener que'
  },
  {
    id: 8,
    sentence: "Si quieres viajar, ___ tener un pasaporte.",
    hySentence: "Եթե ուզում ես ճամփորդել, պետք է անձնագիր ունենալ (ընդհանուր):",
    correct: "hay que",
    options: ["hay", "hay que", "tienes que"],
    explanation: "'Hay que' is used for general requirements.",
    type: 'hay que'
  }
];

export default function HayLessonGame() {
  const [view, setView] = useState<'theory' | 'exercise' | 'result'>('theory');
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const currentQuestion = QUESTIONS[step];

  const handleAnswer = (option: string) => {
    if (feedback) return;
    setSelectedOption(option);
    const isCorrect = option.toLowerCase() === currentQuestion.correct.toLowerCase();
    
    if (isCorrect) {
      setFeedback('correct');
      setScore(s => s + 1);
    } else {
      setFeedback('wrong');
    }

    setTimeout(() => {
      setFeedback(null);
      setSelectedOption(null);
      if (step < QUESTIONS.length - 1) {
        setStep(s => s + 1);
      } else {
        setView('result');
      }
    }, 2000);
  };

  const restart = () => {
    setStep(0);
    setScore(0);
    setFeedback(null);
    setView('theory');
    setSelectedOption(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-4 md:p-8 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <div className="max-w-5xl w-full relative z-10">
        <AnimatePresence mode="wait">
          {view === 'theory' && (
            <motion.div
              key="theory"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border-4 border-white"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-indigo-600 rounded-3xl flex items-center justify-center shadow-lg">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-black text-slate-800 italic tracking-tight">HAY vs HAY QUE vs TENER QUE</h1>
                  <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Գոյություն և Պարտականություն</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {/* HAY */}
                <div className="bg-indigo-50 p-6 rounded-[2rem] border-2 border-indigo-100 flex flex-col">
                  <h3 className="text-xl font-black text-indigo-700 mb-3 flex items-center gap-2">
                    <MapPin className="w-5 h-5" /> HAY
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed mb-4">
                    Նշանակում է <strong>«կա / կան»</strong>: Օգտագործվում է առարկաների գոյությունը նշելու համար:
                  </p>
                  <div className="mt-auto p-3 bg-white/50 rounded-xl border border-indigo-200 italic text-xs">
                    Hay un libro. (Կա մի գիրք)
                  </div>
                </div>

                {/* HAY QUE */}
                <div className="bg-emerald-50 p-6 rounded-[2rem] border-2 border-emerald-100 flex flex-col">
                  <h3 className="text-xl font-black text-emerald-700 mb-3 flex items-center gap-2">
                    <List className="w-5 h-5" /> HAY QUE
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed mb-4">
                    Նշանակում է <strong>«պետք է» (անձնավորված չէ)</strong>: Օգտագործվում է ընդհանուր պարտականությունների համար:
                  </p>
                  <div className="mt-auto p-3 bg-white/50 rounded-xl border border-emerald-200 italic text-xs">
                    Hay que estudiar. (Պետք է սովորել - բոլորին է վերաբերում)
                  </div>
                </div>

                {/* TENER QUE */}
                <div className="bg-amber-50 p-6 rounded-[2rem] border-2 border-amber-100 flex flex-col">
                  <h3 className="text-xl font-black text-amber-700 mb-3 flex items-center gap-2">
                    <Users className="w-5 h-5" /> TENER QUE
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed mb-4">
                    Նշանակում է <strong>«պետք է» (անձնական)</strong>: Խոնարհվում է ըստ դեմքի:
                  </p>
                  <div className="mt-auto p-3 bg-white/50 rounded-xl border border-amber-200 italic text-xs">
                    Yo tengo que estudiar. (Ես պետք է սովորեմ)
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-[2rem] border-2 border-slate-100 mb-10">
                <h4 className="font-black text-slate-800 mb-4 uppercase tracking-widest text-sm">Խոնարհում (TENER QUE):</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm font-bold">
                  <div className="bg-white p-3 rounded-xl border border-slate-200">Yo <strong>tengo</strong> que</div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200">Tú <strong>tienes</strong> que</div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200">Él/Ella <strong>tiene</strong> que</div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200">Nosotros <strong>tenemos</strong> que</div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200">Vosotros <strong>tenéis</strong> que</div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200">Ellos <strong>tienen</strong> que</div>
                </div>
              </div>

              <button
                onClick={() => setView('exercise')}
                className="w-full py-6 bg-indigo-600 text-white rounded-[2rem] font-black text-xl uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl flex items-center justify-center gap-4 group"
              >
                ՍԿՍԵԼ ՎԱՐԺՈՒԹՅՈՒՆՆԵՐԸ
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </button>
            </motion.div>
          )}

          {view === 'exercise' && (
            <motion.div
              key="exercise"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-8"
            >
              {/* Progress Bar */}
              <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border-4 border-white flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-md">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-black text-slate-800 italic">Վարժություն {step + 1} / {QUESTIONS.length}</span>
                </div>
                <div className="w-48 h-3 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-indigo-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question Card */}
              <div className="bg-white rounded-[4rem] p-10 md:p-16 shadow-2xl border-4 border-white relative overflow-hidden min-h-[400px] flex flex-col justify-center">
                <div className="text-center mb-12">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter text-slate-800 leading-tight">
                      "{currentQuestion.sentence.replace("___", selectedOption || "___")}"
                    </h2>
                    <p className="text-xl font-bold text-slate-400 italic">
                      {currentQuestion.hySentence}
                    </p>
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {currentQuestion.options.map((option, i) => (
                    <button
                      key={i}
                      disabled={!!feedback}
                      onClick={() => handleAnswer(option)}
                      className={`py-6 px-8 rounded-[2rem] border-4 transition-all text-2xl font-black shadow-lg flex items-center justify-center ${
                        selectedOption === option
                          ? feedback === 'correct'
                            ? 'bg-emerald-500 border-emerald-400 text-white scale-105'
                            : 'bg-rose-500 border-rose-400 text-white scale-105'
                          : feedback && option.toLowerCase() === currentQuestion.correct.toLowerCase()
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-600'
                          : 'bg-slate-50 border-slate-100 text-slate-800 hover:border-indigo-500 hover:text-indigo-600 hover:bg-white'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                {/* Feedback Explanation */}
                <AnimatePresence>
                  {feedback && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`mt-10 p-6 rounded-3xl border-2 flex items-start gap-4 ${
                        feedback === 'correct' ? 'bg-emerald-50 border-emerald-100 text-emerald-800' : 'bg-rose-50 border-rose-100 text-rose-800'
                      }`}
                    >
                      <div className={`p-2 rounded-xl ${feedback === 'correct' ? 'bg-emerald-500' : 'bg-rose-500'}`}>
                        {feedback === 'correct' ? <CheckCircle2 className="w-5 h-5 text-white" /> : <XCircle className="w-5 h-5 text-white" />}
                      </div>
                      <div>
                        <p className="font-black text-sm uppercase tracking-widest mb-1">
                          {feedback === 'correct' ? 'ՃԻՇՏ Է!' : 'ՍԽԱԼ Է!'}
                        </p>
                        <p className="text-sm font-bold italic opacity-80">{currentQuestion.explanation}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {view === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center bg-white p-16 rounded-[5rem] border-4 border-white shadow-2xl max-w-2xl mx-auto relative"
            >
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 bg-indigo-600 p-10 rounded-[3rem] border-8 border-white shadow-2xl rotate-12">
                <Trophy className="w-20 h-20 text-white" />
              </div>

              <h2 className="text-5xl font-black uppercase italic mb-8 mt-12 tracking-tighter text-indigo-600">
                ԱՎԱՐՏ!
              </h2>

              <div className="bg-slate-50 p-10 rounded-[3rem] border-2 border-slate-100 mb-12 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:12px_12px] opacity-20" />
                <div className="relative z-10">
                  <p className="text-slate-400 font-black text-sm uppercase tracking-widest mb-2">ՔՈ ԱՐԴՅՈՒՆՔԸ</p>
                  <p className="text-8xl font-black text-slate-800 mb-4">{score} / {QUESTIONS.length}</p>
                  <p className="text-xl font-bold text-indigo-500 italic">
                    {score === QUESTIONS.length ? 'Գերազանց! Դուք վարպետ եք:' : score >= 6 ? 'Շատ լավ է! Շարունակեք սովորել:' : 'Լավ փորձ էր, փորձեք նորից:'}
                  </p>
                </div>
              </div>

              <button
                onClick={restart}
                className="w-full py-8 bg-indigo-600 text-white rounded-full font-black text-2xl uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl border-4 border-white flex items-center justify-center gap-6 group"
              >
                <RotateCcw className="w-10 h-10 group-hover:rotate-180 transition-transform duration-500" />
                ՆՈՐԻՑ ՍԿՍԵԼ
              </button>

              <div className="mt-12 flex justify-center gap-8">
                <Sparkles className="text-indigo-400 w-10 h-10 animate-pulse" />
                <GraduationCap className="text-slate-300 w-10 h-10" />
                <Sparkles className="text-indigo-400 w-10 h-10 animate-pulse" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Info */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white/80 backdrop-blur-md px-8 py-3 rounded-full border border-slate-200 shadow-sm">
        <div className="w-2 h-2 bg-indigo-600 rounded-full animate-ping" />
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
          SPANISH LESSON: HAY / HAY QUE / TENER QUE
        </span>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        body { 
          font-family: 'Inter', sans-serif; 
          background: #f8fafc;
        }
      `}} />
    </div>
  );
}
