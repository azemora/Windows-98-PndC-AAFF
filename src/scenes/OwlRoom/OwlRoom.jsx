import React from 'react';
import BackButton from '../../components/BackButton/BackButton';
import InteractiveObject from '../../components/InteractiveObject/InteractiveObject';
import './OwlRoom.css';

import bgBefore from '../../assets/scene-room-owl.jpg';
import bgAfter  from '../../assets/scene-room-owl-afterrepair.jpg';

const OWL_POSITION = { top: '100px', left: '500px', width: '200px', height: '300px' };

function OwlRoom({ onNavigate, onNavigateBack, onNavigateNext, onNavigatePrev, onObjectClick, debug, successFlashes, gameFlags }) {
  const repaired = gameFlags.wire_puzzle_1_solved;

  return (
    <div
      className="owl-room-scene"
      style={{ backgroundImage: `url(${repaired ? bgAfter : bgBefore})` }}
    >
      <BackButton onClick={onNavigateBack} />
      <button className="nav-arrow left"  onClick={onNavigatePrev}>&#9664;</button>
      <button className="nav-arrow right" onClick={onNavigateNext}>&#9654;</button>

      {!repaired && (
        <InteractiveObject
          id="owl_collider"
          position={OWL_POSITION}
          onClick={() => onObjectClick('owl_collider')}
          debug={debug}
          successFlashes={successFlashes}
        />
      )}
    </div>
  );
}

export default OwlRoom;
