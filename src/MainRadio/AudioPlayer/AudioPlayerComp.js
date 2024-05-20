import React, { useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
import AudioPlayerContext from '../AudioPlayerContext';

const AudioPlayerComp = ({ isMobile }) => {
  const { isPlaying, play, pause, audioElementRef } = useContext(AudioPlayerContext);

  useEffect(() => {
    if (audioElementRef.current && !audioElementRef.current.src) {
      audioElementRef.current.src = 'https://radio.tirnatek.fr/listen/tntr/tntr128.mp3';
    }
  }, [audioElementRef]);

  const handlePlayPauseClick = () => {
    if (isPlaying) {
      pause();
    } else {
      play(audioElementRef.current.src);
    }
  };

  return (
    <div>
      <button id={isMobile ? 'playButtonMobile' : 'playButton'} onClick={handlePlayPauseClick}>
        <div className="play-button">
          <FontAwesomeIcon id="icon-play" icon={isPlaying ? faStop : faPlay} />
        </div>
      </button>
      <audio id="lecteurAudio" controls ref={audioElementRef}>
        <source src="https://radio.tirnatek.fr/listen/tntr/tntr128.mp3" type="audio/mp3" />
        Votre navigateur ne supporte pas l'élément audio.
      </audio>
    </div>
  );
};

export default AudioPlayerComp;
