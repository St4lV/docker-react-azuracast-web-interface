import React, { useState, useEffect } from 'react';

const Episode = ({ episode, isMobile }) => {
  const [error, setError] = useState(null);
  const [mediaPath, setMediaPath] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchEpisodeData = async () => {
      try {
        const response = await fetch(`https://radio.tirnatek.fr/api/station/1/podcast/${episode.id}/episodes/${episode.media.path}`, {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
          }
        });
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        setMediaPath(data.media.path);

        if (episode.art) {
          const imageResponse = await fetchWithAuthentication(episode.art);
          if (!imageResponse.ok) {
            throw new Error('Failed to fetch image');
          }
          setImageUrl(episode.art);
        }
      } catch (error) {
        setError(error);
      }
    };

    fetchEpisodeData();
  }, [episode.id, episode.media.path, episode.art]);

  const fetchWithAuthentication = async (url) => {
    return fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
      }
    });
  };

  if (error) {
    return <div>Error fetching episode data: {error.message}</div>;
  }

  return (
    <div className={isMobile ? 'm-episode' : 'episode'}>
      <h3>{episode.title}</h3>
      <img
        src={imageUrl || 'https://via.placeholder.com/100'}
        alt={episode.title || 'Episode Art'}
        className='episodes-art'
      />
      <p>{episode.description || 'No description available'}</p>
      <audio controls>
        <source src={`https://radio.tirnatek.fr/api/station/1/podcast/${episode.id}/episodes/${mediaPath}`} type="audio/mpeg" className={isMobile ? 'm-episodes-audio' : 'episodes-audio'} />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default Episode;
