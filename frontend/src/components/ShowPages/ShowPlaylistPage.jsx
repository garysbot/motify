import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPlaylist } from '../../store/audioThunks';
import { updatePlaylistAsync } from '../../store/playlistSlice';
import { ReactComponent as TimeIcon } from '../../static/icons/time.svg'
import { ReactSVG } from 'react-svg'
import lilPlayButton from '../../static/icons/noun-play-1009801.svg'
import equaliser from '../../static/icons/equalizer.gif'
import { receiveSong, togglePlay } from '../../store/audioActions'; // Import relevant actions
import '../Dropdown/Dropdown.css'

// Dropdown
import Dropdown from '../Dropdown/Dropdown';

import '../MainPage/MainPage.css'
import './ShowPlaylist.css'
import './ShowPage.css'
import SearchField from '../SearchField/SearchField'
import BannerPlaybar from './BannerPlaybar';

// Imgs
import newPlaylistCover from '../../static/albums/newPlaylistCover.png';

const ShowPlaylistPage = () => {
  const dispatch = useDispatch();
  const { playlistId } = useParams();
  const [hoveredTrack, setHoveredTrack] = useState(null);

  const currentUser = useSelector(state => state.session.user);
  const currentPlaylist = useSelector(state => state.audio.currentPlaylist)
  const [title, setTitle] = useState(currentPlaylist.title)
  const currentSongs = useSelector(state => state.audio.currentPlaylist.songs)
  const playlistCoverImg = useSelector(state => state.playlists[playlistId]?.playlistCoverImg)
  
  const [playlistCover, setPlaylistCover] = useState(newPlaylistCover)
  const [toggleSongMenu, setSongMenu] = useState(false)

  // ^ Fetches current playlist object from URL via useParams
  useEffect(() => {
    const fetchPlaylistData = async () => {
      if (playlistId) {
        dispatch(fetchPlaylist(playlistId))
      }
    }
    fetchPlaylistData()
  }, [dispatch, playlistId])

  // ^ State synchronizing
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
    }
  };

  // Function to handle play button click
  const handlePlaySong = (song) => {
    dispatch(receiveSong(song));
    dispatch(togglePlay());
  };

  // Format the dateString
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  // Format the playlist length
  function formatLength(currentSongs) {
    let totalLength = 0;
    currentSongs.map((song) => totalLength += song.duration)
    
    let mins = Math.floor(totalLength / 60)

    if (mins < 60) {
      return `${mins} mins`
    }

    if (mins >= 60) {
      let hours = Math.floor(mins / 60)
      mins -= 60
      return `${hours} hr, ${mins} mins`
    }

  }

  // closing the song menu
  // Detect click outside of menu to close it
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setSongMenu(true)
      }
    }

    if (toggleSongMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };

  }, [toggleSongMenu, dispatch])

  const handleSongMenu = async () => {
    console.log(`handleSongMenu activated`)
    if (!toggleSongMenu) {
      setSongMenu(true)
    }
    console.log(`toggleSongMenu is currently ${toggleSongMenu}`)
  }

  return (
    <>
      <div className='show-banner'>
        {
          playlistCoverImg ? 
          <>
            <img src={playlistCoverImg} alt='' className='album-cover-img'></img>            
          </> 
          : 
          <>
            <img src={newPlaylistCover} alt='' className='album-cover-img'></img>
          </>
        }
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
            {currentPlaylist?.id && (
              <>
                <div className='details-artist-mini-pic'>
                  <img src={currentUser?.userProfImg} alt=''></img>
                </div>
                {currentUser?.username}
                <span className='dot'>•</span>
                {formatDate(currentPlaylist?.createdAt)}
                <span className='dot'>•</span>
                {`${Object.values(currentPlaylist?.songs).length} songs`}
                <span className='dot'>•</span>
                {formatLength(currentSongs)}
              </>
            )}
          </div>
        </div>
      </div>
      {/*  Main Body for Songs Added */}
      <div className='show-menu-container'>
        <BannerPlaybar/>
      </div>

      <div className='show-content'>
        <div className='tracks-header'>
          <div className='row-start'>
            <p className='header-text'>#</p>
            <p className='header-text'>Title</p>
          </div>
          <div className='row-start'>
            <p className='header-text'>Album</p>
          </div>
          <div className='row-end'>
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
                  // onClick={() => handlePlaySong(song)} // ! This is what changes the Redux State
                >
                  <div className='row-start'>
                    <div className='track-num'>
                      {
                        hoveredTrack === trackNum ? 
                        (<ReactSVG src={lilPlayButton} className='anim-play-button' />) 
                          : 
                        (<p style={{'height':'12px', 'width':'12px'}}>{trackNum + 1}</p>)
                      }
                    </div>
                    <div className='song-title-artist-container'>
                      <p className='song-title'>{song.title}</p>
                      <Link to={`/artists/${song.artist.artistId}`}><p className='song-title-artist-name'>{song.artist.artistName}</p></Link>
                    </div>
                    <div className='song-title-artist-container'>
                      <Link to={`/albums/${song.album.id}`}><p className='song-title'>{song.album.title}</p></Link>
                    </div>
                  </div>

                  <div className='row-end'>
                    <div className=''>
                      <p className='duration-text header-time'>{`${Math.floor(song.duration / 60)}:${String(song.duration % 60).padStart(2, '0')}`}</p>
                    </div>
                    <div className='row-end-menu'>
                    </div>
                  </div>
                </div>
              </>
            ))
          }
        </div>
      </div>
      <div className='search-footer'>
        <hr></hr>
        <h3>Let's find something for your playlist</h3>
        <SearchField />
      </div>
    </>
  );
}

export default ShowPlaylistPage;