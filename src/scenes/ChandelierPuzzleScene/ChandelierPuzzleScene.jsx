import React from 'react';
import BackButton from '../../components/BackButton/BackButton';
import './ChandelierPuzzleScene.css';

function ChandelierPuzzleScene({ onNavigate, onNavigateBack }) {
  return (
    <div className="chandelier-puzzle-scene">
      <BackButton onClick={onNavigateBack} />
    </div>
  );
}

export default ChandelierPuzzleScene;
