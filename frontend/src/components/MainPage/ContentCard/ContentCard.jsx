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
import SongCards from './SongCards.jsx'

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
      break;
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
            <div className='vertical-content-card' key={album.id}>
                <Link to={`/albums/${album.id}`} key={idx}>
                  <img src={album.coverImg} alt='' className='vertical-cover' />
                </Link>
                <Link to={`/albums/${album.id}`} key={idx}>
                  <p className='vertical-title'>{album.title}</p>
                </Link>
                <p className='vertical-artist'>{album.artistName}</p>
              </div>
          ))
        )

      case 'songs':
        contentTitle = 'Songs'
        return (
          Object.values(songs).map((song) =>
          (
            <div className='vertical-content-card' key={song.id}>
            <Link to={`/songs/${song.id}`}>
              <img src={song.coverImg} alt='' className='vertical-cover' />
              <p className='vertical-title'>{song.title}</p>
            </Link>
            <p className='vertical-artist'>{song.artistName}</p>
          </div>
          ))
        )

      case 'artists':
        contentTitle = 'Artists'
        return (
          Object.values(artists).map((artist, idx) =>
          (
            <div className='vertical-content-card' key={idx}>
                <Link to={`/artists/${artist.id}`}>
                  <img src={artist.aboutImg} alt='' className='vertical-cover' />
                  <p className='vertical-title'>{artist.artistName}</p>
                </Link>
                <p className='vertical-artist'>Artist</p>
              </div>
          ))
        )

      case 'playlists':
        contentTitle = 'Playlists'
        return (
          Object.values(playlists).map((playlist, idx) => (
            <div className='vertical-content-card' key={idx}>
                <Link to={`/playlists/${playlist.id}`}>
                  <img src={playlist?.playlistCoverImg} alt='' className='vertical-cover' />
                  <p className='vertical-title'>{playlist?.title}</p>
                </Link>
                <p className='vertical-artist'>{currentUser?.username}</p>
              </div>
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