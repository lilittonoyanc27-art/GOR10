import React from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Sparkles, 
  Star, 
  Crown, 
  Gem, 
  Candy, 
  Baby,
  Flame,
  Sun
} from 'lucide-react';

const TERMS_GROUP_1 = [
  { spanish: "Cariño", literal: "Քնքշանք / Նրբություն", equivalent: "Թանկագինս / Սիրելիս", icon: <Heart className="w-5 h-5" /> },
  { spanish: "Amor / Mi amor", literal: "Սեր / Իմ սեր", equivalent: "Սերս / Իմ սեր", icon: <Flame className="w-5 h-5" /> },
  { spanish: "Mi Corazón", literal: "Սիրտ", equivalent: "Սիրտս", icon: <Heart className="w-5 h-5 fill-current" /> },
  { spanish: "Vida / Mi vida", literal: "Կյանք / Իմ կյանք", equivalent: "Կյանքս", icon: <Sun className="w-5 h-5" /> },
];

const TERMS_GROUP_2 = [
  { spanish: "Bombón", literal: "Շոկոլադե կոնֆետ", equivalent: "Քաղցրս / Անուշս", icon: <Candy className="w-5 h-5" /> },
  { spanish: "Tesoro", literal: "Գանձ", equivalent: "Գանձս", icon: <Gem className="w-5 h-5" /> },
  { spanish: "Reina / Rey", literal: "Թագուհի / Թագավոր", equivalent: "Թագուհիս / Թագավորս", icon: <Crown className="w-5 h-5" /> },
  { spanish: "Muñeca", literal: "Տիկնիկ", equivalent: "Տիկնիկս", icon: <Baby className="w-5 h-5" /> },
];

export default function SpanishTermsOfEndearment() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans p-4 md:p-12 flex flex-col items-center">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-500 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-yellow-400 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] right-[-5%] w-[30%] h-[30%] bg-orange-500 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-5xl w-full relative z-10">
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2 bg-red-50 rounded-full border-2 border-red-100 mb-6">
            <Sparkles className="w-5 h-5 text-red-500 animate-pulse" />
            <span className="text-sm font-black uppercase tracking-[0.3em] text-red-600">Իսպաներենի Դաս</span>
            <Sparkles className="w-5 h-5 text-red-500 animate-pulse" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter text-slate-900 mb-4">
            Սիրո և Քնքշանքի <span className="text-orange-500">Բառեր</span>
          </h1>
          <p className="text-xl font-bold text-slate-400 italic uppercase tracking-widest">
            Ինչպես դիմել սիրելիներին իսպաներենով
          </p>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Section 1: Basic Terms */}
          <motion.section
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-[3rem] p-8 md:p-10 shadow-[0_20px_50px_rgba(239,68,68,0.1)] border-4 border-red-50 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full -mr-16 -mt-16" />
            
            <div className="flex items-center gap-4 mb-10">
              <div className="w-14 h-14 bg-red-500 rounded-2xl flex items-center justify-center shadow-lg rotate-3">
                <Heart className="w-8 h-8 text-white fill-current" />
              </div>
              <h2 className="text-3xl font-black italic text-slate-800 tracking-tight">Հիմնական Դիմելաձևեր</h2>
            </div>

            <div className="space-y-4">
              {TERMS_GROUP_1.map((item, idx) => (
                <div key={idx} className="group bg-slate-50 hover:bg-red-50 p-6 rounded-3xl border-2 border-transparent hover:border-red-200 transition-all">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="p-2 bg-white rounded-xl shadow-sm text-red-500 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <h3 className="text-2xl font-black text-red-600 italic">{item.spanish}</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Բառացի</p>
                      <p className="font-bold text-slate-600">{item.literal}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Հայերեն համարժեք</p>
                      <p className="font-black text-orange-600">{item.equivalent}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Section 2: Sweet Terms */}
          <motion.section
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-[3rem] p-8 md:p-10 shadow-[0_20px_50px_rgba(245,158,11,0.1)] border-4 border-yellow-50 relative overflow-hidden"
          >
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-yellow-400/5 rounded-full -ml-16 -mb-16" />

            <div className="flex items-center gap-4 mb-10">
              <div className="w-14 h-14 bg-yellow-400 rounded-2xl flex items-center justify-center shadow-lg -rotate-3">
                <Star className="w-8 h-8 text-white fill-current" />
              </div>
              <h2 className="text-3xl font-black italic text-slate-800 tracking-tight">«Քաղցր» Դիմելաձևեր</h2>
            </div>

            <div className="space-y-4">
              {TERMS_GROUP_2.map((item, idx) => (
                <div key={idx} className="group bg-slate-50 hover:bg-yellow-50 p-6 rounded-3xl border-2 border-transparent hover:border-yellow-200 transition-all">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="p-2 bg-white rounded-xl shadow-sm text-yellow-500 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <h3 className="text-2xl font-black text-yellow-600 italic">{item.spanish}</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Բառացի</p>
                      <p className="font-bold text-slate-600">{item.literal}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Հայերեն համարժեք</p>
                      <p className="font-black text-orange-600">{item.equivalent}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        </div>

        {/* Footer Info */}
        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-6 bg-slate-50 px-10 py-4 rounded-full border-2 border-slate-100 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Red</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Orange</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-400 rounded-full" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Yellow</span>
            </div>
          </div>
          <p className="mt-6 text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">
            Spanish Terms of Endearment v1.0
          </p>
        </motion.footer>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        body { 
          font-family: 'Inter', sans-serif; 
          background: #ffffff;
          margin: 0;
        }
      `}} />
    </div>
  );
}
