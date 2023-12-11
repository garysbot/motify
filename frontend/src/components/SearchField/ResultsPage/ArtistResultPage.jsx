import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { addSong, updatePlaylistAsync } from '../../../store/playlistSlice'

const ArtistResultPage = ({ songs }) => {
  const dispatch = useDispatch();
  // const currentUserId = useSelector(state => state.session.user.id)
  // const draftPlaylist = useSelector(state => state.playlist.draftPlaylist)
  const playlist = useSelector(state => state.playlist)
  const playlistId = playlist.id
  const playlistTitle = useSelector(state => state.playlist.title)

  const handleClick = (song) => {
    dispatch(updatePlaylistAsync({ id: playlistId, song, title: playlistTitle }))
  };
  

  return (
    <>
    {/* {console.log(currentUserId)} */}
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
            <button onClick={() => handleClick(song)}>Add</button>
            {/* ! Need a handler to add to the playlist here */}
          </div>
        </div>
      ))}
    </>
  );
}

export default ArtistResultPage;