import React, { useState, useEffect } from 'react';

const RadioPlayer = ({ isMobile }) => {
  const [radioData, setRadioData] = useState(null);

  const [maxHeight, setMaxHeight] = useState('calc(100vh - 300px)');

  useEffect(() => {
    const handleResize = () => {
      setMaxHeight(`calc(100vh - 300px)`);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://radio.tirnatek.fr/api/nowplaying_static/tntr.json');
        const data = await response.json();
        setRadioData(data);
      } catch (error) {
        console.error('Error fetching radio data:', error);
      }
    }
    fetchData();
    const interval = setInterval(() => {
        fetchData(); // Appel toutes les 20 secondes
      }, 20000);
  
      return () => clearInterval(interval); // Nettoyage de l'intervalle
    }, []);

  return (
    <div className={isMobile ? 'history-song-mobile' : 'history-song'} style={{ maxHeight: maxHeight, overflowY: 'scroll' }}>
      {radioData && (
        <div>
          <h2>Now Playing:</h2>
          <div className='np-display'>
          {radioData.now_playing?.song?.art && <img className={isMobile ? 'img-history-mobile' : 'img-history'} src={radioData.now_playing.song.art} alt="Now Playing Art" />}
          <div className='song-details'>
          <p className='song-title'>{radioData.now_playing?.song?.title}</p>
          <p className='song-artist'>{radioData.now_playing?.song?.artist}</p>
         </div>
         </div>
          <br/>
          
          <h2>Song History:</h2>
          {radioData.song_history.map((song, index) => (
            <div key={index} className='song-history-entry'>
              {song.song?.art && <img className={isMobile ? 'img-history-mobile' : 'img-history'} src={song.song.art} alt="Song Art" />}
              <div className='song-details'>
                <p className='song-title'>{song.song?.title}</p>
                <p className='song-artist'>{song.song?.artist}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
};

export default RadioPlayer;
