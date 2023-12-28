// Redux state
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPlaylist } from '../../store/audioThunks';
// Add lodash for debounce
import _ from 'lodash';


import '../MainPage/MainPage.css'
import '../MainPage/Playlist/PlaylistCreate.css'
import './ShowPage.css'
import SearchField from '../SearchField/SearchField'
// Imgs
import newPlaylistCover from '../../static/albums/newPlaylistCover.png';
import { updatePlaylist, updatePlaylistAsync } from '../../store/playlistSlice';



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


  // ^ Debounced update Playlist Title
  const [title, setTitle] = useState(currentPlaylist.title)
  const [debouncedTitle, setDebouncedTitle] = useState(title)
  
  // & Debounce function to delay the dispatch
  const debounceTitleUpdate = _.debounce((newTitle) => {
    setDebouncedTitle(newTitle)
  }, 1000)

  const updatePlaylistTitle = (e) => {
    const newTitle = e.target.value
    setTitle(newTitle)
    debounceTitleUpdate(newTitle)
    console.log(`The title is currently ${newTitle}`)
  }
  
  useEffect(() => {
    if (debouncedTitle !== currentPlaylist.title) {
      dispatch(updatePlaylist({ id: playlistId, title: debouncedTitle }))
      dispatch(updatePlaylistAsync({ id: playlistId, title: debouncedTitle }))
    }
  }, [debouncedTitle, dispatch, currentPlaylist.title, playlistId])

  const handleDelete = (playlistId) => {
    console.log(`del button pressed ${playlistId}`)
  }

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
          <button type="submit" onClick={handleDelete}>Delete</button>
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