import { useDispatch, useSelector } from 'react-redux';
import './ShowPage.css'
import { fetchArtist } from '../../store/artistSlice';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ShowArtistPage = () => {
  const { artistId } = useParams()
  const dispatch = useDispatch()
  const artist = useSelector((state) => state.artists[artistId])

  useEffect(() => {
    dispatch(fetchArtist(artistId))
  })

  const allAlbumsState = useSelector((state) => state.albums)
  const allAlbums = Object.values(allAlbumsState)
  const albumsByArtist = allAlbums.filter((album) => album.artistId === artistId)

  // if (albumsByArtist.length === 0) {
  //   return <div>No albums found for this artist</div>
  // }

  // ! debugging
  const handleClick = () => {
    console.log(`hello world? ${allAlbums[0].recordCompany} ${artistId}`)
  }

  // ! ----------------------------------

  return (
    <>
      <div className='show-banner'>
        <div className='banner-details'>
          <p>Artist</p>
          <h1 onClick={handleClick}>{artist.artistName}</h1>
        </div>

        <div>
          {
            albumsByArtist?.map((album) => 
                <h1>WTF</h1>
            )
          }
        </div>
      </div>
    </>
  );
}

export default ShowArtistPage;