import React, { useState } from 'react';
import BackButton from '../../components/BackButton/BackButton';
import InteractiveObject from '../../components/InteractiveObject/InteractiveObject';
import ClockPuzzle from '../../components/ClockPuzzle/ClockPuzzle';
import CombinationLock from '../../components/CombinationLock/CombinationLock';
import './OwlBearFishRoom.css';

import bgDefault        from '../../assets/scene-room-owlbearfish.jpg';
import bgAfter          from '../../assets/scene-room-owlbear.jpg';
import bgOwlbearBook    from '../../assets/scene-room-owlbearbook.jpg';
import bgOwlbearBookGone from '../../assets/scene-room-owlbearbookgone.jpg';

const CLOCK_POS    = { top: '0px',  left: '460px', width: '150px', height: '150px' };
const DOOR_POS     = { top: '220px', left: '460px', width: '150px',  height: '230px' };
const KEY_SOCK_POS = { top: '230px', left: '300px', width: '80px',  height: '80px'  };
const BOOK_POS     = { top: '230px', left: '280px', width: '100px', height: '120px' };

function OwlBearFishRoom({ onNavigate, onNavigateBack, onNavigateNext, onNavigatePrev, onObjectClick, debug, successFlashes, gameFlags }) {
  const [clockOpen, setClockOpen] = useState(false);
  const [lockOpen,  setLockOpen]  = useState(false);

  const fishTaken     = gameFlags.fish_taken;
  const doorUnlocked  = gameFlags.owlbear_door_unlocked;
  const keyInserted   = gameFlags.owlbear_key_inserted;
  const bookTaken     = gameFlags.owlbear_book_taken;
  const keyTaken      = gameFlags.owlbear_key_taken;

  let bg;
  if (bookTaken)      bg = bgOwlbearBookGone;
  else if (keyInserted) bg = bgOwlbearBook;
  else if (fishTaken)   bg = bgAfter;
  else                  bg = bgDefault;

  const handleClockSuccess = () => {
    setClockOpen(false);
    onObjectClick('clock_puzzle_success');
  };

  const handleDoorClick = () => {
    if (!fishTaken) {
      onObjectClick('owlbear_door_locked');
    } else if (doorUnlocked) {
      onNavigate('owlbear_pckey');
    } else {
      setLockOpen(true);
    }
  };

  const handleDoorSuccess = () => {
    setLockOpen(false);
    onObjectClick('owlbear_door_success');
    onNavigate('owlbear_pckey');
  };

  return (
    <div
      className="owlbearfish-room-scene"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <BackButton onClick={onNavigateBack} />
      <button className="nav-arrow left"  onClick={onNavigatePrev}>&#9664;</button>
      <button className="nav-arrow right" onClick={onNavigateNext}>&#9654;</button>

      {!fishTaken && (
        <InteractiveObject
          id="clock_collider"
          position={CLOCK_POS}
          onClick={() => setClockOpen(true)}
          debug={debug}
          successFlashes={successFlashes}
        />
      )}

      <InteractiveObject
        id="owlbear_door_collider"
        position={DOOR_POS}
        onClick={handleDoorClick}
        debug={debug}
        successFlashes={successFlashes}
      />

      {fishTaken && keyTaken && !keyInserted && (
        <InteractiveObject
          id="owlbear_key_socket"
          position={KEY_SOCK_POS}
          onClick={() => onObjectClick('owlbear_key_socket_click')}
          debug={debug}
          successFlashes={successFlashes}
        />
      )}

      {keyInserted && !bookTaken && (
        <InteractiveObject
          id="owlbear_book_pickup"
          position={BOOK_POS}
          onClick={() => onObjectClick('owlbear_book_pickup')}
          debug={debug}
          successFlashes={successFlashes}
        />
      )}

      {clockOpen && (
        <ClockPuzzle
          onSuccess={handleClockSuccess}
          onClose={() => setClockOpen(false)}
        />
      )}

      {lockOpen && (
        <CombinationLock
          answer="PITAYA"
          onSuccess={handleDoorSuccess}
          onClose={() => setLockOpen(false)}
        />
      )}
    </div>
  );
}

export default OwlBearFishRoom;
