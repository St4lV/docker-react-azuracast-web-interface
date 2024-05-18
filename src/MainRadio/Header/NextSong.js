import { useState, useCallback, useEffect } from "react";

const NextSong = ({ isMobile }) => {
  const [nextsong, setNextsong] = useState({
    text: '',
    playlist: '',
    elapsedUpdate: 0
  });

  const updateMusicInfo = useCallback((text, playlist) => {
    setNextsong(prevNextsong => ({
      ...prevNextsong,
      text,
      playlist,
    }));
  }, []);

  const fetchData = useCallback(() => {
    fetch('https://radio.tirnatek.fr/api/nowplaying_static/tntr.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then(ns => {
        const text = ns.playing_next.song.text;
        const playlist = ns.playing_next.playlist;
        updateMusicInfo(text, playlist);
  
        setTimeout(fetchData, 15000);
      })
      .catch(error => {
        console.error(`Failed to fetch data. Retrying in 30 seconds... Error: ${error.message}`);
        setTimeout(fetchData, 30000);
      });
  }, [updateMusicInfo]);

  useEffect(() => {
    const fetchDataWrapper = () => {
      fetchData();
    };
    fetchDataWrapper();
  }, [fetchData]);

  useEffect(() => {
    const interval = setInterval(() => {
      setNextsong(prevMetadata => ({
        ...prevMetadata,
        elapsedUpdate: prevMetadata.elapsedUpdate + 1
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className={isMobile ? 'm-next-song-display' : 'next-song-display'}>
        <h3>Prochain Titre : {nextsong.text}</h3>
        <h3 className={isMobile ? 'm-nxsg-playlist' : 'nxsg-playlist'}>
          Playlist : {nextsong.playlist}
        </h3>
      </div>
    </div>
  );
};

export default NextSong;
