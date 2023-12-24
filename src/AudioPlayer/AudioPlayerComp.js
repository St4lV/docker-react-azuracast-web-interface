import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons';

function AudioPlayerComp() {
  const audioSource = 'https://tirnatek.fr/listen/tntr/tntr128.mp3';
  const [isPlaying, setIsPlaying] = useState(false);
  const [showBitrateButtons, setShowBitrateButtons] = useState(false);
  const [currentBitrate, setCurrentBitrate] = useState('MP3 128kbps');

  function handleButtonClick(event) {
    const source = event.target.getAttribute('data-source');
    const audioElement = document.getElementById('lecteurAudio');
    audioElement.setAttribute('src', source);
    audioElement.load();
    audioElement.play();
    setIsPlaying(true);
    setShowBitrateButtons(false);
    setCurrentBitrate(event.target.innerText);
  }

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

  function toggleBitrateButtons() {
    setShowBitrateButtons(!showBitrateButtons);
  }

  return (
    <div>
      <button id="playButton" onClick={handlePlayPauseClick}>
        <div className="play-button">
          <FontAwesomeIcon id="icon-play" icon={isPlaying ? faStop : faPlay} />
        </div>
      </button>
      <audio id="lecteurAudio" controls>
        <source src={audioSource} type="audio/mp3" style={{ display: 'none' }} />
        Votre navigateur ne supporte pas l'élément audio.
      </audio>
      <div className="audiobuttons">
        <button className="audioButton default-bitrate" onClick={toggleBitrateButtons}>
          {currentBitrate}
        </button>
        {showBitrateButtons && (
          <div className="bitrateOptions">
            <button
              className="audioButton c1"
              data-source="https://tirnatek.fr/listen/tntr/tntr128.mp3"
              onClick={handleButtonClick}
            >
              MP3 128kbps
            </button>
            <button
              className="audioButton c2"
              data-source="https://tirnatek.fr/listen/tntr/tntr320.mp3"
              onClick={handleButtonClick}
            >
              MP3 320kbps
            </button>
            <button
              className="audioButton c3"
              data-source="https://tirnatek.fr/listen/tntr/tntr96.mp3"
              onClick={handleButtonClick}
            >
              MP3 96kbps 
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AudioPlayerComp;
