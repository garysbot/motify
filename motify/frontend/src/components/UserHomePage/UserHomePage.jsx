import './UserHomePage.css'
import PlayBar from '../PlayBar/PlayBar';
import { ReactComponent as HomeActive } from '../../static/icons/home-active.svg';
import { ReactComponent as HomeInactive } from '../../static/icons/home-inactive.svg';
import { ReactComponent as SearchActive } from '../../static/icons/search-active.svg'
import { ReactComponent as SearchInactive } from '../../static/icons/search-inactive.svg'
import { ReactComponent as LibraryActive } from '../../static/icons/library-active.svg'
import { ReactComponent as LibraryInactive } from '../../static/icons/library-inactive.svg'
import { ReactComponent as PlusActive } from '../../static/icons/plus-active.svg'
import { ReactComponent as RightLineArrowActive } from '../../static/icons/right-line-arrow-active.svg'
import { ReactComponent as LeftArrowActive } from '../../static/icons/left-arrow-active.svg'
import { ReactComponent as LeftArrowInactive } from '../../static/icons/left-arrow-inactive.svg'
import { ReactComponent as RightArrowInactive } from '../../static/icons/right-arrow-inactive.svg'
import { ReactComponent as RightArrowActive } from '../../static/icons/right-arrow-active.svg'
import tempProf from '../../static/temp-prof.png'
import ProfileIcon from './ProfileIcon/ProfileIcon';

import Cards from './Content/Cards/Cards';

const UserHomePage = () => {
  // onClick handler for active-inactive Home & Search buttons in sidebar-mini-home

  return (
    <>
      <body className="user-home-container">
        <div className='user-home-sidebar'>
          
          <div className='sidebar-mini-home'>{/* sidebar-mini-home */}
            <div className="mini-home-icon row-align"><HomeActive/><p>Home</p></div>
            <div className='mini-home-search row-align'><SearchInactive/><p>Search</p></div>
          </div>

          <div className='sidebar-library'>{/* sidebar-library */}
            <div className='library-icon row-align'>
              <LibraryActive/><p>Your Library</p>
              <PlusActive/>
              <RightLineArrowActive/>
            </div>
          </div>
        </div>

        <div className='user-home-mainbody'>
          <div className='user-home-userbar'>{/* user-home-userbar */}
            <div className='userbar-arrow-nav'>
              <LeftArrowActive/>
              <RightArrowActive/>
            </div>
            
            <div className='userbar-profile-container'>
              <ProfileIcon/>
            </div>

          </div>
          
          <div className='user-home-content'>
            <Cards/>
            {/* <div className='content-announcement-container'></div> */}
            {/* <div className='content-recent-container'>
              {/* // TODO Dynamic Headline */}
              {/* <h2>Good afternoon</h2> */}
              {/* <div className='horizontal-card-container'> */}
                {/* <div className='horizontal-card'><img src="" alt="card"/></div> */}
                {/* <p className='horizontal-card-title'>For All The Dogs</p> */}
              {/* </div> */}
              {/* Card Image */}
              {/* Card Title */}
              {/* On Hover Play/Pause Button */}
              {/* Boolean -> True = show play anim / False = do not show */}
              {/* Max - 3x per row; 2x rows */}
              {/* Min - 2x per row; 3x rows */}
            {/* </div> */}
          </div>
        </div>

        <PlayBar />
      </body>
    </>
  );
}

export default UserHomePage;
