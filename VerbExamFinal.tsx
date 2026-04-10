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
  FileText,
  PenTool
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
  { id: 1, verb: 'hablar', sentence: "Yo ___ con mi madre.", hySentence: "Ես խոսում եմ մորս հետ:", correct: "hablo", options: ["hablo", "hablas", "habla"], type: '-AR' },
  { id: 2, verb: 'comer', sentence: "Tú ___ una manzana.", hySentence: "Դու խնձոր ես ուտում:", correct: "comes", options: ["como", "comes", "come"], type: '-ER' },
  { id: 3, verb: 'vivir', sentence: "Él ___ en una casa grande.", hySentence: "Նա ապրում է մի մեծ տանը:", correct: "vive", options: ["vivo", "vives", "vive"], type: '-IR' },
  { id: 4, verb: 'hablar', sentence: "Nosotros ___ español.", hySentence: "Մենք խոսում ենք իսպաներեն:", correct: "hablamos", options: ["hablamos", "habláis", "hablan"], type: '-AR' },
  { id: 5, verb: 'comer', sentence: "Vosotros ___ en la cafetería.", hySentence: "Դուք ուտում եք սրճարանում:", correct: "coméis", options: ["comemos", "coméis", "comen"], type: '-ER' },
  { id: 6, verb: 'vivir', sentence: "Ellos ___ en Madrid.", hySentence: "Նրանք ապրում են Մադրիդում:", correct: "viven", options: ["vivimos", "vivís", "viven"], type: '-IR' },
  { id: 7, verb: 'hablar', sentence: "Ella ___ muy rápido.", hySentence: "Նա շատ արագ է խոսում:", correct: "habla", options: ["hablo", "hablas", "habla"], type: '-AR' },
  { id: 8, verb: 'comer', sentence: "Usted ___ pescado.", hySentence: "Դուք (հարգալից) ձուկ եք ուտում:", correct: "come", options: ["como", "comes", "come"], type: '-ER' },
  { id: 9, verb: 'vivir', sentence: "Ustedes ___ en Ereván.", hySentence: "Դուք ապրում եք Երևանում:", correct: "viven", options: ["vivimos", "vivís", "viven"], type: '-IR' },
  { id: 10, verb: 'comer', sentence: "Yo ___ mucho arroz.", hySentence: "Ես շատ բրինձ եմ ուտում:", correct: "como", options: ["como", "comes", "come"], type: '-ER' },
  { id: 11, verb: 'vivir', sentence: "Tú ___ cerca de aquí.", hySentence: "Դու ապրում ես այստեղ մոտակայքում:", correct: "vives", options: ["vivo", "vives", "vive"], type: '-IR' },
  { id: 12, verb: 'hablar', sentence: "Él ___ por teléfono.", hySentence: "Նա խոսում է հեռախոսով:", correct: "habla", options: ["hablo", "hablas", "habla"], type: '-AR' },
  { id: 13, verb: 'comer', sentence: "Nosotros ___ juntos.", hySentence: "Մենք միասին ենք ուտում:", correct: "comemos", options: ["comemos", "coméis", "comen"], type: '-ER' },
  { id: 14, verb: 'vivir', sentence: "Vosotros ___ en un piso.", hySentence: "Դուք ապրում եք բնակարանում:", correct: "vivís", options: ["vivimos", "vivís", "viven"], type: '-IR' },
  { id: 15, verb: 'hablar', sentence: "Ellos ___ con el profesor.", hySentence: "Նրանք խոսում են ուսուցչի հետ:", correct: "hablan", options: ["hablamos", "habláis", "hablan"], type: '-AR' },
  { id: 16, verb: 'comer', sentence: "Ella ___ ensalada.", hySentence: "Նա աղցան է ուտում:", correct: "come", options: ["como", "comes", "come"], type: '-ER' },
  { id: 17, verb: 'vivir', sentence: "Usted ___ solo.", hySentence: "Դուք (հարգալից) մենակ եք ապրում:", correct: "vive", options: ["vivo", "vives", "vive"], type: '-IR' },
  { id: 18, verb: 'vivir', sentence: "Nosotros ___ en Armenia.", hySentence: "Մենք ապրում ենք Հայաստանում:", correct: "vivimos", options: ["vivimos", "vivís", "viven"], type: '-IR' },
  { id: 19, verb: 'hablar', sentence: "Vosotros ___ mucho.", hySentence: "Դուք շատ եք խոսում:", correct: "habláis", options: ["hablamos", "habláis", "hablan"], type: '-AR' },
  { id: 20, verb: 'vivir', sentence: "Yo ___ con mi familia.", hySentence: "Ես ապրում եմ ընտանիքիս հետ:", correct: "vivo", options: ["vivo", "vives", "vive"], type: '-IR' }
];

