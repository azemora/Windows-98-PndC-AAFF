import React, { useState, useEffect } from 'react';
import './IntroAnimation.css';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>!@#$%^*()-_+=[]{}|';

function IntroAnimation({ onAnimationComplete }) {
  const [lines, setLines] = useState(['']);

  useEffect(() => {
    // Animação de texto caindo
    const interval = setInterval(() => {
      setLines(prevLines => {
        const newLine = Array.from({ length: 50 }, () => CHARS[Math.floor(Math.random() * CHARS.length)]).join('');
        // Mantém apenas as últimas 20 linhas para o efeito de scroll
        return [...prevLines, newLine].slice(-20);
      });
    }, 100); // Adiciona uma nova linha a cada 100ms

    // Transição para a tela de login após 5 segundos
    const timer = setTimeout(() => {
      onAnimationComplete();
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onAnimationComplete]);

  return (
    <div className="intro-animation-container">
      {lines.map((line, index) => (
        <p key={index}>{line}</p>
      ))}
    </div>
  );
}

export default IntroAnimation;