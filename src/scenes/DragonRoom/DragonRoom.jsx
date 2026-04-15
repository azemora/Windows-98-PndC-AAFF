import React from 'react';
import BackButton from '../../components/BackButton/BackButton';
import InteractiveObject from '../../components/InteractiveObject/InteractiveObject';
import './DragonRoom.css';

import bgDefault     from '../../assets/scene-room-dragon.jpg';
import bgHeartPlaced from '../../assets/scene-room-dragon-heart-placed.jpg';
import bgDone        from '../../assets/scene-room-dragon-heart-done-valve-done.jpg';

// Altar where the dragon heart is dropped
const HEART_DROP_POS  = { top: '220px', left: '400px', width: '180px', height: '200px' };
// Valve puzzle door — navigates to dragon_puzzle scene
const PUZZLE_DOOR_POS = { top: '300px', left: '80px',  width: '160px', height: '100px' };
// Passage to OctoRoom — only after puzzle fully solved
const OCTO_DOOR_POS   = { top: '120px', left: '720px', width: '130px', height: '280px' };

function DragonRoom({ onNavigate, onNavigateBack, onNavigateNext, onNavigatePrev, onObjectClick, debug, successFlashes, gameFlags }) {
  const heartPlaced = gameFlags.dragon_heart_placed;
  const done        = gameFlags.dragon_puzzle_solved;

  // bgDefault → bgHeartPlaced → bgDone
  const bg = done ? bgDone : heartPlaced ? bgHeartPlaced : bgDefault;

  return (
    <div
      className="dragon-room-scene"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <BackButton onClick={onNavigateBack} />
      <button className="nav-arrow left"  onClick={onNavigatePrev}>&#9664;</button>
      <button className="nav-arrow right" onClick={onNavigateNext}>&#9654;</button>

      {/* Altar drop zone — until heart is placed */}
      {!heartPlaced && (
        <InteractiveObject
          id="dragon_heart_drop_zone"
          position={HEART_DROP_POS}
          onClick={() => onObjectClick('dragon_heart_drop_zone')}
          debug={debug}
          successFlashes={successFlashes}
        />
      )}

      {/* Valve puzzle door — until solved */}
      {!done && (
        <InteractiveObject
          id="dragon_valve_device"
          position={PUZZLE_DOOR_POS}
          onClick={() => onObjectClick('dragon_valve_device')}
          debug={debug}
          successFlashes={successFlashes}
        />
      )}

      {/* OctoRoom passage — only after fully solved */}
      {done && (
        <InteractiveObject
          id="dragon_to_octo"
          position={OCTO_DOOR_POS}
          onClick={() => onObjectClick('dragon_to_octo')}
          debug={debug}
          successFlashes={successFlashes}
        />
      )}
    </div>
  );
}

export default DragonRoom;
