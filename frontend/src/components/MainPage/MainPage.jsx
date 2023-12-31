import './MainPage.css'

import Sidebar from './Sidebar/Sidebar.jsx';
import PlayBar from './PlayBar/PlayBar.jsx';
import UserContent from './UserContent/UserContent.jsx';
import ProfileMenu from './Userbar/ProfileMenu/ProfileMenu.jsx';
import { ReactComponent as LeftArrowActive } from '../../static/icons/left-arrow-active.svg'
import { ReactComponent as RightArrowActive } from '../../static/icons/right-arrow-active.svg'
import { useHistory } from 'react-router-dom';

const MainPage = () => {
  const history = useHistory(); // Get the history object

  // Function to navigate back
  const handleBack = () => {
    history.goBack();
  };

  // Function to navigate forward
  const handleForward = () => {
    history.goForward();
  };

  return (
    <>
      <div className='user-home-container'>
        <Sidebar/>
        <div className='user-home-mainbody'>
          <div className='user-home-userbar'>
            <div className='userbar-arrow-nav'>
              <div><LeftArrowActive onClick={handleBack} style={{'cursor':'pointer'}}/></div>
              <div><RightArrowActive onClick={handleForward} style={{'cursor':'pointer'}}/></div>
            </div>
            <div className='userbar-profile-container'>
              <ProfileMenu />
            </div>
          </div>
          <div className='user-home-content'>
            <UserContent/>
          </div>
        </div>
        <PlayBar currentSong=''/>
      </div>
    </>
  );
}

export default MainPage;