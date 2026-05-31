import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, CheckCheck, Smartphone, Phone, Video, MoreVertical, ThumbsUp } from 'lucide-react';

export default function TestimonialsSection({ onScrollToForm }: { onScrollToForm: () => void }) {
  const [expanded, setExpanded] = useState(false);

  const mainTestimonials = [
    {
      id: 'test-1',
      text: 'Tengo poco más de un año con mi PPR. La sencillez con la que me explicaste y el buen trato fue lo que me hizo tomar la decisión. Sin duda fue una asesoría muy eficiente.',
      author: 'A. Pérez',
      location: 'Ciudad de México',
      yearsActive: 1,
      time: '11:24 AM',
      color: 'text-emerald-600',
    },
    {
      id: 'test-2',
      text: 'Han pasado varios años desde que te contraté y cuando tengo alguna duda respecto al PPR siempre tienes la disposición de resolver y aclarar. 🪶',
      author: 'M. Ruiz',
      location: 'Guadalajara',
      yearsActive: 4,
      time: '09:15 AM',
      color: 'text-indigo-600',
    },
    {
      id: 'test-3',
      text: 'Atención súper personalizada al momento de abrir el PPR, y además las preguntas que he tenido con el paso de los años me las has respondido sin inconvenientes.',
      author: 'Ing. C. Mendoza',
      location: 'Monterrey',
      yearsActive: 3,
      time: '03:42 PM',
      color: 'text-pink-600',
    },
    {
      id: 'test-4',
      text: 'Yo tengo ya 3 años y creo que tomé una buena decisión basada en la información que me compartiste. Además que durante estos 3 años me has apoyado con dudas.',
      author: 'Dra. S. Alatorre',
      location: 'Querétaro',
      yearsActive: 3,
      time: '01:05 PM',
      color: 'text-teal-600',
    },
    {
      id: 'test-5',
      text: 'Decidí tomar el PPR porque la atención e información brindada fue muy completa y me dio esa tranquilidad de que hice una buena inversión para mi futuro.',
      author: 'R. Garza',
      location: 'Puebla',
      yearsActive: 2,
      time: '05:12 PM',
      color: 'text-amber-600',
    }
  ];

  const backupTestimonials = [
    {
      id: 'test-6',
      text: 'Te agradezco mucho la paciencia Brenda. Llevaba meses buscando opciones para abrir mi plan de retiro pero nadie me explicaba con tanta transparencia las comisiones.',
      author: 'Lic. Monica Delgado',
      location: 'Mérida',
      yearsActive: 1,
      time: '10:04 AM',
      color: 'text-purple-600',
    },
    {
      id: 'test-7',
      text: 'La mejor decisión. Pude deducir casi $12,000 pesos de ISR en mi primera declaración anual con el PPR que abrimos de forma digital. Excelente acompañamiento.',
      author: 'Ing. Daniel Silva',
      location: 'Saltillo',
      yearsActive: 2,
      time: '12:30 PM',
      color: 'text-sky-600',
    },
    {
      id: 'test-8',
      text: 'Me dio mucha seguridad ver que no trabajas casada con una sola marca. Vimos tres propuestas de aseguradoras distintas y elegí la mejor opción con tu asesoría.',
      author: 'Patricia Ortiz',
      location: 'San Luis Potosí',
      yearsActive: 5,
      time: '04:55 PM',
      color: 'text-red-500',
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-100 relative overflow-hidden font-sans">
      {/* Visual background details */}
      <div className="absolute top-1/4 right-0 w-72 h-72 bg-emerald-100/30 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-brand-blue-100/30 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
            Opiniones de Clientes por WhatsApp
          </span>
          <h2 className="font-display font-bold text-brand-blue-600 text-2xl sm:text-3xl tracking-tight leading-tight pt-2">
            Conversaciones y Testimonios Reales
          </h2>
          <p className="text-brand-blue-600/70 text-sm">
            Mensajes espontáneos enviados por clientes agradecidos que ya aseguraron su futuro financiero.
          </p>
        </div>

        {/* WhatsApp Mobile Chat Layout Container */}
        <div className="max-w-3xl mx-auto border border-slate-200 rounded-2xl overflow-hidden shadow-lg bg-white">
          
          {/* Mock Mobile/Web WhatsApp Header Bar */}
          <div className="bg-[#008069] text-white px-4 py-3.5 flex items-center justify-between shadow-md">
            <div className="flex items-center space-x-3">
              {/* Profile Pic Indicator for Brenda */}
              <div className="relative w-10 h-10 rounded-full bg-white/15 overflow-hidden flex items-center justify-center border border-white/20">
                <img 
                  src="https://i.ibb.co/STrfSY7/1dea2c18b4178f76576092847fc02d76c057987f.png" 
                  alt="Brenda García"
                  className="w-full h-full object-cover object-top scale-110"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#008069] rounded-full" />
              </div>
              
              <div>
                <h4 className="font-bold text-sm sm:text-base tracking-tight flex items-center">
                  <span>Brenda García</span>
                  <span className="ml-1.5 text-[10px] bg-white/20 px-1.5 py-0.5 rounded uppercase font-semibold text-white/95">Asesora PPR</span>
                </h4>
                <p className="text-xs text-emerald-100/90 font-medium">En línea asesorando</p>
              </div>
            </div>

            {/* Simulated actions */}
            <div className="flex items-center space-x-4 text-emerald-50">
              <button title="Videollamada" className="hover:text-white transition cursor-pointer hidden sm:block">
                <Video className="w-5 h-5" />
              </button>
              <button title="Llamar" className="hover:text-white transition cursor-pointer">
                <Phone className="w-4.5 h-4.5" />
              </button>
              <button title="Opciones" className="hover:text-white transition cursor-pointer">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Chat Room Body with traditional WhatsApp style pattern background */}
          <div className="bg-[#efeae2] p-4 sm:p-6 space-y-4 max-h-[500px] sm:max-h-[600px] overflow-y-auto relative min-h-[350px]">
            {/* Soft watermark layout icon */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-repeat bg-[radial-gradient(#128c7e_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* Simple Date Divider */}
            <div className="flex justify-center my-2.5 relative z-10">
              <span className="bg-white/80 backdrop-blur-xs text-brand-blue-600/70 text-[10px] sm:text-xs font-semibold uppercase px-3 py-1 rounded-lg shadow-2xs border border-slate-200/50">
                Testimonios de Clientes Activos
              </span>
            </div>

            {/* Messages Stream */}
            <div className="space-y-4 relative z-10">
              {mainTestimonials.map((msg, index) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.08 }}
                  className="flex items-start max-w-[85%] sm:max-w-[75%]"
                >
                  <div className="bg-white rounded-r-2xl rounded-bl-2xl p-3 shadow-md relative border border-slate-100/50 flex flex-col">
                    {/* Tiny triangle for WhatsApp bubble spike left */}
                    <div className="absolute top-0 -left-1.5 w-0 h-0 border-t-[8px] border-t-white border-l-[8px] border-l-transparent" />

                    {/* Contact metadata top right inline */}
                    <div className="flex items-baseline justify-between space-x-3 mb-1">
                      <span className={`font-bold text-xs sm:text-sm ${msg.color}`}>
                        {msg.author}
                      </span>
                      <span className="text-[10px] font-medium text-brand-blue-500/80 bg-brand-blue-50 px-1.5 py-0.2 rounded border border-brand-blue-100/30">
                        {msg.yearsActive === 1 ? '1 Año' : `${msg.yearsActive} Años Atendido`}
                      </span>
                    </div>

                    {/* Testimonial Core Message */}
                    <p className="text-slate-800 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-medium pr-8">
                      "{msg.text}"
                    </p>

                    {/* Message location & timestamp bottom bar */}
                    <div className="flex items-center justify-end space-x-1.5 border-t border-slate-50 mt-2 pt-1 text-[10px] text-slate-400 self-end">
                      <span className="font-semibold text-slate-500">{msg.location}</span>
                      <span>•</span>
                      <span>{msg.time}</span>
                      <CheckCheck className="w-3.5 h-3.5 text-sky-500" />
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Brenda Warm Response Message in Chat (Outgoing bubble to show active support) */}
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="flex items-start justify-end"
              >
                <div className="bg-[#d9fdd3] text-slate-800 rounded-l-2xl rounded-br-2xl p-3 shadow-md relative border border-[#c5ebbe]/60 max-w-[85%] sm:max-w-[75%] flex flex-col">
                  {/* Tiny triangle for WhatsApp bubble spike right */}
                  <div className="absolute top-0 -right-1.5 w-0 h-0 border-t-[8px] border-t-[#d9fdd3] border-r-[8px] border-r-transparent" />

                  <span className="font-bold text-xs text-[#008069] mb-1">
                    Mi Compromiso Contigo
                  </span>

                  <p className="text-xs sm:text-sm leading-relaxed font-semibold text-slate-800">
                    Muchísimas gracias a todos por la confianza depositada. Monitorear sus PPRs año tras año y brindarles respuestas neutrales es la clave para un patrimonio seguro. ¡Vamos juntos por un gran retiro! 🌟📈
                  </p>

                  <div className="flex items-center justify-end space-x-1 mt-2 text-[10px] text-[#008069]/80 self-end font-semibold">
                    <span>Hoy</span>
                    <span>•</span>
                    <span>Justo ahora</span>
                    <CheckCheck className="w-3.5 h-3.5 text-sky-500" />
                  </div>
                </div>
              </motion.div>

              {/* More opinions loaded lazily */}
              <AnimatePresence>
                {expanded && backupTestimonials.map((msg, index) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="flex items-start max-w-[85%] sm:max-w-[75%]"
                  >
                    <div className="bg-white rounded-r-2xl rounded-bl-2xl p-3 shadow-md relative border border-slate-100/50 flex flex-col w-full">
                      <div className="absolute top-0 -left-1.5 w-0 h-0 border-t-[8px] border-t-white border-l-[8px] border-l-transparent" />
                      
                      <div className="flex items-baseline justify-between space-x-3 mb-1">
                        <span className={`font-bold text-xs sm:text-sm ${msg.color}`}>
                          {msg.author}
                        </span>
                        <span className="text-[10px] font-medium text-brand-blue-500/80 bg-brand-blue-50 px-1.5 py-0.2 rounded border border-brand-blue-100/30">
                          {msg.yearsActive === 1 ? '1 Año' : `${msg.yearsActive} Años`}
                        </span>
                      </div>

                      <p className="text-slate-800 text-xs sm:text-sm leading-relaxed font-medium pr-8">
                        "{msg.text}"
                      </p>

                      <div className="flex items-center justify-end space-x-1.5 border-t border-slate-50 mt-2 pt-1 text-[10px] text-slate-400 self-end">
                        <span className="font-semibold text-slate-500">{msg.location}</span>
                        <span>•</span>
                        <span>{msg.time}</span>
                        <CheckCheck className="w-3.5 h-3.5 text-sky-500" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom simulated input bar */}
          <div className="bg-[#f0f2f5] p-3 border-t border-slate-200 flex items-center justify-between gap-3 text-slate-500 text-xs sm:text-sm">
            <div className="flex items-center space-x-2.5">
              <span className="bg-white px-3 py-2 rounded-full border border-slate-200 leading-none">☺</span>
              <span className="text-slate-400 font-medium">Escribe un mensaje...</span>
            </div>
            
            <button 
              onClick={onScrollToForm}
              className="bg-[#00a884] hover:bg-[#008069] text-white p-2.5 rounded-full transition cursor-pointer flex items-center justify-center shadow-sm"
              title="Agendar Asesoría"
            >
              <ThumbsUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Toggle show more opinions */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center space-x-1.5 bg-white hover:bg-slate-50 border border-slate-200 py-2.5 px-5 rounded-full text-xs sm:text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition shadow-xs cursor-pointer"
          >
            <span>{expanded ? 'Ocultar chats antiguos' : 'Ver más capturas y chats de WhatsApp'}</span>
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Footer info CTA */}
        <div className="mt-14 text-center border-t border-slate-200/55 pt-10">
          <p className="font-display font-bold text-slate-800 text-sm sm:text-base block mb-5">
            Únete a la comunidad de más de 1,000 clientes que ya tomaron el control de su retiro por WhatsApp.
          </p>
          <button
            onClick={onScrollToForm}
            className="inline-flex items-center space-x-1.5 bg-brand-yellow hover:bg-brand-yellow-hover text-brand-blue-600 border border-brand-yellow-hover/40 font-display font-bold text-xs sm:text-sm px-7 py-4 rounded-full transition-all shadow-md hover:scale-102 cursor-pointer uppercase tracking-wider"
          >
            <span>Quiero asesorarme gratis con Brenda</span>
          </button>
        </div>

      </div>
    </section>
  );
}
