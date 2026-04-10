import React, { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars, Text, Float, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  Dribbble,
  Target,
  Star,
  Zap,
  ChevronRight
} from 'lucide-react';

// --- Types ---
interface Question {
  id: number;
  spanish: string;
  armenian: string;
  options: string[];
  correct: string;
}

// --- Data ---
const QUESTIONS: Question[] = [
  { id: 1, spanish: "Baloncesto", armenian: "Բասկետբոլ", options: ["Բասկետբոլ", "Ֆուտբոլ", "Թենիս"], correct: "Բասկետբոլ" },
  { id: 2, spanish: "Pelota", armenian: "Գնդակ", options: ["Գնդակ", "Դաշտ", "Ցանց"], correct: "Գնդակ" },
  { id: 3, spanish: "Canasta", armenian: "Զամբյուղ", options: ["Զամբյուղ", "Խաղացող", "Մրցավար"], correct: "Զամբյուղ" },
  { id: 4, spanish: "Jugador", armenian: "Խաղացող", options: ["Խաղացող", "Թիմ", "Հաղթանակ"], correct: "Խաղացող" },
  { id: 5, spanish: "Equipo", armenian: "Թիմ", options: ["Թիմ", "Խաղ", "Միավոր"], correct: "Թիմ" },
  { id: 6, spanish: "Victoria", armenian: "Հաղթանակ", options: ["Հաղթանակ", "Պարտություն", "Ոչ-ոքի"], correct: "Հաղթանակ" },
  { id: 7, spanish: "Entrenador", armenian: "Մարզիչ", options: ["Մարզիչ", "Կապիտան", "Երկրպագու"], correct: "Մարզիչ" },
  { id: 8, spanish: "Pista", armenian: "Դաշտ", options: ["Դաշտ", "Սենյակ", "Փողոց"], correct: "Դաշտ" },
  { id: 9, spanish: "Puntos", armenian: "Միավորներ", options: ["Միավորներ", "Ժամանակ", "Կանոններ"], correct: "Միավորներ" },
  { id: 10, spanish: "Saltar", armenian: "Ցատկել", options: ["Ցատկել", "Վազել", "Նետել"], correct: "Ցատկել" }
];

// --- 3D Components ---

function Basketball({ status }: { status: 'idle' | 'scoring' | 'missing' | null }) {
  const ballRef = useRef<THREE.Mesh>(null!);
  const animTime = useRef(0);
  const startPos = new THREE.Vector3(0, 0.5, 5);
  
  useFrame((state, delta) => {
    if (status === 'scoring' || status === 'missing') {
      animTime.current += delta;
      const duration = 2.0;
      const t = Math.min(animTime.current / duration, 1);
      
      if (status === 'scoring') {
        // Parabolic trajectory to hoop (0, 3, 0)
        // We want to reach the hoop at t=0.5
        const progress = Math.min(t * 2, 1);
        const x = THREE.MathUtils.lerp(startPos.x, 0, progress);
        const z = THREE.MathUtils.lerp(startPos.z, 0, progress);
        
        let y;
        if (progress < 1) {
          // Jump phase
          y = Math.sin(progress * Math.PI) * 4 + startPos.y;
        } else {
          // Fall phase
          const fallProgress = Math.max(0, (t - 0.5) * 2);
          y = 3 - fallProgress * 10;
        }
        
        ballRef.current.position.set(x, y, z);
        ballRef.current.rotation.x += 0.1;
      } else {
        // Miss the hoop
        const progress = Math.min(t * 2, 1);
        const x = THREE.MathUtils.lerp(startPos.x, 2, progress);
        const z = THREE.MathUtils.lerp(startPos.z, -2, progress);
        
        let y;
        if (progress < 1) {
          y = Math.sin(progress * Math.PI) * 3 + startPos.y;
        } else {
          const fallProgress = Math.max(0, (t - 0.5) * 2);
          y = 3 - fallProgress * 10;
        }
        
        ballRef.current.position.set(x, y, z);
        ballRef.current.rotation.z += 0.1;
      }
    } else {
      animTime.current = 0;
      ballRef.current.position.set(0, 0.5, 5);
      ballRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={ballRef} castShadow>
      <sphereGeometry args={[0.4, 32, 32]} />
      <meshStandardMaterial color="#f97316" roughness={0.4} metalness={0.1} />
    </mesh>
  );
}

function Hoop() {
  return (
    <group position={[0, 3, 0]}>
      {/* Rim */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.6, 0.05, 16, 100]} />
        <meshStandardMaterial color="red" />
      </mesh>
      {/* Backboard */}
      <mesh position={[0, 1, -0.7]}>
        <boxGeometry args={[2.5, 1.8, 0.1]} />
        <meshStandardMaterial color="white" />
      </mesh>
      {/* Backboard Inner Square */}
      <mesh position={[0, 0.8, -0.64]}>
        <boxGeometry args={[0.8, 0.6, 0.01]} />
        <meshStandardMaterial color="black" transparent opacity={0.3} />
      </mesh>
      {/* Net (Simplified) */}
      <mesh position={[0, -0.4, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.6, 0.4, 0.8, 16, 1, true]} />
        <meshStandardMaterial color="white" wireframe />
      </mesh>
      {/* Pole */}
      <mesh position={[0, -3, -1]}>
        <cylinderGeometry args={[0.15, 0.15, 6]} />
        <meshStandardMaterial color="#334155" />
      </mesh>
    </group>
  );
}

function Court() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 30]} />
        <meshStandardMaterial color="#92400e" />
      </mesh>
      {/* Lines */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[0.1, 30]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 5]}>
        <ringGeometry args={[3.9, 4, 64]} />
        <meshStandardMaterial color="white" />
      </mesh>
    </group>
  );
}

