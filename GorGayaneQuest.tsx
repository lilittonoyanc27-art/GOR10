import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  MessageCircle, 
  Utensils, 
  Home, 
  RotateCcw, 
  Trophy, 
  CheckCircle2, 
  XCircle, 
  Star,
  Sparkles,
  ChevronRight,
  Heart,
  Music
} from 'lucide-react';

// --- Types ---
interface QuestStep {
  id: number;
  speaker: 'Gor' | 'Gayane';
  text: string;
  hyText: string;
  verb: 'hablar' | 'comer' | 'vivir';
  correct: string;
  options: string[];
  hyTranslation: string;
}

// --- Data ---
const QUEST_STEPS: QuestStep[] = [
  {
    id: 1,
    speaker: 'Gor',
    text: "¡Hola Gayane! Yo ___ mucho con mis amigos.",
    hyText: "Ողջույն Գայանե: Ես շատ եմ խոսում ընկերներիս հետ:",
    verb: 'hablar',
    correct: "hablo",
    options: ["hablo", "hablas", "habla"],
    hyTranslation: "Ես խոսում եմ"
  },
  {
    id: 2,
    speaker: 'Gayane',
    text: "¡Qué bien! Tú ___ muy bien el español.",
    hyText: "Ինչ լավ է: Դու շատ լավ ես խոսում իսպաներեն:",
    verb: 'hablar',
    correct: "hablas",
    options: ["hablo", "hablas", "habla"],
    hyTranslation: "Դու խոսում ես"
  },
  {
    id: 3,
    speaker: 'Gor',
    text: "Ahora tengo hambre. Yo ___ una pizza.",
    hyText: "Հիմա ես սոված եմ: Ես պիցցա եմ ուտում:",
    verb: 'comer',
    correct: "como",
    options: ["como", "comes", "come"],
    hyTranslation: "Ես ուտում եմ"
  },
  {
    id: 4,
    speaker: 'Gayane',
    text: "¿Tú ___ pizza? Yo ___ una ensalada.",
    hyText: "Դու պիցցա՞ ես ուտում: Ես աղցան եմ ուտում:",
    verb: 'comer',
    correct: "como",
    options: ["como", "comes", "come"],
    hyTranslation: "Ես ուտում եմ"
  },
  {
    id: 5,
    speaker: 'Gor',
    text: "Nosotros ___ juntos en el restaurante.",
    hyText: "Մենք միասին ուտում ենք ռեստորանում:",
    verb: 'comer',
    correct: "comemos",
    options: ["comemos", "coméis", "comen"],
    hyTranslation: "Մենք ուտում ենք"
  },
  {
    id: 6,
    speaker: 'Gayane',
    text: "Gor, ¿dónde ___ tú ahora?",
    hyText: "Գոռ, որտե՞ղ ես դու ապրում հիմա:",
    verb: 'vivir',
    correct: "vives",
    options: ["vivo", "vives", "vive"],
    hyTranslation: "Դու ապրում ես"
  },
  {
    id: 7,
    speaker: 'Gor',
    text: "Yo ___ en una casa bonita en Ereván.",
    hyText: "Ես ապրում եմ մի գեղեցիկ տանը Երևանում:",
    verb: 'vivir',
    correct: "vivo",
    options: ["vivo", "vives", "vive"],
    hyTranslation: "Ես ապրում եմ"
  },
  {
    id: 8,
    speaker: 'Gayane',
    text: "Mis tíos ___ en España, en Madrid.",
    hyText: "Հորեղբայրներս ապրում են Իսպանիայում՝ Մադրիդում:",
    verb: 'vivir',
    correct: "viven",
    options: ["vivimos", "vivís", "viven"],
    hyTranslation: "Նրանք ապրում են"
  },
  {
    id: 9,
    speaker: 'Gor',
    text: "Ellos ___ español todo el día allí.",
    hyText: "Նրանք այնտեղ ամբողջ օրը իսպաներեն են խոսում:",
    verb: 'hablar',
    correct: "hablan",
    options: ["hablamos", "habláis", "hablan"],
    hyTranslation: "Նրանք խոսում են"
  },
  {
    id: 10,
    speaker: 'Gayane',
    text: "¡Qué alegría! Nosotros ___ felices aprendiendo.",
    hyText: "Ինչ ուրախություն է: Մենք երջանիկ ապրում ենք սովորելով:",
    verb: 'vivir',
    correct: "vivimos",
    options: ["vivimos", "vivís", "viven"],
    hyTranslation: "Մենք ապրում ենք"
  }
];

