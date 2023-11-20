import './MainPage.css'

import Sidebar from './Sidebar/Sidebar.jsx';
import PlayBar from './PlayBar/PlayBar.jsx';
import Userbar from './Userbar/Userbar.jsx';
import UserContent from './UserContent/UserContent.jsx';

const MainPage = () => {
  return (
    <>
      <div className='user-home-container'>
        <Sidebar/>
        <div className='user-home-mainbody'>
          <Userbar/>
          <UserContent/>
        </div>
        <PlayBar currentSong=''/>
      </div>
    </>
  );
}

export default MainPage;