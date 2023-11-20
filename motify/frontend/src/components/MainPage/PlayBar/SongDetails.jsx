import './PlayBar.css'
import kendrickAlbumCover from '../../../static/albums/covers/kendrick.png'

const SongDetails = ({ currentSong }) => {
  return (
    <>
      <div className='song-details-container'>
          <img src={kendrickAlbumCover} alt='' className='song-details-cover'></img>
          <div className='song-details'>
            <h3>{currentSong.title}</h3>
            <p>{currentSong.artist}</p>
          </div>
          {/* Like Button */}
        </div>
    </>
  );
}

export default SongDetails;