import { useState } from 'react'
import { ReactComponent as PlayButtonInactive } from '../../static/icons/banner-play-inactive.svg'
import { ReactComponent as PlayButtonActive } from '../../static/icons/banner-play-inactive.svg'
import './ShowPage.css'


const BannerPlaybar = () => {
  const [activePlay, setActivePlay] = useState(false)

  const handleMouseEnter = () => {
    setActivePlay(true)
    console.log(`activePlay true condition activated`)
  }
  const handleMouseExit = () => {
    setActivePlay(false)
    console.log(`activePlay false condition activated`)
  }

  return (
    <div className="banner-playbar">
      <div 
        className='play-button-container'
        onMouseEnter={handleMouseEnter}
        onMouseExit={handleMouseExit}
      >
        {
          activePlay ? 
          <>
            <PlayButtonActive/>
          </>
          :
          <>
          <PlayButtonInactive/>
          </>
        }
      </div>
    </div>
  );
}

export default BannerPlaybar;