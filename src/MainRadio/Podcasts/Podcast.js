import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Artist.css';

const Podcast = ({ podcast, isMobile }) => {
  const [imageDataUrl, setImageDataUrl] = useState(null);
  const [error, setError] = useState(null);

  // Function to replace spaces with underscores and encode URI components
  const urlEncodedTitle = encodeURIComponent(podcast.title.replace(/\s+/g, '_'));

  useEffect(() => {
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
    if (podcast.art) {
      fetchImageData(podcast.art);
    }
  }, [podcast.art]);

  if (error) {
    return <div>Error fetching image: {error.message}</div>;
  }

  return (
    <>
      <Link to={`/sets/${urlEncodedTitle}`} state={{ id: podcast.id }} className="link">
        <div className={isMobile ? 'm-artist-comp' : 'artist-comp'}>
          <h2>{podcast.title || 'No title available'}</h2>
          <div className={isMobile ? 'm-artist-comp-content' : 'artist-comp-content'}>
            <img
              src={imageDataUrl || 'https://via.placeholder.com/100'}
              alt={podcast.title || 'Podcast Art'}
              id={isMobile ? 'm-artist-art' : 'artist-art'}
            />
            <p>{podcast.episodes || 'N/A'} sets</p>
            <p>Localisation: {podcast.language || 'No language specified'}</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Podcast;
