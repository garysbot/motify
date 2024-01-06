import { useDispatch, useSelector } from 'react-redux';
import './ShowPage.css'
import '../MainPage/ContentCard/ContentCard.css'
import { fetchArtist } from '../../store/artistSlice';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const ShowArtistPage = () => {
  const { artistId } = useParams()
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch()
  const artist = useSelector((state) => state.artists[artistId])
  const albums = useSelector((state) => state.artists[artistId]?.albums)
  // const albums = Object.values(useSelector((state) => state.albums))
  // const albums = artist.albums
  
  useEffect(() => {
    if (artistId && !artist) {
      setIsLoading(true);
      dispatch(fetchArtist(artistId))
        .then(() => setIsLoading(false))
        .catch((error) => {
          console.error("Failed to fetch artist:", error);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [dispatch, artistId, artist])
  
  const ArtistAlbums = () => {
    return albums
      // .filter((album) => album.artistName === artist?.artistName)
      .map((album) => (
        <div className='vertical-content-card'  key={album.id}>
            <Link to={`/albums/${album.id}`}>
              <img src={album.cover_img} alt='' className='vertical-cover'></img>
              <p className='vertical-title'>{album.title}</p>
            </Link>
            <p className='vertical-artist'>{artist?.artistName}</p>
          </div>
      ));
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!artist) {
    return <div>Artist not found.</div>;
  }

  return (
    <>
      <div className='show-banner'>
        <div className='banner-details banner-artist-name'>
          <p>Artist</p>
          <h1>{artist.artistName}</h1>
        </div>
      </div>
      <div className='content-cards'>
        <div className='content-cards-container'>
          <ArtistAlbums/>
        </div>
      </div>
    </>
  );
}

export default ShowArtistPage;
