import React, { useState } from 'react';
import BackButton from '../../components/BackButton/BackButton';
import InteractiveObject from '../../components/InteractiveObject/InteractiveObject';
import CombinationLock from '../../components/CombinationLock/CombinationLock';
import './OctoRoom.css';

import bgDefault from '../../assets/scene-room-octo.jpg';
import bgBlood   from '../../assets/scene-room-octo-blood.jpg';

// Collider leading to the wire puzzle focus scene
const FOCUS_COLLIDER_POS = { top: '260px', left: '300px', width: '100px', height: '100px' };
// Collider that opens the combination lock
const LOCK_COLLIDER_POS  = { top: '100px', left: '450px', width: '100px', height: '100px' };

function OctoRoom({ onNavigate, onNavigateBack, onObjectClick, debug, successFlashes, gameFlags }) {
  const [lockOpen, setLockOpen] = useState(false);

  const crystalTaken   = gameFlags.crystal_blood_taken;
  const passwordSolved = gameFlags.octo_password_solved;
  const allDone        = crystalTaken && passwordSolved;

  const bg = allDone ? bgBlood : bgDefault;

  const handleLockSuccess = () => {
    setLockOpen(false);
    onObjectClick('octo_password_success');
  };

  return (
    <div
      className="octo-room-scene"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <BackButton onClick={onNavigateBack} />

      {/* Wire puzzle / crystal collider — until crystal is taken */}
      {!crystalTaken && (
        <InteractiveObject
          id="octo_focus_collider"
          position={FOCUS_COLLIDER_POS}
          onClick={() => onObjectClick('octo_focus_collider')}
          debug={debug}
          successFlashes={successFlashes}
        />
      )}

      {/* Combination lock collider — until password is solved */}
      {!passwordSolved && (
        <InteractiveObject
          id="octo_lock_collider"
          position={LOCK_COLLIDER_POS}
          onClick={() => setLockOpen(true)}
          debug={debug}
          successFlashes={successFlashes}
        />
      )}

      {lockOpen && (
        <CombinationLock
          answer="CHORA"
          onSuccess={handleLockSuccess}
          onClose={() => setLockOpen(false)}
        />
      )}
    </div>
  );
}

export default OctoRoom;
