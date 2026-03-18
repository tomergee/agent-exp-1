'use client';

import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Column, Task } from '@/types';
import TaskCard from './TaskCard';

interface KanbanColumnProps {
  column: Column;
  tasks: Task[];
}

export default function KanbanColumn({ column, tasks }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col min-w-[220px] w-[220px] shrink-0 ${
        isOver ? 'ring-2 ring-blue-500 rounded-lg' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: column.color }}
          />
          <h3 className="text-white text-xs font-semibold">{column.title}</h3>
        </div>
        <span
          className="text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
          style={{
            backgroundColor: column.color + '30',
            color: column.color,
          }}
        >
          {tasks.length}
        </span>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto pr-1 pb-4 max-h-[calc(100vh-220px)]">
        {tasks.length === 0 ? (
          <div className="text-gray-600 text-[10px] text-center py-4">No items</div>
        ) : (
          tasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))
        )}
      </div>
    </div>
  );
}
