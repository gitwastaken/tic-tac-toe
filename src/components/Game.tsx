import React, { useState, useEffect } from 'react';
import { X, Circle } from 'lucide-react';

type Player = 'X' | 'O' | null;
type BoardState = Player[];

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6] // Diagonals
];

function Game() {
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<Player>(null);
  const [winningLine, setWinningLine] = useState<number[]>([]);
  const [lastMove, setLastMove] = useState<number | null>(null);

  useEffect(() => {
    checkWinner();
  }, [board]);

  const checkWinner = () => {
    for (const combo of WINNING_COMBINATIONS) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        setWinningLine(combo);
        return;
      }
    }
    if (board.every(square => square !== null)) {
      setWinner('draw');
    }
  };

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
    setLastMove(index);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setWinningLine([]);
    setLastMove(null);
  };

  const renderSquare = (index: number) => {
    const isWinningSquare = winningLine.includes(index);
    const isLastMove = lastMove === index;

    return (
      <button
        key={index}
        onClick={() => handleClick(index)}
        className={`w-24 h-24 border-2 border-white/20 flex items-center justify-center transition-all duration-300 
          ${!board[index] && !winner ? 'hover:bg-white/10 hover:scale-[0.97]' : ''} 
          ${isWinningSquare ? 'bg-white/20' : 'bg-white/5'}
          ${isLastMove ? 'animate-fade-in' : ''}
          ${index < 3 ? 'border-t-0' : ''}
          ${index % 3 === 0 ? 'border-l-0' : ''}
          ${index % 3 === 2 ? 'border-r-0' : ''}
          ${index > 5 ? 'border-b-0' : ''}`}
      >
        {board[index] && (
          <div 
            className={`transform transition-all duration-300 
              ${isWinningSquare ? 'scale-110' : 'scale-100'}
              ${isLastMove ? 'animate-bounce-in' : ''}`}
          >
            {board[index] === 'X' ? (
              <X className={`w-12 h-12 ${isWinningSquare ? 'text-pink-300' : 'text-pink-400'}`} />
            ) : (
              <Circle className={`w-12 h-12 ${isWinningSquare ? 'text-indigo-300' : 'text-indigo-400'}`} />
            )}
          </div>
        )}
      </button>
    );
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="grid grid-cols-3 bg-white/5 backdrop-blur-lg rounded-lg overflow-hidden shadow-2xl transform transition-all duration-300 hover:shadow-indigo-500/20">
        {Array(9).fill(null).map((_, index) => renderSquare(index))}
      </div>

      <div className="text-white text-center">
        {winner ? (
          <div className="space-y-4 animate-fade-in">
            <p className="text-2xl font-bold">
              {winner === 'draw' ? "It's a draw!" : `Player ${winner} wins!`}
            </p>
            <button
              onClick={resetGame}
              className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/10"
            >
              Play Again
            </button>
          </div>
        ) : (
          <p className="text-2xl font-bold animate-pulse">
            Player {isXNext ? 'X' : 'O'}'s turn
          </p>
        )}
      </div>
    </div>
  );
}

export default Game;