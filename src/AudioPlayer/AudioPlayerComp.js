import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons';

function AudioPlayerComp({ isMobile }) {
  const audioSource = 'https://tirnatek.fr/listen/tntr/tntr128.mp3';
  const [isPlaying, setIsPlaying] = useState(false);
  function handlePlayPauseClick() {
    const lecteurAudio = document.getElementById('lecteurAudio');

    if (lecteurAudio.paused) {
      lecteurAudio.play();
      setIsPlaying(true);
    } else {
      lecteurAudio.pause();
      setIsPlaying(false);
    }
  }
  return (
    <div>
      <button id={isMobile ? 'playButtonMobile' : 'playButton'} onClick={handlePlayPauseClick}>
        <div className="play-button">
          <FontAwesomeIcon id="icon-play" icon={isPlaying ? faStop : faPlay} />
        </div>
      </button>
      <audio id="lecteurAudio" controls>
        <source src={audioSource} type="audio/mp3" style={{ display: 'none' }} />
        Votre navigateur ne supporte pas l'élément audio.
      </audio>
    </div>
  );
}

export default AudioPlayerComp;
