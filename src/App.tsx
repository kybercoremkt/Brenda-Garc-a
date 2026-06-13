import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import TrustBanner from './components/TrustBanner';
import ProblemGuideSection from './components/ProblemGuideSection';
import WhyBrendaSection from './components/WhyBrendaSection';
import TargetSeriesSection from './components/TargetSeriesSection';
import TestimonialsSection from './components/TestimonialsSection';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import WhatsAppFloatingButton from './components/WhatsAppFloatingButton';
import GraciasPage from './components/GraciasPage';
import LinksPage from './components/LinksPage';
import { LeadRegistration } from './types';

export default function App() {
  const [leads, setLeads] = useState<LeadRegistration[]>([]);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Sync with browser history push state
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Setup scrolling refs
  const headerFormRef = useRef<HTMLDivElement | null>(null);
  const faqRef = useRef<HTMLDivElement | null>(null);

  // Load initial leads on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('brenda_ppr_leads');
      if (stored) {
        setLeads(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Error loading initial leads:', e);
    }
  }, []);

  // Update lead list whenever a registration succeeds
  const handleSuccessLead = (newLead: LeadRegistration) => {
    setLeads((prev) => {
      // Avoid duplicates if any
      const exists = prev.some(l => l.id === newLead.id);
      if (exists) return prev;
      return [...prev, newLead];
    });
  };

  const handleClearLeads = () => {
    localStorage.removeItem('brenda_ppr_leads');
    setLeads([]);
  };

  // Scrolling handlers
  const scrollToForm = () => {
    headerFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const scrollToFaq = () => {
    faqRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (currentPath === '/gracias') {
    return <GraciasPage />;
  }

  if (currentPath === '/links') {
    return (
      <LinksPage 
        onBackToHome={() => {
          window.history.pushState({}, '', '/');
          setCurrentPath('/');
        }} 
      />
    );
  }

  return (
    <div className="relative min-h-screen w-full max-w-full overflow-x-hidden bg-white text-slate-900 selection:bg-brand-blue-500 selection:text-white">
      {/* Background radial atmosphere */}
      <div className="absolute top-0 left-1/2 w-[1000px] h-[600px] bg-brand-blue-500/5 rounded-full blur-[140px] pointer-events-none -translate-x-1/2" />

      {/* Navigation */}
      <Navigation onScrollToForm={scrollToForm} onScrollToFaq={scrollToFaq} />

      {/* Section 1: Hero + Registration Form (Integrated) */}
      <HeroSection onSuccessLead={handleSuccessLead} formRef={headerFormRef} />

      {/* Proof / trust banner below the hero */}
      <TrustBanner />

      {/* Section 2: El problema + La guía (Fusionadas) */}
      <ProblemGuideSection onScrollToForm={scrollToForm} />

      {/* Section 3: Por qué con Brenda (Diferenciadores reales) */}
      <WhyBrendaSection onScrollToForm={scrollToForm} />

      {/* Section 4: ¿Para quién es? (Perfiles e identificación) */}
      <TargetSeriesSection onScrollToForm={scrollToForm} />

      {/* Section 5: Testimoniales + Prueba social (10 Testimoniales) */}
      <TestimonialsSection onScrollToForm={scrollToForm} />

      {/* Section 6: FAQ + CTA Final */}
      <div ref={faqRef}>
        <FaqSection onScrollToForm={scrollToForm} />
      </div>

      {/* Footer (Contact channels + Admin panel toggler) */}
      <Footer 
        onScrollToFaq={scrollToFaq} 
        onOpenDashboard={() => setIsAdminOpen(true)} 
        leadsCount={leads.length}
      />

      {/* Hidden Interactive Admins Consola */}
      <AnimatePresence>
        {isAdminOpen && (
          <AdminDashboard 
            isOpen={isAdminOpen} 
            onClose={() => setIsAdminOpen(false)} 
            leads={leads}
            onClearLeads={handleClearLeads}
          />
        )}
      </AnimatePresence>

      {/* Floating WhatsApp Action Trigger */}
      <WhatsAppFloatingButton onSuccessLead={handleSuccessLead} />
    </div>
  );
}
