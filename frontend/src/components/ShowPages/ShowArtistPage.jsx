import { useDispatch, useSelector } from 'react-redux';
import './ShowPage.css'
import { fetchArtist } from '../../store/artistSlice';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ShowArtistPage = () => {
  const dispatch = useDispatch()
  const allArtists = useSelector((state) => state.artists)
  const artists = Object.values(allArtists)
  const artist = artists.filter((artist) => artist.id === artistId)

  const { artistId } = useParams()

  useEffect(() => {
    dispatch(fetchArtist(artistId))
  })

  // Check if artist data is available before rendering
  if (!artist) {
    return <div>Loading...</div>;
  }

  const handleClick = () => {
    console.log(`hello world? ${artists}`)
  }


  return (
    <>
      <div className='show-banner'>
        <div
          className='banner-details'
        >
          <h3>{artist.artistName}</h3>
          <p>Artist</p>
          <h1
            onClick={handleClick}
          >hey?</h1>
          <h1 key={artistId}>{ }</h1>
        </div>
      </div>
    </>
  );
}

export default ShowArtistPage;