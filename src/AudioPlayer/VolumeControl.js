import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh, faVolumeLow, faVolumeXmark } from '@fortawesome/free-solid-svg-icons';

function VolumeControl() {
  const [savedVolume, setSavedVolume] = useState(1);
  const [currentVolume, setCurrentVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const storedVolume = localStorage.getItem('savedVolume');
    if (storedVolume !== null) {
      setSavedVolume(parseFloat(storedVolume));
      setCurrentVolume(parseFloat(storedVolume));
      if (parseFloat(storedVolume) === 0) {
        setIsMuted(true);
      }
    }
  }, []);

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setCurrentVolume(newVolume);
    updateVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (isMuted) {
      setCurrentVolume(savedVolume);
      updateVolume(savedVolume);
    } else {
      setSavedVolume(currentVolume);
      setCurrentVolume(0);
      updateVolume(0);
    }
  };

  const updateVolume = (volume) => {
    const lecteurAudio = document.getElementById('lecteurAudio');
    lecteurAudio.volume = volume;
    localStorage.setItem('savedVolume', volume);
  };

  const getVolumeIcon = () => {
    if (isMuted || currentVolume === 0) {
      return faVolumeXmark;
    } else if (currentVolume > 0.5) {
      return faVolumeHigh;
    } else {
      return faVolumeLow;
    }
  };

  return (
    <div className="volume-control">
      <button id="muteVol" onClick={toggleMute}>
        <FontAwesomeIcon icon={getVolumeIcon()} />
      </button>
    <div className='slideVol'>
      <label htmlFor="volume"></label>
      <input
        type="range"
        id="volume"
        min="0"
        max="1"
        step="0.1"
        value={currentVolume}
        onChange={handleVolumeChange}
      />
    </div>
    </div>
  );
}

export default VolumeControl;
