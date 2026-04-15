import React, { useState } from 'react';
import BackButton from '../../components/BackButton/BackButton';
import InteractiveObject from '../../components/InteractiveObject/InteractiveObject';
import ValvePuzzle from '../../components/ValvePuzzle/ValvePuzzle';
import './HorsePuzzle.css';

// Collider sobre as válvulas no cenário
const VALVES_POSITION = { top: '200px', left: '280px', width: '500px', height: '250px' };

function HorsePuzzle({ onNavigate, onNavigateBack, onObjectClick, debug, successFlashes, gameFlags }) {
  const [puzzleOpen, setPuzzleOpen] = useState(false);

  const handleSuccess = () => {
    setPuzzleOpen(false);
    onObjectClick('horse_puzzle_solved');
    onNavigate('horse_room');
  };

  return (
    <div className="horse-puzzle-scene">
      <BackButton onClick={onNavigateBack} />

      {!gameFlags.horse_puzzle_solved && (
        <InteractiveObject
          id="horse_valves"
          position={VALVES_POSITION}
          onClick={() => setPuzzleOpen(true)}
          debug={debug}
          successFlashes={successFlashes}
        />
      )}

      {puzzleOpen && (
        <ValvePuzzle
          onSuccess={handleSuccess}
          onClose={() => setPuzzleOpen(false)}
        />
      )}
    </div>
  );
}

export default HorsePuzzle;
