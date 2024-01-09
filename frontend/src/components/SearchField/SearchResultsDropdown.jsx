import './SearchResultsDropdown.css'
import searchArrow from '../../static/icons/search-arrow.svg'
import searchArrowLeft from '../../static/icons/search-arrow-left.svg'
import searchArrowDown from '../../static/icons/search-arrow-down.svg'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import AlbumResultPage from './ResultsPage/AlbumResultPage'
import ArtistResultPage from './ResultsPage/ArtistResultPage'

const SearchResultsDropdown = ({ query, searchResults, searchInitiated }) => {
  const validatedSearchResults = Array.isArray(searchResults) ? searchResults : [];
  // Initialize the results as empty arrays
  const albumResults = validatedSearchResults.filter(result => result.type === 'album');
  const artistResults = validatedSearchResults.filter(result => result.type === 'artist');
  const playlistResults = validatedSearchResults.filter(result => result.type === 'playlist');
  const songResults = validatedSearchResults.filter(result => result.type === 'song');

  // Function to check if there are any results
  const hasResults = () => {
    return albumResults.length > 0 || artistResults.length > 0 || 
            playlistResults.length > 0 || songResults.length > 0;
  }

  const [hoveredTrack, setHoveredTrack] = useState(null);
  const [expandedAlbum, setExpandedAlbum] = useState(null);
  const [expandedArtist, setExpandedArtist] = useState(null);

  // Display all songs in an album on click
  const toggleSongsDisplay = (albumId) => {
    if (expandedAlbum === albumId) {
      setExpandedAlbum(null); // collapse if opened
    } else {
      setExpandedAlbum(albumId); // expand the clicked one
    }
  };

  const toggleArtistsDisplay = (artistId) => {
    if (expandedArtist === artistId) {
      setExpandedArtist(null);
    } else {
      setExpandedArtist(artistId);
    }
  };

  let expanded = '';

  const isAlbumExpanded = (albumId) => expandedAlbum === albumId;
  const isArtistExpanded = (artistId) => {
    if (expandedArtist === artistId) {
      expanded = '-expanded'
      return true;
    }
  };

  return (
    <>
      <div className="search-results">
        
      {!hasResults() && searchInitiated && 
        <div className='no-results'>
          <h3>No results found for "{query}"</h3>
        </div>
      }
      {
        artistResults.map((artist, index) =>
        <>
          {
            isArtistExpanded(artist.id) ? 
            <>
            {/* // & Artist Result Expanded */}
              <div 
                className={`result-row${expanded}`}
                style={index === 0 ? { marginTop: '2rem' } : {}}
                onMouseEnter={() => setHoveredTrack(index)}
                onMouseLeave={() => setHoveredTrack(null)}
                onClick={() => toggleArtistsDisplay(artist.id)}
              >
                <div className='result-detail'>
                  <img src={artist.aboutImg} alt='' className='result-artist-img'/>
                  <div className='name'>
                    <p key={index}>{artist.artistName}</p>
                    <p className='result-label'>Artist</p>
                  </div>
                </div>
                <div className='result-link'>
                  <img 
                    src={searchArrowDown}
                    alt='expanded-search-arrow-down' 
                  />
                </div>
              </div>
            </>
            :
            <>
            {/* // & Artist Result Not Expanded */}
              <div 
                className={`result-row${expanded}`}
                style={index === 0 ? { marginTop: '2rem' } : {}}
                onMouseEnter={() => setHoveredTrack(index)}
                onMouseLeave={() => setHoveredTrack(null)}
                onClick={() => toggleArtistsDisplay(artist.id)}
              >
                <div className='result-detail'>
                  <img src={artist.aboutImg} alt='' className='result-artist-img'/>
                  <div className='name'>
                    <p key={index}>{artist.artistName}</p>
                    <p className='result-label'>Artist</p>
                  </div>
                </div>
                <div className='result-link'>
                  <img 
                    src={searchArrow} 
                    className='search-arrow'
                    alt='Link' 
                  />
                </div>
              </div>
            </>
            }
          {isArtistExpanded(artist.id) && <ArtistResultPage songs={artist.songs}/>}
        </>
        )
      }

      {
        albumResults.map((album, index) =>
          <>
            <div 
              className='result-row' 
              style={index === 0 ? { marginTop: '2rem' } : {}}
              onClick={() => toggleSongsDisplay(album.id)}>
              <div className='result-detail'>
                <img src={album.coverImg} alt='' className='result-album-img' />
                <div className='name'>
                  <p key={index}>{album.title}</p>
                  <p className='result-label'>Album</p>
                </div>
              </div>
              <div className='result-link'>
                <img src={searchArrow} alt='Link' className='search-arrow'/>
              </div>
            </div>
            {isAlbumExpanded(album.id) && <AlbumResultPage songs={album.songs} />}
          </>
        )
      }

      {
        songResults.map((song, index) => 
          <div 
            className='result-row'
            style={index === 0 ? { marginTop: '2rem' } : {}}
          >
            <div className='result-detail song-result'>
                <img src={song.coverImg} alt='' className='result-song-img'/>
                <div className='name'>
                  <p key={index}>{song.title}</p>
                  <Link to={`artists/${song.artistId}`} className='result-album'><p className='result-label'>{song.artistName}</p></Link>
                </div>
            </div>
            <div className='result-album'>
              <Link><p>{song.albumTitle}</p></Link>
            </div>
            <div className='result-link'>
              <button>Add</button>
              {/* ! Need a handler to add to the playlist here */}
            </div>
          </div>
        )
      }

      {
        playlistResults.map((playlist, index) => 
          <div 
            className='playlist-result'
            style={index === 0 ? { marginTop: '2rem' } : {}}
          >
            <p key={index}>{playlist.title}</p>
          </div>
        )
      }

      </div>
    </>
  );
}

export default SearchResultsDropdown;