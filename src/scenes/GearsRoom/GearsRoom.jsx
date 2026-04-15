import React, { useState } from 'react';
import BackButton from '../../components/BackButton/BackButton';
import InteractiveObject from '../../components/InteractiveObject/InteractiveObject';
import CombinationLock from '../../components/CombinationLock/CombinationLock';
import './GearsRoom.css';

import bgDefault from '../../assets/scene-room-gears.jpg';
import bgOverlay from '../../assets/scene-room-gears-overlay.jpg';

const LOCK_POS      = { top: '180px', left: '450px', width: '160px', height: '200px' };
const FISH_SOCK_POS = { top: '120px', left: '180px', width: '200px', height: '200px' };

function GearsRoom({ onNavigate, onNavigateBack, onNavigateNext, onNavigatePrev, onObjectClick, debug, successFlashes, gameFlags }) {
  const [lockOpen, setLockOpen] = useState(false);

  const lockSolved  = gameFlags.gears_lock_solved;
  const fishPlaced  = gameFlags.gears_fish_placed;

  const bg = fishPlaced ? bgOverlay : bgDefault;

  const handleLockSuccess = () => {
    setLockOpen(false);
    onObjectClick('gears_lock_success');
    onNavigate('estatues_room');
  };

  return (
    <div className="gears-room-scene" style={{ backgroundImage: `url(${bg})` }}>
      <BackButton onClick={onNavigateBack} />
      <button className="nav-arrow left"  onClick={onNavigatePrev}>&#9664;</button>
      <button className="nav-arrow right" onClick={onNavigateNext}>&#9654;</button>

      {fishPlaced && (
        <InteractiveObject
          id="gears_lock_collider"
          position={LOCK_POS}
          onClick={() => lockSolved ? onNavigate('estatues_room') : setLockOpen(true)}
          debug={debug}
          successFlashes={successFlashes}
        />
      )}

      {!fishPlaced && (
        <InteractiveObject
          id="gears_fish_socket"
          position={FISH_SOCK_POS}
          onClick={() => onObjectClick('gears_fish_socket_click')}
          debug={debug}
          successFlashes={successFlashes}
        />
      )}

      {lockOpen && (
        <CombinationLock
          answer="PARDALZINHO"
          onSuccess={handleLockSuccess}
          onClose={() => setLockOpen(false)}
        />
      )}
    </div>
  );
}

export default GearsRoom;
