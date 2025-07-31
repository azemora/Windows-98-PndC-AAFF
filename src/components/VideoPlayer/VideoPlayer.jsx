import React from 'react';
import './VideoPlayer.css';

function VideoPlayer({ src, onEnded }) {
  return (
    <div className="video-overlay">
      <video
        autoPlay
        onEnded={onEnded} // Chama a função quando o vídeo termina
        muted // Necessário para autoplay na maioria dos navegadores
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}

export default VideoPlayer;