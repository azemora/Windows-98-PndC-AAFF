
//const SKULL_CAGE_POS = { top: '0px', left: '50px', width: '320px', height: '400px' };

import React from 'react';
import BackButton from '../../components/BackButton/BackButton';
import InteractiveObject from '../../components/InteractiveObject/InteractiveObject';
import './pc_mapscreen.css';
import skullCageImage from '../../assets/item-skull-cage-world.png';
// Importe a imagem da nova localização
import mapLocationImage from '../../assets/item-map-location-world.png';

const SKULL_CAGE_POS = { top: '0px', left: '50px', width: '320px', height: '400px' };
const PC_MAP_COMPUTER_POS = { top: '330px', left: '600px', width: '200px', height: '180px' };
// Posição para o novo ponto no mapa
const MAP_POINT_POS = { top: '320px', left: '600px', width: '20px', height: '20px' };

function PC_mapscreen({ onNavigate, onNavigateNext, onNavigatePrev, onObjectClick, debug, successFlashes, gameFlags }) {
  return (
    <div className="pc-mapscreen-scene">
      <BackButton onClick={() => onNavigate('library')} />
      <button className="nav-arrow left" onClick={onNavigatePrev}>&#9664;</button>
      <button className="nav-arrow right" onClick={onNavigateNext}>&#9654;</button>

      {/* Collider do computador */}
      <InteractiveObject 
        id="pc_map_computer" 
        position={PC_MAP_COMPUTER_POS} 
        onClick={() => onObjectClick('pc_map_computer')} 
        debug={debug} 
        successFlashes={successFlashes} 
      />

      {/* Collider da gaiola da caveira (continua o mesmo) */}
      {!gameFlags.skull_taken && (
        <InteractiveObject id="skull_cage" position={SKULL_CAGE_POS} onClick={() => onObjectClick('skull_cage')} debug={debug} successFlashes={successFlashes}>
          {   <img 
            src={skullCageImage} 
            alt="Gaiola com caveira" 
            className="world-item-image"
          />}
        </InteractiveObject>
      )}
      
      {/* NOVO: O ponto no mapa só aparece se o puzzle do terminal for resolvido */}
      {gameFlags.map_location_revealed && (
        <InteractiveObject 
          id="map_point_location" 
          position={MAP_POINT_POS} 
          onClick={() => onObjectClick('map_point_location')} 
          debug={debug} 
          successFlashes={successFlashes}
        >
          <img src={mapLocationImage} alt="Ponto no Mapa" className="world-item-image" />
        </InteractiveObject>
      )}
    </div>
  );
}
export default PC_mapscreen;