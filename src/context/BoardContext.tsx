'use client';

import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { Board, Task, ColumnId, ChatMessage, AgentRole, BoardTemplate } from '@/types';
import { defaultBoard, createBoard } from '@/data/boards';

interface BoardContextType {
  boards: Board[];
  activeBoard: Board;
  activeBoardIndex: number;
  setActiveBoardIndex: (index: number) => void;
  moveTask: (taskId: string, toColumnId: ColumnId) => void;
  addBoard: (template: BoardTemplate, name: string) => void;
  addChatMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  simulateAgentWork: () => void;
  isSimulating: boolean;
  setIsSimulating: (val: boolean) => void;
  epic: string;
  setEpic: (epic: string) => void;
  connectedUsers: number;
  sessionId: string;
}

const BoardContext = createContext<BoardContextType | undefined>(undefined);

export function BoardProvider({ children }: { children: React.ReactNode }) {
  const [boards, setBoards] = useState<Board[]>([defaultBoard]);
  const [activeBoardIndex, setActiveBoardIndex] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [epic, setEpic] = useState('All Epics');
  const [connectedUsers] = useState(3);
  const [sessionId] = useState(() => {
    const chars = 'abcdef0123456789';
    return Array.from({ length: 7 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  });
  const simulationRef = useRef<NodeJS.Timeout | null>(null);

  const activeBoard = boards[activeBoardIndex];

  const moveTask = useCallback((taskId: string, toColumnId: ColumnId) => {
    setBoards(prev => prev.map((board, i) => {
      if (i !== activeBoardIndex) return board;
      return {
        ...board,
        tasks: board.tasks.map(task =>
          task.id === taskId ? { ...task, columnId: toColumnId } : task
        ),
      };
    }));
  }, [activeBoardIndex]);

  const addBoard = useCallback((template: BoardTemplate, name: string) => {
    const newBoard = createBoard(template, name);
    setBoards(prev => [...prev, newBoard]);
    setActiveBoardIndex(prev => prev + 1);
  }, []);

  const addChatMessage = useCallback((message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMessage: ChatMessage = {
      ...message,
      id: `msg-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
    };
    setBoards(prev => prev.map((board, i) => {
      if (i !== activeBoardIndex) return board;
      return { ...board, chatMessages: [...board.chatMessages, newMessage] };
    }));
  }, [activeBoardIndex]);

  const simulateAgentWork = useCallback(() => {
    if (simulationRef.current) {
      clearInterval(simulationRef.current);
      simulationRef.current = null;
    }

    const agentActions: { from: AgentRole; to: AgentRole; action: string }[] = [
      { from: 'Scrum Master', to: 'Developer', action: 'Please write the implementation for' },
      { from: 'Developer', to: 'Scrum Master', action: 'Completed implementation for' },
      { from: 'Scrum Master', to: 'Code Reviewer', action: 'Please review the code for' },
      { from: 'Code Reviewer', to: 'Scrum Master', action: 'Code review approved for' },
      { from: 'Scrum Master', to: 'QA', action: 'Please create test scenarios for' },
      { from: 'QA', to: 'Scrum Master', action: 'All tests passed for' },
    ];

    let actionIndex = 0;

    simulationRef.current = setInterval(() => {
      const action = agentActions[actionIndex % agentActions.length];
      const taskNum = Math.floor(Math.random() * 40) + 1;

      // Toggle agent status
      setBoards(prev => prev.map((board, i) => {
        if (i !== activeBoardIndex) return board;
        return {
          ...board,
          agents: board.agents.map(agent => {
            if (agent.role === action.from) return { ...agent, status: 'working' as const };
            if (agent.role === action.to) return { ...agent, status: 'working' as const };
            return { ...agent, status: Math.random() > 0.7 ? 'working' as const : 'idle' as const };
          }),
        };
      }));

      addChatMessage({
        from: action.from,
        to: action.to,
        message: `${action.action} task #${taskNum}.`,
        storyRefs: [`STORY-${Math.floor(Math.random() * 10) + 1}`],
        taskRefs: [`TASK-${taskNum}`],
      });

      actionIndex++;
    }, 3000);
  }, [activeBoardIndex, addChatMessage]);

  useEffect(() => {
    return () => {
      if (simulationRef.current) clearInterval(simulationRef.current);
    };
  }, []);

  return (
    <BoardContext.Provider
      value={{
        boards,
        activeBoard,
        activeBoardIndex,
        setActiveBoardIndex,
        moveTask,
        addBoard,
        addChatMessage,
        simulateAgentWork,
        isSimulating,
        setIsSimulating,
        epic,
        setEpic,
        connectedUsers,
        sessionId,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
}

export function useBoardContext() {
  const context = useContext(BoardContext);
  if (!context) throw new Error('useBoardContext must be used within BoardProvider');
  return context;
}
