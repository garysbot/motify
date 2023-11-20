import './PlayBar.css';
import Icon from '../Icons/Icons.jsx';
import SongDetails from './SongDetails.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { togglePlay, changeTrack, setVolume } from '../../store/audioActions'; // Import action creators

const PlayBar = () => {
  const dispatch = useDispatch();
  const currentSong = useSelector(state => state.audio.currentSong); // Use selector to get current song
  const isPlaying = useSelector(state => state.audio.isPlaying); // Use selector to get play state
  const volume = useSelector(state => state.audio.volume); // Use selector to get volume

  // Play/Pause toggle
  const handlePlayPause = () => {
    dispatch(togglePlay());
  };

  // Next track
  const handleNextTrack = () => {
    dispatch(changeTrack('next'));
  };

  // Previous track
  const handlePrevTrack = () => {
    dispatch(changeTrack('previous'));
  };

  // Volume control (this is just a placeholder, you need a method to set the volume)
  const handleVolumeChange = (newVolume) => {
    dispatch(setVolume(newVolume));
  };

  return (
    <>
      <div className='play-bar-container'>
        <SongDetails currentSong={currentSong}/>

        <div className='controls-duration-container'>
          <div className='controls-container'>
            <Icon iconType='PrevButton' onClick={handlePrevTrack}/>

            <div className='play-pause-button' onClick={handlePlayPause}>
              <div className='play-button-content'>
                <Icon
                  iconType={isPlaying ? 'PauseButton' : 'PlayButton'} 
                  currentSong={currentSong} 
                  className='play-pause-button'
                />
              </div>
              <div className='play-button-circle-content'>
                <Icon iconType='PlayButtonCircle'/>
              </div>
            </div>

            <Icon iconType='NextButton' onClick={handleNextTrack}/>
            <Icon iconType='RepeatButtonInactive'/> {/* You can add functionality here as well */}
          </div>

          <div className='duration-container'>
            {/* Duration logic goes here */}
          </div>
        </div>

        <div className='queue-volume-container'>
          <Icon iconType='QueueButtonInactive'/>
          <div className='volume-container'>
            <Icon iconType='VolumeButton'/>
            <div className='volume-line' onClick={() => handleVolumeChange(0.5)}></div> {/* Example volume change */}
          </div>
        </div>
      </div>
    </>
  );
}

export default PlayBar;
