import type { ParticipationFields } from "../participation";

export const leadStatuses = ["nuevo", "contactado", "en_conversacion", "cerrado"] as const;
export type LeadStatus = (typeof leadStatuses)[number];
export type Lead = ParticipationFields & {
  id: string;
  createdAt: string;
  updatedAt: string;
  consentAt: string;
  status: LeadStatus;
  notes: string;
};
export type LeadFilters = {
  q?: string;
  status?: string;
  village?: string;
  interest?: string;
  page?: number;
};
export type LeadStats = Record<LeadStatus, number> & { total: number };
export type LeadList = {
  leads: Lead[];
  total: number;
  page: number;
  pageSize: number;
  stats: LeadStats;
};
export type CrmSession = { email: string; expiresAt: string };
export type LeadSubmission = ParticipationFields & {
  consent: true;
  website: string;
  idempotencyKey: string;
};
