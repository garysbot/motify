import '../MainPage.css'
import './PlaylistCreate.css'
import '../../ShowPages/ShowPage.css'
import SearchField from '../../SearchField/SearchField'
// Imgs
import newPlaylistCover from '../../../static/albums/newPlaylistCover.png';

// Redux state
import { useSelector, useDispatch } from 'react-redux';
import { updateTitle } from '../../../store/playlistSlice';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPlaylist } from '../../../store/audioThunks';



const ShowPlaylistPage = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const songIds = useSelector(state => state.playlist)
  const songs = ['hi', 'bye']

  const currentPlaylist = useSelector(state => state.audio.currentPlaylist)
  const { playlistId } = useParams();

  useEffect(() => {
    const fetchPlaylistData = async () => {
      if (playlistId) {
        dispatch(fetchPlaylist(playlistId))
      }
    }
    fetchPlaylistData()
  }, [dispatch, playlistId])


  // ^ Update Playlist Title
  const [title, setTitle] = useState(currentPlaylist.title)
  const updatePlaylistTitle = (e) => {
    const newTitle = e.target.value
    setTitle(newTitle)
    dispatch(updateTitle(newTitle))
    console.log(`The title is currently ${newTitle}`)
  }

  // ^ Render songs in the playlist

  return (
    <>
      <div className="user-home-content playlist-create">
        <div className='show-banner'>
          <img src={newPlaylistCover} alt='' className='album-cover-img'></img>
          <div className='banner-details'>
            <p>Playlist</p>
            {/* // TODO Attach to Redux state.playlist.title  */}
            <div className='playlist-name-container'>
              <form>
                <input
                  className='playlist-title-field'
                  type="text"
                  value={title}
                  onChange={updatePlaylistTitle}
                />
                <button type="submit" style={{ display: "none" }}>Submit</button>
              </form>
            </div>

            <div className='details-artist'>
              <div className='details-artist-mini-pic'>
                <img src='' alt=''></img>
              </div>
              {currentUser.username}
            </div>
          </div>
        </div>

        {/* Main Body for Songs Added */}
        <div className='new-playlist-body'>
          <div className='playlist-header'>
            <p>#</p>
            <p>Title</p>
            <p>Album</p>
            <p>Date added</p>
            <p>Duration</p>
          </div>
          <hr></hr>
          {
            songs?.map((song, trackNum) => (
              <>
                <div className='show-songs-row-container'>
                  <p>{trackNum + 1}</p>
                  <p>{song.title}</p>
                  <p>{song.albumTitle}</p>
                  <p>{`${Math.floor(song.duration / 60)}:${String(song.duration % 60).padStart(2, '0')}`}</p>
                </div>
              </>
            ))
          }
        </div>
        {/* Search body */}
        <div className='playlist-create search-footer'>
          <hr></hr>
          <h3>Let's find something for your playlist</h3>
          <SearchField />

        </div>

      </div>

    </>
  );
}

export default ShowPlaylistPage;