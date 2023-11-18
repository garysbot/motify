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
            <p>trademark usa</p>
            {/* Artist */}
            <p>Baby Keem</p>
          </div>
          {/* Like Button */}
        </div>

        <div className='controls-duration-container'>
          <div className='controls-container'>
            <p>Shuffle</p>
            <p>Previous</p>
            <div className='play-pause-button'>
              <p>Play</p>
              {/* pause */}
              {/* circle */}
            </div>

            <p>Next</p>
            <p>Repeat</p>
          </div>

          <div className='duration-container'>
            {/* Current Song Position */}
            {/* Duration Line */}
            <hr></hr>
            {/* Remaining Song Position */}
          </div>
        </div>

        <div className='queue-volume-container'>
          <p>Queue</p>          
          <div className='volume-container'>
            <p>Volume</p>
            <p>------</p>
            <p>O</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default PlayBar;