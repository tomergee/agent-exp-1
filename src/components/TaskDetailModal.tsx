'use client';

import React from 'react';
import { Task } from '@/types';

interface TaskDetailModalProps {
  task: Task;
  onClose: () => void;
}

export default function TaskDetailModal({ task, onClose }: TaskDetailModalProps) {
  const completedSubtasks = task.subtasks.filter(st => st.completed).length;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={onClose}>
      <div
        className="bg-gray-800 rounded-xl w-full max-w-lg mx-4 shadow-2xl border border-gray-700"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-xs font-mono">#{task.number}</span>
            <h2 className="text-white text-sm font-semibold">{task.title}</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <h3 className="text-gray-400 text-[10px] uppercase tracking-wider mb-1">Description</h3>
            <p className="text-gray-300 text-xs">{task.description}</p>
          </div>

          {task.epic && (
            <div>
              <h3 className="text-gray-400 text-[10px] uppercase tracking-wider mb-1">Epic</h3>
              <span className="bg-blue-900/40 text-blue-300 text-xs px-2 py-0.5 rounded">{task.epic}</span>
            </div>
          )}

          {task.storyId && (
            <div>
              <h3 className="text-gray-400 text-[10px] uppercase tracking-wider mb-1">Story</h3>
              <span className="bg-purple-900/40 text-purple-300 text-xs px-2 py-0.5 rounded">{task.storyId}</span>
            </div>
          )}

          <div>
            <h3 className="text-gray-400 text-[10px] uppercase tracking-wider mb-1">Column</h3>
            <span className="text-gray-300 text-xs capitalize">{task.columnId.replace(/-/g, ' ')}</span>
          </div>

          {task.subtasks.length > 0 && (
            <div>
              <h3 className="text-gray-400 text-[10px] uppercase tracking-wider mb-2">
                Subtasks ({completedSubtasks}/{task.subtasks.length})
              </h3>
              <div className="space-y-1">
                {task.subtasks.map(st => (
                  <div key={st.id} className="flex items-center gap-2">
                    <div
                      className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${
                        st.completed
                          ? 'bg-green-500 border-green-500'
                          : 'border-gray-600'
                      }`}
                    >
                      {st.completed && (
                        <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className={`text-xs ${st.completed ? 'text-gray-500 line-through' : 'text-gray-300'}`}>
                      {st.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
