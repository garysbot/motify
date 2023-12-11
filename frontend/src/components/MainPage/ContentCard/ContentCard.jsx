// Styling
import './ContentCard.css'
import Cover1 from '../../../static/albums/covers/cover-midjourney-1.png'

// Temporary Custom React Hooks
import { useAlbums } from './Hooks/useAlbums.jsx'
import { useSongs } from './Hooks/useSongs.jsx'
import { useArtists } from './Hooks/useArtists.jsx'
import { useAlbum } from './Hooks/useAlbum.jsx'

// Redux State
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { receiveAlbums, receiveSongs } from '../../../store/audioActions.js'
import { fetchAlbums, fetchSongs } from '../../../store/audioThunks.js'
import { Link } from 'react-router-dom'

const Cards = ({ contentType }) => {
  const dispatch = useDispatch();

  const albums = useAlbums();
  const songs = useSongs();
  const artists = useArtists();
  const album = useAlbum(1);

  
  // If albums is not yet defined (e.g., before data fetching completes), handle it appropriately
  // Loading states
  if (!albums || !songs || !artists) {
    return <div>Loading...</div>;
  }

  let contentTitle;
  switch (contentType) {
    case 'albums':
      contentTitle = 'Albums';
      break;
    case 'songs':
      contentTitle = 'Songs';
      break;
    case 'artists':
      contentTitle = 'Artists';
      break;
    default:
      contentTitle = 'Your Music';
      break;
  }

  

  const renderCards = () => {
    switch (contentType) {
      case 'albums':
        contentTitle = 'Albums'
        return (
          Object.values(albums).map((album, idx)=> 
            (
              <Link to={`/albums/${album.id}`} key={idx}>
                <div className='vertical-content-card' key={album.id}>
                  <img src={album.coverImg} alt='' className='vertical-cover'/>
                  <p className='vertical-title'>{album.title}</p>
                  <p className='vertical-artist'>{album.artistName}</p>
                </div>
              </Link>
            ))
        )
        
      case 'songs':
        contentTitle = 'Songs'
        return (
        Object.values(songs).map((song, idx) => 
          (
            <div className='vertical-content-card' key={idx}>
              <img src={Cover1} alt='' className='vertical-cover'/>
              <p className='vertical-title'>{song.title}</p>
              <p className='vertical-artist'>{song.artistName}</p>
            </div>
          ))
        )

      case 'artists':
        contentTitle = 'Artists'
        return (
          Object.values(artists).map((artist, idx) => 
            (
              <Link to={{
                pathname: `/artists/${artist.id}`,
                state: { data: artist }
                }}>
                <div className='vertical-content-card' key={idx}>
                  <img src={artist.aboutImg} alt='' className='vertical-cover'/>
                  <p className='vertical-title'>{artist.artistName}</p>
                  <p className='vertical-artist'>Artist</p>
                </div>
              </Link>
            ))
          )
      default:
        contentTitle = 'Your Music'
        break;
    }
  }

  return (
    <>
      <h2 className='cards-content-title'>{contentTitle}</h2>
        {/* Max - 3x per row; 2x rows */}
        {/* Min - 2x per row; 3x rows */}
      <div className='content-cards'>
        <div className='content-cards-container'>
          {renderCards()}
        </div>
      </div>
    </>
  );
}

export default Cards;