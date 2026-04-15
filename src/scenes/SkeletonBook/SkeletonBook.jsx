import React from 'react';
import BackButton from '../../components/BackButton/BackButton';
import InteractiveObject from '../../components/InteractiveObject/InteractiveObject';
import './SkeletonBook.css';

// Posição do livro no cenário (ajuste fino necessário)
const BOOK_ITEM_POSITION = { top: '100px', left: '380px', width: '300px', height: '700px' };

function SkeletonBook({ onNavigate, onNavigateBack, onObjectClick, debug, successFlashes, gameFlags }) {
  return (
    <div className="skeleton-book-scene">
      <BackButton onClick={onNavigateBack} />

      {!gameFlags.tea_list_taken && (
        <InteractiveObject
          id="tea_list_pickup"
          position={BOOK_ITEM_POSITION}
          onClick={() => onObjectClick('tea_list_pickup')}
          debug={debug}
          successFlashes={successFlashes}
        />
      )}
    </div>
  );
}

export default SkeletonBook;
