import React, { useEffect, useState, useContext, useCallback } from 'react';
import { Link } from 'react-router-dom';
import AudioPlayerContext from './AudioPlayerContext';
import TNTRQRCODE from './TNTRQRCODE.png';

const PodcastItem = ({ podcast, isMobile}) => {
  const latestEpisode = podcast.episodes.length > 0 ? podcast.episodes[0] : null;
  const urlEncodedTitle = encodeURIComponent(podcast.title.replace(/\s+/g, '_'));
  const imageDataUrl = podcast.podcastImageBase64 || TNTRQRCODE;

  return (
    <li className={isMobile ? 'm-main-djsets-mp' : 'main-djsets-mp'}>
      <Link to={`/sets/${urlEncodedTitle}`} state={{ id: podcast.id }} className="link">
        <div className={isMobile ? 'm-artist-comp-mp' : 'artist-comp-mp'}>
          <h2>{podcast.title || 'ARTIST'}</h2>
          <div className={isMobile ? 'm-artist-comp-content-mp' : 'artist-comp-content-mp'} style={{ fontSize: '0.95em' }}>
            <img
              src={imageDataUrl}
              className={isMobile ? 'm-artist-art' : 'artist-art'}
              alt="Podcast"
            />
            {latestEpisode && (
              <>
                <p style={{ whiteSpace: 'wrap', maxHeight: '100px' }}>{podcast.description_short}</p>
              </>
            )}
          </div>
        </div>
      </Link>
    </li>
  );
};

const LastDJadd = ({ isMobile }) => {
  const [recentPodcasts, setRecentPodcasts] = useState(Array(10).fill(null));
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

  const saveToCache = (podcasts) => {
    podcasts.forEach((podcast, index) => {
      const podcastWithId = { ...podcast, cacheId: index + 1 };
      localStorage.setItem(`podcast_${index + 1}`, JSON.stringify(podcastWithId));
    });
  };

  const loadFromCache = () => {
    const cachedPodcasts = [];
    for (let i = 1; i <= 10; i++) {
      const cachedPodcast = localStorage.getItem(`podcast_${i}`);
      if (cachedPodcast) {
        cachedPodcasts.push(JSON.parse(cachedPodcast));
      } else {
        cachedPodcasts.push(null);
      }
    }
    return cachedPodcasts;
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

      const podcastPromises = podcasts.map(async (podcast) => {
        const episodes = await fetchEpisodes(podcast.id);
        const smallestCreatedAt = episodes.reduce((minCreatedAt, episode) => {
          const createdAt = new Date(episode.created_at).getTime();
          return createdAt < minCreatedAt ? createdAt : minCreatedAt;
        }, Infinity);
        return { ...podcast, episodes, smallestCreatedAt };
      });

      const podcastsWithEpisodes = await Promise.all(podcastPromises);

      const sortedPodcasts = podcastsWithEpisodes
        .filter(podcast => podcast.is_published)
        .sort((a, b) => b.smallestCreatedAt - a.smallestCreatedAt);

      const latestPodcasts = sortedPodcasts.slice(0, 10);

      const latestPodcastsWithImages = await Promise.all(
        latestPodcasts.map(async (podcast) => {
          const podcastImageBase64 = podcast.art ? await fetchImageData(podcast.art) : TNTRQRCODE;
          return { ...podcast, podcastImageBase64 };
        })
      );

      saveToCache(latestPodcastsWithImages);

      setRecentPodcasts(latestPodcastsWithImages);
    } catch (error) {
      setError(error);
    }
  }, []);

  useEffect(() => {
    const cachedPodcasts = loadFromCache();
    setRecentPodcasts(cachedPodcasts);

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
    <div className={'last-release-mp'} style={{ position: 'relative', top: '50px', width: '80%', left: '6%', marginBottom: '150px' }}>
      <h2 style={{ textAlign: 'center', position: 'relative', top: '5px', fontSize: '1.8em' }}>Derniers DJs ajoutés:</h2>
      <div className={isMobile ? 'm-main-djsets-mp-container' : 'main-djsets-mp-container'}>
        <ul>
          {recentPodcasts.map((podcast, index) => (
            podcast ? (
              <PodcastItem
                key={podcast.id}
                podcast={podcast}
                isMobile={isMobile}
                handlePlayClick={(episode) => handlePlayClick(episode, podcast.id)}
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

export default LastDJadd;
