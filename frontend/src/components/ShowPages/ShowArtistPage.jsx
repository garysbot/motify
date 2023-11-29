import { useLocation } from 'react-router-dom';
import './ShowPage.css'

const ShowArtistPage = ({ artistId }) => {
  const location = useLocation();
  const artist = location.state ? location.state.data : null;

  // Check if artist data is available before rendering
  if (!artist) {
    return <div>Loading...</div>;
  }


  return (
    <>
      <div className='show-banner'>
        <div className='banner-details'>
          <h3>{artist.artistName}</h3>
          <p>Artist</p>
          <h1 key={artistId}>{}</h1>
        </div>
      </div>
    </>
  );
}

export default ShowArtistPage;