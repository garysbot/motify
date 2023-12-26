import { useDispatch, useSelector } from 'react-redux';
import './ShowPage.css'
import '../MainPage/ContentCard/ContentCard.css'
import { fetchArtist } from '../../store/artistSlice';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const ShowArtistPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { artistId } = useParams()
  const dispatch = useDispatch()
  const artist = useSelector((state) => state.artists[artistId])
  const albums = Object.values(useSelector((state) => state.albums))
  
  useEffect(() => {
    const fetchArtistData = async () => {
      if (artistId) {
        setIsLoading(true)
        dispatch(fetchArtist(artistId))
        setIsLoading(false)
      }
    }
    fetchArtistData()
  }, [dispatch, artistId])
  
  const ArtistAlbums = () => {
    return albums
      .filter((album) => album.artistName === artist.artistName)
      .map((album) => (
        <Link to={`/albums/${album.id}`}>
          <div className='vertical-content-card'  key={album.id}>
            <img src={album.coverImg} alt='' className='vertical-cover'></img>
            <p className='vertical-title'>{album.title}</p>
            <p className='vertical-artist'>{artist.artistName}</p>
          </div>
        </Link>
      ));
  }

  if (isLoading || !artistId) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div 
        className='show-banner'
        // style={{'background-color':'red'}}
      >
        <div className='banner-details banner-artist-name'>
          <p>Artist</p>
          <h1>{artist?.artistName}</h1>
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