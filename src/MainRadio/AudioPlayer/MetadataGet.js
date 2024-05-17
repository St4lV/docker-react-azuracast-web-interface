import React, { useState, useEffect, useCallback, useRef } from 'react';
import DisplaySongInfo from './DisplaySongInfo'; 

const MetadataGet = ({ isMobile }) => {
  const [metadata, setMetadata] = useState({
    artist: '',
    title: '',
    elapsedValue: 0,
    elapsedUpdate: 0,
    duration: 1,
    songId: '',
    songImg: '',
    isLive: false,
    playlist: '',
    streamerName: ''
  });
  const [showInfo, setShowInfo] = useState(false);
  const [hasPlaylist, setHasPlaylist] = useState(false);

  const updateMusicInfo = useCallback((artist, title, elapsedValue, duration, songId, songImg) => {
    setMetadata(prevMetadata => ({
      ...prevMetadata,
      artist,
      title,
      elapsedValue,
      elapsedUpdate: elapsedValue,
      duration,
      songId,
      songImg
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
      .then(np => {
        const artist = np.now_playing.song.artist;
        const title = np.now_playing.song.title;
        const elapsed = parseInt(np.now_playing.elapsed) || 0;
        const duration = parseInt(np.now_playing.duration) || 0;
        const songId = np.now_playing.sh_id;
        const songImg = np.now_playing.song.art;
        const isLive = np.live.is_live;
        const playlist = np.now_playing.playlist;
        const streamerName = np.live.streamer_name;

        updateMusicInfo(artist, title, elapsed, duration, songId, songImg);

        if (!isLive) {
          const badge = playlist !== "" ? `Playlist: ${playlist}` : 'LIVE AUDIO';
          setMetadata(prevMetadata => ({ ...prevMetadata, isLive, playlist: badge }));
        } else {
          const badge = `Live: ${streamerName}`;
          setMetadata(prevMetadata => ({ ...prevMetadata, isLive, playlist: badge }));
        }

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
    setHasPlaylist(metadata.playlist !== '');
  }, [metadata.playlist]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetadata(prevMetadata => ({
        ...prevMetadata,
        elapsedUpdate: prevMetadata.elapsedUpdate + 1
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const progress = (metadata.elapsedUpdate / metadata.duration) * 100;
  const metadataBlockRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (metadataBlockRef.current && !metadataBlockRef.current.contains(event.target)) {
        setShowInfo(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickMetadataBlock = () => {
    setShowInfo(!showInfo);
  };

  return (
    <div ref={metadataBlockRef} className='metadata-block' onClick={handleClickMetadataBlock}>
      {hasPlaylist && <div className={isMobile ? 'playlist-mobile' : 'playlist'}>{metadata.playlist}</div>}
      <div className={isMobile ? 'metadata-mobile' : 'metadata'}>
        <h3>{metadata.title}</h3>
        <h3>{metadata.artist}</h3>
        <p>{formatTime(metadata.elapsedUpdate)} / {formatTime(metadata.duration)}</p>
      </div>
      <div className={isMobile ? 'custom-progress-mobile' : 'custom-progress'}>
        <div id="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
      <div>
        <img src={metadata.songImg} id={isMobile ? 'cover-np-song-mobile' : 'cover-np-song'} alt="Cover" />
      </div>
      {showInfo && (
        <DisplaySongInfo
          onClose={() => setShowInfo(false)}
          songInfo={metadata}
          isMobile={isMobile}
        />
      )}
    </div>
  );
  
};

const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds - minutes * 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export default MetadataGet;
