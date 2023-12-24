import AudioPlayerComp from "./AudioPlayer/AudioPlayerComp";
import VolumeControl from "./AudioPlayer/VolumeControl";
import MetadataGet from "./AudioPlayer/MetadataGet";
function AudioPlayer(){
    return (
        <div>
             <div className='lecteurAudio'>
            <AudioPlayerComp />
            <VolumeControl />
            <MetadataGet />
            </div>
        </div>
    )

}
export default AudioPlayer