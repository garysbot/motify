import './ShowPage.css'

const ShowBanner = ({ 
  currentAlbum = {}, 
  currentArtist = {}, 
  currentPlaylist = {}
}) => {  
  return (
    <>
      <div className='show-banner'>
        {currentPlaylist.title && (
          <>
            {/* // TODO Playlist Image Needed */}
          </>
        )}

        {currentAlbum.coverImg && (
          <img src={currentAlbum.coverImg} alt='' className='album-cover-img'></img>
        )}

        <div className='banner-details'>
          {currentPlaylist.title && (
            <>
              <p>Playlist</p>
              <h1 key={currentPlaylist.id}>{currentPlaylist.title}</h1>
            </>
          )}
          {currentAlbum.coverImg && (
            <>
              <p>Album</p>
              <h1 key={currentAlbum.id}>{currentAlbum.title}</h1>
            </>
          )}
          <div className='details-artist'>
            {currentAlbum.coverImg && (
              <>
                <div className='details-artist-mini-pic'>
                  <img src={currentArtist.aboutImg} alt=''></img>
                </div>
                {currentAlbum.artistName}
                <span className='dot'>•</span>
                {currentAlbum.releaseDate}
                <span className='dot'>•</span>
                {`${Object.values(currentAlbum.songs).length} songs, 1 hr 18 min`}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default ShowBanner