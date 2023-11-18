import './PlayBar.css'
import kendrickAlbumCover from '../../static/albums/covers/kendrick.png'
import PlayBarContent from './PlayBarContent';



const PlayBar = ({ song }) => {
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
                <PlayBarContent contentType='PauseButton' classname='play-bar-play'/>
                {/* <PlayBarContent contentType='PlayButton' className='play-bar-play'/> */}
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