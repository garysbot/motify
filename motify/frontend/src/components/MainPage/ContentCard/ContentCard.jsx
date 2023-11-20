import './ContentCard.css'
import Cover1 from '../../../static/albums/covers/cover-midjourney-1.png'
import { useAlbums } from './Hooks/useAlbums.jsx'
import { useSongs } from './Hooks/useSongs.jsx'
import { useArtists } from './Hooks/useArtists.jsx'
import { useAlbum } from './Hooks/useAlbum.jsx'

const Cards = ({ contentType }) => {

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
          Object.values(albums).map((album)=> 
            (
              <div className='vertical-content-card' key={album.id}>
                <img src={album.coverImg} alt='' className='vertical-cover'/>
                <p className='vertical-title'>{album.title}</p>
                <p className='vertical-artist'>{album.artistName}</p>
              </div>
            ))
        )
        
      case 'songs':
        contentTitle = 'Songs'
        return (
        Object.values(songs).map((song) => 
          (
            <div className='vertical-content-card' key={song.id}>
              <img src={Cover1} alt='' className='vertical-cover'/>
              <p className='vertical-title'>{song.title}</p>
              <p className='vertical-artist'>{song.artistName}</p>
            </div>
          ))
        )

      case 'artists':
        contentTitle = 'Artists'
        return (
          Object.values(artists).map((artist) => 
            (
              <div className='vertical-content-card' key={artist.id}>
                <img src={artist.aboutImg} alt='' className='vertical-cover'/>
                <p className='vertical-title'>{artist.artistName}</p>
                <p className='vertical-artist'>Artist</p>
              </div>
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