import React, { useState, useTransition, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  Clock, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  AlertTriangle, 
  MessageSquare,
  HelpCircle,
  TrendingUp,
  Award
} from 'lucide-react';
import { LeadRegistration } from '../types';

interface LeadFormProps {
  onSuccess: (lead: LeadRegistration) => void;
}

export default function LeadForm({ onSuccess }: LeadFormProps) {
  const [step, setStep] = useState(1);
  const [, startTransition] = useTransition();

  // Form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [ageRange, setAgeRange] = useState<LeadRegistration['ageRange'] | ''>('');
  const [workHistory, setWorkHistory] = useState<LeadRegistration['workHistory'] | ''>('');
  const [taxRegime, setTaxRegime] = useState<LeadRegistration['taxRegime'] | ''>('');
  const [monthlyBudget, setMonthlyBudget] = useState<LeadRegistration['monthlyBudget'] | ''>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<LeadRegistration['selectedTimeSlot'] | ''>('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDisqualified, setIsDisqualified] = useState<'none' | 'age' | 'history' | 'budget'>('none');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [registeredLead, setRegisteredLead] = useState<LeadRegistration | null>(null);

  const [utmParams, setUtmParams] = useState({
    utm_medium: '',
    utm_campaign: '',
    utm_content: '',
    ad: '',
    adset: '',
    keyword: '',
    placement: '',
    utm_source: '',
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUtmParams({
      utm_medium: params.get('utm_medium') || params.get('medium') || '',
      utm_campaign: params.get('utm_campaign') || params.get('campaign') || '',
      utm_content: params.get('utm_content') || params.get('content') || '',
      ad: params.get('ad') || params.get('utm_ad') || '',
      adset: params.get('adset') || params.get('utm_adset') || '',
      keyword: params.get('keyword') || params.get('utm_term') || params.get('utm_keyword') || '',
      placement: params.get('placement') || params.get('utm_placement') || '',
      utm_source: params.get('utm_source') || params.get('source') || '',
    });
  }, []);

  const sendToWebhook = async (leadData: LeadRegistration) => {
    try {
      const cleanDigits = leadData.phone.replace(/\D/g, '').slice(-10);
      const formattedPhone = `+521${cleanDigits}`;

      const payload: Record<string, any> = {
        id: leadData.id,
        name: leadData.name,
        phone: formattedPhone,
        email: leadData.email,
        ageRange: leadData.ageRange,
        workHistory: leadData.workHistory,
        taxRegime: leadData.taxRegime,
        monthlyBudget: leadData.monthlyBudget,
        selectedTimeSlot: leadData.selectedTimeSlot,
        status: leadData.status,
        timestamp: leadData.timestamp,
        source_type: 'main_form',
      };

      if (utmParams.utm_medium) payload.utm_medium = utmParams.utm_medium;
      if (utmParams.utm_campaign) payload.utm_campaign = utmParams.utm_campaign;
      if (utmParams.utm_content) payload.utm_content = utmParams.utm_content;
      if (utmParams.ad) payload.ad = utmParams.ad;
      if (utmParams.adset) payload.adset = utmParams.adset;
      if (utmParams.keyword) payload.keyword = utmParams.keyword;
      if (utmParams.placement) payload.placement = utmParams.placement;
      if (utmParams.utm_source) payload.utm_source = utmParams.utm_source;

      // Add Mailhook compatible fields so that if the user linked a Make Custom Mailhook, it parses perfectly
      payload.sender = "admin@kybercoremkt.com";
      payload.from = "admin@kybercoremkt.com";
      payload.subject = `Nuevo Lead Pre-Calificado: ${leadData.name}`;
      
      const emailBodyText = `NUEVO LEAD REGISTRADO - DETALLES COMPLETOS:
------------------------------------------
ID: ${leadData.id}
Nombre: ${leadData.name}
WhatsApp (Formato Solicitado): ${formattedPhone}
Email: ${leadData.email}
Rango de Edad: ${leadData.ageRange}
Historial Laboral (Pre-1997): ${leadData.workHistory}
Régimen Fiscal: ${leadData.taxRegime}
Presupuesto mensual: ${leadData.monthlyBudget}
Horario de Webinar: ${leadData.selectedTimeSlot}
Status de Calificación: ${leadData.status}
Fecha: ${new Date(leadData.timestamp).toLocaleString('es-MX')}
Origen: main_form

INFORMACIÓN DE TRÁFICO (UTMs):
------------------------------------------
Medium: ${utmParams.utm_medium || 'N/A'}
Campaign: ${utmParams.utm_campaign || 'N/A'}
Content: ${utmParams.utm_content || 'N/A'}
Ad: ${utmParams.ad || 'N/A'}
Adset: ${utmParams.adset || 'N/A'}
Keyword: ${utmParams.keyword || 'N/A'}
Placement: ${utmParams.placement || 'N/A'}
Source: ${utmParams.utm_source || 'N/A'}`;

      payload.text = emailBodyText;
      payload.html = `<h3>NUEVO LEAD REGISTRADO - DETALLES COMPLETOS:</h3>
<ul>
  <li><strong>ID:</strong> ${leadData.id}</li>
  <li><strong>Nombre:</strong> ${leadData.name}</li>
  <li><strong>WhatsApp (Formato Solicitado):</strong> ${formattedPhone}</li>
  <li><strong>Email:</strong> ${leadData.email}</li>
  <li><strong>Rango de Edad:</strong> ${leadData.ageRange}</li>
  <li><strong>Historial Laboral (Pre-1997):</strong> ${leadData.workHistory}</li>
  <li><strong>Régimen Fiscal:</strong> ${leadData.taxRegime}</li>
  <li><strong>Presupuesto mensual:</strong> ${leadData.monthlyBudget}</li>
  <li><strong>Horario de Webinar:</strong> ${leadData.selectedTimeSlot}</li>
  <li><strong>Status de Calificación:</strong> ${leadData.status}</li>
  <li><strong>Fecha:</strong> ${new Date(leadData.timestamp).toLocaleString('es-MX')}</li>
  <li><strong>Origen:</strong> main_form</li>
</ul>
<h3>INFORMACIÓN DE TRÁFICO (UTMs):</h3>
<ul>
  <li><strong>Medium:</strong> ${utmParams.utm_medium || 'N/A'}</li>
  <li><strong>Campaign:</strong> ${utmParams.utm_campaign || 'N/A'}</li>
  <li><strong>Content:</strong> ${utmParams.utm_content || 'N/A'}</li>
  <li><strong>Ad:</strong> ${utmParams.ad || 'N/A'}</li>
  <li><strong>Adset:</strong> ${utmParams.adset || 'N/A'}</li>
  <li><strong>Keyword:</strong> ${utmParams.keyword || 'N/A'}</li>
  <li><strong>Placement:</strong> ${utmParams.placement || 'N/A'}</li>
  <li><strong>Source:</strong> ${utmParams.utm_source || 'N/A'}</li>
</ul>`;
      payload.html_content = payload.html;

      await fetch('https://hook.us2.make.com/x4192as0gdwxkjpingtc5u5gwvwcx9kg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error('Error sending lead to webhook:', err);
    }
  };

  // Validation functions
  const validateStep1 = () => {
    const tempErrors: Record<string, string> = {};
    if (!name.trim()) tempErrors.name = 'El nombre es requerido';
    
    // Simple phone regex (at least 10 digits)
    const cleanPhone = phone.replace(/\D/g, '');
    if (!phone) {
      tempErrors.phone = 'El teléfono es requerido';
    } else if (cleanPhone.length < 10) {
      tempErrors.phone = 'Ingresa un número de 10 dígitos (ej. 7293080780)';
    }

    // Email regex
    if (!email) {
      tempErrors.email = 'El correo electrónico es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      tempErrors.email = 'Ingresa un correo electrónico válido';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const validateStep2 = () => {
    const tempErrors: Record<string, string> = {};
    if (!ageRange) tempErrors.ageRange = 'Selecciona tu rango de edad';
    if (!workHistory) tempErrors.workHistory = 'Selecciona tu historial laboral';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const validateStep3 = () => {
    const tempErrors: Record<string, string> = {};
    if (!taxRegime) tempErrors.taxRegime = 'Selecciona tu régimen fiscal';
    if (!monthlyBudget) tempErrors.monthlyBudget = 'Selecciona tu presupuesto de inversión';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const validateStep4 = () => {
    const tempErrors: Record<string, string> = {};
    if (!selectedTimeSlot) tempErrors.selectedTimeSlot = 'Selecciona tu horario preferido';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Immediate qualification checks when values change in Step 2
  const handleAgeChange = (val: LeadRegistration['ageRange']) => {
    setAgeRange(val);
    setErrors(prev => ({ ...prev, ageRange: '' }));
  };

  const handleHistoryChange = (val: LeadRegistration['workHistory']) => {
    setWorkHistory(val);
    setErrors(prev => ({ ...prev, workHistory: '' }));
  };

  const triggerDisqualification = (reason: 'age' | 'history' | 'budget') => {
    setIsDisqualified(reason);
    
    // Save lead to local storage as "disqualified" so Brenda still has the list of interested users!
    const disqLead: LeadRegistration = {
      id: 'lead_' + Math.random().toString(36).substr(2, 9),
      name: name || 'Interesado Anónimo',
      phone: phone || '',
      email: email || '',
      ageRange: reason === 'age' ? 'más_de_50' : (ageRange || '30_a_49'),
      workHistory: reason === 'history' ? 'antes_1997' : (workHistory || 'despues_1997'),
      taxRegime: taxRegime || 'no_lo_se',
      monthlyBudget: reason === 'budget' ? 'menos_2000' : (monthlyBudget || 'menos_2000'),
      selectedTimeSlot: 'lunes_11am',
      status: reason === 'age' ? 'disqualified_age' : (reason === 'history' ? 'disqualified_history' : 'disqualified_budget'),
      timestamp: new Date().toISOString(),
    };

    saveLeadToLocalStorage(disqLead);
  };

  const saveLeadToLocalStorage = (lead: LeadRegistration) => {
    try {
      const existingLeadsRaw = localStorage.getItem('brenda_ppr_leads');
      const leads = existingLeadsRaw ? JSON.parse(existingLeadsRaw) : [];
      leads.push(lead);
      localStorage.setItem('brenda_ppr_leads', JSON.stringify(leads));
      onSuccess(lead);
    } catch (e) {
      console.error('Error saving lead to storage:', e);
    }
  };

  // Navigation handlers
  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
    if (step === 2 && validateStep2()) {
      // Move to step 3 if not disqualified
      if (ageRange === 'más_de_50') {
        triggerDisqualification('age');
      } else if (workHistory === 'antes_1997') {
        triggerDisqualification('history');
      } else {
        setStep(3);
      }
    }
    if (step === 3 && validateStep3()) {
      if (monthlyBudget === 'menos_2000') {
        triggerDisqualification('budget');
      } else {
        setStep(4);
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep4()) return;

    startTransition(() => {
    const finalLead: LeadRegistration = {
      id: 'lead_' + Math.random().toString(36).substr(2, 9),
      name,
      phone,
      email,
      ageRange: ageRange as LeadRegistration['ageRange'],
      workHistory: workHistory as LeadRegistration['workHistory'],
      taxRegime: taxRegime as LeadRegistration['taxRegime'],
      monthlyBudget: monthlyBudget as LeadRegistration['monthlyBudget'],
      selectedTimeSlot: selectedTimeSlot as LeadRegistration['selectedTimeSlot'],
      status: 'eligible',
      timestamp: new Date().toISOString(),
    };

    saveLeadToLocalStorage(finalLead);
    setRegisteredLead(finalLead);
    setIsSubmitted(true);
    
    // Send to make webhook asynchronously
    sendToWebhook(finalLead);
    
    // Smooth redirect to /gracias thank-you subpage
    window.history.pushState({}, '', '/gracias');
    window.dispatchEvent(new Event('popstate'));
    });
  };

  // Map slot string to human words
  const formatTimeSlot = (slot: LeadRegistration['selectedTimeSlot']) => {
    const maps = {
      lunes_11am: 'Lunes a las 11:00 AM (Hora CDMX)',
      martes_6pm: 'Martes a las 6:00 PM (Hora CDMX)',
      jueves_6pm: 'Jueves a las 6:00 PM (Hora CDMX)',
    };
    return maps[slot] || '';
  };

  // Helper to calculate the next calendar date for a slot
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

  // WhatsApp redirection for disqualified advisors
  const generateWaRedirectLink = (reason: 'age' | 'history' | 'budget') => {
    const defaultNumber = '527293080780'; // Simulated professional text number
    let text = '';
    if (reason === 'age') {
      text = `Hola Brenda! Vi que mi perfil tiene condiciones particulares por mi rango de edad (mayor de 50). Mi nombre es ${name}. Quisiera consultar mis opciones en privado.`;
    } else if (reason === 'history') {
      text = `Hola Brenda! Pertenzco a la Ley 73 IMSS (empecé antes de 1997). Mi nombre es ${name}. Quisiera asesoría sobre Modalidad 40.`;
    } else {
      text = `Hola Brenda! Mi presupuesto de inversión actualmente es menor a $2,000 pesos. Mi nombre es ${name}. Quisiera ver qué opciones tengo disponibles.`;
    }
    return `https://wa.me/${defaultNumber}?text=${encodeURIComponent(text)}`;
  };

  // Successful register WhatsApp confirm link
  const generateSuccessWaLink = () => {
    const defaultNumber = '527293080780';
    const timeWord = formatTimeSlot(selectedTimeSlot as LeadRegistration['selectedTimeSlot']);
    const text = `Hola Brenda! Acabo de agendar mi Asesoría de Retiro en el horario de ${timeWord}. Mi nombre es ${name} y mi WhatsApp registrado es ${phone}. Quisiera confirmar mi videollamada para mi sesión. ¡Muchas gracias!`;
    return `https://wa.me/${defaultNumber}?text=${encodeURIComponent(text)}`;
  };

  const resetForm = () => {
    setIsDisqualified('none');
    setIsSubmitted(false);
    setRegisteredLead(null);
    setName('');
    setPhone('');
    setEmail('');
    setAgeRange('');
    setWorkHistory('');
    setTaxRegime('');
    setMonthlyBudget('');
    setSelectedTimeSlot('');
    setStep(1);
    setErrors({});
  };

  // Render Disqualified States
  if (isDisqualified !== 'none') {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 text-center shadow-xl shadow-slate-200/40 space-y-6"
      >
        <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto border border-rose-100">
          <AlertTriangle className="w-8 h-8" />
        </div>
        
        <div className="space-y-4">
          <h3 className="font-display font-bold text-xl text-slate-900 leading-tight">
            Análisis de Perfil: No Elegible para PPR Privado
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed text-left">
            Hola <span className="font-semibold text-slate-800">{name || 'Interesado'}</span>, de acuerdo a tus respuestas, detectamos que las aseguradoras con las que operamos no cuentan con un producto de Plan Personal de Retiro (PPR) idóneo para ti por la siguiente condición:
          </p>
          
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-150 text-left text-xs text-slate-600 leading-relaxed font-sans mt-2 space-y-2">
            {isDisqualified === 'age' && (
              <div>
                <strong className="text-slate-800 block mb-0.5 font-display text-sm">Rango de Edad mayor de 50 años</strong>
                Los Planes Personales de Retiro privados se diseñan para construir capital a largo plazo antes de los 65 años. A partir de los 50 años, la carga de seguros integrados y el menor plazo fiscal de deducción reducen el beneficio de estos planes privados tradicionales.
              </div>
            )}
            {isDisqualified === 'history' && (
              <div>
                <strong className="text-slate-800 block mb-0.5 font-display text-sm">Historial Laboral Ley 73 IMSS</strong>
                Al haber cotizado formalmente antes del 1° de julio de 1997, perteneces a la Ley 73 del IMSS. Esto significa que tu pensión se calcula por el promedio de salarios de tus últimos 5 años y las semanas cotizadas. Tu prioridad absoluta debe ser planear tu <strong>Modalidad 40 IMSS</strong>, no contratar un PPR privado.
              </div>
            )}
            {isDisqualified === 'budget' && (
              <div>
                <strong className="text-slate-800 block mb-0.5 font-display text-sm">Presupuesto menor a $2,000 MXN mensuales</strong>
                Nuestras aseguradoras aliadas (Allianz, Seguros Monterrey, GNP, AXA) requieren una aportación mínima obligatoria de $2,000 pesos mensuales para emitir y operar el fideicomiso de un Plan Personal de Retiro personalizado.
              </div>
            )}
          </div>
          
          <p className="text-slate-500 text-[11px] text-left leading-relaxed">
            Te recomendamos investigar opciones directas de aportaciones voluntarias en tu AFORE, las cuales no tienen mínimos obligatorios altos y permiten retiros flexibles.
          </p>
        </div>

        <div className="pt-2 text-xs text-slate-400 italic font-sans leading-relaxed">
          Tus respuestas han sido guardadas de forma segura. Si tienes alguna duda, puedes contactar al soporte administrativo.
        </div>
      </motion.div>
    );
  }

  // Render Success Screen
  if (isSubmitted && registeredLead) {
    const slotString = formatTimeSlot(registeredLead.selectedTimeSlot);
    const targetDate = getNextDateForSlot(registeredLead.selectedTimeSlot);
    
    // Format local date representation in friendly spanish
    const dayName = targetDate.toLocaleDateString('es-MX', { weekday: 'long' });
    const capitalizedDayName = dayName.charAt(0).toUpperCase() + dayName.slice(1);
    const dayNum = targetDate.getDate();
    const monthName = targetDate.toLocaleDateString('es-MX', { month: 'long' });
    const formattedHours = targetDate.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
    const friendlyDateString = `${capitalizedDayName} ${dayNum} de ${monthName} • ${formattedHours}`;

    const endDate = new Date(targetDate.getTime() + 30 * 60000); // 30 minutes later

    // Generate Calendar URLs
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

    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 text-center shadow-xl shadow-slate-200/40 space-y-6"
      >
        <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
          <CheckCircle className="w-8 h-8" />
        </div>

        <div className="space-y-3">
          <h3 className="font-display font-bold text-2xl text-slate-900 leading-tight">
            ¡Agendado con éxito, {name.split(' ')[0]}!
          </h3>
          <p className="text-emerald-700 font-mono text-[10px] tracking-wider uppercase bg-emerald-50 border border-emerald-100 py-1.5 px-4 rounded-full inline-block font-semibold">
            Asesoría de Retiro Reservada
          </p>
          
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 mt-4 text-left">
            <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Tu horario de asesoría:</p>
            <div className="flex items-center space-x-2 text-slate-800 font-bold text-sm sm:text-base">
              <Calendar className="w-5 h-5 text-brand-blue-500 shrink-0" />
              <span>{friendlyDateString}</span>
            </div>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Te contactaremos de forma personalizada <strong>vía WhatsApp</strong> al número <span className="text-slate-800 font-bold">{phone}</span> para enviarte el enlace de acceso directo a la videollamada y tu Material Complementario en PDF.
            </p>
          </div>
        </div>

        {/* Calendar Add-to section */}
        <div className="bg-slate-50/50 rounded-xl p-4 border border-slate-100 space-y-3 text-left">
          <p className="text-xs text-slate-600 font-bold flex items-center space-x-1.5">
            <span>📅</span>
            <span>Registra la cita en tu calendario personal:</span>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <a
              href={googleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 text-center flex items-center justify-center space-x-1.5 transition"
            >
              <span>🌐</span>
              <span>Google Calendar</span>
            </a>
            <a
              href={outlookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 text-center flex items-center justify-center space-x-1.5 transition"
            >
              <span>📧</span>
              <span>Outlook</span>
            </a>
            <a
              href={appleUrl}
              download="retirora-asesoria-con-brenda.ics"
              className="px-3 py-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 text-center flex items-center justify-center space-x-1.5 transition"
            >
              <span>🍏</span>
              <span>Apple iCal</span>
            </a>
          </div>
        </div>

        <div className="pt-2 flex flex-col space-y-3">
          <a
            href={generateSuccessWaLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#25d366] hover:bg-[#20ba56] text-white font-display font-semibold py-3.5 px-5 rounded-full transition-all duration-150 flex items-center justify-center space-x-2.5 shadow-md shadow-green-500/10"
          >
            <MessageSquare className="w-5 h-5 fill-current" />
            <span>Confirmar por WhatsApp</span>
          </a>
          
          <button
            onClick={resetForm}
            className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
          >
            Registrar a otra persona
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-200/40 relative overflow-hidden">
      {/* Decorative top color bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-brand-blue-500" />
      
      {/* Header */}
      <div className="mb-6">
        <h3 className="font-display font-bold text-lg sm:text-xl text-slate-900 text-center sm:text-left leading-tight">
          Agenda tu Asesoría sin Costo
        </h3>
        <p className="text-xs text-slate-500 text-center sm:text-left mt-1.5">
          Responde unas breves preguntas para agendar con Brenda.
        </p>
        
        {/* Step Indicators */}
        <div className="flex items-center space-x-2 mt-4">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex-1">
              <div 
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  s === step 
                    ? 'bg-brand-blue-500' 
                    : s < step 
                    ? 'bg-brand-blue-600' 
                    : 'bg-slate-100'
                }`} 
              />
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Hidden inputs to capture traffic context */}
        <input type="hidden" name="utm_medium" value={utmParams.utm_medium} />
        <input type="hidden" name="utm_campaign" value={utmParams.utm_campaign} />
        <input type="hidden" name="utm_content" value={utmParams.utm_content} />
        <input type="hidden" name="ad" value={utmParams.ad} />
        <input type="hidden" name="adset" value={utmParams.adset} />
        <input type="hidden" name="keyword" value={utmParams.keyword} />
        <input type="hidden" name="placement" value={utmParams.placement} />
        <input type="hidden" name="utm_source" value={utmParams.utm_source} />

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.15 }}
              className="space-y-4"
            >
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 block uppercase tracking-wider ml-1">Nombre completo / Persona</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-slate-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                    }}
                    placeholder="Ej. Juan Pérez"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-11 pr-4 text-slate-900 text-sm focus:outline-none focus:border-brand-blue-500 focus:bg-white placeholder-slate-400 transition"
                  />
                </div>
                {errors.name && <p className="text-rose-600 text-xs mt-1 font-semibold">{errors.name}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 block uppercase tracking-wider ml-1">WhatsApp (10 dígitos)</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-slate-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
                    }}
                    placeholder="Ej. 7293080780"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-11 pr-4 text-slate-900 text-sm focus:outline-none focus:border-brand-blue-500 focus:bg-white placeholder-slate-400 transition"
                  />
                </div>
                {errors.phone && <p className="text-rose-600 text-xs mt-1 font-semibold">{errors.phone}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 block uppercase tracking-wider ml-1">Correo electrónico</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                    }}
                    placeholder="correo@ejemplo.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-11 pr-4 text-slate-900 text-sm focus:outline-none focus:border-brand-blue-500 focus:bg-white placeholder-slate-400 transition"
                  />
                </div>
                {errors.email && <p className="text-rose-600 text-xs mt-1 font-semibold">{errors.email}</p>}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.15 }}
              className="space-y-5"
            >
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block uppercase tracking-wider ml-1" id="age_section_label">
                  ¿Cuál es tu rango de edad?
                </label>
                <div className="grid grid-cols-1 gap-2" role="group" aria-labelledby="age_section_label">
                  {[
                    { value: '18_a_29', label: '18 a 29 años' },
                    { value: '30_a_49', label: '30 a 49 años' },
                    { value: 'más_de_50', label: 'Más de 50 años' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleAgeChange(option.value as LeadRegistration['ageRange'])}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 text-sm font-medium ${
                        ageRange === option.value
                          ? 'bg-brand-blue-50/70 border-brand-blue-500 text-brand-blue-700 shadow-sm'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-100/30'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className={ageRange === option.value ? "font-bold text-slate-900" : ""}>{option.label}</span>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          ageRange === option.value ? 'border-brand-blue-400 bg-brand-blue-500' : 'border-slate-300'
                        }`}>
                          {ageRange === option.value && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                {errors.ageRange && <p className="text-rose-600 text-xs mt-1 font-semibold">{errors.ageRange}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block uppercase tracking-wider ml-1" id="history_section_label">
                  ¿Comenzaste a trabajar formalmente antes o después del 1° de julio de 1997?
                </label>
                <div className="grid grid-cols-1 gap-2" role="group" aria-labelledby="history_section_label">
                  {[
                    { value: 'despues_1997', label: 'Después del 1 de julio de 1997' },
                    { value: 'antes_1997', label: 'Antes del 1 de julio de 1997 (Ley 73 IMSS)' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleHistoryChange(option.value as LeadRegistration['workHistory'])}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 text-sm font-medium ${
                        workHistory === option.value
                          ? 'bg-brand-blue-50/70 border-brand-blue-500 text-brand-blue-700 shadow-sm'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-100/30'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className={workHistory === option.value ? "font-bold text-slate-900" : ""}>{option.label}</span>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          workHistory === option.value ? 'border-brand-blue-400 bg-brand-blue-500' : 'border-slate-300'
                        }`}>
                          {workHistory === option.value && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                {errors.workHistory && <p className="text-rose-600 text-xs mt-1 font-semibold">{errors.workHistory}</p>}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.15 }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block uppercase tracking-wider ml-1" id="tax_section_label">
                  ¿En qué régimen fiscal estás registrado/a?
                </label>
                <div className="grid grid-cols-1 gap-2" role="group" aria-labelledby="tax_section_label">
                  {[
                    { value: 'asalariado_pfae', label: 'Asalariado o Actividad Empresarial' },
                    { value: 'resico_informal', label: 'RESICO o Informal / Independiente' },
                    { value: 'no_lo_se', label: 'No lo sé con certeza' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        setTaxRegime(option.value as LeadRegistration['taxRegime']);
                        if (errors.taxRegime) setErrors(prev => ({ ...prev, taxRegime: '' }));
                      }}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all duration-150 text-xs sm:text-sm font-medium ${
                        taxRegime === option.value
                          ? 'bg-brand-blue-50/70 border-brand-blue-500 text-brand-blue-700 shadow-sm'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-100/30'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className={taxRegime === option.value ? "font-bold text-slate-900" : ""}>{option.label}</span>
                        <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                          taxRegime === option.value ? 'border-brand-blue-400 bg-brand-blue-500' : 'border-slate-300'
                        }`}>
                          {taxRegime === option.value && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                {errors.taxRegime && <p className="text-rose-600 text-xs mt-1 font-semibold">{errors.taxRegime}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block uppercase tracking-wider ml-1" id="budget_section_label">
                  ¿Con qué cantidad mensual de ahorro te sentirías cómodo/a?
                </label>
                <div className="grid grid-cols-1 gap-2" role="group" aria-labelledby="budget_section_label">
                  {[
                    { value: 'menos_2000', label: 'Menos de $2,000 pesos' },
                    { value: '2000_5000', label: '$2,000 a $5,000 pesos' },
                    { value: 'mas_5000', label: 'Más de $5,000 pesos' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        setMonthlyBudget(option.value as LeadRegistration['monthlyBudget']);
                        if (errors.monthlyBudget) setErrors(prev => ({ ...prev, monthlyBudget: '' }));
                      }}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all duration-150 text-xs sm:text-sm font-medium ${
                        monthlyBudget === option.value
                          ? 'bg-brand-blue-50/70 border-brand-blue-500 text-brand-blue-700 shadow-sm'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-100/30'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className={monthlyBudget === option.value ? "font-bold text-slate-900" : ""}>{option.label}</span>
                        <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                          monthlyBudget === option.value ? 'border-brand-blue-400 bg-brand-blue-500' : 'border-slate-300'
                        }`}>
                          {monthlyBudget === option.value && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                {errors.monthlyBudget && <p className="text-rose-600 text-xs mt-1 font-semibold">{errors.monthlyBudget}</p>}
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.15 }}
              className="space-y-4"
            >
              <div className="bg-brand-blue-50/70 border border-brand-blue-100 p-4 rounded-xl text-slate-700 mb-2">
                <span className="text-xs font-mono text-brand-blue-600 font-bold uppercase tracking-widest block mb-1">Paso Final</span>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-600">
                  Para concluir y agendar tu sesión de asesoría virtual, indica qué horario se adecua mejor a tu agenda semanal:
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block uppercase tracking-wider ml-1" id="time_section_label">
                  Selecciona una opción de horario:
                </label>
                <div className="grid grid-cols-1 gap-2" role="group" aria-labelledby="time_section_label">
                  {[
                    { value: 'lunes_11am', day: 'Lunes', time: '11:00 AM (Central Mx)' },
                    { value: 'martes_6pm', day: 'Martes', time: '6:00 PM (Central Mx)' },
                    { value: 'jueves_6pm', day: 'Jueves', time: '6:00 PM (Central Mx)' }
                  ].map((option) => {
                    // Calculate exact dynamic date label for the weekday
                    let targetDay = 1; // 1 = Monday
                    let targetHour = 11;
                    if (option.value === 'martes_6pm') {
                      targetDay = 2; // Tuesday
                      targetHour = 18;
                    } else if (option.value === 'jueves_6pm') {
                      targetDay = 4; // Thursday
                      targetHour = 18;
                    }
                    const now = new Date();
                    const resultDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                    const currentDay = resultDate.getDay();
                    let daysToAdd = (targetDay - currentDay + 7) % 7;
                    if (daysToAdd === 0 && now.getHours() >= targetHour) {
                      daysToAdd = 7;
                    }
                    resultDate.setDate(resultDate.getDate() + daysToAdd);
                    const dayNum = resultDate.getDate();
                    const monthRaw = resultDate.toLocaleDateString('es-MX', { month: 'long' });
                    const formattedMonth = monthRaw.charAt(0).toUpperCase() + monthRaw.slice(1);
                    const dynamicDayLabel = `${option.day} ${dayNum} de ${formattedMonth}`;

                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => {
                          setSelectedTimeSlot(option.value as LeadRegistration['selectedTimeSlot']);
                          if (errors.selectedTimeSlot) setErrors(prev => ({ ...prev, selectedTimeSlot: '' }));
                        }}
                        className={`w-full text-left p-3.5 rounded-xl border transition-all duration-150 text-sm font-medium ${
                          selectedTimeSlot === option.value
                            ? 'bg-brand-blue-50/70 border-brand-blue-500 text-brand-blue-700 shadow-sm font-bold'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-100/30'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Clock className={`w-4 h-4 ${selectedTimeSlot === option.value ? 'text-brand-blue-600' : 'text-slate-400'}`} />
                            <div>
                              <span className="block text-sm font-bold text-slate-900">{dynamicDayLabel}</span>
                              <span className="block text-xs text-slate-500">{option.time}</span>
                            </div>
                          </div>
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            selectedTimeSlot === option.value ? 'border-brand-blue-400 bg-brand-blue-500' : 'border-slate-300'
                          }`}>
                            {selectedTimeSlot === option.value && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
                {errors.selectedTimeSlot && <p className="text-rose-600 text-xs mt-1 font-semibold">{errors.selectedTimeSlot}</p>}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Buttons Controls */}
        <div className="flex items-center space-x-3 pt-2">
          {step > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="px-5 py-3 bg-slate-50 text-slate-600 border border-slate-200 rounded-full font-semibold text-sm hover:border-slate-300 hover:bg-slate-100 hover:text-slate-800 transition flex items-center justify-center cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 mr-1.5" />
              <span>Atrás</span>
            </button>
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex-1 bg-brand-yellow hover:bg-brand-yellow-hover text-brand-blue-600 border border-brand-yellow-hover/30 font-display font-bold py-3.5 px-6 rounded-full text-sm transition-all duration-150 flex items-center justify-center space-x-1.5 shadow-sm cursor-pointer"
            >
              <span>Continuar</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              className="flex-1 bg-brand-yellow hover:bg-brand-yellow-hover text-brand-blue-600 border border-brand-yellow-hover/30 font-display font-bold py-3.5 px-6 rounded-full text-sm transition-all duration-150 flex items-center justify-center space-x-1.5 shadow-sm uppercase tracking-wide cursor-pointer"
            >
              <span>Agendar mi Asesoría Gratis</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
