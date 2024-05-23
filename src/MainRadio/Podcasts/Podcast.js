import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Podcast = ({ podcast, isMobile }) => {
  const [imageDataUrl, setImageDataUrl] = useState(null);
  const [error, setError] = useState(null);

  const urlEncodedTitle = encodeURIComponent(podcast.title.replace(/\s+/g, '_'));

  useEffect(() => {
    if (podcast.is_enabled && podcast.art) {
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
      fetchImageData(podcast.art);
    }
  }, [podcast.is_enabled, podcast.art]);

  if (!podcast.is_enabled) {
    return null;
  }

  if (error) {
    return <div>Error fetching image: {error.message}</div>;
  }

  return (
    <Link to={`/sets/${urlEncodedTitle}`} state={{ id: podcast.id }} className="link">
      <div className={isMobile ? 'm-artist-comp' : 'artist-comp'}>
        <h2>{podcast.title || 'ARTIST'}</h2>
        <div className={isMobile ? 'm-artist-comp-content' : 'artist-comp-content'}>
          <img
            src={imageDataUrl || 'https://via.placeholder.com/100'}
            alt={podcast.title || 'Podcast Art'}
            className={isMobile ? 'm-artist-art' : 'artist-art'}
          />
          <p>{podcast.episodes || '0'} sets</p>
          <p>Localisation: {podcast.language || 'No language specified'}</p>
        </div>
      </div>
    </Link>
  );
};

export default Podcast;
