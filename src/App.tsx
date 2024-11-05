import React from 'react';
import Game from './components/Game';
import { X } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center p-4">
      <div className="text-white flex items-center gap-2 mb-8">
        <X className="w-8 h-8 animate-spin-slow" />
        <h1 className="text-4xl font-bold">Tic Tac Toe</h1>
      </div>
      <Game />
    </div>
  );
}

export default App;