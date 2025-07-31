import React, { useState, useEffect, useRef } from 'react';
import { PUZZLES_DB } from '../../database/puzzles';
import './TerminalWindow.css';

function TerminalWindow({ puzzleId, onClose, onPasswordSuccess, onSuccessAction, gameFlags }) {
  const puzzle = PUZZLES_DB[puzzleId];
  
  const [lines, setLines] = useState([]);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [isPuzzleSolved, setIsPuzzleSolved] = useState(false);
  
  // States para os diferentes tipos de puzzle
  const [passwordStage, setPasswordStage] = useState(0);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const contentRef = useRef(null);
  const lineCounterRef = useRef(0);

  // Efeito para scrollar para o final quando novas linhas são adicionadas
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [lines]);

  // Efeito principal que controla o que é exibido no terminal
  useEffect(() => {
    if (!puzzle) return;

    // Checa se o puzzle JÁ FOI COMPLETAMENTE RESOLVIDO
  if (puzzle.solvedText && (gameFlags[`${puzzleId}_solved`] || (puzzleId === 'gem_unlocker_puzzle' && gameFlags.blue_gem_spawned))) {
  setLines(puzzle.solvedText.split('\n'));
  setIsInputVisible(false);
  return;
}
    
    // Checa a PRÉ-CONDIÇÃO (ex: se a caveira foi colocada)
    if (puzzle.preConditionText && puzzleId === 'gem_unlocker_puzzle' && !gameFlags.skull_placed_on_scanner) {
      setLines(puzzle.preConditionText.split('\n'));
      setIsInputVisible(false);
      return;
    }

    // Reseta o estado para uma nova animação
    setLines([]); 
    setIsInputVisible(false);
    lineCounterRef.current = 0;
    
    const interval = setInterval(() => {
      if (lineCounterRef.current < puzzle.loadingText.length) {
        setLines(prev => [...prev, puzzle.loadingText[lineCounterRef.current]]);
        lineCounterRef.current++;
      } else {
        if (puzzle.type === 'sequence') {
           setLines(prev => [...prev, puzzle.promptText[0]]);
        }
        setIsInputVisible(true);
        clearInterval(interval);
      }
    }, 700);

    return () => clearInterval(interval);
  }, [puzzleId, gameFlags]);

  const handleSequenceSubmit = (event) => {
    event.preventDefault();
    if (!password || isPuzzleSolved) return;

    const currentPassword = puzzle.correctPassword[passwordStage];
    let newLines = [...lines, `> ${password}`];

    if (password.toLowerCase() === currentPassword.toLowerCase()) {
      const nextStage = passwordStage + 1;
      if (nextStage >= puzzle.correctPassword.length) {
        newLines.push(puzzle.successText);
        setIsInputVisible(false);
        setIsPuzzleSolved(true);
        if (onPasswordSuccess) onPasswordSuccess(puzzleId);
        setTimeout(() => { onClose(); }, 1500);
      } else {
        newLines.push('...OK');
        newLines.push(puzzle.promptText[nextStage]);
        setPasswordStage(nextStage);
      }
    } else {
      newLines.push(puzzle.errorText);
      newLines.push(puzzle.promptText[passwordStage]);
    }
    setLines(newLines);
    setPassword('');
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    if (isPuzzleSolved) return;

    const newLines = [...lines, `${puzzle.userLabel} ${username}`, `${puzzle.passwordLabel} ********`];

    if (username.toLowerCase() === puzzle.correctUser.toLowerCase() && password.toLowerCase() === puzzle.correctPassword.toLowerCase()) {
      newLines.push(puzzle.successText);
      setIsInputVisible(false);
      setIsPuzzleSolved(true);
      if (onPasswordSuccess) onPasswordSuccess(puzzleId);
      setTimeout(() => { onClose(); }, 1500);
    } else {
      newLines.push(puzzle.errorText);
    }
    setLines(newLines);
    setUsername('');
    setPassword('');
  };

  const handleSuccessClick = () => {
    if (onSuccessAction) {
      onSuccessAction(puzzleId);
    }
    onClose();
  };

  const renderTerminalBody = () => {
    if (isPuzzleSolved && puzzle.successButtonText) {
      return <button className="terminal-success-button" onClick={handleSuccessClick}>{puzzle.successButtonText}</button>;
    }

    if (!isInputVisible) return null;

    if (puzzle.type === 'login') {
      return (
        <form onSubmit={handleLoginSubmit}>
          <div className="login-line">
            <label htmlFor="username">{puzzle.userLabel}</label>
            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} autoFocus className="terminal-input" />
          </div>
          <div className="login-line">
            <label htmlFor="password">{puzzle.passwordLabel}</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="terminal-input" />
          </div>
          <button type="submit" style={{ display: 'none' }} />
        </form>
      );
    }

    if (puzzle.type === 'sequence') {
      return (
        <form onSubmit={handleSequenceSubmit} className="terminal-form">
          <span>&gt;</span>
          <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} autoFocus className="terminal-input" />
        </form>
      );
    }
  };

  return (
    <div className="terminal-overlay">
      <div className="terminal-window win98-window">
        <div className="terminal-title-bar win98-title-bar">
          <p>P.4.T.4 MANSA OS - Terminal</p>
          <button className="win98-close-button" onClick={onClose}>X</button>
        </div>
        <div className="terminal-content" ref={contentRef}>
          {lines.map((line, index) => <p key={index}>{line}</p>)}
          {renderTerminalBody()}
        </div>
      </div>
    </div>
  );
}

export default TerminalWindow;