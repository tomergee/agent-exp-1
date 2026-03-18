import { Agent } from '@/types';

export const softwareDevAgents: Agent[] = [
  { id: 'agent-po', role: 'Product Owner', status: 'idle', color: '#3b82f6' },
  { id: 'agent-tl', role: 'Tech Lead', status: 'idle', color: '#8b5cf6' },
  { id: 'agent-qa', role: 'QA', status: 'working', color: '#f59e0b' },
  { id: 'agent-dev', role: 'Developer', status: 'idle', color: '#22c55e' },
  { id: 'agent-cr', role: 'Code Reviewer', status: 'idle', color: '#ef4444' },
  { id: 'agent-sm', role: 'Scrum Master', status: 'idle', color: '#ec4899' },
];

export const talentAcquisitionAgents: Agent[] = [
  { id: 'agent-recruiter', role: 'Recruiter', status: 'idle', color: '#3b82f6' },
  { id: 'agent-hm', role: 'Hiring Manager', status: 'idle', color: '#8b5cf6' },
  { id: 'agent-interviewer', role: 'Interviewer', status: 'idle', color: '#22c55e' },
];

export const salesAgents: Agent[] = [
  { id: 'agent-sr', role: 'Sales Rep', status: 'idle', color: '#3b82f6' },
  { id: 'agent-sm-sales', role: 'Sales Manager', status: 'idle', color: '#8b5cf6' },
];

export const cisoAgents: Agent[] = [
  { id: 'agent-ciso', role: 'CISO', status: 'idle', color: '#ef4444' },
  { id: 'agent-sa', role: 'Security Analyst', status: 'idle', color: '#f59e0b' },
];
