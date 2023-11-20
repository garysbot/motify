import './UserHomePage.css'
import { Route, Switch } from 'react-router-dom'

import HomePage from './HomePage/index.jsx'
import ShowAlbumPage from './ShowPages/ShowAlbumPage.jsx';

import SidebarMiniHome from './Sidebar/SidebarMiniHome.jsx';
import SidebarLibrary from './Sidebar/SidebarLibrary.jsx';
import Userbar from './Userbar/Userbar.jsx';
import PlayBar from '../PlayBar/PlayBar.jsx';

// For testing the passing of a song object through to the playbar

const UserHomePage = () => {

  return (
    <>
      <body className="user-home-container">
        <div className='user-home-sidebar'>
          <SidebarMiniHome/>
          <SidebarLibrary/>
        </div>

        <div className='user-home-mainbody'>
          <Userbar/>
          <div className='user-home-content'>
            <Switch>
              <Route path="/home">
                <HomePage />
              </Route>
              <Route path="/album">
                <ShowAlbumPage />
              </Route>
            </Switch>
          </div>
        </div>
        <PlayBar currentSong='https://motify-seeds.s3.us-east-2.amazonaws.com/audio/kendrick-lamar-money-trees.m4a' />
      </body>
    </>
  );
}

export default UserHomePage;
