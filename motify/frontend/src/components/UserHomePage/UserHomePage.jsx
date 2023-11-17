import './UserHomePage.css'
import PlayBar from '../PlayBar/PlayBar';
import { ReactComponent as LeftArrowActive } from '../../static/icons/left-arrow-active.svg'
import { ReactComponent as LeftArrowInactive } from '../../static/icons/left-arrow-inactive.svg'
import { ReactComponent as RightArrowInactive } from '../../static/icons/right-arrow-inactive.svg'
import { ReactComponent as RightArrowActive } from '../../static/icons/right-arrow-active.svg'
import tempProf from '../../static/temp-prof.png'
import ProfileIcon from './ProfileIcon/ProfileIcon';

import Cards from './Content/Cards/Cards';
import ShowPage from '../ShowPage/ShowPage';

import Icon from '../Icons/Icons.jsx';

const UserHomePage = () => {
  // onClick handler for active-inactive Home & Search buttons in sidebar-mini-home

  return (
    <>
      <body className="user-home-container">
        <div className='user-home-sidebar'>
          
          <div className='sidebar-mini-home'>{/* sidebar-mini-home */}
            <div className="mini-home-icon row-align">
              <Icon iconType='HomeActive'/><p>Home</p>
            </div>
            <div className='mini-home-search row-align'>
              <Icon iconType='SearchInactive'/><p>Search</p>
            </div>
          </div>

          <div className='sidebar-library'>{/* sidebar-library */}
            <div className='library-icon row-align'>
              <Icon iconType='LibraryActive'/><p>Your Library</p>
              <Icon iconType='PlusActive'/>
            </div>
          </div>
        </div>

        <div className='user-home-mainbody'>
          <div className='user-home-userbar'>{/* user-home-userbar */}
            <div className='userbar-arrow-nav'>
              <Icon iconType='LeftArrow'/>
              <LeftArrowActive/>
              <RightArrowActive/>
            </div>
            
            <div className='userbar-profile-container'>
              <ProfileIcon/>
            </div>

          </div>
          
          <div className='user-home-content'>
            {/* Album Show Page Will Go Here */}
            <ShowPage/>
            {/* <Cards contentType='albums'/> */}
            {/* <Cards contentType='songs'/> */}
            {/* <Cards contentType='albums'/> */}
          </div>
        </div>

        <PlayBar />
      </body>
    </>
  );
}

export default UserHomePage;
