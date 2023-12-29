import '../MainPage.css'
import './Sidebar.css'
import Icon from '../../Icons/Icons.jsx'
import { Link } from 'react-router-dom'
import { createPlaylistAsync } from '../../../store/playlistSlice.js'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react'

const SidebarLibrary = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const playlists = useSelector(state => state.playlists);
  const allPlaylists = Object.values(playlists)
  const userPlaylists = allPlaylists.filter((playlist) => playlist.userId === currentUser?.id)

  // ! Hover effect
  const [hoveredPlaylist, setHoveredPlaylist] = useState(null)

  const handleClick = (e) => {
    dispatch(createPlaylistAsync({
      user_id: currentUser.id,
      title: 'My New Playlist',
      songs: []
    }))
  }

  return (
    <>
      <div className='sidebar-library'>
        <div className='library-header'>
          <div className='library'>
            <Icon iconType='LibraryActive' />
            <p>Your Library</p>
          </div>
          <div className='library-plus'>
            <Link to='/create'>
              <Icon
                iconType='PlusActive'
                onClick={handleClick}
              />
            </Link>
          </div>
        </div>

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
                        <img className='playlist-cover' alt='playlist-cover' src="https://motify-seeds.s3.us-east-2.amazonaws.com/static/albums/covers/kendrick.png" ></img>
                      </Link>
                    </div>
                    <div className='playlist-user-details'>
                      <Link to={`/playlists/${playlist?.id}`}>
                        <p className='playlist-title'>{playlist.title}</p>
                      <Link to={`/playlists/${playlist?.id}`}>
                      </Link>
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