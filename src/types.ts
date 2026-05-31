export interface LeadRegistration {
  id: string;
  name: string;
  phone: string;
  email: string;
  ageRange: 'más_de_50' | '30_a_49' | '18_a_29';
  workHistory: 'antes_1997' | 'despues_1997';
  taxRegime: 'asalariado_pfae' | 'resico_informal' | 'no_lo_se';
  monthlyBudget: 'menos_2000' | '2000_5000' | 'mas_5000';
  selectedTimeSlot: 'lunes_11am' | 'martes_6pm' | 'jueves_6pm';
  status: 'eligible' | 'disqualified_age' | 'disqualified_history' | 'disqualified_budget';
  timestamp: string;
}

export type AgeRangeOption = {
  value: LeadRegistration['ageRange'];
  label: string;
};

export type WorkHistoryOption = {
  value: LeadRegistration['workHistory'];
  label: string;
};

export type TaxRegimeOption = {
  value: LeadRegistration['taxRegime'];
  label: string;
};

export type MonthlyBudgetOption = {
  value: LeadRegistration['monthlyBudget'];
  label: string;
};

export type TimeSlotOption = {
  value: LeadRegistration['selectedTimeSlot'];
  label: string;
  day: string;
  time: string;
};

export interface Testimonial {
  id: string;
  text: string;
  author: string;
  location?: string;
  yearsActive?: number;
  highlighted: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
