import React, { useState, useEffect } from 'react';
import { assetsToPreload } from '../../database/assets.js';
import './IntroAnimation.css';

const HACKER_TEXT = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_+=[]{}\\|;:",./<>?';

function IntroAnimation({ onAnimationComplete }) {
  const [text, setText] = useState('');
  const [progress, setProgress] = useState(0);
  const [isAssetsLoaded, setIsAssetsLoaded] = useState(false);
  const [isTimerFinished, setIsTimerFinished] = useState(false);

  // Efeito principal: decide quando a animação/loading está completa
  useEffect(() => {
    // Só chama a função de completar quando AMBAS as condições forem verdadeiras
    if (isAssetsLoaded && isTimerFinished) {
      onAnimationComplete();
    }
  }, [isAssetsLoaded, isTimerFinished, onAnimationComplete]);

  // Efeito para o timer de 5 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTimerFinished(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // Efeito para o pré-carregamento dos assets
  useEffect(() => {
    let loadedCount = 0;
    const totalAssets = assetsToPreload.length;

    if (totalAssets === 0) {
      setIsAssetsLoaded(true);
      return;
    }

    const updateProgress = () => {
      loadedCount++;
      const currentProgress = Math.round((loadedCount / totalAssets) * 100);
      setProgress(currentProgress);
      if (loadedCount === totalAssets) {
        setIsAssetsLoaded(true);
      }
    };

    assetsToPreload.forEach(src => {
      if (src.endsWith('.mp4')) {
        const video = document.createElement('video');
        video.src = src;
        video.oncanplaythrough = updateProgress;
        video.onerror = updateProgress;
      } else {
        const img = new Image();
        img.src = src;
        img.onload = updateProgress;
        img.onerror = updateProgress;
      }
    });
  }, []);
  
  // Efeito para a animação de texto (visual)
  useEffect(() => {
    const interval = setInterval(() => {
      let randomText = '';
      for (let i = 0; i < 2000; i++) {
        randomText += HACKER_TEXT[Math.floor(Math.random() * HACKER_TEXT.length)];
      }
      setText(randomText);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="intro-animation-container">
      <pre>{text}</pre>
      <div className="scan-line"></div>
      <div className="loading-progress">
        <p>CARREGANDO ARQUIVOS DO CASO... {progress}%</p>
      </div>
    </div>
  );
}

export default IntroAnimation;