import { useRef, useEffect } from 'react';
import './PlayBar.css';
import Icon from '../../Icons/Icons.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { togglePlay, changeTrack, setVolume } from '../../../store/audioActions.js';

const PlayBar = () => {
  const dispatch = useDispatch();
  const audioRef = useRef(new Audio());
  const currentAlbum = useSelector(state => state.audio.currentAlbum);
  const currentArtist = useSelector(state => state.audio.currentArtist);
  const currentSong = useSelector(state => state.audio.currentSong);
  const isPlaying = useSelector(state => state.audio.isPlaying);
  const volume = useSelector(state => state.audio.volume);


  useEffect(() => {
    if (currentSong) {
      audioRef.current.src = currentSong.songUrl;
    }
  }, [currentSong]);
  

  useEffect(() => {
    audioRef.current.onplay = () => handlePlayPause();
    audioRef.current.onpause = () => handlePlayPause();
  }, []);

  // Play/Pause toggle
  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((error) => {
        // Handle the error for play() promise rejection here
      });
    }
    dispatch(togglePlay());
  };
  

  useEffect(() => {
    audioRef.current.onplay = () => {
      if (!isPlaying) {
        dispatch(togglePlay());
      }
    };
    audioRef.current.onpause = () => {
      if (isPlaying) {
        dispatch(togglePlay());
      }
    };
  }, [dispatch, isPlaying]);

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
        {/* <SongDetails currentSong={currentSong}/> */}
        <div className='song-details-container'>
          <img src={currentAlbum.coverImg} alt='' className='song-details-cover'></img>
          <div className='song-details'>
            <h3>{currentSong.title}</h3>
            <p>{currentArtist.artistName}</p>
          </div>
        </div>

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
            {/* <Icon iconType='RepeatButtonInactive'/> */}
          </div>

          <div className='duration-container'>
            {/* Duration logic goes here */}
          </div>
        </div>

        <div className='queue-volume-container'>
          {/* <Icon iconType='QueueButtonInactive'/> */}
          {/* <div className='volume-container'>
            <Icon iconType='VolumeButton'/>
            <div className='volume-line' onClick={() => handleVolumeChange(0.5)}></div>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default PlayBar;
