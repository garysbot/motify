import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPlaylist } from '../../store/audioThunks';
import { deletePlaylistAsync, updatePlaylistAsync } from '../../store/playlistSlice';

import '../MainPage/MainPage.css'
import '../MainPage/Playlist/PlaylistCreate.css'
import './ShowPage.css'
import SearchField from '../SearchField/SearchField'
import BannerPlaybar from './BannerPlaybar';

// Imgs
import newPlaylistCover from '../../static/albums/newPlaylistCover.png';

const ShowPlaylistPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector(state => state.session.user);
  const currentPlaylist = useSelector(state => state.audio.currentPlaylist)
  const [title, setTitle] = useState(currentPlaylist.title)
  // const songs = ['hi', 'bye']
  const currentSongs = useSelector(state => state.audio.currentPlaylist.songs)
  
  // ^ Fetches current playlist object from URL via useParams
  const { playlistId } = useParams();
  useEffect(() => {
    const fetchPlaylistData = async () => {
      if (playlistId) {
        dispatch(fetchPlaylist(playlistId))
      }
    }
    fetchPlaylistData()
  }, [dispatch, playlistId])

  // ^ State syncronizing
  useEffect(() => {
    setTitle(currentPlaylist.title);
  }, [currentPlaylist.title]);

  // ^ Delete handler
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this playlist?")) {
      dispatch(deletePlaylistAsync(playlistId))
        .then(() => {
          history.push('/');
        })
        .catch((error) => {
          console.error('Failed to delete playlist:', error);
          // Optionally, handle the error with user feedback
        });
    }
  };

  // ^ Update Playlist Title
  const handleTitleUpdate = (e) => {
    setTitle(e.target.value);
  };

  const handleTitleSave = () => {
    if (title !== currentPlaylist.title) {
      dispatch(updatePlaylistAsync({ id: playlistId, title }));
    }
  };

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
                  onChange={handleTitleUpdate}
                  onBlur={handleTitleSave}
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
        <div className='show-menu-container'>
          <BannerPlaybar/>
        </div>
        {/* Main Body for Songs Added */}
        <div className='new-playlist-body'>
          <button type="submit" onClick={handleDelete}>Delete</button>
          <div className='playlist-header'>
            <p>#</p>
            <p>Title</p>
            <p>Duration</p>
          </div>
          <hr></hr>
          {
            currentSongs?.map((song, trackNum) => (
              <>
                <div className='show-songs-row-container'>
                  <p>{trackNum + 1}</p>
                  <p>{song.title}</p>
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