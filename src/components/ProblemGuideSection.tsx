import { useState } from 'react';
import { Calculator, CalendarClock, ChevronRight, CheckCircle2 } from 'lucide-react';

const brendaPortrait = "https://i.ibb.co/M5WjNQqD/app-1.png";

interface ProblemGuideSectionProps {
  onScrollToForm: () => void;
}

export default function ProblemGuideSection({ onScrollToForm }: ProblemGuideSectionProps) {
  const [salary, setSalary] = useState(30000);

  // Dynamic pension calculations
  const pprEstimate = Math.round(salary * 0.26);
  const gap = salary - pprEstimate;

  return (
    <section className="py-16 sm:py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ================= EL PROBLEMA ================= */}
        <div className="space-y-10 pb-14 border-b border-slate-100/40">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="font-display font-bold text-brand-blue-600 text-2xl sm:text-3xl tracking-tight leading-tight">
              ¿Sabías que el AFORE solo cubre el 26%?
            </h2>
            <p className="text-brand-blue-600/80 text-sm leading-relaxed">
              En promedio, recibirás solo el <span className="font-bold text-rose-600">26% de tu último sueldo</span> al jubilarte. Usa este simulador para estimar el déficit que deberás cubrir por tu cuenta.
            </p>
          </div>

          {/* Interactive IMSS Gap Slider */}
          <div className="max-w-3xl mx-auto bg-white border border-slate-100 rounded-2xl p-5 sm:p-7 shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              {/* Left Column: Slider */}
              <div className="md:col-span-7 space-y-4">
                <div className="flex items-center space-x-2">
                  <Calculator className="w-4.5 h-4.5 text-brand-blue-500" />
                  <span className="font-display font-bold text-brand-blue-600 text-sm sm:text-base">
                    Simulador de Brecha AFORE
                  </span>
                </div>

                {/* Salary Input Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center font-mono text-xs">
                    <span className="text-brand-blue-600/60 uppercase tracking-wider">Tu sueldo actual:</span>
                    <span className="text-base font-bold text-brand-blue-500">
                      ${salary.toLocaleString('en-US')} MXN
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10000"
                    max="100000"
                    step="5000"
                    value={salary}
                    onChange={(e) => setSalary(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-brand-blue-500"
                  />
                  <div className="flex justify-between text-[9px] text-brand-blue-600/50 font-mono">
                    <span>$10,000</span>
                    <span>$50,000</span>
                    <span>$100,000+</span>
                  </div>
                </div>

                {/* Reference shortcuts */}
                <div className="flex justify-between gap-1.5 pt-1">
                  <button onClick={() => setSalary(15000)} className={`flex-1 py-1.5 rounded-lg border text-[10px] font-semibold transition cursor-pointer ${salary === 15000 ? 'bg-brand-blue-500 border-brand-blue-500 text-white' : 'bg-white border-slate-100 text-brand-blue-600 hover:bg-slate-50'}`}>
                    Sueldo $15k
                  </button>
                  <button onClick={() => setSalary(30000)} className={`flex-1 py-1.5 rounded-lg border text-[10px] font-semibold transition cursor-pointer ${salary === 30000 ? 'bg-brand-blue-500 border-brand-blue-500 text-white' : 'bg-white border-slate-100 text-brand-blue-600 hover:bg-slate-50'}`}>
                    Sueldo $30k
                  </button>
                  <button onClick={() => setSalary(50000)} className={`flex-1 py-1.5 rounded-lg border text-[10px] font-semibold transition cursor-pointer ${salary === 50000 ? 'bg-brand-blue-500 border-brand-blue-500 text-white' : 'bg-white border-slate-100 text-brand-blue-600 hover:bg-slate-50'}`}>
                    Sueldo $50k
                  </button>
                </div>
              </div>

              {/* Right Column: Projections output */}
              <div className="md:col-span-5 bg-white rounded-xl p-4 border border-slate-100 shadow-sm space-y-3">
                <span className="text-[9px] text-brand-blue-600/50 font-mono tracking-widest block uppercase text-center border-b border-slate-50 pb-1.5 font-bold">
                  Tu Retiro Estimado
                </span>
                
                <div className="space-y-2.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-brand-blue-600/70">Pensión por AFORE (26%):</span>
                    <span className="font-mono font-bold text-emerald-600">
                      ${pprEstimate.toLocaleString('en-US')}
                    </span>
                  </div>

                  <div className="flex justify-between text-xs">
                    <span className="text-brand-blue-600/70">Déficit mensual:</span>
                    <span className="font-mono font-bold text-rose-600">
                      -${gap.toLocaleString('en-US')}
                    </span>
                  </div>

                  {/* Colored visual proportion bar */}
                  <div className="h-2.5 w-full bg-slate-50 rounded-full overflow-hidden flex">
                    <div className="bg-emerald-500/90" style={{ width: '26%' }} />
                    <div className="bg-rose-500/90" style={{ width: '74%' }} />
                  </div>
                </div>

                <div className="text-center pt-1.5 bg-rose-50/50 border border-rose-100/30 p-2 rounded-lg">
                  <p className="text-[10px] text-rose-700 font-semibold leading-normal font-sans">
                    Necesitas un plan personal para el retiro para complementar la diferencia.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ================= LA GUÍA ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-14">
          
          {/* Portrait Column */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-brand-blue-100 rounded-2xl rotate-2 opacity-50 scale-102" />
              <img
                src={brendaPortrait}
                alt="Brenda García - Asesora PPR"
                referrerPolicy="no-referrer"
                width={360}
                height={360}
                className="rounded-2xl border border-slate-200 bg-slate-50 shadow-md relative z-10 w-full max-w-[280px] sm:max-w-[320px] aspect-square object-cover"
              />
              
              {/* Overlay pill badge */}
              <div className="absolute -bottom-3 -right-3 bg-white border border-slate-200 rounded-xl p-3 shadow-md z-20 flex items-center space-x-2.5 max-w-[170px]">
                <div className="w-8 h-8 bg-brand-blue-50 text-brand-blue-600 rounded-lg flex items-center justify-center shrink-0 border border-brand-blue-100/60">
                  <CalendarClock className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-xs font-mono font-bold text-slate-900 leading-none">
                    +6 AÑOS
                  </span>
                  <span className="text-[10px] text-slate-500">
                    De experiencia 
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Details Column */}
          <div className="lg:col-span-7 space-y-4">
            <div className="space-y-1.5 font-display">
              <h3 className="font-display font-bold text-brand-blue-600 text-2xl sm:text-3xl tracking-tight leading-tight">
                Hola, soy Brenda García
              </h3>
            </div>

            <p className="text-brand-blue-600/80 text-sm leading-relaxed font-sans">
              Como tu asesora especializada, mi labor es simplificarte todo el panorama del retiro. No trabajo ligada a una marca aseguradora específica, por lo que comparo de forma 100% neutral y transparente para recomendarte el plan que mejor se adapte a tus metas y presupuesto.
            </p>

            {/* Compact credentials grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="bg-white border border-slate-100 rounded-xl p-3.5 space-y-1 shadow-sm">
                <span className="font-display font-bold text-xs sm:text-sm text-brand-blue-600 block flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue-500" />
                  <span>Soporte Permanente</span>
                </span>
                <span className="text-[13px] text-brand-blue-900/85 block leading-normal font-sans">
                  Te ofrezco atención continua para resolver cualquier duda con tu plan, declaraciones y aportaciones.
                </span>
              </div>
              
              <div className="bg-white border border-slate-100 rounded-xl p-3.5 space-y-1 shadow-sm">
                <span className="font-display font-bold text-xs sm:text-sm text-brand-blue-600 block flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue-500" />
                  <span>Análisis 100% Neutral</span>
                </span>
                <span className="text-[13px] text-brand-blue-900/85 block leading-normal font-sans">
                  Comparo de forma independiente entre múltiples aseguradoras para recomendarte lo que realmente te conviene.
                </span>
              </div>
            </div>

            <div className="pt-2 text-center sm:text-left">
              <button
                onClick={onScrollToForm}
                className="inline-flex items-center space-x-1.5 bg-brand-yellow hover:bg-brand-yellow-hover text-brand-blue-600 font-display font-bold text-xs px-6 py-3.5 rounded-full transition-all duration-250 shadow-sm cursor-pointer uppercase tracking-wider border border-brand-yellow-hover/40"
              >
                <span>Agendar mi Sesión Gratis</span>
                <ChevronRight className="w-4 h-4 text-brand-blue-600" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
