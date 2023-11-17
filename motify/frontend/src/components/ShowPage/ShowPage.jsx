import './ShowPage.css'
import { useAlbum } from './ShowHooks/useAlbum';
import { ReactSVG } from 'react-svg';
import kendrickAlbumCover from '../../static/albums/covers/kendrick.png'
import likeButton from '../../static/playbar/show/show-play-bar-like-button.svg'
import playButton from '../../static/playbar/show/show-play-bar-play-button.svg';
import menuDots from '../../static/playbar/show/show-play-bar-dotmenu-button.svg'
import lilLikeButton from '../../static/playbar/show/show-songs-table-like-button.svg'


const ShowPage = () => {
  const album = useAlbum(129)

  if (!album) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className='show-banner'>
        {/* Add BG to this Div? */}
        <img src={kendrickAlbumCover} className='album-cover-img'></img>
        <div className='banner-details'>
          <p>Album</p>
          <h1>{album.title}</h1>
          <p className='details-artist'>
            {album.artistName} ◦ 
            {album.releaseDate} ◦ 
            {`${Object.values(album.songs).length} songs, 1 hr 18 min`}
          </p>
        </div>
      </div>

      <div className='show-play-bar'>
        
        <div className='show-play-button-container'>
          <ReactSVG src={playButton} className='svg-image play-svg'/>
          <svg className='svg-image circle-svg' width="60" height="60">
            <circle cx="30" cy="30" r="30" fill="#1DB954" />
          </svg>
        </div>

        <ReactSVG src={likeButton}/>
        <ReactSVG src={menuDots}/>
      </div>
      
      <div className='show-content'>
        <div className='show-songs-header'>
          {/* Album/Playlist Table Header */}
          <p className='header-text'>#</p>
          <p className='header-text'>Title</p>
          {/* Time Button */}
        </div>
      
        <div className='show-songs-table'>
          {
            album.songs.map((song, trackNum) => 
              <>
                <div className='show-songs-row-container'>
                  <div className='row-start'>
                    <div className='track-num'>
                      <p>{trackNum}</p>
                    </div>
                    <div className='song-title-artist-container'>
                      <p className='song-title'>
                        {song.title}
                      </p>
                      {/* Explicit */}
                      <p className='song-title-artist-name'>
                        {album.artistName}  
                      </p>
                    </div>
                  </div>
                  
                  <div className='row-end'>
                    <div className='like-button-duration'>
                      <ReactSVG src={lilLikeButton} className='lil-like-button'/>
                      <p>{song.duration}</p>
                    </div>
                  </div>

                </div>
              </>
            )
          }


        </div>
      </div>
    </>
  );
}

export default ShowPage;