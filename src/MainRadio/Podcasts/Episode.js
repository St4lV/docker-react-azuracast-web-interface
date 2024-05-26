import React, { useState, useEffect, useContext } from 'react';
import AudioPlayerContext from '../AudioPlayerContext';
import TNTRQRCODE from '../TNTRQRCODE.png';

const Episode = ({ episodeId, podcastId, episodeData, isMobile }) => {
  const [episode, setEpisode] = useState(episodeData && episodeData.is_published ? episodeData : null);
  const [imageDataUrl, setImageDataUrl] = useState(null);
  const [error, setError] = useState(null);
  const { play, pause, setRadioPlaying } = useContext(AudioPlayerContext);

  useEffect(() => {
    const fetchEpisodeData = async () => {
      if (episodeData) {
        if (episodeData.is_published) {
          setEpisode(episodeData);
          if (episodeData.art) {
            fetchImageData(episodeData.art);
          }
        }
        return;
      }

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
        if (data.is_published) {
          setEpisode(data);
          if (data.art) {
            fetchImageData(data.art);
          }
        } else {
          setError(new Error('Episode not published'));
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

    fetchEpisodeData();
  }, [episodeId, podcastId, episodeData]);

  const handlePlayClick = () => {
    if (episode) {
      pause();
      play(`https://radio.tirnatek.fr/api/station/tntr/public/podcast/${podcastId}/episode/${episodeId}/download.mp3?refresh=0`, episode, podcastId);
      setRadioPlaying(false);
    }
  };

  if (error) {
    return <div>Recharger la page : {error.message}</div>;
  }

  if (!episode) {
    return <div>Loading...</div>;
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

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
    <div className={isMobile ? 'm-episode' : 'episode'} onClick={handlePlayClick}>
      <h2 id={isMobile ? 'm-episode-title' : 'episode-title'}>{episode.title}</h2>
      <img
        src={imageDataUrl || TNTRQRCODE}
        alt={episode.title || 'Episode Art'}
        className={isMobile ? 'm-episode-art' : 'episode-art'}
        onError={(e) => { e.target.src = TNTRQRCODE }}
      />
      <p></p>
      <div className={isMobile ? 'm-episode-desc' : 'episode-desc'}>
        <p>{formatDate(episode.publish_at)} - {formatTime(episode.media.length)}</p>
        <p>{episode.description || 'No description available'}</p>
      </div>
    </div>
  );
};

export default Episode;
