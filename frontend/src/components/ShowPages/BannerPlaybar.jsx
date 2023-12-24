import { useState } from 'react'
import { ReactComponent as PlayButtonInactive } from '../../static/icons/banner-play-inactive.svg'
import { ReactComponent as PlayButtonActive } from '../../static/icons/banner-play-active.svg'
import './ShowPage.css'


const BannerPlaybar = () => {
  const [activePlay, setActivePlay] = useState(false)

  const handleMouseEnter = () => {
    setActivePlay(true)
  }
  const handleMouseLeave = () => {
    setActivePlay(false)
  }

  return (
    <div className="banner-playbar">
      <div 
        className='play-button-container'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        >
        { activePlay ?  <PlayButtonActive/> :  <PlayButtonInactive/> }
      </div>
    </div>
  );
}

export default BannerPlaybar;