import React, { useContext } from 'react';
import AudioPlayerContext from '../AudioPlayerContext';
import TNTRQRCODE from '../TNTRQRCODE.png';

const EpisodeData = ({ isMobile }) => {
  const { currentEpisode, elapsedTime, setRadioPlaying } = useContext(AudioPlayerContext);

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return hours > 0 
      ? `${hours}:${formattedMinutes}:${formattedSeconds}` 
      : `${formattedMinutes}:${formattedSeconds}`;
  };

  if (!currentEpisode) {
    return <div />;
  }

  const handleButtonClick = (event) => {
    const source = event.target.getAttribute('data-source');
    const audioElement = document.getElementById('lecteurAudio');
    audioElement.setAttribute('src', source);
    audioElement.load();
    audioElement.play();
    setRadioPlaying(true);
  };

  return (
    <div className={isMobile ? 'metadata-mobile' : 'metadata'}>
      <div 
        className={isMobile ? 'playlist' : 'playlist'}
        data-source="https://radio.tirnatek.fr/listen/tntr/tntr128.mp3" 
        onClick={handleButtonClick}
      >
        REVENIR À LA DIFFUSION
      </div>
      <h3>{currentEpisode.title || '. . .'}</h3>
      <h3>{currentEpisode.author || '. . .'}</h3>
      <p>{formatTime(elapsedTime)} / {formatTime(currentEpisode.media.length)}</p>
      <div className={isMobile ? 'custom-progress-mobile' : 'custom-progress'}>
        <div id="progress-bar" style={{ width: `${(elapsedTime / currentEpisode.length) * 100}%` }}></div>
      </div>
      <div>
        <img
          src={currentEpisode.cover || TNTRQRCODE}
          id={isMobile ? 'cover-np-song-mobile' : 'cover-np-song'}
          alt="cover"
          onError={(e) => { e.target.src = TNTRQRCODE }}
        />
      </div>
    </div>
  );
};

export default EpisodeData;
