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
            <h1 className='userbar-back-arrow'>{`<`}</h1>
            <h1 className='userbar-profile-menu-container'>{`😊`}</h1>
            {/* add profile pic to the div */}
            {/* logout button */}
          </div>
          
          <div className='user-home-content'>{/* user-home-content */}
            <div className='content-announcement-container'>
            </div>

            <div className='content-recent-container'>
              <h2>Good afternoon</h2>
              {/* ! // Dynamic Headline */}
              {/* Card Image */}
              {/* Card Title */}
              {/* On Hover Play/Pause Button */}
              {/* Boolean -> True = show play anim / False = do not show */}
              {/* Max - 3x per row; 2x rows */}
              {/* Min - 2x per row; 3x rows */}
            </div>
            
            <div className='content-cards-container'>
              {/* // TODO Dynamic H2 */}
              <h2>Your Shows</h2>
              <p>Show All</p>
              {/* Card Image */}
              {/* Card Title */}
              {/* On Hover Play/Pause Button */}
              {/* Boolean -> True = show play anim / False = do not show */}
              {/* Max - 3x per row; 2x rows */}
              {/* Min - 2x per row; 3x rows */}
            </div>
          </div>
        </div>

        <PlayBar />
      </body>
    </>
  );
}

export default UserHomePage;
