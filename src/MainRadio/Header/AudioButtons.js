import React, { useState } from 'react';
import Icon96kbps from './networkIcons/Icon96kbps';
import Icon128kbps from './networkIcons/Icon128kbps';
import Icon320kbps from './networkIcons/Icon320kbps';

function AudioButtons({ isMobile }) {
  const [showBitrateButtons, setShowBitrateButtons] = useState(false);
  const [currentBitrate, setCurrentBitrate] = useState(<Icon128kbps />);

  function toggleBitrateButtons() {
    setShowBitrateButtons(!showBitrateButtons);
  }

  function handleButtonClick(event) {
    const source = event.target.getAttribute('data-source');
    const audioElement = document.getElementById('lecteurAudio');
    audioElement.setAttribute('src', source);
    audioElement.load();
    audioElement.play();
    setShowBitrateButtons(false);

    // Dynamically set the current bitrate based on the clicked button
    const iconComponent =
      event.target.className === (isMobile ? 'mc1' : 'c1') ? (
        <Icon96kbps />
      ) : event.target.className === (isMobile ? 'mc2' : 'c2') ? (
        <Icon128kbps />
      ) : (
        <Icon320kbps />
      );

    setCurrentBitrate(iconComponent);
  }

  return (
    <div className={isMobile ? 'audioButton-mobile' : 'audioButton'}>
      <p>Adapter le débit selon votre connexion</p>
      <button className={isMobile ? 'default-bitrate-mobile' : 'default-bitrate'} onClick={toggleBitrateButtons}>
        {currentBitrate}
      </button>
      {showBitrateButtons && (
        <div className={isMobile ? 'bitrateOptions-mobile' : 'bitrateOptions'}>
          <button className={isMobile ? 'mc1' : 'c1'} data-source="https://radio.tirnatek.fr/listen/tntr/tntr96.mp3" onClick={handleButtonClick}>
            <Icon96kbps />
          </button>
          <button className={isMobile ? 'mc2' : 'c2'} data-source="https://radio.tirnatek.fr/listen/tntr/tntr128.mp3" onClick={handleButtonClick}>
            <Icon128kbps />
          </button>
          <button className={isMobile ? 'mc3' : 'c3'} data-source="https://radio.tirnatek.fr/listen/tntr/tntr320.mp3" onClick={handleButtonClick}>
            <Icon320kbps />
          </button>
        </div>
      )}
    </div>
  );
}

export default AudioButtons;
