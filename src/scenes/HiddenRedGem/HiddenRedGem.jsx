import React from 'react';
import BackButton from '../../components/BackButton/BackButton';
import InteractiveObject from '../../components/InteractiveObject/InteractiveObject';
import './HiddenRedGem.css';

// Importe a imagem da gema que estará no cenário
import gemRedWorldImage from '../../assets/item-gem-red-world.png';

// Posição da gema na cena (ajuste conforme sua imagem de fundo)
const GEM_RED_POS = { top: '300px', left: '450px', width: '70px', height: '70px' };

function HiddenRedGem({ onNavigate, onObjectClick, debug, successFlashes, gameFlags }) {
  return (
    <div className="hidden-red-gem-scene">
      <BackButton onClick={() => onNavigate('library')} />
      
      {/* O collider e a imagem da gema só aparecem se ela ainda não foi pega */}
      {!gameFlags.gem_red_taken && (
        <InteractiveObject 
          id="gem_red_pickup"
          position={GEM_RED_POS}
          onClick={() => onObjectClick('gem_red_pickup')}
          debug={debug}
          successFlashes={successFlashes}
        >
          <img 
            src={gemRedWorldImage} 
            alt="Gema Vermelha" 
            className="world-item-image"
          />
        </InteractiveObject>
      )}
    </div>
  );
}

export default HiddenRedGem;