// Posições dos colliders (sem mudanças)
//const WORLD_MAP_POSITION = { top: '125px', left: '210px', width: '550px', height: '250px' };
//const HIDDEN_BUTTON_POS = { top: '230px', left: '800px', width: '50px', height: '50px' };
//const GEM1_SOCKET_POS = { top: '130px', left: '210px', width: '60px', height: '60px' };
//const GEM2_SOCKET_POS = { top: '130px', left: '700px', width: '60px', height: '60px' };
import React, { useState } from 'react';
import BackButton from '../../components/BackButton/BackButton';
import InteractiveObject from '../../components/InteractiveObject/InteractiveObject';
import './Map.css';

// Importe TODAS as 7 imagens do mapa
import mapImage1 from '../../assets/map-image-1.png';
import mapImage2 from '../../assets/map-image-2.png';
import mapImage3 from '../../assets/map-image-3.png';
import mapImage4 from '../../assets/map-image-4.png';
import mapImage5 from '../../assets/item-map-location-world.png';
import mapImageBluePlaced from '../../assets/map-image-blue-gem-placed.png';
import mapImageRedPlaced from '../../assets/map-image-red-gem-placed.png';
import mapImageBothPlaced from '../../assets/map-image-2-gems-placed.png';

// Posições dos colliders (ajuste fino necessário!)
const WORLD_MAP_POSITION = { top: '125px', left: '210px', width: '550px', height: '250px' };
const HIDDEN_BUTTON_POS = { top: '230px', left: '800px', width: '50px', height: '50px' };
const GEM1_SOCKET_POS = { top: '130px', left: '210px', width: '60px', height: '60px' };
const GEM2_SOCKET_POS = { top: '130px', left: '700px', width: '60px', height: '60px' };
const SECRET_LOCATION_POS = { top: '250px', left: '410px', width: '50px', height: '50px' };

function Map({ onNavigate, onNavigateNext, onNavigatePrev, onObjectClick, debug, successFlashes, gameFlags }) {
  // Estado local para controlar o carrossel
  const [mapIndex, setMapIndex] = useState(0);

  const handleButtonClick = () => {
    // Só avança para o mapa 3 se as duas gemas estiverem colocadas
    const canSeeMap3 = gameFlags.map_gem_blue_placed && gameFlags.map_gem_red_placed;
    
    setMapIndex(prevIndex => {
      if (prevIndex === 0) return 1; // Do mapa 1 sempre vai para o 2
      if (prevIndex === 1 && canSeeMap3) return 2; // Do 2 só vai para o 3 se o puzzle estiver resolvido
      return 0; // De qualquer outro estado, volta para o 1
    });
  };

  // Esta função decide qual imagem do mapa mostrar com base no estado do jogo
  const getCurrentMapImage = () => {
    // Se o segredo final foi encontrado, o mapa 1 é permanentemente substituído pelo mapa 4
    if (mapIndex === 0 && gameFlags.map_secret_found) {
      return mapImage4;
    }
    
    // O resto da lógica do carrossel
    if (mapIndex === 0) return mapImage1;
    if (mapIndex === 2) return mapImage3;
    if (mapIndex === 1) {
      const bluePlaced = gameFlags.map_gem_blue_placed;
      const redPlaced = gameFlags.map_gem_red_placed;

      if (bluePlaced && redPlaced) return mapImageBothPlaced;
      if (bluePlaced) return mapImageBluePlaced;
      if (redPlaced) return mapImageRedPlaced;
      
      return mapImage2; // Se nenhuma gema foi colocada ainda
    }

    return mapImage1; // Fallback para o mapa inicial
  };

  // Condição para mostrar o novo collider secreto
  const shouldShowSecretLocation = 
    gameFlags.map_gem_blue_placed && 
    gameFlags.map_gem_red_placed &&
    gameFlags.map_location_revealed &&
    !gameFlags.map_secret_found &&
    mapIndex === 0;

  return (
    <div className="map-scene">
      {/* Botões de Navegação */}
      <BackButton onClick={() => onNavigate('library')} />
      <button className="nav-arrow left" onClick={onNavigatePrev}>&#9664;</button>
      <button className="nav-arrow right" onClick={onNavigateNext}>&#9654;</button>

      {/* Área do Mapa (collider principal que exibe a imagem) */}
      <InteractiveObject id="world_map" position={WORLD_MAP_POSITION} onClick={() => onObjectClick('world_map')} debug={debug} successFlashes={successFlashes}>
        <img src={getCurrentMapImage()} alt="Mapa do Mundo" className="map-image-display" />
      </InteractiveObject>
      
      {/* Botão do Carrossel */}
      <InteractiveObject id="hidden_button1" position={HIDDEN_BUTTON_POS} onClick={handleButtonClick} debug={debug} successFlashes={successFlashes} />

      {/* Colliders dos Encaixes das Gemas (só aparecem na segunda imagem do mapa) */}
      {mapIndex === 1 && (
        <>
          {!gameFlags.map_gem_blue_placed && (
            <InteractiveObject id="gem1_socket" position={GEM1_SOCKET_POS} onClick={() => onObjectClick('gem1_socket')} debug={debug} successFlashes={successFlashes} />
          )}
          {!gameFlags.map_gem_red_placed && (
            <InteractiveObject id="gem2_socket" position={GEM2_SOCKET_POS} onClick={() => onObjectClick('gem2_socket')} debug={debug} successFlashes={successFlashes} />
          )}
        </>
      )}

      {/* Collider do Local Secreto (renderizado condicionalmente) */}
      {shouldShowSecretLocation && (
        <InteractiveObject 
          id="secret_location" 
          position={SECRET_LOCATION_POS} 
          onClick={() => onObjectClick('secret_location')} 
          debug={debug} 
          successFlashes={successFlashes}
        >
          {/* A IMAGEM VAI AQUI DENTRO */}
          <img 
            src={mapImage5} 
            alt="Localização Secreta" 
            className="world-item-image"
          />
        </InteractiveObject>
      )}



    </div>
  );
}

export default Map;