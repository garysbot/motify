import '../MainPage.css'
import './PlaylistCreate.css'
import '../../ShowPages/ShowPage.css'
// Imgs
import newPlaylistCover from '../../../static/albums/newPlaylistCover.png'

// Redux state
import { useSelector, useDispatch } from 'react-redux';

const PlaylistCreate = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);

  return (
    <>
    <div className="user-home-content playlist-create">
      <div className='show-banner'>
        <img src={newPlaylistCover} alt='' className='album-cover-img'></img>
        <div className='banner-details'>
          <p>Playlist</p>
          <h1>My Playlist</h1>
          <div className='details-artist'>
            <div className='details-artist-mini-pic'>
              <img src='' alt=''></img>
            </div>
            {currentUser.username}
          </div>
        </div>
      </div>

      {/* Main Body for Songs Added */}
      <div className='playlist-create new-playlist-body show-content'>
        <div className='show-songs-header'>
          <p className='header-text'>#</p>
          <p className='header-text'>Title</p>
          <p className='header-text'>Album</p>
          <p className='header-text'>Date added</p>
          <p className='header-text'>Duration</p>
          <hr></hr>
        </div>
      </div>
      {/* Search body */}
      <div className='playlist-create search-footer'>
        <hr></hr>
        <h3>Let's find something for your playlist</h3>
      </div>

    </div>

    </>
  );
}

export default PlaylistCreate;