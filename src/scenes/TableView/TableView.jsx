import React from 'react';
import BackButton from '../../components/BackButton/BackButton';
import InteractiveObject from '../../components/InteractiveObject/InteractiveObject';
import './TableView.css';

// Importe as imagens dos itens que aparecerão no cenário
import keyPiece2WorldImage from '../../assets/item-key-piece2-world.png';
import knifeWorldImage from '../../assets/item-knife-world.png';
import bookWorldImage from '../../assets/item-book-world.png';
import candleWorldImage from '../../assets/item-candle-world.png';

// Posições em pixels para cada item (ajuste fino necessário!)
const KEY_PIECE_2_POS = { top: '450px', left: '400px', width: '50px', height: '50px' };
const KNIFE_POS = { top: '450px', left: '510px', width: '150px', height: '70px' };
const BOOK_POS = { top: '320px', left: '670px', width: '200px', height: '250px' };
const CANDLE_POS = { top: '260px', left: '200px', width: '120px', height: '200px' };

function TableView({ onNavigate, onObjectClick, debug, successFlashes, gameFlags }) {
  return (
    <div className="table-view-scene">
      <BackButton onClick={() => onNavigate('main_room')} />
      
      {/* Pedaço da Chave 2 */}
      {!gameFlags.key_piece_2_taken && (
        <InteractiveObject id="key_piece_2_pickup" position={KEY_PIECE_2_POS} onClick={() => onObjectClick('key_piece_2_pickup')} debug={debug} successFlashes={successFlashes}>
          <img src={keyPiece2WorldImage} alt="Pedaço de chave" className="world-item-image" />
        </InteractiveObject>
      )}

      {/* Faca */}
      {!gameFlags.knife_1_taken && (
        <InteractiveObject id="knife_1_pickup" position={KNIFE_POS} onClick={() => onObjectClick('knife_1_pickup')} debug={debug} successFlashes={successFlashes}>
          <img src={knifeWorldImage} alt="Faca" className="world-item-image" />
        </InteractiveObject>
      )}

      {/* Livro Novo */}
      {!gameFlags.book_1_taken && (
        <InteractiveObject id="book_1_pickup" position={BOOK_POS} onClick={() => onObjectClick('book_1_pickup')} debug={debug} successFlashes={successFlashes}>
          <img src={bookWorldImage} alt="Livro Antigo" className="world-item-image" />
        </InteractiveObject>
      )}

      {/* Vela Nova */}
      {!gameFlags.candle_1_taken && (
        <InteractiveObject id="candle_1_pickup" position={CANDLE_POS} onClick={() => onObjectClick('candle_1_pickup')} debug={debug} successFlashes={successFlashes}>
          <img src={candleWorldImage} alt="Vela" className="world-item-image" />
        </InteractiveObject>
      )}
    </div>
  );
}

export default TableView;