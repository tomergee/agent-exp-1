import { Column } from '@/types';

export const softwareDevColumns: Column[] = [
  { id: 'backlog', title: 'Backlog', color: '#6b7280' },
  { id: 'ready-for-breakdown', title: 'Ready for Breakdown', color: '#8b5cf6' },
  { id: 'in-breakdown', title: 'In Breakdown', color: '#f59e0b' },
  { id: 'tasks-in-review', title: 'Tasks in Review', color: '#f59e0b' },
  { id: 'in-development', title: 'In Development', color: '#ef4444' },
  { id: 'in-qa', title: 'In QA', color: '#f97316' },
  { id: 'done', title: 'Done', color: '#22c55e' },
];

export const talentAcquisitionColumns: Column[] = [
  { id: 'backlog', title: 'Open Positions', color: '#6b7280' },
  { id: 'ready-for-breakdown', title: 'Sourcing', color: '#8b5cf6' },
  { id: 'in-breakdown', title: 'Screening', color: '#f59e0b' },
  { id: 'tasks-in-review', title: 'Interviewing', color: '#f59e0b' },
  { id: 'in-development', title: 'Assessment', color: '#ef4444' },
  { id: 'in-qa', title: 'Offer Stage', color: '#f97316' },
  { id: 'done', title: 'Hired', color: '#22c55e' },
];

export const salesColumns: Column[] = [
  { id: 'backlog', title: 'Leads', color: '#6b7280' },
  { id: 'ready-for-breakdown', title: 'Qualified', color: '#8b5cf6' },
  { id: 'in-breakdown', title: 'Proposal', color: '#f59e0b' },
  { id: 'tasks-in-review', title: 'Negotiation', color: '#f59e0b' },
  { id: 'in-development', title: 'Contract', color: '#ef4444' },
  { id: 'in-qa', title: 'Closing', color: '#f97316' },
  { id: 'done', title: 'Won', color: '#22c55e' },
];

export const cisoColumns: Column[] = [
  { id: 'backlog', title: 'Threats', color: '#6b7280' },
  { id: 'ready-for-breakdown', title: 'Triage', color: '#8b5cf6' },
  { id: 'in-breakdown', title: 'Investigation', color: '#f59e0b' },
  { id: 'tasks-in-review', title: 'Remediation', color: '#f59e0b' },
  { id: 'in-development', title: 'Testing', color: '#ef4444' },
  { id: 'in-qa', title: 'Validation', color: '#f97316' },
  { id: 'done', title: 'Resolved', color: '#22c55e' },
];