export default function VerbExamFinal() {
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
    }, 1200);
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
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans p-4 md:p-8 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#64748b_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>

      <div className="max-w-4xl w-full relative z-10">
        {!isFinished ? (
          <motion.div 
            key="playing"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            {/* Exam Header */}
            <div className="bg-white p-8 rounded-[2rem] border-b-8 border-slate-200 shadow-2xl flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-xl rotate-3">
                  <PenTool className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="font-black text-[10px] text-slate-400 uppercase tracking-[0.3em] leading-none mb-2">ՆՈՐ ՍՏՈՒԳՈՂԱԿԱՆ ԱՇԽԱՏԱՆՔ</p>
                  <h1 className="text-2xl font-black text-slate-800 italic">Hablar, Comer, Vivir (20 Հարց)</h1>
                </div>
              </div>
              
              <div className="flex flex-col items-center md:items-end">
                <div className="bg-slate-100 px-5 py-1.5 rounded-full font-black text-slate-500 text-[10px] uppercase tracking-widest mb-3">
                  ՀԱՐՑ {step + 1} / {QUESTIONS.length}
                </div>
                <div className="w-48 h-2.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                  <motion.div 
                    className="h-full bg-indigo-600 shadow-[0_0_10px_rgba(79,70,229,0.5)]"
                    initial={{ width: 0 }}
                    animate={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-2xl border-2 border-slate-50 relative overflow-hidden min-h-[480px] flex flex-col justify-center">
              <div className="absolute -top-10 -right-10 opacity-[0.03] rotate-12">
                <FileText className="w-64 h-64" />
              </div>

              <div className="text-center mb-12 relative z-10">
                <div className={`inline-flex items-center gap-2 px-5 py-1.5 rounded-full font-black text-[10px] uppercase tracking-widest mb-8 shadow-sm ${
                  currentQuestion.type === '-AR' ? 'bg-orange-100 text-orange-700' :
                  currentQuestion.type === '-ER' ? 'bg-blue-100 text-blue-700' :
                  'bg-emerald-100 text-emerald-700'
                }`}>
                  <BookOpen className="w-3.5 h-3.5" />
                  ԲԱՅԻ ՏԵՍԱԿԸ: {currentQuestion.type} ({currentQuestion.verb})
                </div>
                
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <h3 className="text-4xl md:text-6xl font-black italic leading-tight tracking-tighter text-slate-800">
                    "{currentQuestion.sentence.replace("___", selectedOption || "___")}"
                  </h3>
                  <div className="h-1 w-12 bg-indigo-100 mx-auto rounded-full" />
                  <p className="text-2xl font-bold text-slate-400 italic">
                    {currentQuestion.hySentence}
                  </p>
                </motion.div>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative z-10">
                {currentQuestion.options.map((option, i) => (
                  <button
                    key={i}
                    disabled={!!feedback}
                    onClick={() => handleAnswer(option)}
                    className={`py-8 px-6 rounded-2xl border-4 transition-all text-3xl font-black shadow-xl flex items-center justify-center relative overflow-hidden group ${
                      selectedOption === option
                        ? feedback === 'correct'
                          ? 'bg-emerald-500 border-white text-white scale-105'
                          : 'bg-red-500 border-white text-white scale-105'
                        : feedback && option === currentQuestion.correct
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-600'
                        : 'bg-slate-50 border-slate-100 text-slate-800 hover:border-indigo-500 hover:text-indigo-600 hover:bg-white hover:-translate-y-1'
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
                    className="absolute top-12 right-12 z-20"
                  >
                    {feedback === 'correct' ? (
                      <div className="bg-emerald-500 p-4 rounded-full shadow-2xl border-4 border-white">
                        <CheckCircle2 className="w-12 h-12 text-white" />
                      </div>
                    ) : (
                      <div className="bg-red-500 p-4 rounded-full shadow-2xl border-4 border-white">
                        <XCircle className="w-12 h-12 text-white" />
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Score Footer */}
            <div className="flex justify-center">
              <div className="bg-white px-8 py-3 rounded-full border-2 border-slate-100 shadow-lg flex items-center gap-4">
                <Star className="w-5 h-5 text-indigo-600 fill-current" />
                <span className="font-black text-slate-800 text-xl">{score} / {QUESTIONS.length}</span>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="finish"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center bg-white p-12 md:p-24 rounded-[5rem] border-b-[16px] border-slate-200 shadow-2xl max-w-3xl mx-auto relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-indigo-50/30 to-transparent pointer-events-none" />
            
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-indigo-600 p-10 rounded-[3rem] border-8 border-white shadow-2xl rotate-6">
              <Award className="w-20 h-20 text-white" />
            </div>

            <h2 className="text-5xl md:text-6xl font-black uppercase italic mb-12 mt-12 tracking-tighter text-slate-800">
              ՍՏՈՒԳՈՂԱԿԱՆԻ ԱՎԱՐՏ
            </h2>

            <div className="bg-slate-50 p-12 rounded-[4rem] border-4 border-white shadow-inner mb-12 relative overflow-hidden">
              <div className="relative z-10 space-y-6">
                <p className="text-slate-400 font-black text-sm uppercase tracking-[0.4em]">ՎԵՐՋՆԱԿԱՆ ԳՆԱՀԱՏԱԿԱՆԸ՝</p>
                <div className="h-1 w-20 bg-indigo-100 mx-auto" />
                <p className={`text-9xl font-black drop-shadow-xl ${getGrade(score).color}`}>
                  {getGrade(score).grade}
                </p>
                <p className="text-3xl font-black text-slate-700 uppercase tracking-tighter">
                  {getGrade(score).label}
                </p>
                <p className="text-xl font-bold text-slate-400 italic">
                  Ճիշտ պատասխաններ: {score} / {QUESTIONS.length}
                </p>
              </div>

              {/* Verified Stamp */}
              <div className="absolute -bottom-10 -right-10 w-56 h-56 border-[12px] border-indigo-600/10 rounded-full flex items-center justify-center rotate-[-20deg]">
                <span className="text-indigo-600/10 font-black text-3xl uppercase tracking-widest">ՍՏՈՒԳՎԱԾ Է</span>
              </div>
            </div>

            <button 
              onClick={restart}
              className="w-full py-10 bg-indigo-600 text-white rounded-full font-black text-4xl uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-2xl border-b-8 border-indigo-900 flex items-center justify-center gap-6 group active:translate-y-2 active:border-b-0"
            >
              <RotateCcw className="w-10 h-10 group-hover:rotate-180 transition-transform duration-700" />
              ՆՈՐԻՑ ՓՈՐՁԵԼ
            </button>
            
            <div className="mt-16 flex justify-center gap-12">
              <Sparkles className="text-indigo-400 w-10 h-10 animate-pulse" />
              <GraduationCap className="text-slate-200 w-10 h-10" />
              <Sparkles className="text-indigo-400 w-10 h-10 animate-pulse" />
            </div>
          </motion.div>
        )}
      </div>

      {/* Global Style */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        body { 
          font-family: 'Inter', sans-serif; 
          background: #f8fafc;
          margin: 0;
        }
      `}} />
    </div>
  );
}
