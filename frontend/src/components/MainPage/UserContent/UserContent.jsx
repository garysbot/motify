import '../MainPage.css'
import ContentCard from '../ContentCard/ContentCard.jsx';
import ShowAlbumPage from '../../ShowPages/ShowAlbumPage.jsx';
import ShowArtistPage from '../../ShowPages/ShowArtistPage.jsx';
import PlaylistCreate from '../Playlist/PlaylistCreate.jsx';
import { useParams, Route } from 'react-router-dom';
import ShowPlaylistPage from '../../ShowPages/ShowPlaylistPage.jsx';
import ProfileMenu from '../Userbar/ProfileMenu/ProfileMenu.jsx';
import { ReactComponent as LeftArrowActive } from '../../../static/icons/left-arrow-active.svg'
import { ReactComponent as RightArrowActive } from '../../../static/icons/right-arrow-active.svg'

const UserContent = () => {
  const { albumId, artistId, playlistId } = useParams();
  
  return (
    <>
      <div className='user-home-userbar'>
        <div className='userbar-arrow-nav'>
          <LeftArrowActive />
          <RightArrowActive />
        </div>

        <div className='userbar-profile-container'>
          <ProfileMenu />
        </div>

      </div>
      <div className='user-home-content'>
        <Route
          path="/create"
          component={PlaylistCreate}
        />
        <Route
          path="/albums/:albumId" 
          component={ShowAlbumPage}
          // albumId={albumId}
        />
        <Route
          path="/artists/:artistId" 
          component={ShowArtistPage}
          // artistId={artistId}
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