export default function GorGayaneQuest() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState({ Gor: 0, Gayane: 0 });
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const currentStep = QUEST_STEPS[step];

  const handleAnswer = (option: string) => {
    if (feedback || isFinished) return;
    setSelectedOption(option);
    
    const isCorrect = option === currentStep.correct;
    
    if (isCorrect) {
      setFeedback('correct');
      const answerer = currentStep.speaker === 'Gor' ? 'Gayane' : 'Gor';
      setScore(prev => ({ ...prev, [answerer]: prev[answerer] + 1 }));
    } else {
      setFeedback('wrong');
    }

    setTimeout(() => {
      setFeedback(null);
      setSelectedOption(null);
      if (step < QUEST_STEPS.length - 1) {
        setStep(s => s + 1);
      } else {
        setIsFinished(true);
      }
    }, 2000);
  };

  const restart = () => {
    setStep(0);
    setScore({ Gor: 0, Gayane: 0 });
    setFeedback(null);
    setIsFinished(false);
    setSelectedOption(null);
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans p-4 md:p-8 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-500/5 to-transparent" />
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -top-48 -left-48 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-48 -right-48 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px]" 
        />
      </div>

      <div className="max-w-5xl w-full relative z-10">
        {!isFinished ? (
          <motion.div 
            key="playing"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8"
          >
            {/* Header / Progress */}
            <div className="flex justify-between items-center bg-white/80 backdrop-blur-xl p-6 rounded-[3rem] border-4 border-zinc-50 shadow-2xl">
              <div className="flex items-center gap-6">
                <div className="flex -space-x-4">
                  <div className={`w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg border-4 border-white z-10 ${currentStep.speaker === 'Gor' ? 'scale-110 ring-4 ring-blue-200' : 'opacity-50'}`}>
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Gor&backgroundColor=b6e3f4" alt="Gor" referrerPolicy="no-referrer" />
                  </div>
                  <div className={`w-14 h-14 rounded-2xl bg-pink-500 flex items-center justify-center shadow-lg border-4 border-white ${currentStep.speaker === 'Gayane' ? 'scale-110 ring-4 ring-pink-200' : 'opacity-50'}`}>
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Gayane&backgroundColor=c0aede" alt="Gayane" referrerPolicy="no-referrer" />
                  </div>
                </div>
                <div>
                  <p className="font-black text-[10px] text-zinc-400 uppercase tracking-widest leading-none mb-1">ԳՈՌ ԵՎ ԳԱՅԱՆԵ</p>
                  <p className="text-xl font-black text-zinc-800 italic">Hablar, Comer, Vivir</p>
                </div>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="bg-blue-600 px-6 py-2 rounded-full font-black text-white text-[10px] uppercase tracking-[0.2em] shadow-md mb-2">
                  ՔԱՅԼ {step + 1} / {QUEST_STEPS.length}
                </div>
                <div className="w-48 h-2 bg-zinc-100 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-blue-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${((step + 1) / QUEST_STEPS.length) * 100}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 bg-zinc-50 px-6 py-3 rounded-2xl border border-zinc-100">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="font-black text-zinc-800">{score.Gor + score.Gayane}</span>
              </div>
            </div>

            {/* Live Character Quest Arena */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              {/* Character Side */}
              <div className="bg-white/80 backdrop-blur-2xl rounded-[4rem] p-10 shadow-2xl border-4 border-zinc-50 flex flex-col items-center justify-center relative overflow-hidden min-h-[500px]">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50/50 to-transparent pointer-events-none" />
                
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={currentStep.speaker}
                    initial={{ opacity: 0, x: currentStep.speaker === 'Gor' ? -50 : 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: currentStep.speaker === 'Gor' ? 50 : -50 }}
                    className="flex flex-col items-center relative z-10"
                  >
                    <motion.div 
                      animate={{ y: [0, -15, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className={`w-64 h-64 rounded-[4rem] border-8 ${currentStep.speaker === 'Gor' ? 'border-blue-500 shadow-[0_30px_60px_rgba(59,130,246,0.3)]' : 'border-pink-500 shadow-[0_30px_60px_rgba(236,72,153,0.3)]'} bg-white flex items-center justify-center overflow-hidden mb-8 relative`}
                    >
                      <img 
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentStep.speaker}&backgroundColor=${currentStep.speaker === 'Gor' ? 'b6e3f4' : 'c0aede'}`} 
                        alt={currentStep.speaker} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    
                    <div className="relative">
                      <div className="bg-white p-8 rounded-[3rem] shadow-2xl border-4 border-zinc-50 max-w-md relative">
                        <div className={`absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white ${currentStep.speaker === 'Gor' ? 'bg-blue-600' : 'bg-pink-500'}`}>
                          {currentStep.speaker === 'Gor' ? 'ԳՈՌԸ ԱՍՈՒՄ Է' : 'ԳԱՅԱՆԵՆ ԱՍՈՒՄ Է'}
                        </div>
                        <p className="text-2xl font-black italic text-zinc-800 leading-tight mb-4 text-center">
                          "{currentStep.text.replace("___", selectedOption || "___")}"
                        </p>
                        <div className="h-px w-12 bg-zinc-100 mx-auto mb-4" />
                        <p className="text-sm font-bold text-zinc-400 italic text-center">
                          {currentStep.hyText}
                        </p>
                      </div>
                      {/* Speech Bubble Tail */}
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-white border-l-4 border-t-4 border-zinc-50 rotate-45 -z-10" />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Interaction Side */}
              <div className="flex flex-col space-y-6">
                <div className="bg-white/80 backdrop-blur-2xl rounded-[4rem] p-10 shadow-2xl border-4 border-zinc-50 flex-1 flex flex-col justify-center relative overflow-hidden">
                  <div className="mb-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1 bg-yellow-100 rounded-full text-yellow-700 font-black text-[10px] uppercase tracking-widest mb-6">
                      <Star className="w-3 h-3 fill-current" />
                      ԼՐԱՑՐՈՒ ԲԱՑԹՈՂՈՒՄԸ
                    </div>
                    <h4 className="text-4xl font-black text-zinc-800 italic tracking-tighter mb-2">
                      {currentStep.verb.charAt(0).toUpperCase() + currentStep.verb.slice(1)}
                    </h4>
                    <p className="text-zinc-400 font-bold italic uppercase tracking-widest text-xs">
                      {currentStep.hyTranslation}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {currentStep.options.map((option, i) => (
                      <button
                        key={i}
                        disabled={!!feedback}
                        onClick={() => handleAnswer(option)}
                        className={`py-8 px-10 rounded-[2.5rem] border-4 transition-all text-3xl font-black shadow-xl flex items-center justify-between group relative overflow-hidden ${
                          selectedOption === option
                            ? feedback === 'correct'
                              ? 'bg-emerald-500 border-white text-white scale-105'
                              : 'bg-red-500 border-white text-white scale-105'
                            : feedback && option === currentStep.correct
                            ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600'
                            : 'bg-zinc-50 border-zinc-100 text-zinc-800 hover:border-blue-500 hover:text-blue-600 hover:bg-white'
                        }`}
                      >
                        <span>{option}</span>
                        <ChevronRight className={`w-8 h-8 transition-transform group-hover:translate-x-2 ${feedback ? 'opacity-0' : 'opacity-20'}`} />
                      </button>
                    ))}
                  </div>

                  {/* Feedback Overlay */}
                  <AnimatePresence>
                    {feedback && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 bg-white/20 backdrop-blur-sm"
                      >
                        <div className={`p-12 rounded-full shadow-2xl border-8 border-white ${feedback === 'correct' ? 'bg-emerald-500' : 'bg-red-500'}`}>
                          {feedback === 'correct' ? <CheckCircle2 className="w-20 h-20 text-white" /> : <XCircle className="w-20 h-20 text-white" />}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Info Card */}
                <div className="bg-blue-600 p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
                  <div className="flex items-start gap-4 relative z-10">
                    <div className="p-3 bg-white/20 rounded-2xl">
                      {currentStep.verb === 'hablar' ? <MessageCircle className="w-6 h-6" /> : 
                       currentStep.verb === 'comer' ? <Utensils className="w-6 h-6" /> : 
                       <Home className="w-6 h-6" />}
                    </div>
                    <div>
                      <h5 className="font-black text-[10px] uppercase tracking-widest mb-1 opacity-60">ՀՈՒՇՈՒՄ</h5>
                      <p className="text-sm font-bold leading-relaxed">
                        {currentStep.verb === 'hablar' ? '-AR վերջավորությամբ բայերը (hablar) խոնարհվում են՝ o, as, a, amos, áis, an' :
                         currentStep.verb === 'comer' ? '-ER վերջավորությամբ բայերը (comer) խոնարհվում են՝ o, es, e, emos, éis, en' :
                         '-IR վերջավորությամբ բայերը (vivir) խոնարհվում են՝ o, es, e, imos, ís, en'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="finish"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center bg-white/80 backdrop-blur-2xl p-16 rounded-[5rem] border-4 border-zinc-50 shadow-2xl max-w-3xl mx-auto relative"
          >
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 bg-yellow-400 p-12 rounded-[3.5rem] border-8 border-white shadow-2xl rotate-12">
              <Trophy className="w-24 h-24 text-white" />
            </div>

            <h2 className="text-7xl font-black uppercase italic mb-12 mt-16 tracking-tighter text-blue-600">
              ԱՐԿԱԾԻ ԱՎԱՐՏ!
            </h2>

            <div className="grid grid-cols-2 gap-8 mb-16">
              <div className="bg-blue-50 p-10 rounded-[4rem] border-4 border-blue-100">
                <p className="text-blue-600 font-black text-xl mb-2 uppercase tracking-widest">ԳՈՌ</p>
                <p className="text-7xl font-black text-zinc-800">{score.Gor}</p>
              </div>
              <div className="bg-pink-50 p-10 rounded-[4rem] border-4 border-pink-100">
                <p className="text-pink-600 font-black text-xl mb-2 uppercase tracking-widest">ԳԱՅԱՆԵ</p>
                <p className="text-7xl font-black text-zinc-800">{score.Gayane}</p>
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
              <Sparkles className="text-yellow-400 w-12 h-12 animate-pulse" />
              <Heart className="text-pink-400 w-12 h-12 animate-pulse" />
              <Sparkles className="text-blue-400 w-12 h-12 animate-pulse" />
            </div>
          </motion.div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        body { 
          font-family: 'Inter', sans-serif; 
          background: #ffffff;
          overflow-x: hidden;
        }
      `}} />
    </div>
  );
}
