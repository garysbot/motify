import '../MainPage.css'
import ContentCard from '../ContentCard/ContentCard.jsx';
import ShowAlbumPage from '../../ShowPages/ShowAlbumPage.jsx';
import { useParams, Route } from 'react-router-dom';

const UserContent = () => {
  const { albumId } = useParams();
  
  return (
    <>
      <div className='user-home-content'>
        <Route
          path="/albums/:albumId" 
          component={ShowAlbumPage}
          albumId={albumId}
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