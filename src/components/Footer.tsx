import { useState } from 'react';
import { Shield, Mail, Phone, Lock, X } from 'lucide-react';

interface FooterProps {
  onScrollToFaq: () => void;
  onOpenDashboard: () => void;
  leadsCount: number;
}

export default function Footer({ onScrollToFaq, onOpenDashboard, leadsCount }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <footer className="bg-white border-t border-slate-100/30 text-brand-blue-600/70 py-10 relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-b border-slate-100 pb-8 mb-8">
          
          {/* Column 1: Info and brand */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center space-x-2">
              <img 
                src="https://i.ibb.co/kVnQXs3b/Union-1.png" 
                alt="Logo Brenda García" 
                className="h-10 w-auto object-contain" 
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-xs text-brand-blue-600/70 leading-relaxed max-w-sm">
              Asesora patrimonial independiente especializada en retiro. Comprometida con la transparencia, neutralidad y solidez de tu futuro financiero.
            </p>
          </div>

          {/* Column 2: Legal Contacts */}
          <div className="md:col-span-4 space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-[#00157F]/60 block uppercase font-bold">Contacto</span>
            <div className="space-y-1.5 text-xs text-brand-blue-605">
              <a 
                href="https://wa.me/527293080780" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center space-x-2 hover:text-[#0046EB] transition text-brand-blue-600"
              >
                <Phone className="w-3.5 h-3.5 text-brand-blue-500 shrink-0" />
                <span>+52 729 308 0780</span>
              </a>
              <a 
                href="mailto:asesoria@brendagarcia.mx" 
                className="flex items-center space-x-2 hover:text-[#0046EB] transition text-brand-blue-600"
              >
                <Mail className="w-3.5 h-3.5 text-brand-blue-500 shrink-0" />
                <span>asesoria@brendagarcia.mx</span>
              </a>
            </div>
          </div>

          {/* Column 3: Links */}
          <div className="md:col-span-3 space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-[#00157F]/60 block uppercase font-bold">Opciones</span>
            <div className="flex flex-col space-y-1.5 text-xs text-brand-blue-605">
              <button 
                onClick={onScrollToFaq} 
                className="text-left hover:text-[#0046EB] transition cursor-pointer text-brand-blue-600"
              >
                Preguntas frecuentes
              </button>
              <button 
                onClick={() => setShowPrivacy(true)}
                className="text-left hover:text-[#0046EB] transition cursor-pointer text-brand-blue-600"
              >
                Aviso de privacidad
              </button>
              
              {/* Subtle Dashboard Access Badge */}
              <button
                onClick={onOpenDashboard}
                className="text-left flex items-center space-x-1 p-1 rounded hover:bg-slate-50 group cursor-pointer transition text-[10px] font-mono text-brand-blue-604 text-brand-blue-600/60 hover:text-brand-blue-600"
                title="Consola de Leads"
              >
                <Lock className="w-3 h-3 text-brand-blue-500 shrink-0" />
                <span>Consola</span>
              </button>
            </div>
          </div>

        </div>

        {/* Modal-like dialog for Privacy Notice */}
        {showPrivacy && (
          <div className="fixed inset-0 z-50 bg-brand-blue-900/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-6 border border-slate-100 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-display font-bold text-sm text-brand-blue-600">Aviso de Privacidad</span>
                <button 
                  onClick={() => setShowPrivacy(false)}
                  className="p-1 rounded-full hover:bg-slate-100 text-brand-blue-500 transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-brand-blue-600/80 leading-relaxed">
                Tus datos fiscales, financieros y de contacto están debidamente protegidos conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP). Brenda García utiliza esta información únicamente para el diseño de tu estudio financiero de retiro personalizado, sin compartirla con terceros ni comercializarla.
              </p>
              <div className="flex justify-end pt-1">
                <button 
                  onClick={() => setShowPrivacy(false)}
                  className="px-4 py-2 bg-brand-blue-600 hover:bg-brand-blue-700 text-white font-bold text-[11px] rounded-lg transition uppercase tracking-wider cursor-pointer font-display"
                >
                  Entendido
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Legal backing & Copyright notices */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-brand-blue-650/50 text-brand-blue-600/50 text-[10px]">
          <p className="text-center md:text-left leading-relaxed max-w-2xl">
            * Planes respaldados exclusivamente por aseguradoras autorizadas y reguladas supervisadas por la CNSF y SHCP en México.
          </p>
          <p className="text-center md:text-right shrink-0">
            &copy; {currentYear} Brenda García. Todos los derechos reservados.
          </p>
        </div>

      </div>
    </footer>
  );
}
