import { useState, useRef, useEffect } from 'react'
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
  const [modalOpen, setModalOpen] = useState(false)
  const modalRef = useRef(null);
  const menuDotsRef = useRef(null);
  const [modalStyle, setModalStyle] = useState({});

  useEffect(() => {
    if (modalOpen && menuDotsRef.current) {
      const menuDotsRect = menuDotsRef.current.getBoundingClientRect();
      setModalStyle({
        position: 'absolute',
        cursor: 'pointer',
        top: `${menuDotsRect.bottom}px`,
        left: `${menuDotsRect.left}px`,
      });
    }
  }, [modalOpen]);

  // Event listener to close the modal if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalOpen(false);
      }
    };

    if (modalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalOpen]);

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
      <MenuDots
        ref={menuDotsRef}
        onClick={() => setModalOpen(true)}
      />
      {
        modalOpen ?
        <div ref={modalRef} className='show-menu-modal' style={modalStyle} onClick={handleDelete}>Delete</div> : null
      }
    </div>
  );
}

export default BannerPlaybar;