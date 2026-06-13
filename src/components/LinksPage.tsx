import React from 'react';
import { motion } from 'motion/react';
import { 
  Calendar, 
  MessageCircle, 
  Globe, 
  ArrowLeft,
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';

interface LinksPageProps {
  onBackToHome?: () => void;
}

export default function LinksPage({ onBackToHome }: LinksPageProps) {
  
  const handleBackToHome = () => {
    if (onBackToHome) {
      onBackToHome();
    } else {
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new Event('popstate'));
    }
  };

  // Official networks & links
  const links = [
    {
      id: 'whatsapp-taller',
      title: 'Inscríbete al taller gratuito Retiro Millonario',
      subtitle: 'Taller virtual • Multiplica tu dinero 💰',
      url: 'https://api.whatsapp.com/send/?phone=527293080780&text=Quiero%20inscribirme%20al%20taller%20%22Retiro%20Millonario%22',
      isPrimary: true,
      icon: (
        <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center shrink-0 shadow-sm text-white">
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.517 2.266 2.27 3.51 5.281 3.51 8.487 0 6.66-5.338 12-11.952 12-2.009-.002-3.98-.501-5.734-1.447L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.59 1.966 14.12 .94 11.498.94c-5.44 0-9.863 4.374-9.868 9.802-.001 1.814.485 3.591 1.411 5.169l-.993 3.63 3.738-.971c1.556.902 3.19 1.384 4.863 1.39zM17.65 14.65c-.307-.154-1.82-.9-2.1-.1s-.143.307-.307.49-.327.2-.634.04c-.307-.154-1.3-.479-2.478-1.531-.916-.818-1.534-1.83-1.714-2.137-.18-.306-.02-.471.134-.624.14-.139.307-.358.461-.537.154-.18.205-.307.307-.513.102-.205.051-.384-.026-.538-.077-.154-.69-1.666-.948-2.285-.24-.6-.52-.51-.69-.517-.16-.007-.34-.01-.52-.01-.18 0-.471.068-.718.338-.246.27-.94.919-.94 2.243s.962 2.597 1.096 2.776c.133.179 1.895 2.894 4.59 4.053.64.275 1.141.44 1.53.563.644.205 1.229.176 1.693.107.517-.077 1.58-.646 1.802-1.24s.224-1.1.157-1.21-.245-.164-.552-.322z" />
          </svg>
        </div>
      )
    },
    {
      id: 'calendar-15min',
      title: 'Agenda una sesión gratis de 15min conmigo',
      subtitle: 'Sesión virtual de orientación • Cupos Limitados ⏱️',
      url: 'https://cal.com/brendagarcia.mx/15min',
      isPrimary: true,
      isYellow: true,
      icon: (
        <div className="w-10 h-10 bg-brand-blue-600 rounded-full flex items-center justify-center shrink-0 shadow-sm text-brand-yellow">
          <Calendar className="w-5 h-5 text-brand-yellow" />
        </div>
      )
    },
    {
      id: 'landing-home',
      title: 'Visita mi página web principal',
      subtitle: 'Descubre mi método de asesoría para tu retiro 💡',
      url: '#',
      isHomeLink: true,
      icon: (
        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center shrink-0 text-slate-650">
          <Globe className="w-5 h-5" />
        </div>
      )
    }
  ];

  const socialLinks = [
    {
      name: 'YouTube',
      title: 'Sígueme en YouTube',
      subtitle: 'Videos sobre retiro, finanzas y PPR 🎥',
      url: 'https://www.youtube.com/@brenda.garciamx',
      bgClass: 'bg-white hover:bg-rose-50/10 border-slate-200 hover:border-red-200 text-slate-800 hover:text-red-600',
      iconClass: 'bg-red-500 text-white',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      )
    },
    {
      name: 'TikTok',
      title: 'Sígueme en TikTok',
      subtitle: 'Tips de ahorro y retiro diarios 📱',
      url: 'https://www.tiktok.com/@brenda.garciamx',
      bgClass: 'bg-white hover:bg-slate-50/55 border-slate-200 hover:border-slate-400 text-slate-800',
      iconClass: 'bg-slate-900 text-white',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12.525.04c.85-.04 1.69-.02 2.52-.02.08 1.83.92 3.49 2.38 4.54 1.05.74 2.31 1.15 3.6 1.19v2.51c-1.39-.02-2.76-.44-3.92-1.22.01.76.01 1.51.01 2.27 0 3.48-1.57 6.78-4.72 8.35-2.22 1.1-4.85.99-6.95-.31-2.51-1.55-3.69-4.82-2.61-7.56 1-2.53 3.73-4.06 6.39-3.4 1-.22 1.02.97.63 1.54-.53.79-1.44 1.15-2.35.95-1.12-.24-2.31.25-2.88 1.25-.68 1.19-.34 2.85.79 3.63 1.04.72 2.49.52 3.3-.43.34-.39.46-.91.46-1.42 0-3.51 0-7.02 0-10.53-.01.07-.01 0 0 0z" />
        </svg>
      )
    },
    {
      name: 'Facebook',
      title: 'Sígueme en Facebook',
      subtitle: 'Infografías y consejos de asesoría de retiro 👥',
      url: 'https://www.facebook.com/soyBrenda.Garciamx',
      bgClass: 'bg-white hover:bg-blue-50/10 border-slate-200 hover:border-blue-200 text-slate-800 hover:text-blue-600',
      iconClass: 'bg-blue-600 text-white',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16 relative overflow-hidden flex flex-col font-sans">
      
      {/* Visual background accents */}
      <div className="absolute top-0 left-1/2 w-[600px] h-[350px] bg-brand-blue-500/10 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 -translate-y-12" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Top action bar: Go back to site */}
      <div className="max-w-md mx-auto w-full px-4 pt-4 flex justify-between items-center relative z-10">
        <button 
          onClick={handleBackToHome}
          className="inline-flex items-center space-x-1.5 text-xs text-brand-blue-600 font-bold bg-white px-3.5 py-1.5 rounded-full shadow-sm hover:shadow transition-all duration-200 border border-slate-200/60 active:scale-95 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver al sitio</span>
        </button>
        
        <div className="flex items-center space-x-1 text-[11px] font-mono font-bold text-brand-blue-500/90 bg-white/80 border border-slate-200/50 px-3 py-1 rounded-full shadow-xs">
          <Award className="w-3 h-3 text-brand-blue-500" />
          <span>Brenda García</span>
        </div>
      </div>

      {/* Main container */}
      <div className="max-w-md mx-auto w-full px-4 pt-6 flex-grow flex flex-col items-center relative z-10">
        
        {/* Profile Card Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center w-full flex flex-col items-center mb-8"
        >
          {/* Circular avatar with Brenda's photo */}
          <div className="relative mb-4 group">
            <div className="absolute -inset-1.5 bg-gradient-to-tr from-brand-blue-500 to-brand-yellow rounded-full blur-sm opacity-70 group-hover:opacity-100 transition duration-300" />
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-white bg-slate-100 shadow-md">
              <img 
                src="https://scontent.fgdl17-1.fna.fbcdn.net/v/t39.30808-6/463291094_494002506965836_5292220335111613906_n.jpg?stp=dst-jpg_tt6&cstp=mx1500x1500&ctp=s1500x1500&_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEhpcSfOIauoTSkIlRNzrNs9QSvDtbzBiX1BK8O1vMGJTHbFChf5w5Xu-RwmFIoHeYgsTXP4xnmPqk7MijBE3_W&_nc_ohc=BuNsiaA5KC4Q7kNvwH8BzoX&_nc_oc=AdpZh8UiNMmm7bqSMTBk3rJSlSAXlTo1NOT7v31jITi5yt01vVc_wRRkZ7OtNU1Wrjc&_nc_zt=23&_nc_ht=scontent.fgdl17-1.fna&_nc_gid=W8g9QLMaXMINu6F2N1UUxQ&_nc_ss=7b2a8&oh=00_Af9bIpMb4ap6CVNVj7w6j2sArBZ6icoU1-zqGH7ZEn0cpw&oe=6A326CFF" 
                alt="Brenda García" 
                className="w-full h-full object-cover scale-110 object-top"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Profile Name & Professional Title */}
          <h1 className="font-display font-extrabold text-xl sm:text-2xl text-brand-blue-600 tracking-tight flex items-center justify-center space-x-1">
            <span>Brenda García</span>
            <svg className="w-5.5 h-5.5 text-brand-blue-500 fill-current ml-0.5 shrink-0" viewBox="0 0 24 24">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
          </h1>
          <p className="text-xs font-mono font-bold text-brand-blue-500 uppercase tracking-widest mt-1">
            Especialista en Planes Personales para el Retiro
          </p>

          {/* User Request Multiplicador Header banner */}
          <div className="mt-5 w-full bg-brand-blue-600 text-white rounded-2xl p-4 shadow-sm border border-brand-blue-700/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-yellow/10 rounded-full blur-lg pointer-events-none" />
            
            <span className="block text-[10px] tracking-wider uppercase font-mono font-bold text-brand-yellow">
              Taller Gratuito 🎓
            </span>
            <h2 className="font-display font-extrabold text-[15px] sm:text-base leading-tight mt-1 text-white">
              Multiplica tu dinero: Retiro Millonario 💰
            </h2>
          </div>
        </motion.div>

        {/* Links Navigation Grid */}
        <div className="w-full space-y-4">
          {links.map((link, idx) => {
            const isClickableHash = link.isHomeLink;
            const linkProps = isClickableHash ? {
              onClick: (e: React.MouseEvent) => {
                e.preventDefault();
                handleBackToHome();
              },
              href: '#'
            } : {
              href: link.url,
              target: '_blank',
              rel: 'noopener noreferrer'
            };

            // Custom color button styles based on properties
            let btnBgClass = 'bg-white text-slate-800 hover:bg-slate-50 border-slate-200/70 shadow-sm hover:border-slate-350';
            let titleColorClass = 'text-slate-900 group-hover:text-brand-blue-500';
            
            if (link.isPrimary) {
              if (link.isYellow) {
                // Electric yellow custom button
                btnBgClass = 'bg-brand-yellow text-brand-blue-700 hover:bg-brand-yellow-hover border-brand-yellow shadow-md ring-2 ring-brand-yellow/10';
                titleColorClass = 'text-brand-blue-700 font-bold';
              } else {
                // Energetic emerald green button
                btnBgClass = 'bg-white border-2 border-emerald-500 text-emerald-800 hover:bg-emerald-50/50 shadow-md ring-2 ring-emerald-500/10 hover:border-emerald-600';
                titleColorClass = 'text-emerald-900 font-bold';
              }
            }

            return (
              <motion.a
                key={link.id}
                {...linkProps}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * (idx + 1) }}
                className={`group flex items-center p-3.5 rounded-2xl border transition-all duration-300 block relative hover:-translate-y-0.5 select-none ${btnBgClass}`}
              >
                {/* Micro active shine effect on primary links */}
                {link.isPrimary && (
                  <span className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                )}

                <div className="mr-3.5 shrink-0 relative">
                  {link.icon}
                  {link.isPrimary && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full ping-muted" />
                  )}
                </div>

                <div className="flex-grow text-left">
                  <span className={`block text-xs sm:text-[13px] font-bold tracking-tight leading-tight transition-colors duration-200 ${titleColorClass}`}>
                    {link.title}
                  </span>
                  <span className="block text-[10px] text-slate-500 leading-normal mt-0.5 font-medium">
                    {link.subtitle}
                  </span>
                </div>

                <div className="ml-2.5 shrink-0 opacity-40 group-hover:opacity-100 transition-opacity duration-200">
                  <ChevronRight className="w-5 h-5 text-slate-500" />
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* Social Networks Container */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="w-full mt-10 text-center"
        >
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 block mb-3.5">
            Mi presencia en redes
          </span>
          <div className="w-full space-y-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`group flex items-center p-3.5 rounded-2xl border transition-all duration-300 block relative hover:-translate-y-0.5 select-none ${social.bgClass}`}
              >
                <div className="mr-3.5 shrink-0">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm ${social.iconClass}`}>
                    {social.icon}
                  </div>
                </div>

                <div className="flex-grow text-left">
                  <span className="block text-xs sm:text-[13px] font-bold tracking-tight leading-tight text-slate-900 group-hover:text-brand-blue-600 transition-colors">
                    {social.title}
                  </span>
                  <span className="block text-[10px] text-slate-500 leading-normal mt-0.5 font-medium">
                    {social.subtitle}
                  </span>
                </div>

                <div className="ml-2.5 shrink-0 opacity-40 group-hover:opacity-100 transition-opacity duration-200">
                  <ChevronRight className="w-5 h-5 text-slate-500" />
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Bottom Logo & Copy */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-14 text-center text-slate-400 flex flex-col items-center"
        >
          <img 
            src="https://i.ibb.co/kVnQXs3b/Union-1.png" 
            alt="Brenda García Logo" 
            className="h-7 w-auto object-contain opacity-50 hover:opacity-100 transition duration-300 mb-3"
            referrerPolicy="no-referrer"
          />
          <p className="text-[9px] text-slate-400/80 font-medium">
            © {new Date().getFullYear()} Brenda García. Todos los derechos reservados.
          </p>
          <p className="text-[8px] text-slate-400/50 mt-1 max-w-[280px] leading-normal font-mono">
            Asesoría patrimonial sobre Planes Personales de Retiro (PPR) en México.
          </p>
        </motion.div>

      </div>
    </div>
  );
}
