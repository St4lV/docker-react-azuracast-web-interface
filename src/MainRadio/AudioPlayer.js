import React, { useContext } from 'react';
import AudioPlayerComp from "./AudioPlayer/AudioPlayerComp";
import VolumeControl2 from "./Header/VolumeControl2";
import MetadataGet from "./AudioPlayer/MetadataGet";
import EpisodeData from "./Podcasts/EpisodeData";
import AudioPlayerContext from "./AudioPlayerContext";

function AudioPlayer({ isMobile }) {
  const { isRadioPlaying } = useContext(AudioPlayerContext);

  return (
    <div>
      <div className='lecteurAudio'>
        <AudioPlayerComp isMobile={isMobile} />
        <div className={isMobile ? 'bresil' : 'volume-control2'}>
          <VolumeControl2 isMobile={isMobile} />
        </div>
        {isRadioPlaying ? (
          <MetadataGet isMobile={isMobile} />
        ) : (
          <EpisodeData isMobile={isMobile} />
        )}
      </div>
    </div>
  );
}

export default AudioPlayer;
