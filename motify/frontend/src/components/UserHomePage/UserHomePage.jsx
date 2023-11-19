import './UserHomePage.css'
import PlayBar from '../PlayBar/PlayBar.jsx';
import { Route, Switch } from 'react-router-dom'
import { ReactComponent as LeftArrowActive } from '../../static/icons/left-arrow-active.svg'
import { ReactComponent as RightArrowActive } from '../../static/icons/right-arrow-active.svg'
import tempProf from '../../static/temp-prof.png'
import ProfileIcon from './ProfileIcon/ProfileIcon.jsx';

import Cards from './Content/Cards/Cards.jsx';
import ShowPage from '../ShowPage/ShowPage.jsx';

import Icon from '../Icons/Icons.jsx';
import HomePage from './HomePage/index.jsx'

const UserHomePage = () => {
  // onClick handler for active-inactive Home & Search buttons in sidebar-mini-home

  return (
    <>
      <body className="user-home-container">
        <div className='user-home-sidebar'>

          <div className='sidebar-mini-home'>
            <div className="mini-home-icon row-align">
              <Icon iconType='HomeActive' /><p>Home</p>
            </div>
            <div className='mini-home-search row-align'>
              <Icon iconType='SearchInactive' /><p>Search</p>
            </div>
          </div>

          <div className='sidebar-library'>
            <div className='library-header row-align'>
              <Icon iconType='LibraryActive' />
              <p>Your Library</p>
              {/* <Icon iconType='PlusActive'/> */}
            </div>
            <div className='library-content'>
              {/* Subcomponents in here */}
            </div>
          </div>
        </div>

        <div className='user-home-mainbody'>
          <div className='user-home-userbar'>{/* user-home-userbar */}
            <div className='userbar-arrow-nav'>
              <Icon iconType='LeftArrow' />
              <LeftArrowActive />
              <RightArrowActive />
            </div>

            <div className='userbar-profile-container'>
              <ProfileIcon />
            </div>

          </div>
          <div className='user-home-content'>

            <Switch>
              <Route path="/home">
                <HomePage />
              </Route>
              <Route path="/album">
                <ShowPage />
              </Route>
            </Switch>

            {/* Album Show Page Will Go Here */}
          </div>
        </div>
        <PlayBar currentSong='https://motify-seeds.s3.us-east-2.amazonaws.com/audio/kendrick-lamar-money-trees.m4a' />
      </body>
    </>
  );
}

export default UserHomePage;
