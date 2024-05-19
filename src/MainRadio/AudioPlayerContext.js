import React, { createContext, useState, useRef, useEffect } from 'react';

const AudioPlayerContext = createContext();

export const AudioPlayerProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioElementRef = useRef(null);

  useEffect(() => {
    if (!audioElementRef.current) {
      audioElementRef.current = new Audio();
      audioElementRef.current.src = 'https://radio.tirnatek.fr/listen/tntr/tntr128.mp3'; // Base source
    }
  }, []);

  const play = (source) => {
    if (audioElementRef.current.src !== source) {
      audioElementRef.current.src = source;
    }
    audioElementRef.current.play();
    setIsPlaying(true);
  };

  const pause = () => {
    audioElementRef.current.pause();
    setIsPlaying(false);
  };

  return (
    <AudioPlayerContext.Provider value={{ isPlaying, play, pause, audioElementRef }}>
      {children}
    </AudioPlayerContext.Provider>
  );
};

export default AudioPlayerContext;
