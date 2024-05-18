import React, { useState, useEffect } from 'react';

const usePodcasts = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = 'https://radio.tirnatek.fr/api/station/1/podcasts';

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await fetch(apiUrl, {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPodcasts(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPodcasts();
  }, [apiUrl]);

  return { podcasts, loading, error };
};

export default usePodcasts;