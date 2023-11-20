import './PlayBar.css'
import kendrickAlbumCover from '../../static/albums/covers/kendrick.png'

const SongDetails = ({ currentSong }) => {
  return (
    <>
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
    </>
  );
}

export default SongDetails;