'use client';

import React from 'react';
import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useBoardContext } from '@/context/BoardContext';
import { ColumnId } from '@/types';
import KanbanColumn from './KanbanColumn';

export default function KanbanBoard() {
  const { activeBoard, moveTask, epic } = useBoardContext();
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  const filteredTasks = epic === 'All Epics'
    ? activeBoard.tasks
    : activeBoard.tasks.filter(t => t.epic === epic);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id as string;
    const newColumnId = over.id as ColumnId;
    moveTask(taskId, newColumnId);
  }

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="flex-1 overflow-x-auto overflow-y-hidden p-4">
        <div className="flex gap-4 h-full">
          {activeBoard.columns.map(column => (
            <KanbanColumn
              key={column.id}
              column={column}
              tasks={filteredTasks.filter(t => t.columnId === column.id)}
            />
          ))}
        </div>
      </div>
    </DndContext>
  );
}
