import '../MainPage.css'
import ContentCard from '../ContentCard/ContentCard.jsx';
import ShowAlbumPage from '../../ShowPages/ShowAlbumPage.jsx';
import ShowArtistPage from '../../ShowPages/ShowArtistPage.jsx';
import ShowPlaylistPage from '../../ShowPages/ShowPlaylistPage.jsx';
import { Route, useHistory, Switch } from 'react-router-dom';
import ProfileMenu from '../Userbar/ProfileMenu/ProfileMenu.jsx';
import { ReactComponent as LeftArrowActive } from '../../../static/icons/left-arrow-active.svg'
import { ReactComponent as RightArrowActive } from '../../../static/icons/right-arrow-active.svg'

const UserContent = () => {
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
      <div className='user-home-userbar'>
        <div className='userbar-arrow-nav'>
          <div>
            <LeftArrowActive 
              onClick={handleBack}
              style={{'cursor':'pointer'}}
            />
          </div>
          <div>
            <RightArrowActive 
              onClick={handleForward}
              style={{'cursor':'pointer'}}
            />
          </div>
        </div>

        <div className='userbar-profile-container'>
          <ProfileMenu />
        </div>

      </div>
      <div className='user-home-content'>
        <Switch>
          <Route
            path="/albums/:albumId" 
            component={ShowAlbumPage}
          />
          <Route
            path="/artists/:artistId" 
            component={ShowArtistPage}
          />
          <Route
            path="/playlists/:playlistId" 
            component={ShowPlaylistPage}
          />
          <Route
            exact
            path="/"
            render={
              () => 
              <>
                <ContentCard contentType='artists'/>
                <ContentCard contentType='albums'/>
                <ContentCard contentType='songs'/>
                <ContentCard contentType='playlists'/>
              </>
            }
          />
        </Switch>
      </div>
    </>
  );
}

export default UserContent;