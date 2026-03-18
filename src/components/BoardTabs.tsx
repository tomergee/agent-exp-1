'use client';

import React, { useState } from 'react';
import { useBoardContext } from '@/context/BoardContext';
import NewBoardModal from './NewBoardModal';

export default function BoardTabs() {
  const { boards, activeBoardIndex, setActiveBoardIndex, epic, setEpic } = useBoardContext();
  const [showNewBoard, setShowNewBoard] = useState(false);

  return (
    <>
      <div className="bg-gray-900 border-b border-gray-700 px-4 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-2 px-3 py-2">
            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <span className="text-white text-sm font-semibold">Agent Scrum</span>
          </div>

          {boards.map((board, index) => (
            <button
              key={board.id}
              onClick={() => setActiveBoardIndex(index)}
              className={`px-3 py-2 text-xs font-medium rounded-t transition-colors ${
                index === activeBoardIndex
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              {board.name}
            </button>
          ))}

          <button
            onClick={() => setShowNewBoard(true)}
            className="px-3 py-2 text-xs text-gray-500 hover:text-white transition-colors"
          >
            + New Board
          </button>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-gray-400 text-xs">Epic:</label>
          <select
            value={epic}
            onChange={(e) => setEpic(e.target.value)}
            className="bg-gray-800 border border-gray-600 text-white text-xs rounded px-2 py-1 min-w-[140px]"
          >
            <option>All Epics</option>
            <option>Input Validation</option>
            <option>Error Handling</option>
            <option>Backend Infrastructure</option>
            <option>Authentication</option>
            <option>UI Design</option>
            <option>Security Standards</option>
            <option>Success Metrics</option>
            <option>Implementation Roadmap</option>
            <option>Registration</option>
            <option>Executive Summary</option>
          </select>
        </div>
      </div>

      {showNewBoard && <NewBoardModal onClose={() => setShowNewBoard(false)} />}
    </>
  );
}
