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
            {/* Album Show Page Will Go Here */}
            <Cards contentType='albums'/>
            <Cards contentType='songs'/>
            <Cards contentType='albums'/>
          </div>
        </div>

        <PlayBar />
      </body>
    </>
  );
}

export default UserHomePage;
