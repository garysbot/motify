import { useDispatch, useSelector } from 'react-redux';
import './ShowPage.css'
import { fetchArtist } from '../../store/artistSlice';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ShowArtistPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const allArtists = useSelector((state) => state.artists?.artist)
  // const artists = Object.values(allArtists)

  useEffect(() => {
    dispatch(fetchArtist(id))
  })

  // const renderArtist = () => {
  //   const artist = artists.forEach((artist) => {
  //     if (artist.id === id) {
  //       return artist
  //     } else {
  //       console.log('artist not found')
  //     }
  //   })

  //   if (!artist) {
  //     return <div>Loading...</div>;
  //   }
    
  //   return (
  //     <>
  //       <h3>{artist.artistName}</h3>
  //     </>
  //   )
  // }

  // ! debugging
  const handleClick = () => {
    // console.log(`hello world? ${artist}`)
  }
  
  // ! ----------------------------------

  return (
    <>
      <div className='show-banner'>
        <div
          className='banner-details'
        >
          {/* {renderArtist()} */}
          <p>Artist</p>
          <h1
            onClick={handleClick}
          >hey?</h1>
          <h1 key={id}>{ }</h1>
        </div>
      </div>
    </>
  );
}

export default ShowArtistPage;