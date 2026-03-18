'use client';

import React, { useState } from 'react';

interface SubmitPRDModalProps {
  onClose: () => void;
}

export default function SubmitPRDModal({ onClose }: SubmitPRDModalProps) {
  const [prdText, setPrdText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!prdText.trim()) return;
    setSubmitted(true);
    setTimeout(onClose, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={onClose}>
      <div
        className="bg-gray-800 rounded-xl w-full max-w-2xl mx-4 shadow-2xl border border-gray-700"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-white text-sm font-semibold">Submit Product Requirements Document</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4 space-y-4">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-white text-sm font-semibold mb-1">PRD Submitted Successfully</h3>
              <p className="text-gray-400 text-xs">The AI agents will begin processing your requirements.</p>
            </div>
          ) : (
            <>
              <p className="text-gray-400 text-xs">
                Paste your Product Requirements Document below. The AI agents will automatically
                break it down into epics, stories, and tasks on the board.
              </p>

              <textarea
                value={prdText}
                onChange={(e) => setPrdText(e.target.value)}
                placeholder="Paste your PRD here...

Example:
# Project Sentinel
## 1. Executive Summary
Project Sentinel is a comprehensive security monitoring platform...

## 2. User Requirements
### 2.1 Registration & Onboarding
- Email verification flow
- Profile setup wizard
..."
                className="w-full h-64 bg-gray-900 border border-gray-700 rounded-lg text-xs text-gray-300 p-3 placeholder-gray-600 focus:outline-none focus:border-blue-500 resize-none font-mono"
              />

              <div className="flex justify-end gap-2">
                <button
                  onClick={onClose}
                  className="px-4 py-1.5 text-xs text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!prdText.trim()}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:text-gray-500 text-white text-xs font-semibold px-4 py-1.5 rounded transition-colors"
                >
                  Submit PRD
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
