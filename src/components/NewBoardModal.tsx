'use client';

import React, { useState } from 'react';
import { useBoardContext } from '@/context/BoardContext';
import { BoardTemplate } from '@/types';
import { boardTemplates } from '@/data/boards';

interface NewBoardModalProps {
  onClose: () => void;
}

export default function NewBoardModal({ onClose }: NewBoardModalProps) {
  const { addBoard } = useBoardContext();
  const [selectedTemplate, setSelectedTemplate] = useState<BoardTemplate>('software-development');
  const [boardName, setBoardName] = useState('');

  const handleCreate = () => {
    const name = boardName.trim() || boardTemplates.find(t => t.id === selectedTemplate)!.name;
    addBoard(selectedTemplate, name);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={onClose}>
      <div
        className="bg-gray-800 rounded-xl w-full max-w-lg mx-4 shadow-2xl border border-gray-700"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-white text-sm font-semibold">Create New Board</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <label className="text-gray-400 text-[10px] uppercase tracking-wider block mb-1">Board Name</label>
            <input
              type="text"
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
              placeholder="Enter board name (optional)"
              className="w-full bg-gray-900 border border-gray-700 rounded text-xs text-white px-3 py-2 placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-gray-400 text-[10px] uppercase tracking-wider block mb-2">Select Template</label>
            <div className="grid grid-cols-2 gap-2">
              {boardTemplates.map(template => (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`p-3 rounded-lg border text-left transition-colors ${
                    selectedTemplate === template.id
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-gray-700 hover:border-gray-600 bg-gray-900'
                  }`}
                >
                  <h4 className="text-white text-xs font-medium mb-1">{template.name}</h4>
                  <p className="text-gray-400 text-[9px] leading-relaxed">{template.description}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-1.5 text-xs text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-1.5 rounded transition-colors"
            >
              Create Board
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
