import { useRef, useEffect } from 'react';
import './PlayBar.css';
import Icon from '../Icons/Icons.jsx';
import SongDetails from './SongDetails.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { togglePlay, changeTrack, setVolume } from '../../store/audioActions'; // Import action creators

const PlayBar = () => {
  const dispatch = useDispatch();
  const audioRef = useRef(new Audio());
  const currentArtist = useSelector(state => state.audio.currentArtist);
  const currentSong = useSelector(state => state.audio.currentSong);
  const isPlaying = useSelector(state => state.audio.isPlaying);
  const volume = useSelector(state => state.audio.volume);


  useEffect(() => {
    if (currentSong) {
      audioRef.current.src = currentSong.songUrl;
    }
  }, [currentSong])

  useEffect(() => {
    audioRef.current.onplay = () => handlePlayPause();
    audioRef.current.onpause = () => handlePlayPause();
  }, []);

  // Play/Pause toggle
  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
      dispatch(togglePlay());
    } else {
      audioRef.current.play();
      dispatch(togglePlay());
    }
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
                  className='play-button-content'
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
