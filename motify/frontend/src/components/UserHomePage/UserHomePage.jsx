import './UserHomePage.css'
import PlayBar from '../PlayBar/PlayBar';

const UserHomePage = () => {
  // onClick handler for active-inactive Home & Search buttons in sidebar-mini-home

  return (
    <>
      <body className="user-home-container">
        <div className='user-home-sidebar'>
          
          <div className='sidebar-mini-home'>{/* sidebar-mini-home */}
            <div className="mini-home-icon"></div><p>Home</p>
            <div className='mini-home-search'></div><p>Search</p>
          </div>

          <div className='sidebar-library'>{/* sidebar-library */}
            <p>Library</p>
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
