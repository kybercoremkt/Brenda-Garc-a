import { Users, TrendingUp, Award, ShieldCheck } from 'lucide-react';

export default function TrustBanner() {
  return (
    <div className="bg-white border-b border-t border-slate-100 py-6 sm:py-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-6">
          <span className="text-xs sm:text-sm font-mono tracking-wider text-brand-blue-500 font-bold uppercase block">
            RESULTADOS COMPROBADOS DE MI ASESORÍA
          </span>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {/* Item 1 */}
          <div className="flex items-center space-x-3 justify-center md:justify-start">
            <div className="p-2 sm:p-2.5 bg-brand-blue-50 rounded-lg text-brand-blue-500 shrink-0">
              <Users className="w-5.5 h-5.5" />
            </div>
            <div>
              <span className="block font-mono text-xl sm:text-2xl font-bold text-brand-blue-600 leading-none mb-1">
                +1,000
              </span>
              <span className="text-sm text-brand-blue-900/80 font-semibold">
                Clientes activos
              </span>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex items-center space-x-3 justify-center md:justify-start">
            <div className="p-2 sm:p-2.5 bg-brand-blue-50 rounded-lg text-brand-blue-500 shrink-0">
              <TrendingUp className="w-5.5 h-5.5" />
            </div>
            <div>
              <span className="block font-mono text-xl sm:text-2xl font-bold text-brand-blue-600 leading-none mb-1">
                +$60 MDP
              </span>
              <span className="text-sm text-brand-blue-900/80 font-semibold">
                Invertidos por clientes
              </span>
            </div>
          </div>

          {/* Item 3 */}
          <div className="flex items-center space-x-3 justify-center md:justify-start">
            <div className="p-2 sm:p-2.5 bg-brand-blue-50 rounded-lg text-brand-blue-500 shrink-0">
              <Award className="w-5.5 h-5.5" />
            </div>
            <div>
              <span className="block font-mono text-xl sm:text-2xl font-bold text-brand-blue-600 leading-none mb-1">
                +6 Años
              </span>
              <span className="text-sm text-brand-blue-900/80 font-semibold">
                De experiencia real
              </span>
            </div>
          </div>

          {/* Item 4 */}
          <div className="flex items-center space-x-3 justify-center md:justify-start">
            <div className="p-2 sm:p-2.5 bg-brand-blue-50 rounded-lg text-brand-blue-500 shrink-0">
              <ShieldCheck className="w-5.5 h-5.5" />
            </div>
            <div>
              <span className="block font-mono text-xl sm:text-2xl font-bold text-brand-blue-600 leading-none mb-1">
                10%*
              </span>
              <span className="text-sm text-brand-blue-900/80 font-semibold">
                Rendimiento prom.
              </span>
            </div>
          </div>
        </div>

        <p className="text-[11px] text-brand-blue-600/70 italic mt-6 text-center max-w-2xl mx-auto leading-normal">
          * Rendimientos históricos promedio anual de los portafolios indexados de mis clientes, netos de comisiones. Las rentabilidades pasadas no garantizan rendimientos futuros.
        </p>
      </div>
    </div>
  );
}
