import './PlayBar.css'
import kendrickAlbumCover from '../../static/albums/covers/kendrick.png'
import PlayBarContent from './PlayBarContent';
import React, { useRef, useState, useEffect } from 'react';
import { ReactComponent as PlayButton } from '../../static/playbar/show/show-play-bar-play-button.svg'
import { ReactComponent as PauseButton } from '../../static/playbar/show/show-play-bar-pause-button.svg'
import { ReactSVG } from 'react-svg';


const PlayBar = ({ currentSong }) => {

  const audioRef = useRef(new Audio());
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (currentSong) {
      audioRef.current.src = currentSong;
    }
  }, [currentSong])

  useEffect(() => {
    audioRef.current.onplay = () => setIsPlaying(true);
    audioRef.current.onpause = () => setIsPlaying(false);
    audioRef.current.onerror = () => {
        // Handle audio playback errors
    };
  }, []);

  const playAudio = () => {
    if (currentSong) {
      console.log(`Play Clicked`)
      audioRef.current.play();
    }
  };

  const pauseAudio = () => {
    console.log(`Pause Clicked`)
    audioRef.current.pause();
  };

  const handleClick = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  }


  return (
    <>
      <div className='play-bar-container'>
        <div className='song-details-container'>
          <img src={kendrickAlbumCover} alt='' className='song-details-cover'></img>
          <div className='song-details'>
            {/* Song Title */}
            <h3>trademark usa</h3>
            {/* Artist */}
            <p>Baby Keem</p>
          </div>
          {/* Like Button */}
        </div>

        <div className='controls-duration-container'>
          <div className='controls-container'>
            <PlayBarContent contentType='ShuffleButton'/>
            <PlayBarContent contentType='PrevButton'/>
            {/* <p>Previous</p> */}
            <div className='play-pause-button'>
              <div className='play-button-content'>
                <button onClick={handleClick}>
                  {
                    isPlaying ? 
                      <PlayBarContent contentType="PauseButton"/>
                      :
                      <PlayBarContent contentType='PlayButton'/>
                  }
                </button>
              </div>
              <div className='play-button-circle-content'>
                <PlayBarContent contentType='PlayButtonCircle'/>
              </div>
            </div>

            <PlayBarContent contentType='NextButton'/>
            <PlayBarContent contentType='RepeatButtonInactive'/>
          </div>

          <div className='duration-container'>
            <p>0:00</p>
            <div className='duration-line'></div>
            <p>6:09</p>
          </div>
        </div>

        <div className='queue-volume-container'>
          <PlayBarContent contentType='QueueButtonInactive'/>
          <div className='volume-container'>
            <PlayBarContent contentType='VolumeButton'/>
            <div className='volume-line'></div>            
          </div>
        </div>
      </div>
    </>
  );
}

export default PlayBar;