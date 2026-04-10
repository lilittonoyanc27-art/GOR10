import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ClipboardCheck, 
  GraduationCap, 
  RotateCcw, 
  Trophy, 
  CheckCircle2, 
  XCircle, 
  Star,
  Sparkles,
  BookOpen,
  ChevronRight,
  Award,
  FileText
} from 'lucide-react';

// --- Types ---
interface Question {
  id: number;
  verb: string;
  sentence: string;
  hySentence: string;
  correct: string;
  options: string[];
  type: '-AR' | '-ER' | '-IR';
}

// --- Data ---
const QUESTIONS: Question[] = [
  { id: 1, verb: 'hablar', sentence: "Yo ___ español.", hySentence: "Ես խոսում եմ իսպաներեն:", correct: "hablo", options: ["hablo", "hablas", "habla"], type: '-AR' },
  { id: 2, verb: 'comer', sentence: "Tú ___ pan.", hySentence: "Դու հաց ես ուտում:", correct: "comes", options: ["como", "comes", "come"], type: '-ER' },
  { id: 3, verb: 'vivir', sentence: "Él ___ en Madrid.", hySentence: "Նա ապրում է Մադրիդում:", correct: "vive", options: ["vivo", "vives", "vive"], type: '-IR' },
  { id: 4, verb: 'cantar', sentence: "Nosotros ___ bien.", hySentence: "Մենք լավ ենք երգում:", correct: "cantamos", options: ["cantamos", "cantáis", "cantan"], type: '-AR' },
  { id: 5, verb: 'bailar', sentence: "Vosotros ___ salsa.", hySentence: "Դուք սալսա եք պարում:", correct: "bailáis", options: ["bailamos", "bailáis", "bailan"], type: '-AR' },
  { id: 6, verb: 'correr', sentence: "Ellos ___ rápido.", hySentence: "Նրանք արագ են վազում:", correct: "corren", options: ["corremos", "corréis", "corren"], type: '-ER' },
  { id: 7, verb: 'escribir', sentence: "Yo ___ una carta.", hySentence: "Ես նամակ եմ գրում:", correct: "escribo", options: ["escribo", "escribes", "escribe"], type: '-IR' },
  { id: 8, verb: 'leer', sentence: "Tú ___ un libro.", hySentence: "Դու գիրք ես կարդում:", correct: "lees", options: ["leo", "lees", "lee"], type: '-ER' },
  { id: 9, verb: 'abrir', sentence: "Ella ___ la puerta.", hySentence: "Նա բացում է դուռը:", correct: "abre", options: ["abro", "abres", "abre"], type: '-IR' },
  { id: 10, verb: 'beber', sentence: "Nosotros ___ agua.", hySentence: "Մենք ջուր ենք խմում:", correct: "bebemos", options: ["bebemos", "bebéís", "beben"], type: '-ER' },
  { id: 11, verb: 'subir', sentence: "Vosotros ___ al tren.", hySentence: "Դուք գնացք եք բարձրանում:", correct: "subís", options: ["subimos", "subís", "suben"], type: '-IR' },
  { id: 12, verb: 'escuchar', sentence: "Ellas ___ música.", hySentence: "Նրանք երաժշտություն են լսում:", correct: "escuchan", options: ["escuchamos", "escucháis", "escuchan"], type: '-AR' },
  { id: 13, verb: 'estudiar', sentence: "Yo ___ mucho.", hySentence: "Ես շատ եմ սովորում:", correct: "estudio", options: ["estudio", "estudias", "estudia"], type: '-AR' },
  { id: 14, verb: 'vender', sentence: "Tú ___ fruta.", hySentence: "Դու միրգ ես վաճառում:", correct: "vendes", options: ["vendo", "vendes", "vende"], type: '-ER' },
  { id: 15, verb: 'recibir', sentence: "Él ___ un regalo.", hySentence: "Նա նվեր է ստանում:", correct: "recibe", options: ["recibo", "recibes", "recibe"], type: '-IR' },
  { id: 16, verb: 'trabajar', sentence: "Nosotros ___ aquí.", hySentence: "Մենք այստեղ ենք աշխատում:", correct: "trabajamos", options: ["trabajamos", "trabajáis", "trabajan"], type: '-AR' },
  { id: 17, verb: 'comprender', sentence: "Vosotros ___ todo.", hySentence: "Դուք ամեն ինչ հասկանում եք:", correct: "comprendéis", options: ["comprendemos", "comprendéis", "comprenden"], type: '-ER' },
  { id: 18, verb: 'decidir', sentence: "Ellos ___ ahora.", hySentence: "Նրանք հիմա են որոշում:", correct: "deciden", options: ["decidimos", "decidís", "deciden"], type: '-IR' },
  { id: 19, verb: 'mirar', sentence: "Yo ___ la tele.", hySentence: "Ես հեռուստացույց եմ դիտում:", correct: "miro", options: ["miro", "miras", "mira"], type: '-AR' },
  { id: 20, verb: 'aprender', sentence: "Tú ___ español.", hySentence: "Դու իսպաներեն ես սովորում:", correct: "aprendes", options: ["aprendo", "aprendes", "aprende"], type: '-ER' }
];

