import React, { useState } from 'react';

function AudioButtons({ isMobile}) {
  const [showBitrateButtons, setShowBitrateButtons] = useState(false);
  const [currentBitrate, setCurrentBitrate] = useState('MP3 128kbps');

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
    setCurrentBitrate(event.target.innerText);
  }

  return (
    <div className={isMobile ? 'audioButton-mobile' : 'audioButton'}>
        <p>Adapter le débit selon votre connexion</p>
      <button className={isMobile ? 'default-bitrate-mobile' : 'default-bitrate'} onClick={toggleBitrateButtons}>
        {currentBitrate}
      </button>
      {showBitrateButtons && (
        <div className={isMobile ? 'bitrateOptions-mobile' : 'bitrateOptions'}>
          <button className={isMobile ? 'mc1' : 'c1'} data-source="https://tirnatek.fr/listen/tntr/tntr96.mp3" onClick={handleButtonClick}>
            MP3 96kbps
         </button>
          <button className={isMobile ? 'mc2' : 'c2'} data-source="https://tirnatek.fr/listen/tntr/tntr128.mp3" onClick={handleButtonClick}>
            MP3 128kbps
         </button>
          <button className={isMobile ? 'mc3' : 'c3'} data-source="https://tirnatek.fr/listen/tntr/tntr320.mp3" onClick={handleButtonClick}>
            MP3 320kbps
         </button>
        </div>
      )}
    </div>
  );
}

export default AudioButtons;
