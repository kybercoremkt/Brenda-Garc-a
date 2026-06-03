import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, TrendingUp, Users, Calendar, Award } from 'lucide-react';
import LeadForm from './LeadForm';
import { LeadRegistration } from '../types';

interface HeroSectionProps {
  onSuccessLead: (lead: LeadRegistration) => void;
  formRef: React.RefObject<HTMLDivElement | null>;
}

export default function HeroSection({ onSuccessLead, formRef }: HeroSectionProps) {
  return (
    <section className="relative pt-32 pb-16 sm:pb-24 overflow-hidden bg-white border-b border-slate-150/60">
      {/* Decorative colored lights in the background (very minimal, light style elements) */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-brand-blue-300/10 rounded-full blur-[100px] pointer-events-none -translate-x-1/2" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-brand-blue-400/5 rounded-full blur-[120px] pointer-events-none translate-x-1/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading and Copys */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Headline */}
            <h1 className="font-display font-bold text-brand-blue-600 text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight">
              Plan Personal para el <span className="text-brand-blue-500">Retiro</span>
            </h1>

            {/* Subheadline */}
            <div className="space-y-4 text-brand-blue-600/80 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0">
              <p>
                Te ayudo a conocer cuánto podrías construir para tu retiro con una estrategia personalizada, flexible y diseñada según tus metas.
              </p>
              <p className="text-slate-500 text-sm">
                En esta asesoría revisaremos qué tipo de PPR puede hacer sentido para ti, cuánto podrías aportar y cómo empezar a planear tu retiro de forma clara.
              </p>
            </div>

            {/* Brenda Presentation Hero Image with useful overlaid cards on her desk */}
            <motion.div 
               initial={{ opacity: 0, y: 15 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, delay: 0.1 }}
               className="relative mt-8 mx-auto lg:mx-0 w-full max-w-xl rounded-2xl overflow-hidden border border-slate-100/80 shadow-md bg-white"
            >
              <img 
                src="https://i.ibb.co/STrfSY7/1dea2c18b4178f76576092847fc02d76c057987f.png" 
                alt="Brenda García - Tu Asesora Patrimonial"
                className="w-full h-auto object-contain block"
                referrerPolicy="no-referrer"
              />
              
              {/* Overlaid visual value cards on the desk area - hidden on mobile so they don't cover her portrait */}
              <div className="hidden sm:grid absolute bottom-4 left-4 right-4 grid-cols-2 gap-3 pointer-events-none z-20">
                <div className="bg-white/95 backdrop-blur-xs border border-brand-blue-100/40 rounded-xl p-3 shadow-md text-center flex flex-col justify-center">
                  <span className="block text-brand-blue-600 font-bold text-xs sm:text-sm font-display">Asesoría 100% Neutral</span>
                  <span className="text-[10px] sm:text-xs text-brand-blue-600/75 block mt-0.5 leading-tight font-medium">Sin exclusividad de marca</span>
                </div>
                <div className="bg-white/95 backdrop-blur-xs border border-brand-blue-100/40 rounded-xl p-3 shadow-md text-center flex flex-col justify-center">
                  <span className="block text-brand-blue-600 font-bold text-xs sm:text-sm font-display">Estudio Personalizado</span>
                  <span className="text-[10px] sm:text-xs text-brand-blue-600/75 block mt-0.5 leading-tight font-medium">Optimizado para tus metas</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Lead Form */}
          <div ref={formRef} className="lg:col-span-5 relative">
            <div className="absolute inset-0 bg-brand-blue-500/5 rounded-2xl blur-xl" />
            <LeadForm onSuccess={onSuccessLead} />
          </div>

        </div>
      </div>
    </section>
  );
}
