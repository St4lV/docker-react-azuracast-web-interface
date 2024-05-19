import React, { useState } from 'react';
import usePodcasts from './Podcasts/usePodcasts';
import Podcast from './Podcasts/Podcast';
import './PodcastsMain.css';

const PodcastMain = ({ isMobile }) => {
  const { podcasts, loading, error } = usePodcasts();
  const [searchQuery, setSearchQuery] = useState('');

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading podcasts: {error.message}</div>;
  }

  const filteredPodcasts = podcasts.filter(podcast =>
    podcast.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className={isMobile ? 'm-h-djsets' : 'h-djsets'}>
        <h1>DJ SETS</h1>
      </div>
      <div className={isMobile ? 'm-p-search-bar' : 'p-search-bar'}>
        <input
          type="text"
          placeholder="Artiste, Soundsystem .."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className={isMobile ? 'm-main-djsets' : 'main-djsets'}>
        {filteredPodcasts.map(podcast => (
          <Podcast key={podcast.id} podcast={podcast} isMobile={isMobile} />
        ))}
      </div>
    </>
  );
};

export default PodcastMain;
