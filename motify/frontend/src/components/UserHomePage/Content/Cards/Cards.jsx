import './Cards.css'
import Cover1 from '../../../../static/albums/covers/cover-midjourney-1.png'
import { useAlbums } from '../useAlbums'

const Cards = () => {

  const albums = useAlbums();

  // If albums is not yet defined (e.g., before data fetching completes), handle it appropriately
  if (!albums) {
    return <div>Loading...</div>; // or some other loading state
  }


  return (
    <>
      <h2>Albums</h2>
        {/* Max - 3x per row; 2x rows */}
        {/* Min - 2x per row; 3x rows */}
      <div className='content-cards'>
        <div className='content-cards-container'>
          {
            Object.values(albums).map((album)=> (
              <div className='vertical-content-card' key={album.id}>
                <img src={Cover1} alt='' className='vertical-cover'/>
                <p className='vertical-title'>{album.title}</p>
                <p className='vertical-artist'>{album.artistName}</p>
              </div>
            ))
          }
        </div>
      </div>
    </>
  );
}

export default Cards;