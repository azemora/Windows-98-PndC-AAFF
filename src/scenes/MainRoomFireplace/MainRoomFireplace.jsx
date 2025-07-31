import React from 'react';
import BackButton from '../../components/BackButton/BackButton';
import InteractiveObject from '../../components/InteractiveObject/InteractiveObject';
import './MainRoomFireplace.css';

// Importe a IMAGEM DO ITEM que está no mundo
import keyPiece1WorldImage from '../../assets/item_keypiece1_world.png';

const KEY_PIECE_1_POS = { top: '310px', left: '410px', width: '50px', height: '50px' };

function MainRoomFireplace({ onNavigate, onObjectClick, debug, successFlashes, gameFlags }) {
  return (
    <div className="main-room-fireplace-scene">
      <BackButton onClick={() => onNavigate('main_room')} />
      
      {/* O collider (e a imagem dentro dele) só aparece se o item ainda não foi pego */}
      {!gameFlags.key_piece_1_taken && (
        <InteractiveObject 
          id="key_piece_1_pickup"
          position={KEY_PIECE_1_POS}
          onClick={() => onObjectClick('key_piece_1_pickup')}
          debug={debug}
          successFlashes={successFlashes}
        >
          {/* A imagem do item agora vive DENTRO do collider */}
          {/* Se o modo debug estiver desligado, o jogador verá apenas a imagem da chave */}
          <img 
            src={keyPiece1WorldImage} 
            alt="Pedaço de chave" 
            className="world-item-image"
          />
        </InteractiveObject>
      )}
    </div>
  );
}

export default MainRoomFireplace;