'use client';

import React, { useState } from 'react';

interface SettingsModalProps {
  onClose: () => void;
}

export default function SettingsModal({ onClose }: SettingsModalProps) {
  const [activeTab, setActiveTab] = useState<'general' | 'agents' | 'tools'>('general');

  const tools = [
    'Code Generator', 'Code Reviewer', 'Test Runner', 'Security Scanner',
    'Linter', 'Dependency Checker', 'Documentation Generator', 'API Tester',
    'Database Migration', 'CI/CD Pipeline', 'Docker Builder', 'Git Manager',
    'Slack Notifier', 'Email Sender', 'Calendar Scheduler', 'CRM Sync',
    'Resume Parser', 'Interview Scheduler', 'Background Checker', 'Offer Generator',
    'Compliance Checker', 'Vulnerability Scanner', 'Penetration Tester', 'Log Analyzer',
    'Incident Reporter', 'Access Controller', 'Encryption Manager', 'Audit Logger',
    'Lead Scorer', 'Proposal Generator', 'Contract Builder',
  ];

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={onClose}>
      <div
        className="bg-gray-800 rounded-xl w-full max-w-2xl mx-4 shadow-2xl border border-gray-700"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-white text-sm font-semibold">Settings</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex">
          <div className="w-40 border-r border-gray-700 p-2">
            {(['general', 'agents', 'tools'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left px-3 py-1.5 text-xs rounded transition-colors capitalize ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex-1 p-4">
            {activeTab === 'general' && (
              <div className="space-y-3">
                <div>
                  <label className="text-gray-400 text-[10px] uppercase tracking-wider block mb-1">Speed Model</label>
                  <select className="w-full bg-gray-900 border border-gray-700 rounded text-xs text-white px-3 py-2">
                    <option>Gemini 2.0 Flash</option>
                    <option>GPT-4o Mini</option>
                    <option>Claude Haiku</option>
                  </select>
                </div>
                <div>
                  <label className="text-gray-400 text-[10px] uppercase tracking-wider block mb-1">Reasoning Model</label>
                  <select className="w-full bg-gray-900 border border-gray-700 rounded text-xs text-white px-3 py-2">
                    <option>Claude Opus</option>
                    <option>GPT-4o</option>
                    <option>Gemini Pro</option>
                  </select>
                </div>
                <div>
                  <label className="text-gray-400 text-[10px] uppercase tracking-wider block mb-1">Simulation Speed</label>
                  <select className="w-full bg-gray-900 border border-gray-700 rounded text-xs text-white px-3 py-2">
                    <option>Normal (3s)</option>
                    <option>Fast (1s)</option>
                    <option>Slow (5s)</option>
                  </select>
                </div>
              </div>
            )}

            {activeTab === 'agents' && (
              <div className="space-y-2">
                <p className="text-gray-400 text-xs mb-3">Configure agent roles and capabilities. Click an agent to customize.</p>
                {['Product Owner', 'Tech Lead', 'QA', 'Developer', 'Code Reviewer', 'Scrum Master'].map(agent => (
                  <div key={agent} className="flex items-center justify-between bg-gray-900 rounded px-3 py-2">
                    <span className="text-white text-xs">{agent}</span>
                    <span className="text-green-400 text-[9px]">Active</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'tools' && (
              <div>
                <p className="text-gray-400 text-xs mb-3">31 built-in tools available across all board templates.</p>
                <div className="grid grid-cols-2 gap-1.5 max-h-72 overflow-y-auto">
                  {tools.map(tool => (
                    <div key={tool} className="flex items-center gap-2 bg-gray-900 rounded px-2 py-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                      <span className="text-gray-300 text-[10px]">{tool}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
