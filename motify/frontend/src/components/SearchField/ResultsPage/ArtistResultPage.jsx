import { Link } from 'react-router-dom'

const ArtistResultPage = ({ songs }) => {
  return (
    <>
      {songs.map((song, index) => (
        <div className='result-row'>
          <div className='result-detail'>
            <img src={song.coverImg} alt='' className='result-album-img' />
            <div className='result-album'>
              <p>{song.title}</p>
              <Link to={`/artists/${song.artistId}`}><p>{song.artistName}</p></Link>
            </div>
          </div>
          <div className='result-album'>
            <Link to={`/albums/${song.albumId}`}><p>{song.albumTitle}</p></Link>
          </div>
          <div className='result-link'>
            <button>Add</button>
            {/* ! Need a handler to add to the playlist here */}
          </div>
        </div>
      ))}
    </>
  );
}

export default ArtistResultPage;