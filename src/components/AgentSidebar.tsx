'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useBoardContext } from '@/context/BoardContext';
import { Agent, ChatMessage } from '@/types';

function AgentAvatar({ agent }: { agent: Agent }) {
  const initials = agent.role
    .split(' ')
    .map(w => w[0])
    .join('')
    .slice(0, 2);

  return (
    <div className="flex items-center gap-2 group">
      <div className="relative">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
          style={{ backgroundColor: agent.color }}
        >
          {initials}
        </div>
        <div
          className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-gray-900 ${
            agent.status === 'working' ? 'bg-yellow-400' : 'bg-green-400'
          }`}
        />
      </div>
      <div className="flex flex-col">
        <span className="text-white text-[11px] font-medium leading-tight">{agent.role}</span>
        <span
          className={`text-[9px] ${
            agent.status === 'working' ? 'text-yellow-400' : 'text-green-400'
          }`}
        >
          {agent.status === 'working' ? 'Working' : 'Idle'}
        </span>
      </div>
    </div>
  );
}

function ChatBubble({ message }: { message: ChatMessage }) {
  return (
    <div className="px-3 py-2 border-b border-gray-800/50">
      <div className="flex items-center gap-1 mb-0.5">
        <span className="text-white text-[10px] font-semibold">{message.from}</span>
        <span className="text-gray-500 text-[10px]">→</span>
        <span className="text-blue-400 text-[10px] font-medium">@{message.to}</span>
        <span className="text-gray-600 text-[9px] ml-auto">{message.timestamp}</span>
      </div>
      <p className="text-gray-300 text-[10px] leading-relaxed">{message.message}</p>
      <div className="flex gap-1 mt-1">
        {message.storyRefs?.map(ref => (
          <span key={ref} className="bg-blue-900/50 text-blue-300 text-[8px] px-1 py-0.5 rounded">
            {ref}
          </span>
        ))}
        {message.taskRefs?.map(ref => (
          <span key={ref} className="bg-purple-900/50 text-purple-300 text-[8px] px-1 py-0.5 rounded">
            {ref}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function AgentSidebar() {
  const { activeBoard, simulateAgentWork, isSimulating, setIsSimulating } = useBoardContext();
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [chatInput, setChatInput] = useState('');

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeBoard.chatMessages.length]);

  const handleSimulate = () => {
    if (isSimulating) {
      setIsSimulating(false);
      window.location.reload();
    } else {
      setIsSimulating(true);
      simulateAgentWork();
    }
  };

  return (
    <aside className="w-[320px] bg-gray-900 border-l border-gray-700 flex flex-col shrink-0">
      {/* Agents Section */}
      <div className="p-3 border-b border-gray-700">
        <h2 className="text-white text-xs font-bold mb-3 flex items-center justify-between">
          Agents
          <button
            onClick={handleSimulate}
            className={`text-[9px] px-2 py-0.5 rounded font-normal transition-colors ${
              isSimulating
                ? 'bg-red-600/30 text-red-400 hover:bg-red-600/50'
                : 'bg-green-600/30 text-green-400 hover:bg-green-600/50'
            }`}
          >
            {isSimulating ? 'Stop' : 'Simulate'}
          </button>
        </h2>
        <div className="grid grid-cols-2 gap-2">
          {activeBoard.agents.map(agent => (
            <AgentAvatar key={agent.id} agent={agent} />
          ))}
        </div>
      </div>

      {/* Chat Section */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="px-3 py-2 border-b border-gray-700 flex items-center justify-between">
          <h2 className="text-white text-xs font-bold flex items-center gap-2">
            <svg className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zm-4 0H9v2h2V9z" clipRule="evenodd" />
            </svg>
            Agent Chat
          </h2>
          <span className="text-gray-500 text-[9px]">{activeBoard.chatMessages.length} messages</span>
        </div>

        <div className="flex-1 overflow-y-auto">
          {activeBoard.chatMessages.map(msg => (
            <ChatBubble key={msg.id} message={msg} />
          ))}
          <div ref={chatEndRef} />
        </div>

        <div className="p-2 border-t border-gray-700">
          <div className="flex gap-1">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Type a message... (use @ to mention an agent)"
              className="flex-1 bg-gray-800 border border-gray-700 rounded text-[10px] text-white px-2 py-1.5 placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
