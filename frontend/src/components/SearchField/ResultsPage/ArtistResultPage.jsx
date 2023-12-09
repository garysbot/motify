import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { addSongToDraftPlaylist, createPlaylistAsync, updatePlaylistAsync } from '../../../store/playlists';

const ArtistResultPage = ({ songs }) => {
  const dispatch = useDispatch();
  const currentUserId = useSelector(state => state.session.user.id)
  const draftPlaylist = useSelector(state => state.playlist.draftPlaylist)

  const handleClick = (song) => {
    const shouldCreateNewPlaylist = draftPlaylist.songs.length === 0;
  
    // Dispatch addSongToDraftPlaylist action
    dispatch(addSongToDraftPlaylist({
      userId: currentUserId,
      song: song,
      title: 'Your Playlist Title' // Replace with actual title
    }));
  
    if (shouldCreateNewPlaylist) {
      // If there were no songs, create the playlist
      dispatch(createPlaylistAsync({
        userId: currentUserId,
        title: 'Your Playlist Title', // Replace with actual title
        songs: [song]
      }));
    } else {
      // If there are already songs, update the current playlist
      dispatch(updatePlaylistAsync({
        id: draftPlaylist.id,
        userId: currentUserId,
        title: draftPlaylist.title,
        songs: [...draftPlaylist.songs, song]
      }));
    }
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