'use client';

import { BoardProvider } from '@/context/BoardContext';
import Header from '@/components/Header';
import BoardTabs from '@/components/BoardTabs';
import KanbanBoard from '@/components/KanbanBoard';
import AgentSidebar from '@/components/AgentSidebar';

export default function Home() {
  return (
    <BoardProvider>
      <div className="h-screen flex flex-col bg-[#0f1219]">
        <Header />
        <BoardTabs />
        <div className="flex flex-1 overflow-hidden">
          <KanbanBoard />
          <AgentSidebar />
        </div>
      </div>
    </BoardProvider>
  );
}
