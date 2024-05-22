import React, { createContext, useState, useRef, useEffect } from 'react';

const AudioPlayerContext = createContext();

export const AudioPlayerProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRadioPlaying, setIsRadioPlaying] = useState(true);
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [podcastId, setPodcastId] = useState(null); // Add podcastId state
  const audioElementRef = useRef(null);

  useEffect(() => {
    if (!audioElementRef.current) {
      audioElementRef.current = new Audio();
      audioElementRef.current.src = 'https://radio.tirnatek.fr/listen/tntr/tntr128.mp3';
    }

    const updateElapsedTime = () => {
      if (audioElementRef.current && isPlaying) {
        setElapsedTime(audioElementRef.current.currentTime);
      }
    };

    const interval = setInterval(updateElapsedTime, 1000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const play = (source, episode = null, podcastId = null) => { // Accept podcastId
    if (audioElementRef.current.src !== source) {
      audioElementRef.current.src = source;
    }
    audioElementRef.current.play();
    setIsPlaying(true);
    if (episode) {
      setCurrentEpisode(episode);
    }
    if (podcastId !== null) {
      setPodcastId(podcastId);
    }
  };

  const pause = () => {
    audioElementRef.current.pause();
    setIsPlaying(false);
  };

  const setRadioPlaying = (isPlaying) => {
    setIsRadioPlaying(isPlaying);
  };

  return (
    <AudioPlayerContext.Provider value={{ isPlaying, play, pause, currentEpisode, elapsedTime, isRadioPlaying, setRadioPlaying, audioElementRef, podcastId }}>
      {children}
    </AudioPlayerContext.Provider>
  );
};

export default AudioPlayerContext;
