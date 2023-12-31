import { useState } from 'react'
import { ReactComponent as PlayButtonInactive } from '../../static/icons/banner-play-inactive.svg'
import { ReactComponent as PlayButtonActive } from '../../static/icons/banner-play-active.svg'
import { ReactComponent as MenuDots } from '../../static/icons/show-menu.svg'
import './ShowPage.css'
import { useDispatch } from 'react-redux'
import { deletePlaylistAsync } from '../../store/playlistSlice'
import { useHistory, useParams } from 'react-router-dom'

const BannerPlaybar = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [activePlay, setActivePlay] = useState(false)
  const { playlistId } = useParams()

  const handleMouseEnter = () => {
    setActivePlay(true)
  }
  const handleMouseLeave = () => {
    setActivePlay(false)
  }

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

  return (
    <div className="banner-playbar">
      <div 
        className='play-button-container'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        >
        { activePlay ?  <PlayButtonActive/> :  <PlayButtonInactive/> }
      </div>
      <MenuDots/>
      <button type="submit" onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default BannerPlaybar;