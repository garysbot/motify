import '../MainPage.css'
import ContentCard from '../ContentCard/ContentCard.jsx';
import ShowAlbumPage from '../../ShowPages/ShowAlbumPage.jsx';
import ShowArtistPage from '../../ShowPages/ShowArtistPage.jsx';
import ShowPlaylistPage from '../../ShowPages/ShowPlaylistPage.jsx';
import { Route, useHistory, Switch } from 'react-router-dom';

const UserContent = () => {


  return (
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
              <ContentCard contentType='artists' />
              <ContentCard contentType='albums' />
              <ContentCard contentType='songs' />
              <ContentCard contentType='playlists' />
            </>
        }
      />
    </Switch>
  );
}

export default UserContent;