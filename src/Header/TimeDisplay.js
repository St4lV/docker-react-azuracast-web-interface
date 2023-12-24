import React, { useState, useEffect } from 'react';

function TimeDisplay() {
  const [heureParis, setHeureParis] = useState('');

  useEffect(() => {
    const intervalID = setInterval(() => {
      updateHeureParis();
    }, 1000);

    // Nettoyer l'intervalle lorsque le composant est démonté
    return () => clearInterval(intervalID);
  }, []);

  function updateHeureParis() {
    const date = new Date();
    const options = { timeZone: 'Europe/Paris', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const formattedHeureParis = date.toLocaleString('en-US', options);
    setHeureParis(formattedHeureParis);
  }

  return (
    <div>
      <p><span id="heureParis">Heure actuelle: {heureParis}</span></p>
    </div>
  );
}

export default TimeDisplay;
