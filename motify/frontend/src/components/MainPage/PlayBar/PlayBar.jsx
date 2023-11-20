import { useRef, useEffect } from 'react';
import './PlayBar.css';
import Icon from '../../Icons/Icons.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { togglePlay, changeTrack, setVolume, receiveSong } from '../../../store/audioActions.js';

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
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          // Handle the error for play() promise rejection here
        });
      }
    }
  }, [currentSong, isPlaying]);

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

  // Next track
  const handleNextTrack = () => {
    const currentSongIndex = currentAlbum.songs.findIndex(song => song.id === currentSong.id);
    const nextSongIndex = (currentSongIndex + 1) % currentAlbum.songs.length; // Loop back to the start
    const nextSong = currentAlbum.songs[nextSongIndex];
    dispatch(receiveSong(nextSong));

    if (!isPlaying) {
      dispatch(togglePlay());
    }
  };

  const handlePrevTrack = () => {
    const currentSongIndex = currentAlbum.songs.findIndex(song => song.id === currentSong.id);
    const prevSongIndex = (currentSongIndex - 1 + currentAlbum.songs.length) % currentAlbum.songs.length; // Loop to the end
    const prevSong = currentAlbum.songs[prevSongIndex];
    dispatch(receiveSong(prevSong));

    if (!isPlaying) {
      dispatch(togglePlay());
    }
  };

  // Volume control (this is just a placeholder, you need a method to set the volume)
  const handleVolumeChange = (event) => {
    const newVolume = event.target.value / 100; // Convert to a value between 0 and 1
    audioRef.current.volume = newVolume; // Set the volume of the audio element
    dispatch(setVolume(newVolume)); // Update the volume in Redux state
  };

  return (
    <>
      <div className='play-bar-container'>
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
          </div>

          <div className='duration-container'>
            {/* Duration logic goes here */}
          </div>
        </div>

        <div className='queue-volume-container'>
          {/* <Icon iconType='QueueButtonInactive'/> */}
          <div className='volume-container'>
            <Icon iconType='VolumeButton'/>
            {/* <div className='volume-line' onClick={() => handleVolumeChange(0.5)}></div> */}
            <input
              type='range'
              min='0'
              max='100'
              value={volume * 100}
              className='volume-line'
              onChange={handleVolumeChange}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default PlayBar;