// --- Main Component ---

export default function Basketball3DGame() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [ballStatus, setBallStatus] = useState<'idle' | 'scoring' | 'missing' | null>('idle');

  const currentQuestion = QUESTIONS[step];

  const handleAnswer = (option: string) => {
    if (feedback || isFinished) return;
    
    const isCorrect = option === currentQuestion.correct;
    
    if (isCorrect) {
      setFeedback('correct');
      setScore(s => s + 1);
      setBallStatus('scoring');
    } else {
      setFeedback('wrong');
      setBallStatus('missing');
    }

    setTimeout(() => {
      setFeedback(null);
      setBallStatus('idle');
      if (step < QUESTIONS.length - 1) {
        setStep(s => s + 1);
      } else {
        setIsFinished(true);
      }
    }, 2500);
  };

  const restart = () => {
    setStep(0);
    setScore(0);
    setFeedback(null);
    setIsFinished(false);
    setBallStatus('idle');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-zinc-900 font-sans flex flex-col md:flex-row overflow-y-auto md:overflow-hidden">
      
      {/* Left Side: UI & Exercise */}
      <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-between relative z-10 bg-white shadow-2xl border-r border-slate-200 min-h-[600px] md:min-h-0">
        
        {/* Top Header */}
        <div className="w-full flex justify-between items-center mb-8">
          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-3xl border border-slate-100 shadow-sm">
            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg">
              <Dribbble className="w-7 h-7 text-white animate-bounce" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">ՄԻԱՎՈՐ</p>
              <p className="text-2xl font-black text-zinc-800">{score}</p>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="bg-orange-500 px-6 py-2 rounded-full font-black text-white text-[10px] uppercase tracking-[0.2em] shadow-lg mb-2">
              ՓՈՒԼ {step + 1} / {QUESTIONS.length}
            </div>
            <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-orange-500"
                initial={{ width: 0 }}
                animate={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Center Content */}
        {!isFinished ? (
          <div className="w-full flex flex-col gap-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="w-full bg-slate-50 p-10 rounded-[3rem] border-4 border-slate-100 shadow-inner text-center relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-50" />
                
                <h2 className="text-5xl md:text-6xl font-black italic tracking-tighter text-orange-600 mb-4">
                  {currentQuestion.spanish}
                </h2>
                <p className="text-lg font-bold text-slate-400 uppercase tracking-widest italic">
                  Ի՞նչ է նշանակում այս բառը:
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="grid grid-cols-1 gap-4 w-full">
              {currentQuestion.options.map((option, i) => (
                <button
                  key={i}
                  disabled={!!feedback}
                  onClick={() => handleAnswer(option)}
                  className={`py-6 px-8 rounded-3xl border-2 transition-all text-xl font-black shadow-md flex items-center justify-between group relative overflow-hidden ${
                    feedback === 'correct' && option === currentQuestion.correct
                      ? 'bg-emerald-500 border-white text-white scale-105'
                      : feedback === 'wrong' && option === currentQuestion.correct
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-600'
                      : feedback === 'wrong' && option !== currentQuestion.correct
                      ? 'bg-red-500 border-white text-white opacity-50'
                      : 'bg-white border-slate-200 text-zinc-800 hover:border-orange-500 hover:bg-orange-50'
                  }`}
                >
                  <span>{option}</span>
                  <ChevronRight className={`w-6 h-6 transition-transform group-hover:translate-x-2 ${feedback ? 'opacity-0' : 'opacity-20'}`} />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center bg-white p-12 rounded-[4rem] border-4 border-slate-100 shadow-2xl relative"
          >
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 bg-orange-500 p-10 rounded-[3rem] border-8 border-white shadow-2xl rotate-12">
              <Trophy className="w-16 h-16 text-white" />
            </div>

            <h2 className="text-5xl font-black uppercase italic mb-8 mt-12 tracking-tighter text-orange-600">
              ԽԱՂԻ ԱՎԱՐՏ!
            </h2>

            <div className="bg-slate-50 p-10 rounded-[3rem] border-2 border-slate-100 mb-12">
              <p className="text-slate-400 font-black text-xl mb-4 uppercase tracking-widest">ՎԵՐՋՆԱԿԱՆ ՄԻԱՎՈՐ</p>
              <p className="text-8xl font-black text-zinc-800">{score} / {QUESTIONS.length}</p>
            </div>

            <button 
              onClick={restart}
              className="w-full py-8 bg-orange-500 text-white rounded-full font-black text-3xl uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl border-4 border-white flex items-center justify-center gap-6 group"
            >
              <RotateCcw className="w-10 h-10 group-hover:rotate-180 transition-transform duration-500" />
              ՆՈՐԻՑ ԽԱՂԱԼ
            </button>
          </motion.div>
        )}

        {/* Bottom Hint */}
        <div className="w-full flex justify-center mt-8">
          <div className="bg-slate-50 px-8 py-3 rounded-full border border-slate-100 flex items-center gap-4">
            <Zap className="w-4 h-4 text-orange-400 fill-current" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
              3D BASKETBALL CHALLENGE v1.1
            </span>
          </div>
        </div>
      </div>

      {/* Right Side: 3D Scene */}
      <div className="w-full md:w-1/2 h-[60vh] md:h-full relative bg-sky-50 border-t md:border-t-0 border-slate-200">
        <Canvas shadows camera={{ position: [5, 6, 10], fov: 50 }}>
          <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2.1} minPolarAngle={Math.PI / 4} />
          
          <ambientLight intensity={0.8} />
          <pointLight position={[10, 10, 10]} castShadow intensity={1.5} />
          <spotLight position={[0, 12, 0]} angle={0.4} penumbra={1} castShadow intensity={2.5} />
          <directionalLight position={[-5, 5, 5]} intensity={0.5} />
          
          <Suspense fallback={null}>
            <Hoop />
            <Court />
            <Basketball status={ballStatus} />
          </Suspense>
          
          <fog attach="fog" args={['#f0f9ff', 10, 50]} />
        </Canvas>

        {/* Feedback Messages Overlay on 3D */}
        <AnimatePresence>
          {feedback && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: -50 }}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-12 py-6 rounded-full border-8 border-white shadow-2xl flex items-center gap-6 z-20 ${
                feedback === 'correct' ? 'bg-emerald-500' : 'bg-red-500'
              }`}
            >
              {feedback === 'correct' ? (
                <>
                  <CheckCircle2 className="w-12 h-12 text-white" />
                  <span className="text-4xl font-black uppercase italic tracking-widest text-white">ԳՈԼ!</span>
                </>
              ) : (
                <>
                  <XCircle className="w-12 h-12 text-white" />
                  <span className="text-4xl font-black uppercase italic tracking-widest text-white">ՎՐԻՊՈՒՄ!</span>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        body { 
          font-family: 'Inter', sans-serif; 
          background: #f8fafc;
          margin: 0;
          overflow: hidden;
        }
      `}} />
    </div>
  );
}
