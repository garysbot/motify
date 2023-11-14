import './UserHomePage.css'
import PlayBar from '../PlayBar/PlayBar';

const UserHomePage = () => {
  return (
    <>
      <div className="user-home-page-bg">
        <div className='user-home-page-announcements-container'>
          <div className='user-home-page-announcement'>
          {/* Hide Announcements */}
          {/* Announcement Banner */}
          {/* Links for Announcement Banner */}
          </div>
        </div>
        
        <div className='user-home-page-mini-recent-card-container'>
          {/* ! // Dynamic Headline */}
          <h2>Good afternoon</h2>
          <div className='user-home-page-mini-recent-cards-index'>
            <div className='user-home-page-mini-recent-card'>
              {/* Card Image */}
              {/* Card Title */}
              {/* On Hover Play/Pause Button */}
              {/* Boolean -> True = show play anim / False = do not show */}
              {/* Max - 3x per row; 2x rows */}
              {/* Min - 2x per row; 3x rows */}
            </div>
          </div>
        </div>
        
        <div className="background">
          <div className="user-home-page-sidebar">
            <div className="user-home-page-mini-home-search">
              <p>Home</p>
              <p>Search</p>
              <div className="user-home-page-home-icon"></div>
            </div>
            
            <div className="user-home-page-library">
              <p>Library</p>
            </div>

          </div>
        </div>

        <div className='user-home-page-card-container'>
          {/* // TODO Dynamic H2 */}
          <h2>Your Shows</h2>
          <p>Show All</p>
          <div className='user-home-page-cards-index'>
            <div className='user-home-page-card'>
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
      </div>
    </>
  );
}

export default UserHomePage;
