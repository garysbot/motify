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
  const artistAlbums = albums.filter((album) => album.artistName === artist.artistName)
  
  
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
        <div className='content-cards' key={album.id}> {/* Ensure each child in a list has a unique key prop */}
          <div className='content-cards-container'>
            <div className='vertical-content-card'>
              <p className='vertical-title'><Link to={`/albums/${album.id}`}>{album.title}</Link></p>
              <p className='vertical-artist'>{artist.artistName}</p>
            </div>
          </div>
        </div>
      ));
  }

  if (isLoading || !artistId) {
    return <div>Loading...</div>;
  }

  

  // if (albumsByArtist.length === 0) {
  //   return <div>No albums found for this artist</div>
  // }

  // ! debugging
  const handleClick = () => {
    console.log(`hello world? ${artistId}`)
  }

  // ! ----------------------------------

  return (
    <>
      <div 
        className='show-banner'
        style={{'background-color':'red'}}
      >
        <div className='banner-details banner-artist-name'>
          <p>Artist</p>
          <h1 onClick={handleClick}>{artist?.artistName}</h1>
        </div>
      </div>

      <ArtistAlbums/>

    </>
  );
}

export default ShowArtistPage;