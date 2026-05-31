import { Calendar, ArrowRight } from 'lucide-react';

interface TargetSeriesSectionProps {
  onScrollToForm: () => void;
}

export default function TargetSeriesSection({ onScrollToForm }: TargetSeriesSectionProps) {
  
  const profiles = [
    {
      id: 'profile-1',
      emoji: '💼',
      title: 'Deducción de Impuestos (ISR)',
      desc: 'Aprende a deducir legalmente hasta $152,000 MXN anuales de tus aportaciones.'
    },
    {
      id: 'profile-2',
      emoji: '🏦',
      title: 'Incertidumbre de tu AFORE',
      desc: 'Calcula cuánto te faltará para mantener tu nivel de vida actual y cómo solucionarlo.'
    },
    {
      id: 'profile-3',
      emoji: '📈',
      title: 'Inversión de Alto Rendimiento',
      desc: 'Optimiza tus ahorros con rendimientos históricos competitivos e interés compuesto.'
    },
    {
      id: 'profile-4',
      emoji: '⏳',
      title: 'Edad entre 30 y 49 años',
      desc: 'Aprovecha tu etapa más productiva para acumular un capital blindado.'
    }
  ];

  return (
    <section className="py-14 sm:py-16 bg-white border-t border-slate-100/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ================= SECCIÓN: PERFILES ================= */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="font-display font-bold text-brand-blue-600 text-2xl sm:text-3xl tracking-tight leading-tight">
              ¿Esta asesoría es para ti?
            </h2>
            <p className="text-brand-blue-600/70 text-sm max-w-lg mx-auto font-sans">
              Si buscas proteger tu futuro, reducir impuestos o invertir de forma inteligente, una planeación conmigo es tu paso ideal.
            </p>
          </div>

          {/* Profiles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {profiles.map((p) => (
              <div 
                key={p.id}
                className="bg-white border border-slate-200/60 rounded-xl p-4 hover:border-brand-blue-200 transition-all flex items-start space-x-3 shadow-sm"
              >
                <div className="text-xl bg-slate-50 p-2 rounded-lg border border-slate-200 shrink-0">
                  {p.emoji}
                </div>
                <div className="space-y-0.5">
                  <h3 className="font-display font-bold text-sm text-brand-blue-600">
                    {p.title}
                  </h3>
                  <p className="text-brand-blue-600/70 text-xs leading-normal">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Schedule Notice */}
          <div className="max-w-sm mx-auto bg-white border border-slate-100 rounded-xl p-3.5 text-center space-y-2 shadow-sm font-sans">
            <div className="flex items-center justify-center space-x-1.5 text-[10px] text-brand-blue-600/50 font-mono font-bold">
              <Calendar className="w-3.5 h-3.5 text-brand-blue-500" />
              <span>HORARIOS DISPONIBLES</span>
            </div>
            <div className="flex flex-wrap justify-center gap-1">
              <span className="bg-white text-brand-blue-600 font-bold text-[10px] py-1 px-2.5 rounded border border-slate-100">Lun 11:00 AM</span>
              <span className="bg-white text-brand-blue-600 font-bold text-[10px] py-1 px-2.5 rounded border border-slate-100">Mar 6:00 PM</span>
              <span className="bg-white text-brand-blue-600 font-bold text-[10px] py-1 px-2.5 rounded border border-slate-100">Jue 6:00 PM</span>
            </div>
          </div>

          {/* Action button */}
          <div className="flex justify-center pt-2">
            <button
              onClick={onScrollToForm}
              className="inline-flex items-center space-x-1.5 bg-brand-yellow hover:bg-brand-yellow-hover text-brand-blue-600 border border-brand-yellow-hover/40 font-display font-bold text-xs px-6 py-3.5 rounded-full transition-all duration-200 shadow-sm cursor-pointer uppercase tracking-wider"
            >
              <span>Agendar mi Asesoría Gratis</span>
              <ArrowRight className="w-4 h-4 text-brand-blue-600 font-bold" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
