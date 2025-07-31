import React from 'react';
import BackButton from '../../components/BackButton/BackButton';
import InteractiveObject from '../../components/InteractiveObject/InteractiveObject';
import './pc_gemuncloker.css';
import skullWorldImage from '../../assets/item-skull-world.png';
import gemBlueWorldImage from '../../assets/item-gemblue-world.png';

const SCAN_MACHINE_POS = { top: '170px', left: '370px', width: '100px', height: '100px' };
const PC_GEM_COMPUTER_POS = { top: '230px', left: '100px', width: '180px', height: '200px' };
const CAN_WALL_PUZZLE_POS = { top: '150px', left: '700px', width: '100px', height: '250px' };

function PC_gemuncloker({ onNavigate, onNavigateNext, onNavigatePrev, onObjectClick, debug, successFlashes, gameFlags }) {
  
  // Função para decidir o que mostrar na máquina de escaneamento
  const renderScannerContent = () => {
    // MODIFICADO: Só mostra a gema se ela apareceu E AINDA NÃO foi pega.
    if (gameFlags.blue_gem_spawned && !gameFlags.blue_gem_taken) {
      return <img src={gemBlueWorldImage} alt="Gema Azul" className="world-item-image" />;
    }
    // Mostra a caveira se ela foi colocada E a gema ainda não apareceu.
    if (gameFlags.skull_placed_on_scanner && !gameFlags.blue_gem_spawned) {
      return <img src={skullWorldImage} alt="Caveira" className="world-item-image" />;
    }
    // Por padrão, não mostra nada.
    return null;
  };

  return (
    <div className="pc-gemuncloker-scene">
      <BackButton onClick={() => onNavigate('library')} />
      <button className="nav-arrow left" onClick={onNavigatePrev}>&#9664;</button>
      <button className="nav-arrow right" onClick={onNavigateNext}>&#9654;</button>
       <InteractiveObject 
        id="can_wall_puzzle" 
        position={CAN_WALL_PUZZLE_POS} 
        onClick={() => onObjectClick('can_wall_puzzle')} 
        debug={debug} 
        successFlashes={successFlashes} 
      />
    
      <InteractiveObject id="pc_gem_computer" position={PC_GEM_COMPUTER_POS} onClick={() => onObjectClick('pc_gem_computer')} debug={debug} successFlashes={successFlashes} />

      {/* A lógica de qual collider é clicável permanece a mesma */}
      {gameFlags.blue_gem_spawned && !gameFlags.blue_gem_taken ? (
        <InteractiveObject id="blue_gem_pickup" position={SCAN_MACHINE_POS} onClick={() => onObjectClick('blue_gem_pickup')} debug={debug} successFlashes={successFlashes}>
          {renderScannerContent()}
        </InteractiveObject>
      ) : (
        <InteractiveObject id="scan_machine" position={SCAN_MACHINE_POS} onClick={() => onObjectClick('scan_machine')} debug={debug} successFlashes={successFlashes}>
          {renderScannerContent()}
        </InteractiveObject>
      )
      
      }
    </div>
  );
}

export default PC_gemuncloker;