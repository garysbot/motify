import { useSelector } from 'react-redux';
import './ShowPage.css'

const ShowArtistPage = ({ artistId }) => {
  // const allArtists = useSelector((state) => state.artists)
  // const artists = Object.values(allArtists)
  // const artist = artists.filter((artist) => artist.id === artistId)

  const artist = {
    test: 1
  }
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