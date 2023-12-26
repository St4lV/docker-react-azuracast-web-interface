import AudioPlayerComp from "./AudioPlayer/AudioPlayerComp";
import VolumeControl2 from "./Header/VolumeControl2";
import MetadataGet from "./AudioPlayer/MetadataGet";
function AudioPlayer( {isMobile} ){
    return (
        <div>
             <div className='lecteurAudio'>
            <AudioPlayerComp isMobile={isMobile}/>
            <div className={isMobile ? 'bresil' : 'volume-control'}>
            <VolumeControl2 isMobile={isMobile}/>
            <div/></div>
            <MetadataGet isMobile={isMobile}/>
            
        </div>
        </div>
    )

}
export default AudioPlayer