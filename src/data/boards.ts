import { Board, BoardTemplate } from '@/types';
import { softwareDevColumns, talentAcquisitionColumns, salesColumns, cisoColumns } from './columns';
import { softwareDevAgents, talentAcquisitionAgents, salesAgents, cisoAgents } from './agents';
import { softwareDevTasks } from './tasks';
import { softwareDevChat } from './chat';

export const boardTemplates: { id: BoardTemplate; name: string; description: string }[] = [
  {
    id: 'software-development',
    name: 'Software Development',
    description: 'Agile software development with automated code review, testing, and deployment pipeline.',
  },
  {
    id: 'talent-acquisition',
    name: 'Talent Acquisition',
    description: 'End-to-end hiring pipeline with automated sourcing, screening, and interview coordination.',
  },
  {
    id: 'sales',
    name: 'Sales',
    description: 'Sales pipeline management with lead qualification, proposal generation, and CRM syncing.',
  },
  {
    id: 'ciso',
    name: 'CISO (Security)',
    description: 'Security operations with threat detection, incident response, and compliance tracking.',
  },
];

export function createBoard(template: BoardTemplate, name: string): Board {
  const columnsMap = {
    'software-development': softwareDevColumns,
    'talent-acquisition': talentAcquisitionColumns,
    sales: salesColumns,
    ciso: cisoColumns,
  };

  const agentsMap = {
    'software-development': softwareDevAgents,
    'talent-acquisition': talentAcquisitionAgents,
    sales: salesAgents,
    ciso: cisoAgents,
  };

  return {
    id: `board-${Date.now()}`,
    name,
    template,
    columns: columnsMap[template],
    tasks: template === 'software-development' ? softwareDevTasks : [],
    agents: agentsMap[template],
    chatMessages: template === 'software-development' ? softwareDevChat : [],
  };
}

export const defaultBoard: Board = {
  id: 'board-default',
  name: 'Software Development',
  template: 'software-development',
  columns: softwareDevColumns,
  tasks: softwareDevTasks,
  agents: softwareDevAgents,
  chatMessages: softwareDevChat,
};
