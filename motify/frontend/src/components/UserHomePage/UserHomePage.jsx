import './UserHomePage.css'
import PlayBar from '../PlayBar/PlayBar';

const UserHomePage = () => {
  return (
    <>
    <div className="user-home-page-bg">
      
      <div className='mini-recently-played-container'>
        {/* ! // Dynamic Headline */}
        <h2>Good afternoon</h2>
        <div className='mini-recently-played-cards-container'>
          <div className='mini-recently-played-card'>
            {/* Card Image */}
            {/* Card Title */}
            {/* On Hover Play/Pause Button */}
            {/* Boolean -> True = show play anim / False = do not show */}
            {/* Max - 3x per row; 2x rows */}
            {/* Min - 2x per row; 3x rows */}
          </div>

        </div>
      </div>

      <div className='your-shows-container'>
        <h2>Your Shows</h2>
        <p>Show All</p>
        <div className='your-shows-cards-container'>
          <div className='your-shows-card'>
            {/* Card Image */}
            {/* Card Title */}
            {/* On Hover Play/Pause Button */}
            {/* Boolean -> True = show play anim / False = do not show */}
            {/* Max - 3x per row; 2x rows */}
            {/* Min - 2x per row; 3x rows */}
          </div>

        </div>
      </div>

      <div className='made-for-you-container'>
        <h2>Made For You</h2>
        <p>Show All</p>
        <div className='made-for-you-cards-container'>
          <div className='made-for-you-card'>
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