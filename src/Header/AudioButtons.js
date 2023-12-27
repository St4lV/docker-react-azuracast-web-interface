import React, { useState, useEffect } from 'react';
import { Howl } from 'howler';
import Icon96kbps from './networkIcons/Icon96kbps';
import Icon128kbps from './networkIcons/Icon128kbps';
import Icon320kbps from './networkIcons/Icon320kbps';

function AudioButtons({ isMobile }) {
  const [showBitrateButtons, setShowBitrateButtons] = useState(false);
  const [currentBitrate, setCurrentBitrate] = useState({
    icon: <Icon128kbps />,
    visible: false,
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [howl, setHowl] = useState(null);

  useEffect(() => {
    setCurrentBitrate((prevBitrate) => ({
      ...prevBitrate,
      visible: true,
    }));
  }, []);

  const audioSources = [
    {
      source: 'https://tirnatek.fr/listen/tntr/tntr96.mp3',
      bitrate: '96kbps',
    },
    {
      source: 'https://tirnatek.fr/listen/tntr/tntr128.mp3',
      bitrate: '128kbps',
    },
    {
      source: 'https://tirnatek.fr/listen/tntr/tntr320.mp3',
      bitrate: '320kbps',
    },
  ];

  function toggleBitrateButtons() {
    setShowBitrateButtons(!showBitrateButtons);
    setCurrentBitrate((prevBitrate) => ({
      ...prevBitrate,
      visible: !prevBitrate.visible,
    }));
  }

  function handleButtonClick(event) {
    const source = event.target.getAttribute('data-source');

    if (howl && howl._src === source && isPlaying) {
      // Si la source est la même et est en cours de lecture, mettre en pause
      howl.pause();
      setIsPlaying(false);
    } else {
      // Créer un nouveau Howl pour la nouvelle source
      const newHowl = new Howl({
        src: [source],
        autoplay: true,
        onplay: () => setIsPlaying(true),
        onpause: () => setIsPlaying(false),
      });
      setHowl(newHowl);
    }

    setShowBitrateButtons(false);
    setCurrentBitrate({
      label: event.target.innerText,
      icon: getIconForBitrate(event.target.getAttribute('data-bitrate')),
      visible: true,
    });
  }

  function getIconForBitrate(bitrate) {
    switch (bitrate) {
      case '96kbps':
        return <Icon96kbps />;
      case '128kbps':
        return <Icon128kbps />;
      case '320kbps':
        return <Icon320kbps />;
      default:
        return null;
    }
  }

  return (
    <div className={isMobile ? 'audioButton-mobile' : 'audioButton'}>
      <p>Adapter le débit selon votre connexion</p>
      <button className={isMobile ? 'default-bitrate-mobile' : 'default-bitrate'} onClick={toggleBitrateButtons}>
      {currentBitrate.visible && (
  <div>
{currentBitrate.visible && (
  <div>
    {currentBitrate.icon}
  </div>
)}
{currentBitrate.visible && (
  <p>
    {currentBitrate.label}
  </p>
)}

  </div>
)}
      </button>
      {showBitrateButtons && (
        <div className={isMobile ? 'bitrateOptions-mobile' : 'bitrateOptions'}>
          {audioSources.map((audio, index) => (
            <button key={index} className={isMobile ? `mc${index + 1}` : `c${index + 1}`} data-source={audio.source} data-bitrate={audio.bitrate} onClick={handleButtonClick}>
              {getIconForBitrate(audio.bitrate)} <p>{audio.label}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default AudioButtons;
