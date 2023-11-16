import './Cards.css'
import Cover1 from '../../../../static/albums/covers/cover-midjourney-1.png'
import { useAlbums } from '../useAlbums'

const Cards = () => {

  const albums = useAlbums();

  return (
    <>
      <div className='content-cards-container'>
        {/* // TODO Dynamic H2 */}
        {
          // albums.map(album => 
          //   <>
          //     <div className="vertical-content-card">
          //       {/* On Hover Play/Pause Button */}
          //       {/* Boolean -> True = show play anim / False = do not show */}
          //       <img src={album.cover_img} alt={album.title} className='vertical-cover'/>
          //         <div className='vertical-text'>
          //           <p className='vertical-title'>{album.title}</p>
          //           <p className='vertical-artist'>{album.artist.artist_name}</p>
          //         </div>
          //     </div>    
          //   </>
          // )
        }
        <h2>Albums</h2>
        <div className='content-cards'>
          {/* Max - 3x per row; 2x rows */}
          {/* Min - 2x per row; 3x rows */}
          <div className="vertical-content-card">
            {/* On Hover Play/Pause Button */}
            {/* Boolean -> True = show play anim / False = do not show */}
            <img src={Cover1} alt='' className='vertical-cover'/>
              <div className='vertical-text'>
                <p className='vertical-title'>Album Title Here</p>
                <p className='vertical-artist'>Artist Name Here</p>
              </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cards;