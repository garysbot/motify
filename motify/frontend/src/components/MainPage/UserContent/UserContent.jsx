import '../MainPage.css'
import ContentCard from '../ContentCard/ContentCard.jsx';
import ShowAlbumPage from '../../ShowPages/ShowAlbumPage.jsx';
import ShowArtistPage from '../../ShowPages/ShowArtistPage.jsx';
import { useParams, Route } from 'react-router-dom';

const UserContent = () => {
  const { albumId, artistId } = useParams();
  
  return (
    <>
      <div className='user-home-content'>
        <Route
          path="/albums/:albumId" 
          component={ShowAlbumPage}
          albumId={albumId}
        />
        <Route
          path="/artists/:artistId" 
          component={ShowArtistPage}
          artistId={artistId}
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
            </>
          }
        />
        <Route
          exact
          path="/artists"
          render={() => <ContentCard contentType='artists' />}
        />
        <Route
          exact
          path="/albums"
          render={() => <ContentCard contentType='albums' />}
        />
        <Route
          exact
          path="/songs"
          render={() => <ContentCard contentType='songs' />}
        />
      </div>
    </>
  );
}

export default UserContent;