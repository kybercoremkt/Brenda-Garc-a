import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, MessageSquare, ArrowRight, Video, FileText, CheckCircle } from 'lucide-react';
import { FAQItem } from '../types';

interface FaqSectionProps {
  onScrollToForm: () => void;
}

export default function FaqSection({ onScrollToForm }: FaqSectionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const faqs: FAQItem[] = [
    {
      id: 'faq-1',
      question: '¿La asesoría es realmente gratuita?',
      answer: 'Sí, la sesión inicial de diagnóstico es 100% libre de costo y no genera ningún compromiso de contratación.'
    },
    {
      id: 'faq-2',
      question: '¿Qué es un PPR y para qué sirve?',
      answer: 'Un Plan Personal de Retiro te permite ahorrar e invertir a largo plazo contra la inflación, acumular interés compuesto y hacer tus aportaciones deducibles de impuestos.'
    },
    {
      id: 'faq-3',
      question: '¿Necesito conocimientos financieros previos?',
      answer: 'No. El análisis se explica con peras y manzanas de manera clara y con ejemplos prácticos de la vida real, libre de tecnicismos bancarios complejos.'
    },
    {
      id: 'faq-4',
      question: '¿Por qué preguntan sobre el año de cotización?',
      answer: 'Para identificar si te corresponde el régimen de la Ley 73 o la Ley 97 del IMSS. Esto define por completo la estrategia que debes seguir.'
    },
    {
      id: 'faq-5',
      question: '¿Cuánto dura la sesión y cómo se realiza?',
      answer: 'Dura aproximadamente 30 minutos. Se efectúa por videollamada de forma remota, cómoda y ágil desde donde estés.'
    },
    {
      id: 'faq-6',
      question: '¿Por qué propones marcas independientes?',
      answer: 'Al no trabajar casada con una sola aseguradora, analizo y comparo el mercado sin sesgos ni favoritismos para recomendarte de forma transparente lo que realmente te conviene.'
    }
  ];

  const handleToggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-14 sm:py-16 bg-white border-t border-slate-100/30 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center space-y-2 mb-10">
            <h2 className="font-display font-bold text-brand-blue-600 text-2xl tracking-tight">
              Dudas Comunes
            </h2>
          </div>

          <div className="space-y-2 font-sans">
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div 
                  key={faq.id}
                  className="bg-white border border-slate-100 rounded-xl overflow-hidden transition-all shadow-sm"
                >
                  <button
                    onClick={() => handleToggle(faq.id)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between space-x-4 cursor-pointer focus:outline-none"
                  >
                    <div className="flex items-center space-x-3 text-brand-blue-600">
                      <HelpCircle className="w-4.5 h-4.5 text-brand-blue-500 shrink-0" />
                      <span className="font-display font-bold text-sm text-brand-blue-600/90">
                        {faq.question}
                      </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-brand-blue-600/40 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-brand-blue-500' : ''}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-brand-blue-600/80 leading-relaxed border-t border-slate-100/50 pt-3.5 bg-slate-50/20 font-sans">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Minimalist CTA card */}
        <div className="max-w-3xl mx-auto mt-14">
          <div className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 text-center shadow-md relative overflow-hidden font-sans">
            <div className="absolute top-0 left-0 right-0 h-1 bg-brand-blue-500" />

            <div className="space-y-4 relative z-10">
              <h3 className="font-display font-bold text-brand-blue-600 text-xl sm:text-2xl tracking-tight">
                Toma el control hoy mismo
              </h3>

              <p className="text-brand-blue-600/70 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
                Agenda tu sesión gratuita de 30 minutos. Descubre cómo potenciar tus finanzas y estructurar un retiro sólido con herramientas de rendimiento y deducciones fiscales.
              </p>

              {/* Action buttons */}
              <div className="pt-2 flex justify-center">
                <button
                  onClick={onScrollToForm}
                  className="w-full sm:w-auto bg-brand-yellow hover:bg-brand-yellow-hover text-brand-blue-600 border border-brand-yellow-hover/40 font-display font-bold text-xs px-8 py-3.5 rounded-full transition-all duration-150 inline-flex items-center justify-center space-x-2 shadow-sm cursor-pointer uppercase tracking-wider"
                >
                  <span>Agendar Sesión Gratis</span>
                  <ArrowRight className="w-4 h-4 text-brand-blue-600 font-bold" />
                </button>
              </div>

              {/* Core quick indicators */}
              <div className="pt-2 flex flex-wrap justify-center gap-y-1 gap-x-4 text-[10px] text-brand-blue-600/50 font-mono">
                <span className="flex items-center space-x-1">
                  <CheckCircle className="w-3.5 h-3.5 text-brand-blue-500" />
                  <span>100% Libre de costo</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Video className="w-3.5 h-3.5 text-brand-blue-500" />
                  <span>Sesión Online 30m</span>
                </span>
                <span className="flex items-center space-x-1">
                  <FileText className="w-3.5 h-3.5 text-brand-blue-500" />
                  <span>Estudio Personalizado</span>
                </span>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
