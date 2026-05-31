import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, CheckCircle2, PhoneCall } from 'lucide-react';
import { LeadRegistration } from '../types';

interface WhatsAppFloatingButtonProps {
  onSuccessLead: (newLead: LeadRegistration) => void;
}

export default function WhatsAppFloatingButton({ onSuccessLead }: WhatsAppFloatingButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorString, setErrorString] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorString('');

    if (!name.trim()) {
      setErrorString('Por favor, ingresa tu nombre.');
      return;
    }

    if (!phone.trim()) {
      setErrorString('Por favor, ingresa tu número de WhatsApp.');
      return;
    }

    // Clean phone number from non-digits for validation length
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorString('Por favor, introduce un número de al menos 10 dígitos.');
      return;
    }

    // Capture standard lead model defaults for consistency in Admin Dashboard
    const newLead: LeadRegistration = {
      id: `wa-lead-${Date.now()}`,
      name: name.trim(),
      phone: phone.trim(),
      email: `${name.trim().toLowerCase().replace(/\s+/g, '_')}@whatsapp.direct`,
      ageRange: '30_a_49', // default assumptions
      workHistory: 'despues_1997', // default assumptions
      taxRegime: 'asalariado_pfae', 
      monthlyBudget: '2000_5000',
      selectedTimeSlot: 'martes_6pm',
      status: 'eligible',
      timestamp: new Date().toISOString()
    };

    // Save lead so it registers in the main application state and local storage
    onSuccessLead(newLead);

    // Save also locally for backup
    try {
      const stored = localStorage.getItem('brenda_ppr_leads');
      const currentLeads = stored ? JSON.parse(stored) : [];
      localStorage.setItem('brenda_ppr_leads', JSON.stringify([...currentLeads, newLead]));
    } catch (err) {
      console.error('Error saving static backup WA lead:', err);
    }

    setIsSubmitted(true);

    // Format WA text
    const textMsg = `Hola Brenda! Me interesa agendar una Asesoría Directa sin costo para diseñar mi Plan Personal de Retiro (PPR). Mi nombre es ${name.trim()} y mi teléfono es ${phone.trim()}. ¡Quedo atento a tus comentarios!`;
    const waUrl = `https://wa.me/5215512345678?text=${encodeURIComponent(textMsg)}`;

    setTimeout(() => {
      // Open WhatsApp
      window.open(waUrl, '_blank');
      // Reset state and close modal
      setIsOpen(false);
      setName('');
      setPhone('');
      setIsSubmitted(false);
    }, 1500);
  };

  return (
    <>
      {/* Floating Button right-bottom */}
      <div className="fixed bottom-6 right-6 z-40 font-sans">
        <motion.button
          onClick={() => setIsOpen(true)}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#25D366] hover:bg-[#128C7E] text-white shadow-2xl p-4 sm:p-4.5 rounded-full flex items-center justify-center relative cursor-pointer group transition-all duration-300"
          title="Asesoría Directa WhatsApp"
        >
          {/* Pulsing indicator ring */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-35 animate-ping group-hover:animate-none" />
          
          <MessageSquare className="w-6.5 h-6.5 fill-current relative z-10" />
          
          {/* Left badge on hover on large screens */}
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-out whitespace-nowrap text-xs font-bold uppercase tracking-wider group-hover:ml-2 hidden sm:inline-block relative z-10">
            Asesoría Directa
          </span>

          {/* Active indicator dot */}
          <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-red-500 border-2 border-white rounded-full" />
        </motion.button>
      </div>

      {/* Pop-up modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 font-sans">
            {/* Modal Box animate */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 8 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden border border-slate-100"
            >
              
              {/* WhatsApp styled header */}
              <div className="bg-[#075e54] text-white px-5 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative w-10 h-10 rounded-full bg-white/20 overflow-hidden flex items-center justify-center border border-white/25">
                    <img
                      src="https://i.ibb.co/STrfSY7/1dea2c18b4178f76576092847fc02d76c057987f.png"
                      alt="Brenda García"
                      className="w-full h-full object-cover object-top scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#075e54] rounded-full" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm tracking-tight">Brenda García</h4>
                    <p className="text-[11px] text-emerald-100/90 font-medium">Asesora PPR • Disponible</p>
                  </div>
                </div>
                
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white p-1 rounded-full transition cursor-pointer"
                  title="Cerrar"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat bubble prompt */}
              <div className="bg-[#efeae2] px-4 py-5 space-y-4 relative">
                {/* Soft watermarks background */}
                <div className="absolute inset-0 opacity-[0.03] bg-repeat bg-[radial-gradient(#128c7e_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />

                <div className="relative bg-white rounded-r-xl rounded-bl-xl p-3 shadow-sm border border-slate-100 max-w-[90%] text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                  {/* Whatsapp tail triangle */}
                  <div className="absolute top-0 -left-1.5 w-0 h-0 border-t-[8px] border-t-white border-l-[8px] border-l-transparent" />
                  ¡Hola! ☕️ Por favor indícame tu nombre y WhatsApp para abrir tu chat privado directo conmigo e iniciar tu cotización personalizada.
                </div>
              </div>

              {/* Form Content */}
              <div className="p-5 bg-white">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {errorString && (
                      <div className="text-xs text-rose-600 bg-rose-50 border border-rose-100 p-2.5 rounded-lg flex items-center space-x-1.5 font-medium">
                        <span>⚠️</span>
                        <span>{errorString}</span>
                      </div>
                    )}

                    <div className="space-y-1">
                      <label htmlFor="wa-fullname" className="block text-xs font-bold text-brand-blue-600/90 uppercase tracking-wider">
                        Nombre Completo
                      </label>
                      <input
                        id="wa-fullname"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ej. Carlos Martínez"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#075e54]/50 focus:border-[#075e54] transition bg-slate-50/50 text-slate-800 font-medium"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="wa-whatsappno" className="block text-xs font-bold text-brand-blue-600/90 uppercase tracking-wider">
                        Tu Número de WhatsApp
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-semibold font-mono">
                          🇲🇽 +52
                        </span>
                        <input
                          id="wa-whatsappno"
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="10 dígitos (Ej. 55 1234 5678)"
                          className="w-full pl-15 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#075e54]/50 focus:border-[#075e54] transition bg-slate-50/50 text-slate-800 font-mono font-medium"
                        />
                      </div>
                      <span className="text-[10px] text-slate-500 block leading-tight pt-0.5">
                        Tus datos están protegidos y solo se usarán para tu cotización.
                      </span>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-3 px-5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition duration-200 flex items-center justify-center space-x-1.5 shadow-md hover:shadow-lg cursor-pointer mt-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Cotizar por WhatsApp</span>
                    </button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-6 text-center space-y-3"
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-50 rounded-full text-[#25D366] mb-1">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h5 className="font-bold text-slate-800 text-sm sm:text-base">
                      ¡Genial, {name.split(' ')[0]}!
                    </h5>
                    <p className="text-xs text-slate-600 leading-relaxed max-w-xs mx-auto">
                      Estamos generando tu cotización privada. Redirigiéndote a WhatsApp en segundos...
                    </p>
                    <div className="pt-2 flex justify-center">
                      <PhoneCall className="w-5 h-5 text-emerald-500 animate-bounce" />
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Minimal security seal bottom info block */}
              <div className="bg-slate-50/80 border-t border-slate-100 py-3 px-4 text-center">
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
                  🛡️ Conexión Directa Segura & Cifrada
                </span>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
