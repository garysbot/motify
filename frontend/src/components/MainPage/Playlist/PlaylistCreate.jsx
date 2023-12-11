import '../MainPage.css'
import './PlaylistCreate.css'
import '../../ShowPages/ShowPage.css'
import SearchField from '../../SearchField/SearchField'
// Imgs
import newPlaylistCover from '../../../static/albums/newPlaylistCover.png';

// Redux state
import { useSelector, useDispatch } from 'react-redux';
import { createPlaylistAsync, updatePlaylist } from '../../../store/playlistSlice';
import { debounce } from 'lodash';
import { useState, useCallback, useEffect } from 'react';

const PlaylistCreate = () => {
  const currentUser = useSelector(state => state.session.user);
  const playlist = useSelector(state => state.playlist)
  const songs = playlist.songs
  
  const [title, setTitle] = useState('')
  const dispatch = useDispatch();

  const debouncedChangeHandler = useCallback((title) => 
    debounce((title) => {
      dispatch(updatePlaylist({ title }))
    }, 300),
    [dispatch, playlist?.id]
  )

  const handleChange = (e) => {
    setTitle(e.target.value)
    debouncedChangeHandler(e.target.value)
  }

  const handleNewPlaylistSubmit = (e) => {
    e.preventDefault()
    console.log(`handleNewPlaylistSubmit called with title:`, title)
    const newPlaylistData = {
      user_id: currentUser.id,
      title: title,
      songs: []
    }

    dispatch(createPlaylistAsync(newPlaylistData))

  }

  // Inside your PlaylistCreate component
  const [songDetails, setSongDetails] = useState([]);
  useEffect(() => {
    const fetchSongs = async () => {
      const details = await Promise.all(songs.map(songId => {
        // Replace with your actual API endpoint
        return fetch(`/api/songs/${songId}`).then(res => res.json());
      }));

      setSongDetails(details);
    };

    fetchSongs();
  }, [songs]);


  return (
    <>
      <div className="user-home-content playlist-create">
        <div className='show-banner'>
          <img src={newPlaylistCover} alt='' className='album-cover-img'></img>
          <div className='banner-details'>
            <p>Playlist</p>


            <div className='playlist-name-container'>
              <form>
                <input
                  className='playlist-title-field'
                  type="text"
                  value={title}
                  onChange={handleChange}
                  onSubmit={handleNewPlaylistSubmit}
                  placeholder='My New Playlist'
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
            songDetails?.map((song, trackNum) => (
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

export default PlaylistCreate;