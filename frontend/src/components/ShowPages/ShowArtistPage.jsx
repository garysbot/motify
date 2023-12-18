import { useDispatch, useSelector } from 'react-redux';
import './ShowPage.css'
import { fetchArtist } from '../../store/artistSlice';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAlbumsByArtist } from './CustomShowHooks';

const ShowArtistPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { artistId } = useParams()
  const dispatch = useDispatch()
  const artist = useSelector((state) => state.artists[artistId])
  const allAlbumsState = useSelector((state) => state.albums)
  const allAlbums = Object.values(allAlbumsState)
  const albumsByArtist = allAlbums.filter((album) => album.artistId === artistId)

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
  const albums = useAlbumsByArtist(artistId)

  if (isLoading || !artistId) {
    return <div>Loading...</div>;
  }

  

  // if (albumsByArtist.length === 0) {
  //   return <div>No albums found for this artist</div>
  // }

  // ! debugging
  const handleClick = () => {
    console.log(`hello world? ${albums} ${artistId}`)
  }

  // ! ----------------------------------

  return (
    <>
      <div className='show-banner'>
        <div className='banner-details'>
          <p>Artist</p>
          <h1 onClick={handleClick}>{artist?.artistName}</h1>
        </div>

        <div>
          {
            albums?.map((album, idx) => 
                <h1 key={idx}>{album.albumId}</h1>
            )
          }
        </div>
      </div>
    </>
  );
}

export default ShowArtistPage;