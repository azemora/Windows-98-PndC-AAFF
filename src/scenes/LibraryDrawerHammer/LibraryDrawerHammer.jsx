import React from 'react';
import BackButton from '../../components/BackButton/BackButton';
import InteractiveObject from '../../components/InteractiveObject/InteractiveObject';
import './LibraryDrawerHammer.css';
import hammerWorldImage from '../../assets/item-hammer-world.png';

const HAMMER_POS = { top: '90px', left: '300px', width: '350px', height: '350px' };

function LibraryDrawerHammer({ onNavigate, onObjectClick, debug, successFlashes, gameFlags }) {
  return (
    <div className="library-drawer-scene">
      <BackButton onClick={() => onNavigate('library')} />
      
      {!gameFlags.hammer_taken && (
        <InteractiveObject 
          id="hammer_pickup"
          position={HAMMER_POS}
          onClick={() => onObjectClick('hammer_pickup')}
          debug={debug}
          successFlashes={successFlashes}
        >
          <img src={hammerWorldImage} alt="Martelo" className="world-item-image" />
        </InteractiveObject>
      )}
    </div>
  );
}
export default LibraryDrawerHammer;