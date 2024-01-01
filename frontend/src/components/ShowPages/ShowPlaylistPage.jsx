import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPlaylist } from '../../store/audioThunks';
import { updatePlaylistAsync } from '../../store/playlistSlice';
import { ReactComponent as TimeIcon } from '../../static/icons/time.svg'
import { ReactSVG } from 'react-svg'
import lilPlayButton from '../../static/icons/noun-play-1009801.svg'
import { receiveSong, togglePlay } from '../../store/audioActions'; // Import relevant actions

import '../MainPage/MainPage.css'
import '../MainPage/Playlist/PlaylistCreate.css'
import './ShowPage.css'
import SearchField from '../SearchField/SearchField'
import BannerPlaybar from './BannerPlaybar';

// Imgs
import newPlaylistCover from '../../static/albums/newPlaylistCover.png';

const ShowPlaylistPage = () => {
  const dispatch = useDispatch();
  const [hoveredTrack, setHoveredTrack] = useState(null);
  const currentUser = useSelector(state => state.session.user);
  const currentPlaylist = useSelector(state => state.audio.currentPlaylist)
  const [title, setTitle] = useState(currentPlaylist.title)
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

  // ^ Update Playlist Title
  const handleTitleUpdate = (e) => {
    setTitle(e.target.value);
  };

  const handleTitleSave = () => {
    if (title !== currentPlaylist.title) {
      dispatch(updatePlaylistAsync({ id: playlistId, title }));
      // fixing ActinController::ParameterMissing
      // dispatch(updatePlaylistAsync({ id: playlistId, playlist: { title: title } }));
    }
  };

  // Function to handle play button click
  const handlePlaySong = (song) => {
    dispatch(receiveSong(song));
    dispatch(togglePlay());
  };

  return (
    <>
      <div className="playlist-create">
        <div className='show-banner'>
          <img src={newPlaylistCover} alt='' className='album-cover-img'></img>
          <div className='banner-details'>
            <p>Playlist</p>
            <div className='playlist-name-container'>
              <input
                className='playlist-title-field'
                type="text"
                value={title}
                onChange={handleTitleUpdate}
                onBlur={handleTitleSave}
              />
            </div>

            <div className='details-artist'>
              <div className='details-artist-mini-pic'>
                <img src='' alt=''></img>
              </div>
              {currentUser?.username}
            </div>
          </div>
        </div>
        {/* Main Body for Songs Added */}
        <div className='show-menu-container'>
          <BannerPlaybar/>
        </div>
        <div className='new-playlist-body'>

          <div className='show-songs-row-container'>
            <div className='row-start'>
              <p className='header-text'>#</p>
              <p className='header-text'>Title</p>
              <div className='song-title-artist-container'>
                <p className='header-text'>Album</p>
              </div>
            </div>
            <div className='song-title-artist-container'>
              <TimeIcon className='header-time'/>
            </div>
          </div>
          <hr></hr>
          
          <div className='show-songs-table'>
            {
              currentSongs?.map((song, trackNum) => (
                <>
                  <div 
                    className='show-songs-row-container'
                    onMouseEnter={() => setHoveredTrack(trackNum)}
                    onMouseLeave={() => setHoveredTrack(null)}
                    onClick={() => handlePlaySong(song)} // ! This is what changes the Redux State
                  >
                    <div className='row-start'>
                      <div className='track-num'>
                        {
                          hoveredTrack === trackNum ? 
                          (<ReactSVG src={lilPlayButton} className='anim-play-button' />) 
                            : 
                          (<p>{trackNum + 1}</p>)
                        }
                      </div>
                      <div className='song-title-artist-container'>
                        <p className='song-title'>{song.title}</p>
                        <p className='song-title-artist-name'>{song.artist.artistName}</p>
                      </div>
                      <div className='song-title-artist-container'>
                        <p className='song-title'>{song.album.title}</p>
                      </div>
                    </div>

                    <div className='row-end'>
                      <div className='like-button-duration'>
                        <p className='duration-text header-time'>{`${Math.floor(song.duration / 60)}:${String(song.duration % 60).padStart(2, '0')}`}</p>
                      </div>
                    </div>
                  </div>
                </>
              ))
            }
          </div>
        </div>
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