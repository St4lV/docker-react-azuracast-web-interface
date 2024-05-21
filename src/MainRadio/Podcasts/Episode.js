import React, { useState, useEffect, useContext } from 'react';
import AudioPlayerContext from '../AudioPlayerContext';
import TNTRQRCODE from '../TNTRQRCODE.png';

const Episode = ({ episodeId, podcastId, isMobile }) => {
  const [episode, setEpisode] = useState(null);
  const [imageDataUrl, setImageDataUrl] = useState(null);
  const [error, setError] = useState(null);
  const [selectedMediaUrl, setSelectedMediaUrl] = useState(null);
  const { play, pause, setRadioPlaying } = useContext(AudioPlayerContext);

  useEffect(() => {
    const fetchEpisodeData = async () => {
      try {
        const response = await fetch(`https://radio.tirnatek.fr/api/station/1/podcast/${podcastId}/episode/${episodeId}`, {
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

    const fetchMediaLink = async () => {
      try {
        const response = await fetch(`https://radio.tirnatek.fr/api/station/tntr/public/podcast/${podcastId}/episode/${episodeId}/download.mp3?refresh=0`, {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
            'Content-Type': 'audio/mpeg',
            'Accept-Encoding': 'gzip'
          }
        });
        if (response.ok) {
          const blob = await response.blob();
          const dataUrl = URL.createObjectURL(blob);
          setSelectedMediaUrl(dataUrl);
        } else {
          throw new Error('Echec du chargement de la ressource.');
        }
      } catch (error) {
        setError(error);
      }
    };

    fetchEpisodeData();
    fetchMediaLink();
  }, [episodeId, podcastId]);

  const handlePlayClick = () => {
    pause();
    play(selectedMediaUrl, episode);
    setRadioPlaying(false);
  };

  if (error) {
    return <div>Recharger la page : {error.message}</div>;
  }

  if (!episode) {
    return <div>Loading...</div>;
  }

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    if (hours > 0) {
      return `${hours}h${formattedMinutes}m`;
    }
    
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <div className={isMobile ? 'm-episode' : 'episode'}>
      <h2 id={isMobile ? 'm-episode-title' : 'episode-title'}>{episode.title}</h2>
      <img
        src={imageDataUrl || TNTRQRCODE}
        alt={episode.title || 'Episode Art'}
        className={isMobile ? 'm-episode-art' : 'episode-art'}
        onError={(e) => { e.target.src = TNTRQRCODE }}
      />
      <div className={isMobile ? 'm-episode-desc' : 'episode-desc'}>
        <p>{formatTime(episode.media.length)} - {episode.description || 'No description available'}</p>
      </div>
      <button onClick={handlePlayClick} disabled={!selectedMediaUrl}>
        {!selectedMediaUrl ? 'Chargement ...' : 'Lancer'}
      </button>
    </div>
  );
};

export default Episode;
