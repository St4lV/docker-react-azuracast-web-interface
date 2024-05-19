import React from 'react';
import usePodcasts from './Podcasts/usePodcasts';
import Podcast from './Podcasts/Podcast';
import './PodcastsMain.css';

const PodcastMain = ({ isMobile }) => {
  const { podcasts, loading, error } = usePodcasts();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading podcasts: {error.message}</div>;
  }

  return (
    <>
      <div className={isMobile ? 'm-h-djsets' : 'h-djsets'}>
      <h1>DJ SETS</h1>
      </div>
      <div className={isMobile ? 'm-main-djsets' : 'main-djsets'}>
          {podcasts.map(podcast => (
        <Podcast key={podcast.id} podcast={podcast} isMobile={isMobile} />
        ))}
      </div>
    </>
  );
};

export default PodcastMain;