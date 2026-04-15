import React from 'react';
import BackButton from '../../components/BackButton/BackButton';
import InteractiveObject from '../../components/InteractiveObject/InteractiveObject';
import './HorseDragonHeart.css';

import bgBefore from '../../assets/scene-room-horsedragonheart.jpg';
import bgAfter  from '../../assets/scene-room-horsedragonheartgone.jpg';

const HEART_POSITION = { top: '100px', left: '370px', width: '200px', height: '300px' };

function HorseDragonHeart({ onNavigate, onNavigateBack, onObjectClick, debug, successFlashes, gameFlags }) {
  const taken = gameFlags.dragon_heart_taken;

  return (
    <div
      className="horse-dragonheart-scene"
      style={{ backgroundImage: `url(${taken ? bgAfter : bgBefore})` }}
    >
      <BackButton onClick={onNavigateBack} />

      {!taken && (
        <InteractiveObject
          id="dragon_heart_pickup"
          position={HEART_POSITION}
          onClick={() => onObjectClick('dragon_heart_pickup')}
          debug={debug}
          successFlashes={successFlashes}
        />
      )}
    </div>
  );
}

export default HorseDragonHeart;
