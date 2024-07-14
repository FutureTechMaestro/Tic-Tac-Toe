import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [turn, setTurn] = useState("x");
  const [board, setBoard] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = (idx) => {
    if (board[idx] !== null || winner !== null) {
      return;
    }
    const newBoard = [...board];
    newBoard[idx] = turn;
    setBoard(newBoard);
    setTurn(turn === 'x' ? 'o' : 'x');
  }

  const checkWinner = (board) => {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  }

  const checkDraw = (board) => {
    return board.every(cell => cell !== null);
  }

  const handleSignIn = (e) => {
    e.preventDefault();
    if (username && password) {
      setIsSignedIn(true);
    }
  }

  useEffect(() => {
    const winner = checkWinner(board);
    if (winner) {
      setWinner(winner);
    } else if (checkDraw(board)) {
      setIsDraw(true);
    }
  }, [board]);

  return (
    <>
      {!isSignedIn ? (
        <div className="sign-in-form">
          <h1>Sign In</h1>
          <form onSubmit={handleSignIn}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">great Job! Go and play game</button>
          </form>
        </div>
      ) : (
        <>
          <h1>Tic Tac Toe</h1>
          {winner && <h2>{winner} wins!</h2>}
          {!winner && isDraw && <h2>It's a draw!</h2>}
          <div className='layout'>
            {board.map((cell, idx) => (
              <div
                key={idx}
                className={`box ${cell}`} 
                onClick={() => handleClick(idx)}
              >
                {cell}
              </div>
            ))}
          </div>
        </>
      )}
    </>
  )
}

export default App;
