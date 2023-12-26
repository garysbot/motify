import { useDispatch, useSelector } from 'react-redux';
import './ShowPage.css'
import { fetchArtist } from '../../store/artistSlice';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ShowArtistPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { artistId } = useParams()
  const dispatch = useDispatch()
  const artist = useSelector((state) => state.artists[artistId])
  const albums = Object.values(useSelector((state) => state.albums))
  const artistAlbums = albums.filter((album) => album.artistName === artist.artistName)
  
  
  useEffect(() => {
    const fetchArtistData = async () => {
      setIsLoading(true)
      dispatch(fetchArtist(artistId))
          setIsLoading(false)
      // if (artistId) {
      // }
      
    }
    fetchArtistData()
  }, [dispatch, artistId])
  
  const ArtistAlbums = () => {
    return albums
      .filter((album) => album.artistName === artist.artistName)
      .map((album) => (
        <div key={album.id}> {/* Ensure each child in a list has a unique key prop */}
          <p>{album.title}</p>
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
      <div className='show-banner'>
        <div className='banner-details banner-artist-name'>
          <p>Artist</p>
          <h1 onClick={handleClick}>{artist?.artistName}</h1>
        </div>
      </div>

      <ArtistAlbums/>

      <div className='show-content'>
        <div className='show-songs-header'>
          <p className='header-text'>#</p>
          <p className='header-text'>Title</p>
        </div>
      </div>

    </>
  );
}

export default ShowArtistPage;