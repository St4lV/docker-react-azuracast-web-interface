import React, { useEffect, useState, useContext, useCallback } from 'react';
import AudioPlayerContext from './AudioPlayerContext';
import TNTRQRCODE from './TNTRQRCODE.png';

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

const EpisodeItem = ({ episode, podcast, isMobile, handlePlayClick }) => {
  const imageDataUrl = episode.imageDataUrl || TNTRQRCODE;

  return (
    <li key={episode.id} className={isMobile ? 'm-main-djsets-mp' : 'main-djsets-mp'}>
      <div onClick={() => handlePlayClick(episode, podcast.id)} className="link" style={{ cursor: 'pointer' }}>
        <div className={isMobile ? 'm-artist-comp-mp' : 'artist-comp-mp'}>
          <h2>{podcast.title || 'ARTIST'}</h2>
          <div className={isMobile ? 'm-artist-comp-content-mp' : 'artist-comp-content-mp'} style={{ fontSize: '0.95em' }}>
            <img
              src={imageDataUrl}
              alt=''
              className={isMobile ? 'm-artist-art' : 'artist-art'}
              onError={(e) => { e.target.src = TNTRQRCODE; }}
            />
            <p>{episode.title}</p>
            <p>{formatDate(episode.publish_at)} - {formatTime(episode.media.length)}</p>
          </div>
        </div>
      </div>
    </li>
  );
};

const LastReleases = ({ isMobile }) => {
  const [recentEpisodes, setRecentEpisodes] = useState(Array(10).fill(null));
  const [error, setError] = useState(null);
  const { play, pause, setRadioPlaying } = useContext(AudioPlayerContext);

  const fetchEpisodes = async (podcast) => {
    try {
      const response = await fetch(`https://radio.tirnatek.fr/api/station/1/podcast/${podcast.id}/episodes`, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const data = await response.json();
      return data.filter(episode => episode.is_published).map(episode => ({ ...episode, podcast }));
    } catch (error) {
      setError(error);
      return [];
    }
  };

  const fetchImageData = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        },
      });
      if (response.ok) {
        const blob = await response.blob();
        const reader = new FileReader();
        return new Promise((resolve, reject) => {
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      } else {
        throw new Error('Failed to fetch image');
      }
    } catch (error) {
      setError(error);
      return null;
    }
  };

  const saveToCache = (episodes) => {
    episodes.forEach((episode, index) => {
      localStorage.setItem(`episode_${index + 1}`, JSON.stringify(episode));
    });
  };

  const loadFromCache = () => {
    const cachedEpisodes = [];
    for (let i = 0; i < 10; i++) {
      const cachedEpisode = localStorage.getItem(`episode_${i + 1}`);
      if (cachedEpisode) {
        cachedEpisodes.push(JSON.parse(cachedEpisode));
      } else {
        cachedEpisodes.push(null);
      }
    }
    return cachedEpisodes;
  };

  const fetchPodcastsAndEpisodes = useCallback(async () => {
    try {
      const response = await fetch(`https://radio.tirnatek.fr/api/station/1/podcasts`, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const podcasts = await response.json();
      const episodesPromises = podcasts.map(podcast => fetchEpisodes(podcast));
      const episodesArrays = await Promise.all(episodesPromises);
      const allEpisodes = episodesArrays.flat();

      const sortedEpisodes = allEpisodes.sort((a, b) => new Date(b.publish_at) - new Date(a.publish_at));
      const latestEpisodes = sortedEpisodes.slice(0, 10);

      // Fetch images for the latest episodes
      const latestEpisodesWithImages = await Promise.all(
        latestEpisodes.map(async (episode) => {
          const imageDataUrl = episode.art ? await fetchImageData(episode.art) : TNTRQRCODE;
          return { ...episode, imageDataUrl };
        })
      );

      // Save the latest episodes with images to cache
      saveToCache(latestEpisodesWithImages);

      setRecentEpisodes(latestEpisodesWithImages);
    } catch (error) {
      setError(error);
    }
  }, []);

  useEffect(() => {
    // Load data from cache on component mount
    const cachedEpisodes = loadFromCache();
    setRecentEpisodes(cachedEpisodes);

    // Fetch data in the background and update cache and state if necessary
    fetchPodcastsAndEpisodes();
  }, [fetchPodcastsAndEpisodes]);

  const handlePlayClick = (episode, podcastId) => {
    pause();
    play(`https://radio.tirnatek.fr/api/station/tntr/public/podcast/${podcastId}/episode/${episode.id}/download.mp3?refresh=0`, episode, podcastId);
    setRadioPlaying(false);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={'last-release-mp'} style={{ position: 'relative', top: '10%', width: '80%', left: '6%' }}>
      <h2 style={{ textAlign: 'center', position: 'relative', top: '5px', fontSize: '1.8em' }}>Derniers sets publiés:</h2>
      <div className={isMobile ? 'm-main-djsets-mp-container' : 'main-djsets-mp-container'}>
        <ul>
          {recentEpisodes.map((episode, index) => (
            episode ? (
              <EpisodeItem
                key={episode.id}
                episode={episode}
                podcast={episode.podcast}
                isMobile={isMobile}
                handlePlayClick={handlePlayClick}
              />
            ) : (
              <li key={index} className={isMobile ? 'm-main-djsets-mp' : 'main-djsets-mp'}>
                <div className="link" style={{ cursor: 'default' }}>
                  <div className={isMobile ? 'm-artist-comp-mp' : 'artist-comp-mp'}>
                    <img
                      src={TNTRQRCODE}
                      className={isMobile ? 'm-artist-art' : 'artist-art'}
                      alt="Loading"
                    />
                    <p>Chargement...</p>
                  </div>
                </div>
              </li>
            )
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LastReleases;
