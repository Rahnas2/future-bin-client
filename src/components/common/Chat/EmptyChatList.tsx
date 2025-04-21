import React from 'react';
import { MessageSquare } from 'lucide-react';

const EmptyChatList: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center mt-8 transition-all duration-300 ease-in-out">
      <div className="relative p-5 rounded-full mb-6 bg-gradient-to-br from-emerald-500/20 to-emerald-700/10 shadow-inner animate-pulse-slow">
        <div className="absolute inset-0 rounded-full bg-emerald-500/5 blur-md"></div>
        <MessageSquare className="h-12 w-12 text-emerald-400 relative z-10 transform transition-transform duration-500 hover:scale-110" />
      </div>
      <h3 className="text-2xl font-semibold text-gray-100 mb-3">No Messages Yet</h3>
      <p className="text-gray-400 max-w-sm leading-relaxed">
        When you receive new messages or notifications, they'll appear here.
      </p>
    </div>
  );
};

export default EmptyChatList