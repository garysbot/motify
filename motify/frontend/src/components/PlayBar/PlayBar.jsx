import './PlayBar.css'
import kendrickAlbumCover from '../../static/albums/covers/kendrick.png'
import PlayBarIcon from './PlayBarIcon';

const PlayBar = ({ currentSong }) => {

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
            <PlayBarIcon icon='ShuffleButton'/>
            <PlayBarIcon icon='PrevButton'/>

            <div className='play-pause-button'>
              <div className='play-button-content'>
                <PlayBarIcon
                  icon='PlayButton' 
                  currentSong={currentSong} 
                  className='play-pause-button'
                />
              </div>
              <div className='play-button-circle-content'>
                <PlayBarIcon icon='PlayButtonCircle'/>
              </div>
            </div>

            <PlayBarIcon icon='NextButton'/>
            <PlayBarIcon icon='RepeatButtonInactive'/>
          </div>

          <div className='duration-container'>
            <p>0:00</p>
            <div className='duration-line'></div>
            <p>6:09</p>
          </div>
        </div>

        <div className='queue-volume-container'>
          <PlayBarIcon icon='QueueButtonInactive'/>
          <div className='volume-container'>
            <PlayBarIcon icon='VolumeButton'/>
            <div className='volume-line'></div>            
          </div>
        </div>
      </div>
    </>
  );
}

export default PlayBar;