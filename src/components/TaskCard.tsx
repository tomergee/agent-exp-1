'use client';

import React, { useState } from 'react';
import { Task } from '@/types';
import TaskDetailModal from './TaskDetailModal';

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const [showDetail, setShowDetail] = useState(false);
  const completedSubtasks = task.subtasks.filter(st => st.completed).length;
  const totalSubtasks = task.subtasks.length;

  return (
    <>
      <div
        onClick={() => setShowDetail(true)}
        className="bg-gray-800 rounded-lg p-3 cursor-pointer hover:bg-gray-750 hover:ring-1 hover:ring-gray-600 transition-all group"
      >
        <div className="flex items-start justify-between mb-1">
          <h4 className="text-white text-xs font-medium leading-tight flex-1 mr-2">
            {task.title}
          </h4>
          <span className="text-gray-500 text-[10px] font-mono shrink-0">#{task.number}</span>
        </div>

        <p className="text-gray-400 text-[10px] leading-relaxed mb-2 line-clamp-2">
          {task.description}
        </p>

        {task.tags && task.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {task.tags.map((tag, i) => (
              <span
                key={i}
                className="bg-gray-700 text-gray-300 text-[9px] px-1.5 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {totalSubtasks > 0 && (
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-1 text-gray-400">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" strokeWidth="2" />
              </svg>
              <span className="text-[10px]">{completedSubtasks}/{totalSubtasks}</span>
            </div>
            <div className="flex-1 h-1.5 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${(completedSubtasks / totalSubtasks) * 100}%`,
                  backgroundColor:
                    completedSubtasks === totalSubtasks
                      ? '#22c55e'
                      : completedSubtasks > totalSubtasks / 2
                      ? '#f59e0b'
                      : '#3b82f6',
                }}
              />
            </div>
          </div>
        )}
      </div>

      {showDetail && <TaskDetailModal task={task} onClose={() => setShowDetail(false)} />}
    </>
  );
}
