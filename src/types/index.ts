export type AgentRole =
  | 'Product Owner'
  | 'Tech Lead'
  | 'QA'
  | 'Developer'
  | 'Code Reviewer'
  | 'Scrum Master'
  | 'Recruiter'
  | 'Hiring Manager'
  | 'Interviewer'
  | 'Sales Rep'
  | 'Sales Manager'
  | 'CISO'
  | 'Security Analyst';

export type AgentStatus = 'idle' | 'working';

export interface Agent {
  id: string;
  role: AgentRole;
  status: AgentStatus;
  color: string;
  avatar?: string;
}

export type ColumnId =
  | 'backlog'
  | 'ready-for-breakdown'
  | 'in-breakdown'
  | 'tasks-in-review'
  | 'in-development'
  | 'in-qa'
  | 'done';

export interface Column {
  id: ColumnId;
  title: string;
  color: string;
}

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Task {
  id: string;
  number: number;
  title: string;
  description: string;
  columnId: ColumnId;
  storyId?: string;
  subtasks: SubTask[];
  epic?: string;
  assignedAgent?: string;
  tags?: string[];
}

export interface ChatMessage {
  id: string;
  from: AgentRole;
  to: AgentRole;
  message: string;
  timestamp: string;
  storyRefs?: string[];
  taskRefs?: string[];
}

export type BoardTemplate = 'software-development' | 'talent-acquisition' | 'sales' | 'ciso';

export interface Board {
  id: string;
  name: string;
  template: BoardTemplate;
  columns: Column[];
  tasks: Task[];
  agents: Agent[];
  chatMessages: ChatMessage[];
}
