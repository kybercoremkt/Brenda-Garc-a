import { useState, useTransition } from 'react';
import { motion } from 'motion/react';
import { 
  X, 
  Trash2, 
  Download, 
  Users, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Database, 
  Filter,
  RefreshCw,
  Search
} from 'lucide-react';
import { LeadRegistration } from '../types';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  leads: LeadRegistration[];
  onClearLeads: () => void;
}

export default function AdminDashboard({ isOpen, onClose, leads, onClearLeads }: AdminDashboardProps) {
  const [filter, setFilter] = useState<'all' | 'eligible' | 'disqualified_age' | 'disqualified_history'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [, startTransition] = useTransition();

  if (!isOpen) return null;

  // Statistics
  const totalLeads = leads.length;
  const eligibleLeads = leads.filter(l => l.status === 'eligible');
  const disqualifiedAgeLeads = leads.filter(l => l.status === 'disqualified_age');
  const disqualifiedHistoryLeads = leads.filter(l => l.status === 'disqualified_history');
  const totalDisqualified = disqualifiedAgeLeads.length + disqualifiedHistoryLeads.length;

  const conversionRate = totalLeads > 0 ? Math.round((eligibleLeads.length / totalLeads) * 100) : 0;

  // Filter & Search leads
  const filteredLeads = leads.filter(lead => {
    // Status Filter
    if (filter === 'eligible' && lead.status !== 'eligible') return false;
    if (filter === 'disqualified_age' && lead.status !== 'disqualified_age') return false;
    if (filter === 'disqualified_history' && lead.status !== 'disqualified_history') return false;

    // Search Query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = lead.name.toLowerCase().includes(q);
      const matchEmail = lead.email.toLowerCase().includes(q);
      const matchPhone = lead.phone.includes(q);
      return matchName || matchEmail || matchPhone;
    }

    return true;
  });

  // Export leads to CSV
  const handleExportCSV = () => {
    if (leads.length === 0) {
      alert('No hay leads registrados para exportar.');
      return;
    }

    const headers = [
      'ID',
      'Fecha/Hora',
      'Nombre',
      'WhatsApp',
      'Correo Electrónico',
      'Rango de Edad',
      'Historial Laboral (Pre-1997)',
      'Régimen Fiscal',
      'Presupuesto Mandado',
      'Horario de Webinar',
      'Status de Calificación'
    ];

    const rows = leads.map(l => [
      l.id,
      new Date(l.timestamp).toLocaleString('es-MX'),
      l.name,
      l.phone,
      l.email,
      l.ageRange,
      l.workHistory,
      l.taxRegime,
      l.monthlyBudget,
      l.selectedTimeSlot,
      l.status
    ]);

    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" 
      + [headers.join(','), ...rows.map(e => e.map(val => `"${String(val).replace(/"/g, '""')}"`).join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `comunidad_leads_brenda_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearLeads = () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar todas las simulaciones de prospectos? Esto limpiará el localStorage.')) {
      onClearLeads();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-sm flex justify-center items-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-6xl h-[90vh] flex flex-col shadow-2xl relative overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-950/40">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-brand-blue-500/10 text-brand-blue-400 flex items-center justify-center">
              <Database className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white">Consola de Leads Recibidos</h3>
              <p className="text-xs text-slate-400">Panel para la administración y descarga de leads pre-calificados en la Landing Page.</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800/80 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Container */}
        <div className="p-6 flex-1 overflow-y-auto space-y-6">
          
          {/* Metrics Bento Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400 font-mono">TOTAL LEADS</span>
                <Users className="w-4 h-4 text-brand-blue-400" />
              </div>
              <span className="block font-mono text-3xl font-extrabold text-white">{totalLeads}</span>
              <span className="text-[10px] text-slate-500 block">Registros totales en browser</span>
            </div>

            <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400 font-mono">CALIFICADOS (PPR)</span>
                <CheckCircle className="w-4 h-4 text-[#10b981]" />
              </div>
              <span className="block font-mono text-3xl font-extrabold text-[#10b981]">{eligibleLeads.length}</span>
              <span className="text-[10px] text-slate-500 block">Asesoría de Retiro estándar</span>
            </div>

            <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400 font-mono">DESCARTADOS (REDIREC)</span>
                <XCircle className="w-4 h-4 text-rose-500" />
              </div>
              <span className="block font-mono text-3xl font-extrabold text-rose-500">{totalDisqualified}</span>
              <span className="text-[10px] text-slate-500 block">Redirigidos a asesoría directa</span>
            </div>

            <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400 font-mono">TASA DE CALIFICADO</span>
                <Clock className="w-4 h-4 text-amber-500" />
              </div>
              <span className="block font-mono text-3xl font-extrabold text-amber-500">{conversionRate}%</span>
              <span className="text-[10px] text-slate-500 block">Eficiencia de pre-calificación</span>
            </div>
          </div>

          {/* Filtering and Actions Bar */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch">
            {/* Left Filter Actions */}
            <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              <button 
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${filter === 'all' ? 'bg-brand-blue-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
              >
                Todos
              </button>
              <button 
                onClick={() => setFilter('eligible')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${filter === 'eligible' ? 'bg-[#10b981] text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'}`}
              >
                Calificados
              </button>
              <button 
                onClick={() => setFilter('disqualified_age')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${filter === 'disqualified_age' ? 'bg-rose-950/80 text-rose-400 shadow-sm border border-rose-9e0/30' : 'text-slate-400 hover:text-white'}`}
              >
                Excl. Edad
              </button>
              <button 
                onClick={() => setFilter('disqualified_history')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${filter === 'disqualified_history' ? 'bg-rose-950/80 text-rose-400 shadow-sm border border-rose-9e0/30' : 'text-slate-400 hover:text-white'}`}
              >
                Excl. Ley 73
              </button>
            </div>

            {/* Search Input */}
            <div className="relative flex-1 md:max-w-xs">
              <Search className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Buscar por nombre, correo..."
                value={searchQuery}
                onSelect={(e) => {
                  startTransition(() => {
                    setSearchQuery((e.target as HTMLInputElement).value);
                  });
                }}
                className="w-full bg-slate-950 border border-slate-850 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-brand-blue-500"
              />
            </div>

            {/* Clear and Download Buttons */}
            <div className="flex items-center space-x-2">
              <button
                onClick={handleExportCSV}
                className="bg-slate-950 hover:bg-slate-850 text-white font-semibold py-2.5 px-4 rounded-xl text-xs border border-slate-800 flex items-center space-x-1.5 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Exportar CSV</span>
              </button>

              <button
                onClick={clearLeads}
                className="bg-transparent hover:bg-rose-950/25 border border-rose-900/30 text-rose-400 hover:text-rose-300 py-2.5 px-4 rounded-xl text-xs flex items-center space-x-1.5 cursor-pointer transition-colors"
                title="Limpiar datos de prueba"
              >
                <Trash2 className="w-4 h-4" />
                <span>Borrar Todo</span>
              </button>
            </div>
          </div>

          {/* Leads Table Container */}
          <div className="bg-slate-950 rounded-xl border border-slate-850 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#020509] border-b border-slate-850 text-slate-400 font-mono tracking-wider uppercase text-[10px]">
                  <tr>
                    <th className="p-4">Lead</th>
                    <th className="p-4">Email / Tel</th>
                    <th className="p-4">Régimen / Presupuesto</th>
                    <th className="p-4">Webinar Slot</th>
                    <th className="p-4">Calificación</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900 text-slate-350">
                  {filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-slate-500 font-medium">
                        Ningún lead califica bajo estas condiciones de búsqueda.
                      </td>
                    </tr>
                  ) : (
                    filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-900/40">
                        <td className="p-4 space-y-0.5">
                          <span className="block font-semibold text-white">{lead.name}</span>
                          <span className="block text-[10px] text-slate-500 font-mono">
                            {lead.id} • {new Date(lead.timestamp).toLocaleDateString()}
                          </span>
                        </td>
                        
                        <td className="p-4 space-y-0.5">
                          <span className="block">{lead.email}</span>
                          <span className="block text-slate-500 font-mono">{lead.phone}</span>
                        </td>

                        <td className="p-4 space-y-0.5 max-w-[200px] truncate">
                          <span className="block font-medium">
                            {lead.taxRegime === 'asalariado_pfae' ? 'Asalariado/PFAE' : lead.taxRegime === 'resico_informal' ? 'Independent/RESICO' : 'No lo sé'}
                          </span>
                          <span className="block text-slate-500">
                            Ahorro: {lead.monthlyBudget === 'menos_2000' ? '< $2,000' : lead.monthlyBudget === '2000_5000' ? '$2k - $5k' : '> $5k'}
                          </span>
                        </td>

                        <td className="p-4">
                          <span className="bg-slate-900 py-1 px-2.5 rounded-md border border-slate-800 text-white font-medium block w-fit">
                            {lead.selectedTimeSlot === 'lunes_11am' ? 'Lunes 11am' : lead.selectedTimeSlot === 'martes_6pm' ? 'Martes 6pm' : 'Jueves 6pm'}
                          </span>
                        </td>

                        <td className="p-4">
                          {lead.status === 'eligible' ? (
                            <span className="inline-flex items-center space-x-1 py-0.5 px-2 bg-emerald-950 border border-emerald-900/40 rounded-full text-[#10b981] font-semibold text-[10px]">
                              <CheckCircle className="w-3 h-3" />
                              <span>Eligible</span>
                            </span>
                          ) : lead.status === 'disqualified_age' ? (
                            <span className="inline-flex items-center space-x-1 py-0.5 px-2 bg-rose-950 border border-rose-900/30 rounded-full text-rose-400 font-semibold text-[10px]" title="Edad > 50">
                              <XCircle className="w-3 h-3" />
                              <span>Excl. Edad</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center space-x-1 py-0.5 px-2 bg-rose-950 border border-rose-900/30 rounded-full text-rose-400 font-semibold text-[10px]" title="Cotización Pre-1997 IMSS">
                              <XCircle className="w-3 h-3" />
                              <span>Excl. Ley 73</span>
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-[#020509] flex justify-between items-center text-slate-500 text-[11px] font-mono">
          <span>Brenda García PPR CRM Admin Panel</span>
          <span>© {new Date().getFullYear()}</span>
        </div>

      </motion.div>
    </div>
  );
}
