import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle, Calendar, MessageSquare, ArrowLeft, Shield, X, Zap } from 'lucide-react';
import { LeadRegistration } from '../types';

export default function GraciasPage() {
  const [lead, setLead] = useState<LeadRegistration | null>(null);
  const [isCalOpen, setIsCalOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('brenda_ppr_leads');
      if (stored) {
        const leads: LeadRegistration[] = JSON.parse(stored);
        // Find latest eligible lead
        const eligibleLeads = leads.filter(l => l.status === 'eligible');
        if (eligibleLeads.length > 0) {
          // Get the most recent one
          const sorted = eligibleLeads.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
          setLead(sorted[0]);
        }
      }
    } catch (e) {
      console.error('Error loading lead on GraciasPage:', e);
    }
  }, []);

  const formatTimeSlot = (slot: LeadRegistration['selectedTimeSlot']) => {
    const maps = {
      lunes_11am: 'Lunes a las 11:00 AM (Hora CDMX)',
      martes_6pm: 'Martes a las 6:00 PM (Hora CDMX)',
      jueves_6pm: 'Jueves a las 6:00 PM (Hora CDMX)',
    };
    return maps[slot] || '';
  };

  const getNextDateForSlot = (slot: string): Date => {
    const now = new Date();
    let targetDay = 1; // Default Monday
    let targetHour = 11;

    if (slot === 'martes_6pm') {
      targetDay = 2; // Tuesday
      targetHour = 18;
    } else if (slot === 'jueves_6pm') {
      targetDay = 4; // Thursday
      targetHour = 18;
    }

    const resultDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const currentDay = resultDate.getDay(); // 0 is Sunday, 1 is Monday...
    let daysToAdd = (targetDay - currentDay + 7) % 7;
    if (daysToAdd === 0 && now.getHours() >= targetHour) {
      daysToAdd = 7;
    }
    resultDate.setDate(resultDate.getDate() + daysToAdd);
    resultDate.setHours(targetHour, 0, 0, 0);
    return resultDate;
  };

  const handleBackToLanding = () => {
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new Event('popstate'));
  };

  // Default values check
  const name = lead?.name || 'Interesado';
  const phone = lead?.phone || '';
  const email = lead?.email || '';
  const slot = lead?.selectedTimeSlot || 'lunes_11am';

  const friendlySlotWord = formatTimeSlot(slot);
  const targetDate = getNextDateForSlot(slot);

  const dayName = targetDate.toLocaleDateString('es-MX', { weekday: 'long' });
  const capitalizedDayName = dayName.charAt(0).toUpperCase() + dayName.slice(1);
  const dayNum = targetDate.getDate();
  const monthName = targetDate.toLocaleDateString('es-MX', { month: 'long' });
  const formattedHours = targetDate.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
  const friendlyDateString = `${capitalizedDayName} ${dayNum} de ${monthName} • ${formattedHours}`;

  const endDate = new Date(targetDate.getTime() + 30 * 60000); // 30 mins later

  // Pad helper for strings
  const padVal = (n: number) => n.toString().padStart(2, '0');
  const formatLocalGcal = (d: Date) => {
    return `${d.getFullYear()}${padVal(d.getMonth() + 1)}${padVal(d.getDate())}T${padVal(d.getHours())}${padVal(d.getMinutes())}${padVal(d.getSeconds())}`;
  };

  const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Asesoría de Retiro PPR - Brenda García')}&dates=${formatLocalGcal(targetDate)}/${formatLocalGcal(endDate)}&details=${encodeURIComponent('¡Hola! Esta es tu sesión virtual de 30 minutos sin costo con Brenda García para diseñar tu Plan Personal de Retiro privado. Brenda te contactará por WhatsApp para enviarte el link de acceso.')}&location=${encodeURIComponent('Videollamada de WhatsApp / Google Meet')}&ctz=America/Mexico_City`;
  
  const outlookUrl = `https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&subject=${encodeURIComponent('Asesoría de Retiro PPR - Brenda García')}&startdt=${targetDate.toISOString()}&enddt=${endDate.toISOString()}&body=${encodeURIComponent('¡Hola! Esta es tu sesión virtual de 30 minutos sin costo con Brenda García para diseñar tu Plan Personal de Retiro privado. Brenda te contactará por WhatsApp para enviarte el link de acceso.')}&location=${encodeURIComponent('Videollamada de WhatsApp / Google Meet')}`;

  const formatUtc = (d: Date) => {
    return d.getUTCFullYear() +
      padVal(d.getUTCMonth() + 1) +
      padVal(d.getUTCDate()) + 'T' +
      padVal(d.getUTCHours()) +
      padVal(d.getUTCMinutes()) +
      padVal(d.getUTCSeconds()) + 'Z';
  };

  const stamp = formatUtc(new Date());
  const start = formatUtc(targetDate);
  const end = formatUtc(endDate);

  const icsStr = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Brenda Garcia Asesoria//PPR Retiro//ES',
    'BEGIN:VEVENT',
    `UID:appt-${Date.now()}@brendagarcia.mx`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    'SUMMARY:Asesoría de Retiro PPR - Brenda García',
    'DESCRIPTION:Sesión personalizada de 30 minutos sin costo para diseñar tu Plan Personal de Retiro privado.',
    'LOCATION:Videollamada de WhatsApp / Google Meet',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const appleUrl = `data:text/calendar;charset=utf8,${encodeURIComponent(icsStr)}`;

  const generateSuccessWaLink = () => {
    const defaultNumber = '527293080780';
    const text = `Hola Brenda! Acabo de agendar mi Asesoría de Retiro en el horario de ${friendlySlotWord}. Mi nombre es ${name} y mi WhatsApp registrado es ${phone}. Quisiera confirmar mi videollamada para mi sesión. ¡Muchas gracias!`;
    return `https://wa.me/${defaultNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="relative min-h-screen bg-slate-50 flex flex-col justify-between text-slate-800 font-sans">
      {/* Background soft ambiance */}
      <div className="absolute top-0 left-1/2 w-[800px] h-[500px] bg-brand-blue-500/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/2" />

      {/* Header Bar */}
      <header className="bg-white border-b border-slate-100 py-4 shadow-sm relative z-20">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img 
              src="https://i.ibb.co/kVnQXs3b/Union-1.png" 
              alt="Logo Brenda García" 
              className="h-9 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <button 
            onClick={handleBackToLanding}
            className="flex items-center space-x-1 text-xs text-brand-blue-600 bg-brand-blue-50 hover:bg-brand-blue-100/80 px-3.5 py-1.5 rounded-full font-bold transition duration-200"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver a Inicio</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow max-w-2xl w-full mx-auto px-4 py-12 relative z-10 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white border border-slate-150 rounded-2xl p-6 sm:p-10 text-center shadow-xl shadow-slate-200/50 space-y-8 w-full"
        >
          {/* Animated emerald circle */}
          <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto border border-emerald-100 shadow-inner animate-pulse">
            <CheckCircle className="w-10 h-10" />
          </div>

          <div className="space-y-3">
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 leading-tight">
              ¡Tu Asesoría de Retiro ha sido Agendada!
            </h1>
            <p className="text-emerald-700 font-mono text-[10px] tracking-widest uppercase bg-emerald-50 border border-emerald-100 py-1.5 px-4 rounded-full inline-block font-semibold">
              Estatus: Confirmación Pendiente de Validación
            </p>
            <p className="text-slate-500 text-sm max-w-md mx-auto leading-relaxed">
              Hola <span className="font-semibold text-slate-800">{name}</span>, hemos registrado tus respuestas exitosamente. Tu perfil califica para nuestra estrategia premium.
            </p>
          </div>

          {/* Reserved Schedule Box */}
          <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-200 text-left space-y-4">
            <div>
              <p className="text-xs text-slate-400 uppercase font-mono font-bold tracking-wider">Lugar y Fecha Virtual:</p>
              <div className="flex items-center space-x-2.5 mt-1.5 text-slate-850 font-bold text-base sm:text-lg">
                <Calendar className="w-5.5 h-5.5 text-brand-blue-500 shrink-0" />
                <span>{friendlyDateString}</span>
              </div>
            </div>

            <div className="border-t border-slate-200/60 pt-3.5 space-y-1.5">
              <p className="text-xs text-slate-505 leading-relaxed">
                • Vía de llamada: <strong>Videollamada de WhatsApp / Google Meet</strong>
              </p>
              {phone && (
                <p className="text-xs text-slate-550 leading-relaxed">
                  • Teléfono registrado: <strong>{phone}</strong>
                </p>
              )}
              {email && (
                <p className="text-xs text-slate-550 leading-relaxed">
                  • Correo de recordatorio: <strong>{email}</strong>
                </p>
              )}
              <p className="text-xs text-slate-500 leading-relaxed italic pt-1.5 block">
                Te enviaremos los accesos de la sala y tu Estudio Comparativo en formato PDF directamente a tu WhatsApp.
              </p>
            </div>
          </div>

          {/* Calendar integration section */}
          <div className="bg-slate-50/50 rounded-2xl p-5 border border-slate-100 text-left space-y-3.5">
            <p className="text-xs text-slate-650 font-bold flex items-center space-x-1.5">
              <span>📅</span>
              <span>Añade el evento para recordarlo fácilmente:</span>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <a
                href={googleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 text-center flex items-center justify-center space-x-2 transition duration-150 shadow-xs"
              >
                <span>🌐</span>
                <span>Google Calendar</span>
              </a>
              <a
                href={outlookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 text-center flex items-center justify-center space-x-2 transition duration-150 shadow-xs"
              >
                <span>📧</span>
                <span>Outlook / Live</span>
              </a>
              <a
                href={appleUrl}
                download="retirora-asesoria-con-brenda.ics"
                className="px-3.5 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 text-center flex items-center justify-center space-x-2 transition duration-150 shadow-xs"
              >
                <span>🍏</span>
                <span>Apple iCal</span>
              </a>
            </div>
          </div>

          {/* WhatsApp Direct Confirmation */}
          <div className="space-y-4 pt-2">
            <div className="space-y-3">
              <a
                href={generateSuccessWaLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25d366] hover:bg-[#20ba56] text-white font-display font-semibold py-4 px-6 rounded-full transition-all duration-200 flex items-center justify-center space-x-3 shadow-lg shadow-green-500/10 cursor-pointer text-sm sm:text-base"
              >
                <MessageSquare className="w-5.5 h-5.5 fill-current" />
                <span>Confirmar de inmediato por WhatsApp</span>
              </a>
              <p className="text-[11px] text-slate-400 max-w-sm mx-auto leading-normal">
                Al confirmar por WhatsApp, el sistema de asignación de Brenda validará tu número y te asignará prioridad de inmediato.
              </p>
            </div>

            {/* Separator / Divider */}
            <div className="flex items-center justify-center space-x-2 my-2 py-1">
              <div className="h-[1px] bg-slate-150 flex-grow max-w-[80px]" />
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 font-mono">O BIEN</span>
              <div className="h-[1px] bg-slate-150 flex-grow max-w-[80px]" />
            </div>

            {/* Cal.com popup trigger */}
            <div className="space-y-3">
              <button
                onClick={() => setIsCalOpen(true)}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-display font-semibold py-4 px-6 rounded-full transition-all duration-200 flex items-center justify-center space-x-3 shadow-lg shadow-slate-900/10 cursor-pointer text-sm sm:text-base border border-slate-850"
              >
                <Zap className="w-5 h-5 text-amber-400 fill-current" />
                <span>No puedo esperar, quiero una reunión de 15min ahora</span>
              </button>
              <p className="text-[11px] text-[#00157F]/60 max-w-sm mx-auto leading-normal">
                Agenda directamente en el calendario oficial sin esperar la confirmación de filtros manuales.
              </p>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Cal.com Modal Popup Overlay */}
      {isCalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-3 transition-all duration-300">
          <div className="bg-white w-full max-w-3xl h-[85vh] rounded-2xl overflow-hidden shadow-2xl relative flex flex-col border border-slate-150 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex justify-between items-center px-5 py-4 border-b border-slate-100 bg-slate-50/80 backdrop-blur-sm">
              <div className="flex items-center space-x-2">
                <span className="p-1 px-2.5 bg-brand-blue-100 text-brand-blue-600 rounded-full text-[10px] font-semibold font-mono tracking-wide uppercase">
                  Fast Track ⚡
                </span>
                <span className="text-sm font-bold text-slate-850 hidden sm:inline">Cal.com Reservación Express</span>
              </div>
              <button 
                onClick={() => setIsCalOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-200 text-slate-450 hover:text-slate-800 transition duration-155"
                title="Cerrar calendario"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {/* Iframe viewport */}
            <div className="flex-grow bg-white">
              <iframe 
                src="https://cal.com/kybercore/secret" 
                title="Cal.com Quick Scheduler"
                className="w-full h-full border-0"
                allow="camera; microphone; autoplay; clipboard-write"
              />
            </div>
          </div>
        </div>
      )}

      {/* Footer minimal info */}
      <footer className="bg-white border-t border-slate-100 py-6 relative z-10 text-center">
        <div className="max-w-2xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <div className="flex items-center space-x-1">
            <Shield className="w-3.5 h-3.5 text-slate-350" />
            <span>Datos protegidos bajo la Ley Federal de Protección de Datos</span>
          </div>
          <p>© {new Date().getFullYear()} Brenda García. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
