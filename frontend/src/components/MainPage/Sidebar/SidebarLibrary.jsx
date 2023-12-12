import '../MainPage.css'
import './Sidebar.css'
import Icon from '../../Icons/Icons.jsx'
import { Link } from 'react-router-dom'
import { createPlaylistAsync } from '../../../store/playlistSlice.js'
import { useDispatch, useSelector } from 'react-redux';


const SidebarLibrary = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  
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
          {/* Subcomponents in here */}
          FUCK OFF
        </div>

        
      </div>
    </>
  );
}

export default SidebarLibrary;