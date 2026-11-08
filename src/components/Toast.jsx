import React from 'react';
import { CheckCircle } from 'lucide-react';

export default function Toast({ message }) {
  if (!message) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 bg-cyan-500 text-slate-950 px-6 py-3 rounded-lg shadow-lg shadow-cyan-500/30 font-bold flex items-center gap-2 animate-bounce">
      <CheckCircle className="w-5 h-5" />
      {message}
    </div>
  );
}