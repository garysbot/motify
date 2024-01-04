import '../MainPage.css'
import './Sidebar.css'
import Icon from '../../Icons/Icons.jsx'
import { Link, useHistory } from 'react-router-dom'
import { createPlaylistAsync } from '../../../store/playlistSlice.js'
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react'

const SidebarLibrary = () => {
  const dispatch = useDispatch();
  const history = useHistory(); // Add this line
  const currentUser = useSelector(state => state.session.user);
  const playlists = useSelector(state => state.playlists);
  const userPlaylists = Object.values(playlists)
  const [lastPlaylistCount, setLastPlaylistCount] = useState(userPlaylists.length);
  
  // ! Hover effect
  const [hoveredPlaylist, setHoveredPlaylist] = useState(null)

  const handleClick = async (e) => {
    dispatch(createPlaylistAsync({
      user_id: currentUser.id,
      title: 'My New Playlist',
      playlist_cover_img: 'https://motify-seeds.s3.us-east-2.amazonaws.com/static/playlists/blank-playlist-cover.png',
      songs: []
    }));
  }

  useEffect(() => {
    // Check if the number of playlists has increased
    if (userPlaylists.length > lastPlaylistCount) {
      const newPlaylist = userPlaylists[userPlaylists.length - 1];
      history.push(`/playlists/${newPlaylist.id}`);
      setLastPlaylistCount(userPlaylists.length); // Update the last known count
    }
  }, [userPlaylists, history, lastPlaylistCount]);

  return (
    <>
      <div className='library-header'>
        <div className='library'>
          <Icon iconType='LibraryActive' />
          <p>Your Library</p>
        </div>
        <div className='library-plus' style={{'cursor':'pointer', 'width':'12px', 'height': '12px'}}>
            <Icon
              iconType='PlusActive'
              onClick={handleClick}
            />
        </div>
      </div>

      <div className='sidebar-library'>
        <div className='library-content'>
          {
            userPlaylists.map((playlist, idx) => (
              <>
                <div 
                  key={playlist?.id}
                  className='playlist-item-container' 
                  onMouseEnter={() => setHoveredPlaylist(idx)}
                  onMouseLeave={() => setHoveredPlaylist(null)}
                >
                  
                    <div className='playlist-image-details'>
                      <Link to={`/playlists/${playlist?.id}`}>
                        <img className='playlist-cover' alt='playlist-cover' src={playlist?.playlistCoverImage} ></img>
                      </Link>
                    </div>
                    <div className='playlist-user-details'>
                      <Link to={`/playlists/${playlist?.id}`}>
                        <p className='playlist-title'>{playlist.title}</p>
                      </Link>
                      <Link to={`/playlists/${playlist?.id}`}>
                        <p className='playlist-details'>Playlist  <span className='dot'>•</span>  {currentUser?.username} </p>
                      </Link>
                    </div>
                </div>
              </>
            ))
          }
        </div>


      </div>
    </>
  );
}

export default SidebarLibrary;