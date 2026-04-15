import React, { useState, useEffect } from 'react';
import BackButton from '../../components/BackButton/BackButton';
import InteractiveObject from '../../components/InteractiveObject/InteractiveObject';
import './EstatuesRoom.css';

import bgGod        from '../../assets/scene-room-god.jpg';
import bgGodCrystal from '../../assets/scene-room-godcrystal.jpg';
import godVideo     from '../../assets/scene-room-godvideo.mp4';

const CRYSTAL_POS = { top: '100px', left: '550px', width: '130px', height: '160px' };

// phase: 'idle' | 'crystal' | 'video' | 'fading'
function EstatuesRoom({ onNavigate, onNavigateBack, onObjectClick, debug, successFlashes, gameFlags }) {
  const [phase, setPhase] = useState('idle');

  const crystalPlaced = gameFlags.god_crystal_placed;

  useEffect(() => {
    if (crystalPlaced && phase === 'idle') {
      setPhase('crystal');
      setTimeout(() => setPhase('video'), 1000);
    }
  }, [crystalPlaced]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleVideoEnded = () => {
    setPhase('fading');
    setTimeout(() => onNavigate('final'), 1500);
  };

  const bg = phase === 'crystal' ? bgGodCrystal : bgGod;

  return (
    <div
      className="estatues-room-scene"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {phase === 'idle' && (
        <BackButton onClick={onNavigateBack} />
      )}

      {phase === 'idle' && !crystalPlaced && (
        <InteractiveObject
          id="god_crystal_socket"
          position={CRYSTAL_POS}
          onClick={() => onObjectClick('god_crystal_socket_click')}
          debug={debug}
          successFlashes={successFlashes}
        />
      )}

      {phase === 'video' && (
        <video
          className="god-video"
          autoPlay
          muted
          onEnded={handleVideoEnded}
        >
          <source src={godVideo} type="video/mp4" />
        </video>
      )}

      {phase === 'fading' && (
        <div className="god-fade-overlay" />
      )}
    </div>
  );
}

export default EstatuesRoom;
