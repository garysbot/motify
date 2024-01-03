import './ShowPage.css'

const ShowBanner = ({ 
  currentAlbum = {}, 
  currentArtist = {}, 
  currentPlaylist = {}
}) => {  

  // Format the dateString
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  // Format the playlist length
  function formatLength(currentSongs) {
    let totalLength = 0;
    currentSongs.map((song) => totalLength += song.duration)
    
    let mins = Math.floor(totalLength / 60)

    if (mins < 60) {
      return `${mins} mins`
    }

    if (mins >= 60) {
      let hours = Math.floor(mins / 60)
      mins -= 60
      return `${hours} hr, ${mins} mins`
    }

  }
  
  return (
    <>
      <div className='show-banner'>
        {currentAlbum.coverImg && (
          <img src={currentAlbum.coverImg} alt='' className='album-cover-img'></img>
        )}

        <div className='banner-details'>
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
                {formatDate(currentAlbum.releaseDate)}
                <span className='dot'>•</span>
                {`${Object.values(currentAlbum.songs).length} songs`}
                <span className='dot'>•</span>
                {formatLength(currentAlbum.songs)}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default ShowBanner