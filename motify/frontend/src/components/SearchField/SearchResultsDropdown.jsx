import './SearchResultsDropdown.css'
import searchArrow from '../../static/icons/search-arrow.svg'
import { Link } from 'react-router-dom'

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
            <Link to={`/artists/${artist.id}`}>
              <div className='result-row'>
                <div className='result-detail'>
                  <img src={artist.aboutImg} alt=''/>
                  <div className='name'>
                    <p key={index}>{artist.artistName}</p>
                    <p className='result-label'>Artist</p>
                  </div>
                </div>
                <div className='result-link'>
                  <img src={searchArrow} alt='Link' className='search-arrow'/>
                </div>
              </div>
            </Link> 
          )
        }

        {
          albumResults.map((album, index) =>
            <Link to={`/albums/${album.id}`}>
              <div className='result-row'>
                <div className='result-detail'>
                  <img src={album.coverImg} alt='' />
                  <div className='name'>
                    <p key={index}>{album.title}</p>
                    <p className='result-label'>Album</p>
                  </div>
                </div>
                <div className='result-link'>
                  <img src={searchArrow} alt='Link' className='search-arrow'/>
                </div>
              </div>
            </Link> 
          )
        }

        {
          songResults.map((song, index) => 
            <div className='result-row'>
              <div className='result-detail'>
                <img src={song.coverImg} alt=''/>
                <div className='name'>
                  <p key={index}>{song.title}</p>
                  <p className='result-label'>{song.artistName}</p>
                </div>

              </div>
            </div>
          )
        }

        {
          playlistResults.map((playlist, index) => 
            <div className='playlist-result'>
              <p key={index}>{playlist.title}</p>
            </div>
          )
        }


      </div>
    </>
  );
}

export default SearchResultsDropdown;