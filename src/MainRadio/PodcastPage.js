import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Episode from './Podcasts/Episode';

const PodcastPage = ({ isMobile }) => {
  const { urlEncodedTitle } = useParams();
  const location = useLocation();
  const { id } = location.state || {}; // Use 'id' from location state
  const [podcastData, setPodcastData] = useState(null);
  const [imageDataUrl, setImageDataUrl] = useState(null);
  const [error, setError] = useState(null);
  const [episodes, setEpisodes] = useState(null);

  useEffect(() => {
    if (!id) {
      setError(new Error('Podcast ID is missing'));
      return;
    }

    const fetchPodcastData = async () => {
      try {
        const response = await fetch(`https://radio.tirnatek.fr/api/station/1/podcast/${id}`, {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
          }
        });
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        setPodcastData(data);
        if (data.art) {
          fetchImageData(data.art);
        }
      } catch (error) {
        setError(error);
      }
    };

    const fetchEpisodes = async () => {
      try {
        const response = await fetch(`https://radio.tirnatek.fr/api/station/1/podcast/${id}/episodes`, {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
          }
        });
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        setEpisodes(data);
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

    fetchPodcastData();
    fetchEpisodes();
  }, [id]);

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  if (!podcastData || !episodes) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1 className={isMobile ? 'm-artist-comp-page' : 'artist-comp-page'}>
        {podcastData.title || 'No title available'}
      </h1>
      <div className={isMobile ? 'm-artist-comp-content-page' : 'artist-comp-content-page'}>
        <img
          src={imageDataUrl || 'https://via.placeholder.com/125'}
          alt={podcastData.title || 'Podcast Art'}
          id={isMobile ? 'm-artist-art-page' : 'artist-art-page'}
        />
        <div className={isMobile ? 'm-artist-desc-page' : 'artist-desc-page'}>
          <h2>Description:</h2>
          <p>{podcastData.description || "Non spécifié"}</p>
        </div>
      </div>
      <div className="episodes-list">
        {episodes.map(episode => (
          <Episode key={episode.id} episodeId={episode.id} podcastId={id} isMobile={isMobile}/>
        ))}
      </div>
    </>
  );
};

export default PodcastPage;
