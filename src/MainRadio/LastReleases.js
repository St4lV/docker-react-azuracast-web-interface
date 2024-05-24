import React, { useEffect, useState, useContext } from 'react';
import AudioPlayerContext from './AudioPlayerContext';

const LastReleases = ({ isMobile }) => {
  const [recentEpisodes, setRecentEpisodes] = useState([]);
  const [error, setError] = useState(null);
  const { play, pause, setRadioPlaying } = useContext(AudioPlayerContext);

  const fetchEpisodes = async (podcastId) => {
    try {
      const response = await fetch(`https://radio.tirnatek.fr/api/station/1/podcast/${podcastId}/episodes`, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      setError(error);
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
        return URL.createObjectURL(blob);
      } else {
        throw new Error('Failed to fetch image');
      }
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    const fetchPodcastsAndEpisodes = async () => {
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

        const episodesPromises = podcasts.map(async (podcast) => {
          const episodes = await fetchEpisodes(podcast.id);
          const episodesWithImages = await Promise.all(
            episodes.map(async (episode) => {
              const imageUrl = await fetchImageData(episode.art);
              return { ...episode, podcast, imageUrl };
            })
          );
          return episodesWithImages;
        });

        const episodesArrays = await Promise.all(episodesPromises);
        const allEpisodes = episodesArrays.flat();

        // Sort episodes by publish date and get the latest 5
        const sortedEpisodes = allEpisodes.sort((a, b) => new Date(b.publish_at) - new Date(a.publish_at));
        const latestEpisodes = sortedEpisodes.slice(0, 4);

        setRecentEpisodes(latestEpisodes);
      } catch (error) {
        setError(error);
      }
    };

    fetchPodcastsAndEpisodes();
  }, []);

  const handlePlayClick = (episode, podcastId) => {
    pause();
    play(`https://radio.tirnatek.fr/api/station/tntr/public/podcast/${podcastId}/episode/${episode.id}/download.mp3?refresh=0`, episode, podcastId);
    setRadioPlaying(false);
  };

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

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2 style={{textAlign:'center',position:'relative',top:'5px',fontSize:'1.8em'}}>Derniers sets publiés:</h2>
      <ul>
        {recentEpisodes.length > 0 ? (
          recentEpisodes.map((episode) => {
            const podcast = episode.podcast;
            const urlEncodedTitle = encodeURIComponent(podcast.title.replace(/\s+/g, '_'));
            const imageDataUrl = episode.imageUrl || 'https://via.placeholder.com/100';
  
            return (
              <li key={episode.id} className={isMobile ? 'm-main-djsets-mp' : 'main-djsets-mp'}>
                <div onClick={() => handlePlayClick(episode, podcast.id)} className="link" style={{ cursor: 'pointer' }}>
                  <div className={isMobile ? 'm-artist-comp-mp' : 'artist-comp'}>
                    <h2>{podcast.title || 'ARTIST'}</h2>
                    <div className={isMobile ? 'm-artist-comp-content' : 'artist-comp-content'}style={{fontSize:'0.95em'}}>
                      <img
                        src={imageDataUrl}
                        alt={podcast.title || 'Podcast Art'}
                        className={isMobile ? 'm-artist-art' : 'artist-art'}
                      />
                      <p>{episode.title}</p>
                      <p>{formatDate(episode.publish_at)} - {formatTime(episode.media.length)}</p>
                    </div>
                  </div>
                </div>
              </li>
            );
          })
        ) : (
          <li className={isMobile ? 'm-main-djsets-mp' : 'main-djsets-mp'}>
            <div className="link" style={{ cursor: 'default' }}>
              <div className={isMobile ? 'm-artist-comp-mp' : 'artist-comp'}>
                <p>Chargement...</p>
              </div>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};

export default LastReleases;
