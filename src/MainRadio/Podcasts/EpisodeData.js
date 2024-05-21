import React, { useContext, useState, useEffect } from 'react';
import AudioPlayerContext from '../AudioPlayerContext';
import TNTRQRCODE from '../TNTRQRCODE.png';

const EpisodeData = ({ isMobile }) => {
  const { currentEpisode, elapsedTime, setRadioPlaying } = useContext(AudioPlayerContext);
  const [imageDataUrl, setImageDataUrl] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (currentEpisode && currentEpisode.cover) {
      const fetchImageData = async (imageUrl) => {
        try {
          const response = await fetch(imageUrl, {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
            }
          });
          if (response.ok) {
            const blob = await response.blob();
            const dataUrl = URL.createObjectURL(blob);
            setImageDataUrl(dataUrl);
          } else {
            throw new Error('Failed to fetch image');
          }
        } catch (error) {
          setError(error);
        }
      };

      fetchImageData(currentEpisode.cover);
    } else {
      setImageDataUrl(null);
    }
  }, [currentEpisode]);

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
        className={isMobile ? 'playlist-mobile' : 'playlist'}
        data-source="https://radio.tirnatek.fr/listen/tntr/tntr128.mp3" 
        onClick={handleButtonClick}
      >
        REVENIR À LA DIFFUSION
      </div>
      <h3>{currentEpisode.title || '. . .'}</h3>
      <h3>{currentEpisode.author || '. . .'}</h3>
      <p>{formatTime(elapsedTime)} / {formatTime(currentEpisode.media.length)}</p>
      <div className={isMobile ? 'custom-progress-mobile' : 'custom-progress'}>
        <div id="progress-bar" style={{ width: `${(elapsedTime / currentEpisode.media.length) * 100}%` }}></div>
      </div>
      <div>
        <img
          src={imageDataUrl || TNTRQRCODE}
          id={isMobile ? 'cover-np-song-mobile' : 'cover-np-song'}
          alt="cover"
          onError={(e) => { e.target.src = TNTRQRCODE }}
        />
      </div>
      {error && <p className="error">{error.message}</p>}
    </div>
  );
};

export default EpisodeData;
