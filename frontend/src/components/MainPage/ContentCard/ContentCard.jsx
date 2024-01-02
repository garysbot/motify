// Styling
import './ContentCard.css'
import Cover1 from '../../../static/albums/covers/cover-midjourney-1.png'

// Redux State
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { fetchAlbums } from '../../../store/albumSlice.js'
import { fetchSongs } from '../../../store/songSlice.js'
import { fetchArtists } from '../../../store/artistSlice.js'
import { fetchPlaylists } from '../../../store/playlistSlice.js'

const Cards = ({ contentType }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user)
  const albums = useSelector((state) => state.albums)
  const songs = useSelector((state) => state.songs)
  const artists = useSelector((state) => state.artists)
  const playlists = useSelector((state) => state.playlists)

  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Check if data is already present in the Redux store
    const shouldFetchAlbums = Object.keys(albums).length === 0;
    const shouldFetchSongs = Object.keys(songs).length === 0;
    const shouldFetchArtists = Object.keys(artists).length === 0;
    const shouldFetchPlaylists = Object.keys(playlists).length === 0;
  
    if (!isLoaded) {
      if (shouldFetchAlbums) {
        dispatch(fetchAlbums());
      }
      if (shouldFetchSongs) {
        dispatch(fetchSongs());
      }
      if (shouldFetchArtists) {
        dispatch(fetchArtists());
      }
      if (shouldFetchPlaylists) {
        dispatch(fetchPlaylists());
      }
      setIsLoaded(true);
    }
  }, [dispatch, isLoaded, albums, songs, artists, playlists]);

  // & Hooks that fetch from Rails backend
  // If albums is not yet defined (e.g., before data fetching completes), handle it appropriately
  // Loading states
  if (!albums || !songs || !artists) {
    return <div>Loading...</div>;
  }

  let contentTitle;
  switch (contentType) {
    case 'albums':
      contentTitle = 'Albums';
      break;
    case 'songs':
      contentTitle = 'Songs';
      break;
    case 'artists':
      contentTitle = 'Artists';
      break;
    case 'playlists':
      contentTitle = 'Playlists';
    default:
      contentTitle = 'Your Music';
      break;
  }



  const renderCards = () => {
    switch (contentType) {
      case 'albums':
        contentTitle = 'Albums'
        return (
          Object.values(albums).map((album, idx) =>
          (
            <Link to={`/albums/${album.id}`} key={idx}>
              <div className='vertical-content-card' key={album.id}>
                <img src={album.coverImg} alt='' className='vertical-cover' />
                <p className='vertical-title'>{album.title}</p>
                <p className='vertical-artist'>{album.artistName}</p>
              </div>
            </Link>
          ))
        )

      case 'songs':
        contentTitle = 'Songs'
        return (
          Object.values(songs).map((song, idx) =>
          (
            <Link to={`/songs/${song.id}`} key={idx}>
              <div className='vertical-content-card' key={idx}>
                <img src={Cover1} alt='' className='vertical-cover' />
                <p className='vertical-title'>{song.title}</p>
                <p className='vertical-artist'>{song.artistName}</p>
              </div>
            </Link>
          ))
        )

      case 'artists':
        contentTitle = 'Artists'
        return (
          Object.values(artists).map((artist, idx) =>
          (
            <Link to={`/artists/${artist.id}`}>
              <div className='vertical-content-card' key={idx}>
                <img src={artist.aboutImg} alt='' className='vertical-cover' />
                <p className='vertical-title'>{artist.artistName}</p>
                <p className='vertical-artist'>Artist</p>
              </div>
            </Link>
          ))
        )

      case 'playlists':
        contentTitle = 'Playlists'
        return (
          Object.values(playlists).map((playlist, idx) => (
              <Link to={`/playlists/${playlist.id}`}>
              <div className='vertical-content-card' key={idx}>
                <p className='vertical-title'>{playlist.title}</p>
                {/* <img src={artist.aboutImg} alt='' className='vertical-cover' /> */}
                <p className='vertical-artist'>{currentUser?.username}</p>
              </div>
            </Link>
            ))
        )

      default:
        contentTitle = 'Your Music'
        break;
    }
  }

  return (
    <>
      <h2 className='cards-content-title'>{contentTitle}</h2>
      {/* Max - 3x per row; 2x rows */}
      {/* Min - 2x per row; 3x rows */}
      <div className='content-cards'>
        <div className='content-cards-container'>
          {renderCards()}
        </div>
      </div>
    </>
  );
}

export default Cards;