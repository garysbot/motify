import { Link, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { addSongAndUpdateCoverThunk } from '../../../store/playlistSlice'

const ArtistResultPage = ({ songs }) => {
  const { playlistId } = useParams();
  const dispatch = useDispatch();

  const handleClick = (song) => {
    console.log(`Trying to get to the song's album cover image ${song.coverImg}`)
    dispatch(addSongAndUpdateCoverThunk(playlistId, song))
  };
  

  return (
    <>
      {/* // & Artist Results Displayed When Expanded */}
      {songs.map((song, index) => (
        <div className='result-row' id={song.id}>
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
            <button onClick={() => handleClick(song)}>Add</button>
            {/* ! Need a handler to add to the playlist here */}
          </div>
        </div>
      ))}
    </>
  );
}

export default ArtistResultPage;