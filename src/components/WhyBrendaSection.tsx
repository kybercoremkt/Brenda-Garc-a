import { 
  TrendingUp, 
  Calendar, 
  ShieldCheck, 
  UserCheck, 
  HeartHandshake, 
  ChevronRight, 
  XOctagon, 
  Info
} from 'lucide-react';

interface WhyBrendaSectionProps {
  onScrollToForm: () => void;
}

export default function WhyBrendaSection({ onScrollToForm }: WhyBrendaSectionProps) {
  
  const rules = [
    {
      id: 'diff-1',
      icon: TrendingUp,
      badge: 'Rendimientos',
      title: 'Diferentes alternativas de inversión',
      desc: 'Dependiendo de tu edad, perfil de inversionista, puedes invertir en diferentes estrategias de inversión. No te quedes limitado a invertir en udis o dólares, hay más alternativas de inversión en fondos indexados.',
      note: '* Las alternativas sugeridas incluyen portafolios indexados (S&P500). El rendimiento dependerá del perfil y estrategia seleccionada.',
      contrastTitle: 'Otros PPR',
      contrastDesc: 'Rendimientos bajos (5%-6%) que casi no ganan a la inflación, con comisiones altas.'
    },
    {
      id: 'diff-2',
      icon: Calendar,
      badge: 'Flexibilidad',
      title: 'Ahorro flexible y adaptable',
      desc: 'Entre más años inviertas, más dinero tendrás para tu retiro, sin embargo, es muy importante contar con un plan flexible que te permita adaptar tus aportaciones de acuerdo a tu situación.',
      note: '',
      contrastTitle: 'Otros PPR tradicionales',
      contrastDesc: 'Plazos forzosos sumamente estrictos con penalizaciones muy altas.'
    },
    {
      id: 'diff-3',
      icon: ShieldCheck,
      badge: 'Transparencia',
      title: 'Sin seguros forzosos ocultos',
      desc: 'Evita adquirir productos que merman tu ahorro mensual de manera forzada. Tu dinero se enfoca enteramente en crecer.',
      note: '',
      contrastTitle: 'Vendedores de aseguradoras',
      contrastDesc: 'Te fuerzan a agregar seguros caros e innecesarios de los cuales dependen sus comisiones.'
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-white border-t border-slate-100/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <h2 className="font-display font-bold text-brand-blue-600 text-2xl sm:text-3xl tracking-tight leading-tight">
            Comparo por ti de forma neutral y sin sesgos
          </h2>
          <p className="text-brand-blue-600/70 text-sm">
            Analizo de forma transparente las diferentes alternativas respaldadas del mercado para recomendarte la ideal de acuerdo a tus ingresos y futuro.
          </p>
        </div>

        {/* Comparativa Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* Column Left: Differentiators */}
          <div className="space-y-4">

            {rules.map((rule) => {
              const Icon = rule.icon;
              return (
                <div 
                  key={rule.id}
                  className="bg-white border border-slate-100 hover:border-brand-blue-300 transition-all rounded-xl p-4 sm:p-5 space-y-2 shadow-sm"
                >
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8.5 h-8.5 rounded-lg bg-brand-blue-50 text-brand-blue-500 flex items-center justify-center shrink-0 border border-brand-blue-500/20">
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                    <span className="text-[9px] font-mono tracking-wider text-brand-blue-500 uppercase font-bold bg-brand-blue-50 px-2.5 py-0.5 rounded border border-brand-blue-100/50">
                      {rule.badge}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-sm sm:text-base text-brand-blue-600">
                    {rule.title}
                  </h3>

                  <p className="text-brand-blue-600/75 text-xs leading-relaxed font-sans">
                    {rule.desc}
                  </p>

                  {rule.note && (
                    <div className="flex items-start space-x-1.5 text-[9px] text-brand-blue-600/50 italic bg-slate-50 p-1.5 rounded-lg border border-slate-100/40">
                      <Info className="w-3.5 h-3.5 text-brand-blue-500 shrink-0 mt-0.5" />
                      <span>{rule.note}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Column Right: What to Avoid */}
          <div className="space-y-4">

            <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-100 shadow-sm space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono tracking-widest text-rose-500 block font-bold uppercase">
                  Alertas Clave
                </span>
                <h4 className="font-display font-bold text-base sm:text-lg text-brand-blue-600">
                  ¿Por qué una asesoría conmigo?
                </h4>
                <p className="text-xs text-brand-blue-600/70 leading-relaxed font-sans">
                  Contratar tu PPR requiere una institución confiable, estructura del plan adecuada y un asesor que resuelva todas tus dudas. Compara opciones para evitar comisiones elevadas, contratos forzosos y nula neutralidad.
                </p>
              </div>

              {/* Bad list */}
              <div className="space-y-3 pt-3 border-t border-slate-100/40">
                {rules.map((rule) => (
                  <div key={`bad-${rule.id}`} className="bg-rose-50/20 border border-rose-100/30 rounded-xl p-3 flex items-start space-x-3 text-brand-blue-600/85">
                    <div className="w-5.5 h-5.5 bg-rose-100/60 text-rose-600 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <XOctagon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-rose-800 uppercase font-mono leading-none">
                        {rule.contrastTitle}
                      </span>
                      <span className="block text-[11px] text-brand-blue-600/60 mt-1 leading-normal font-sans">
                        {rule.contrastDesc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* CTA */}
        <div className="flex justify-center pt-2">
          <button
            onClick={onScrollToForm}
            className="inline-flex items-center space-x-1.5 bg-brand-yellow hover:bg-brand-yellow-hover text-brand-blue-600 border border-brand-yellow-hover/40 font-display font-bold px-6 py-3.5 rounded-full text-xs transition-all duration-200 shadow-sm cursor-pointer uppercase tracking-wider"
          >
            <span>Agendar Asesoría</span>
            <ChevronRight className="w-4 h-4 text-brand-blue-600 font-bold" />
          </button>
        </div>

      </div>
    </section>
  );
}
