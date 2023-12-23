import './ShowPage.css'

const ShowBanner = ({ currentAlbum, currentArtist }) => {

  return (
    <>
      <div className='show-banner'>
        <img src={currentAlbum.coverImg} alt='' className='album-cover-img'></img>
        <div className='banner-details'>
          <p>Album</p>
          <h1 key={currentAlbum.id}>{currentAlbum.title}</h1>
          <div className='details-artist'>
            <div className='details-artist-mini-pic'>
              <img src={currentArtist.aboutImg} alt=''></img>
            </div>
            {currentAlbum.artistName}
            <span className='dot'>•</span>
            {currentAlbum.releaseDate}
            <span className='dot'>•</span>
            {`${Object.values(currentAlbum.songs).length} songs, 1 hr 18 min`}
          </div>
        </div>
      </div>
    </>
  )
}

export default ShowBanner