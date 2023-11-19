import './PlayBar.css'
import Icon from '../Icons/Icons.jsx';
import SongDetails from './SongDetails.jsx';

const PlayBar = ({ currentSong }) => {

  return (
    <>
      <div className='play-bar-container'>
        <SongDetails currentSong={currentSong}/>
      
        <div className='controls-duration-container'>
          <div className='controls-container'>
            {/* <Icon iconType='ShuffleButton'/> */}
            <Icon iconType='PrevButton'/>

            <div className='play-pause-button'>
              <div className='play-button-content'>
                <Icon
                  iconType='PlayButton' 
                  currentSong={currentSong} 
                  className='play-pause-button'
                />
              </div>
              <div className='play-button-circle-content'>
                <Icon iconType='PlayButtonCircle'/>
              </div>
            </div>

            <Icon iconType='NextButton'/>
            <Icon iconType='RepeatButtonInactive'/>
          </div>

          <div className='duration-container'>
            <p>0:00</p>
            <div className='duration-line'></div>
            <p>6:09</p>
          </div>
        </div>

        <div className='queue-volume-container'>
          <Icon iconType='QueueButtonInactive'/>
          <div className='volume-container'>
            <Icon iconType='VolumeButton'/>
            <div className='volume-line'></div>            
          </div>
        </div>
      </div>
    </>
  );
}

export default PlayBar;