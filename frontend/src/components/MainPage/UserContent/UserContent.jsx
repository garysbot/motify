import '../MainPage.css'
import ContentCard from '../ContentCard/ContentCard.jsx';
import ShowAlbumPage from '../../ShowPages/ShowAlbumPage.jsx';
import ShowArtistPage from '../../ShowPages/ShowArtistPage.jsx';
import PlaylistCreate from '../Playlist/PlaylistCreate.jsx';
import { useParams, Route } from 'react-router-dom';
import ShowPlaylistPage from '../../ShowPages/ShowPlaylistPage.jsx';

const UserContent = () => {
  const { albumId, artistId, playlistId } = useParams();
  
  return (
    <>
      <div className='user-home-content'>
        <Route
          path="/create"
          component={PlaylistCreate}
        />
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
          path="/playlists/:playlistId" 
          component={ShowPlaylistPage}
          playlistId={playlistId}
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
      </div>
    </>
  );
}

export default UserContent;