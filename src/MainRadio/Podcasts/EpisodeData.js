import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AudioPlayerContext from '../AudioPlayerContext';
import TNTRQRCODE from '../TNTRQRCODE.png';

const EpisodeData = ({ isMobile }) => {
  const { currentEpisode, elapsedTime, setRadioPlaying, podcastId, audioElementRef, setElapsedTime } = useContext(AudioPlayerContext);
  const [episode, setEpisode] = useState(null);
  const [podcast, setPodcast] = useState(null); 
  const [imageDataUrl, setImageDataUrl] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (podcastId && currentEpisode) {
      const fetchEpisodeData = async () => {
        try {
          const response = await fetch(`https://radio.tirnatek.fr/api/station/1/podcast/${podcastId}/episode/${currentEpisode.id}`, {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
            }
          });
          if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
          }
          const data = await response.json();
          setEpisode(data);
          if (data.art) {
            fetchImageData(data.art);
          }
        } catch (error) {
          setError(error);
        }
      };

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

      const fetchPodcastData = async () => {
        try {
          const response = await fetch(`https://radio.tirnatek.fr/api/station/1/podcast/${podcastId}`, {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
            }
          });
          if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
          }
          const data = await response.json();
          setPodcast(data);
        } catch (error) {
          setError(error);
        }
      };

      fetchEpisodeData();
      fetchPodcastData();
    }
  }, [currentEpisode, podcastId]);

  useEffect(() => {
    const audioElement = audioElementRef.current;

    const handleTimeUpdate = () => {
      setElapsedTime(audioElement.currentTime);
    };

    audioElement.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      audioElement.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [audioElementRef, setElapsedTime]);

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

  const handleProgressBarClick = (event) => {
    const progressBar = event.target;
    const rect = progressBar.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const totalWidth = rect.width;
    const clickPositionPercentage = offsetX / totalWidth;
    const newElapsedTime = clickPositionPercentage * currentEpisode.media.length;
    
    audioElementRef.current.currentTime = newElapsedTime;
    setElapsedTime(newElapsedTime);
  };

  const urlEncodedTitle = podcast ? encodeURIComponent(podcast.title.replace(/\s+/g, '_')) : '';

  return (
    <div className={isMobile ? 'metadata-mobile' : 'metadata'}>
      <div 
        className={isMobile ? 'playlist-mobile' : 'playlist'}
        data-source="https://radio.tirnatek.fr/listen/tntr/tntr128.mp3" 
        onClick={handleButtonClick}
        style={{ cursor: 'pointer' }}
      >
        REVENIR À LA DIFFUSION
      </div>
      {podcast && (
        <Link to={`/sets/${urlEncodedTitle}`} state={{ id: podcast.id }} className="link">
          <h3>{currentEpisode.title || '. . .'}</h3>
          <h3>{podcast.author || '. . .'}</h3>
        </Link>
      )}
      <p>{formatTime(elapsedTime)} / {formatTime(currentEpisode.media.length)}</p>
      <div
        className={isMobile ? 'custom-progress-mobile' : 'custom-progress'}
        onClick={handleProgressBarClick}
        style={{ cursor: 'pointer' }}
      >
        <div id="progress-bar" style={{ width: `${(elapsedTime / currentEpisode.media.length) * 100}%`, height: '100%' }}></div>
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