export default function VerbTestGame() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

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
    }

    setTimeout(() => {
      setFeedback(null);
      setSelectedOption(null);
      if (step < QUESTIONS.length - 1) {
        setStep(s => s + 1);
      } else {
        setIsFinished(true);
      }
    }, 1500);
  };

  const getGrade = (score: number) => {
    const percentage = (score / QUESTIONS.length) * 100;
    if (percentage === 100) return { grade: "5+", label: "Գերազանց", color: "text-emerald-600" };
    if (percentage >= 90) return { grade: "5", label: "Շատ լավ", color: "text-emerald-500" };
    if (percentage >= 75) return { grade: "4", label: "Լավ", color: "text-blue-500" };
    if (percentage >= 50) return { grade: "3", label: "Բավարար", color: "text-yellow-600" };
    return { grade: "2", label: "Անբավարար", color: "text-red-500" };
  };

  const restart = () => {
    setStep(0);
    setScore(0);
    setFeedback(null);
    setIsFinished(false);
    setSelectedOption(null);
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-slate-900 font-sans p-4 md:p-8 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#64748b_1px,transparent_1px)] [background-size:30px_30px]" />
      </div>

      <div className="max-w-4xl w-full relative z-10">
        {!isFinished ? (
          <motion.div 
            key="playing"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            {/* Header / Exam Style */}
            <div className="flex justify-between items-center bg-white p-6 rounded-3xl border-b-8 border-slate-200 shadow-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <ClipboardCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-black text-[10px] text-slate-400 uppercase tracking-widest leading-none mb-1">ՍՏՈՒԳՈՂԱԿԱՆ ԱՇԽԱՏԱՆՔ</p>
                  <p className="text-xl font-black text-slate-800 italic">Իսպաներեն Բայեր (20 Հարց)</p>
                </div>
              </div>
              
              <div className="hidden md:flex flex-col items-center">
                <div className="bg-slate-100 px-4 py-1 rounded-full font-black text-slate-500 text-[10px] uppercase tracking-widest mb-2">
                  ՀԱՐՑ {step + 1} / {QUESTIONS.length}
                </div>
                <div className="w-40 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-indigo-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 bg-indigo-50 px-5 py-2 rounded-2xl border border-indigo-100">
                <Star className="w-4 h-4 text-indigo-600 fill-current" />
                <span className="font-black text-indigo-600 text-lg">{score}</span>
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border-2 border-slate-100 relative overflow-hidden min-h-[450px] flex flex-col justify-center">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <FileText className="w-48 h-48" />
              </div>

              <div className="text-center mb-10">
                <div className={`inline-flex items-center gap-2 px-4 py-1 rounded-full font-black text-[10px] uppercase tracking-widest mb-6 ${
                  currentQuestion.type === '-AR' ? 'bg-orange-100 text-orange-700' :
                  currentQuestion.type === '-ER' ? 'bg-blue-100 text-blue-700' :
                  'bg-emerald-100 text-emerald-700'
                }`}>
                  <BookOpen className="w-3 h-3" />
                  ԲԱՅԻ ՏԵՍԱԿԸ: {currentQuestion.type} ({currentQuestion.verb})
                </div>
                
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <h3 className="text-4xl md:text-5xl font-black italic leading-tight tracking-tighter text-slate-800">
                    "{currentQuestion.sentence.replace("___", selectedOption || "___")}"
                  </h3>
                  <p className="text-xl font-bold text-slate-400 italic">
                    {currentQuestion.hySentence}
                  </p>
                </motion.div>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {currentQuestion.options.map((option, i) => (
                  <button
                    key={i}
                    disabled={!!feedback}
                    onClick={() => handleAnswer(option)}
                    className={`py-6 px-4 rounded-2xl border-2 transition-all text-2xl font-black shadow-lg flex items-center justify-center relative overflow-hidden ${
                      selectedOption === option
                        ? feedback === 'correct'
                          ? 'bg-emerald-500 border-emerald-400 text-white scale-105'
                          : 'bg-red-500 border-red-400 text-white scale-105'
                        : feedback && option === currentQuestion.correct
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-600'
                        : 'bg-slate-50 border-slate-100 text-slate-800 hover:border-indigo-500 hover:text-indigo-600 hover:bg-white'
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
                    initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="absolute top-10 right-10"
                  >
                    {feedback === 'correct' ? (
                      <CheckCircle2 className="w-16 h-16 text-emerald-500 drop-shadow-md" />
                    ) : (
                      <XCircle className="w-16 h-16 text-red-500 drop-shadow-md" />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer Status */}
            <div className="flex justify-center">
              <div className="bg-white/50 backdrop-blur-sm px-6 py-2 rounded-full border border-white/50 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                ՀԱՐՑ {step + 1} / 20 • ՄԻԱՎՈՐ: {score}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="finish"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center bg-white p-12 md:p-20 rounded-[4rem] border-b-[12px] border-slate-200 shadow-2xl max-w-3xl mx-auto relative"
          >
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-indigo-600 p-8 rounded-3xl border-4 border-white shadow-2xl">
              <Award className="w-16 h-16 text-white" />
            </div>

            <h2 className="text-4xl md:text-5xl font-black uppercase italic mb-10 mt-8 tracking-tighter text-slate-800">
              ՍՏՈՒԳՈՂԱԿԱՆԻ ԱՎԱՐՏ
            </h2>

            <div className="bg-slate-50 p-10 rounded-[3rem] border-2 border-slate-100 mb-10 relative overflow-hidden">
              <div className="relative z-10 space-y-4">
                <p className="text-slate-400 font-black text-sm uppercase tracking-widest">ԱՅՍՕՐՎԱ ԳՆԱՀԱՏԱԿԱՆԸ՝</p>
                <div className="h-px w-16 bg-slate-200 mx-auto" />
                <p className={`text-8xl font-black drop-shadow-sm ${getGrade(score).color}`}>
                  {getGrade(score).grade}
                </p>
                <p className="text-2xl font-black text-slate-700 uppercase tracking-tighter">
                  {getGrade(score).label}
                </p>
                <p className="text-lg font-bold text-slate-400 italic">
                  Ճիշտ պատասխաններ: {score} / {QUESTIONS.length}
                </p>
              </div>

              {/* Stamp Effect */}
              <div className="absolute -bottom-6 -right-6 w-40 h-40 border-8 border-indigo-600/5 rounded-full flex items-center justify-center rotate-[-15deg]">
                <span className="text-indigo-600/5 font-black text-2xl uppercase">ՍՏՈՒԳՎԱԾ Է</span>
              </div>
            </div>

            <button 
              onClick={restart}
              className="w-full py-8 bg-indigo-600 text-white rounded-full font-black text-3xl uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl border-b-4 border-indigo-800 flex items-center justify-center gap-4 group"
            >
              <RotateCcw className="w-8 h-8 group-hover:rotate-180 transition-transform duration-500" />
              ՆՈՐԻՑ ՓՈՐՁԵԼ
            </button>
            
            <div className="mt-12 flex justify-center gap-8">
              <Sparkles className="text-indigo-400 w-8 h-8 animate-pulse" />
              <GraduationCap className="text-slate-300 w-8 h-8" />
              <Sparkles className="text-indigo-400 w-8 h-8 animate-pulse" />
            </div>
          </motion.div>
        )}
      </div>

      {/* Global Style */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        body { 
          font-family: 'Inter', sans-serif; 
          background: #f1f5f9;
          margin: 0;
        }
      `}} />
    </div>
  );
}
