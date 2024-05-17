import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header'
import AudioPlayer from '../AudioPlayer'
import Endpage from '../EndPage';

const PodcastPage = ({ isMobile }) => {
  const { id } = useParams();  // Use 'id' instead of 'urlEncodedTitle'
  const [podcastData, setPodcastData] = useState(null);
  const [imageDataUrl, setImageDataUrl] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
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
  }, [id]);

  if (error) {
    return <div>Error fetching podcast data: {error.message}</div>;
  }

  if (!podcastData) {
    return <div>Loading...</div>;
  }

  return (
      <>
      <div className={isMobile ? 'body-mobile' : 'body'}></div>
             <header>
                <Header isMobile={isMobile} />
              </header>
      <h1 className={isMobile ? 'm-artist-comp-page' : 'artist-comp-page'}>{podcastData.title || 'No title available'}</h1>
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
      <div className={isMobile ? 'm-p-endpage' : 'p-endpage'}>
      <Endpage/>
      </div>
      <div className={isMobile ? 'footer-mobile' : 'footer'}>
                <AudioPlayer isMobile={isMobile} />
  </div>
    </>
  );
};

export default PodcastPage;
