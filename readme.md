# Motify: A Fullstack Spotify Clone
Motify is a full-stack clone of Spotify designed to emulate the core functionalities of the original platform with a responsive and intuitive user interface.

![Motify Overview](https://github.com/garysbot/motify/raw/main/readme/motify-overview.png)

## Tech Stack
The Motify application employs a modern full-stack architecture:
- React.js
<img alt="React" src="https://img.shields.io/badge/-React-45b8d8?style=flat-square&logo=react&logoColor=white" />
- Ruby on Rails with PostgreSQL
<img alt="Rails" src="https://img.shields.io/badge/-Rails-CC0000?style=flat-square&logo=rubyonrails&logoColor=white" /><img alt="PostgreSQL" src="https://img.shields.io/badge/-PostgreSQL-0064a5?style=flat-square&logo=postgresql&logoColor=white" />
- Redux
<img alt="Redux" src="https://img.shields.io/badge/-Redux-764ABC?style=flat-square&logo=redux&logoColor=white" />
- Node.js
<img alt="Nodejs" src="https://img.shields.io/badge/-Node.js-43853d?style=flat-square&logo=Node.js&logoColor=white" />
- HTML, CSS, Vanilla JavaScript
<img alt="html5" src="https://img.shields.io/badge/-HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" /><img alt="css3" src="https://img.shields.io/badge/-CSS3-264de4?style=flat-square&logo=css3&logoColor=white" /><img alt="javascript" src="https://img.shields.io/badge/-Javascript-F7DF1E?style=flat-square&logo=javascript&logoColor=black"/>


## Data Architecture
![motify-data-structure.png](https://github.com/garysbot/motify/blob/main/readme/motify-data-structure.png?raw=true)

The front end is built with React, leveraging HTML, CSS, and JavaScript to deliver a responsive user interface and user experience. State management within the front end is handled by Redux, which serves as a predictable state container, interfacing with middleware for asynchronous events.

Routing is managed through a combination of React for component rendering and Node.js for server-side logic, facilitating the navigation within the application.

The backend is powered by Ruby on Rails, providing a robust server-side framework. Data persistence is achieved with PostgreSQL, a powerful object-relational database system. The data serialization is handled by jBuilder, allowing for the creation of JSON structures that are consumed by the front end.

This architecture supports a scalable, maintainable, and interactive web application, designed for optimal user engagement and straightforward data flow from the database to the end user.

## Core Features
-   **Play Bar**: 
  Interactive play bar for music playback and controls.
<br>

-   **Playlist Management**: 
Comprehensive playlist management, including CRUD operations, song addition/removal, and custom playlist titles.
<br>

-   **Hosting**: 
Application deployment on Render.
<img alt="html5" src="https://img.shields.io/badge/-Render-white?style=flat-square&logo=render&logoColor=black" />
<br>

-   **Dynamic Search**: 
Real-time search across artists, songs, albums, and playlists.
![Dynamic Search](https://github.com/garysbot/motify/raw/main/readme/dynamic-search.gif)
<br>

-   **User Authentication**: 
  Secure login, registration, and session management with demo account access.
  ![Motify Signup Flow](./readme/motify-signup-flow.gif)
  ![Motify Signup Flow](./readme/motify-login-flow.gif)
<br>


## UI/UX Design Philosophy
Spotify's design philosophy revolves around ;


## Highlighted Features

### Dynamic Search
Dynamic real-time search fetching from Rails backend for Songs, Albums, Artists, and Playlists that match the search query.

![Dynamic Search](https://github.com/garysbot/motify/raw/main/readme/dynamic-search.gif)

``` javascript
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import searchIcon from '../../static/icons/search-inactive.svg';
import closeIcon from '../../static/icons/close.svg';
import { performSearch, clearSearch } from '../../store/search';
import SearchResultsDropdown from './SearchResultsDropdown';

const SearchField = () => {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();
  const { error, results, searchInitiated, query } = useSelector(state => state.search);

  const handleChange = (event) => {
    const newQuery = event.target.value;
    setInputValue(newQuery);
    if (newQuery) {
      dispatch(performSearch(newQuery)); // Dispatching performSearch action with new query
    } else {
      dispatch(clearSearch()); // Clearing the search when input is empty
    }
  };

  const clearInput = () => {
    setInputValue('');
    dispatch(clearSearch()); // Dispatch Redux action to clear search
  };

  return (
    <>
      <div className='search-input-container'>
        <img src={searchIcon} alt='Search' className="search-icon"/>
        <input
          type='text'
          placeholder='Search for songs or episodes'
          value={inputValue}
          onChange={handleChange}
        />
        <img src={closeIcon} alt='Close' className='close-icon' onClick={clearInput}/>
      </div>
      {error && <p>Error: {error.message}</p>}
      <SearchResultsDropdown query={query} searchResults={results} searchInitiated={searchInitiated}/>
    </>
  );
}

export default SearchField;
```

### SongsTable UI/UX with Redux State Management
Redux state management for globalized state enhancing user experience and user interface design. Song row style changes based on current song playing state.

![Song State Redux](https://github.com/garysbot/motify/raw/main/readme/hover-state.png)

```javascript
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { receiveSong, togglePlay } from '../../store/audioActions'; // Import relevant actions
import { ReactSVG } from 'react-svg';
import lilPlayButton from '../../static/icons/noun-play-1009801.svg'

const SongsTable = () => {
  const dispatch = useDispatch();
  const currentAlbum = useSelector(state => state.audio.currentAlbum);
  const [hoveredTrack, setHoveredTrack] = useState(null);
  // Function to handle play button click
  const handlePlaySong = (song) => {
    dispatch(receiveSong(song));
    dispatch(togglePlay());
  };
  return (
    <div className='show-songs-table'>
      {
        currentAlbum.songs?.map((song, trackNum) =>
          <>
            <div
              className='show-songs-row-container'
              onMouseEnter={() => setHoveredTrack(trackNum)}
              onMouseLeave={() => setHoveredTrack(null)}
              onClick={() => handlePlaySong(song)} // ! This is what changes the Redux State
            >
              <div className='row-start'
              >
                <div className='track-num'>
                  {hoveredTrack === trackNum 
                    ?
                    (<ReactSVG src={lilPlayButton} className='anim-play-button' />)
                    :
                    (<p style={{'width':'12px', 'height':'12px'}}>{trackNum + 1}</p>)
                  }
                </div>
                <div className='song-title-artist-container'>
                  <p className='song-title'>{song.title}</p>
                  <p className='song-title-artist-name'>{currentAlbum.artistName}</p>
                </div>
                <div className='song-title-artist-container'>
                  <p className='song-title'>{song.album?.title}</p>
                </div>
              </div>

              <div className='row-end'>
                <div className='like-button-duration'>
                  <p className='duration-text header-time'>{`${Math.floor(song.duration / 60)}:${String(song.duration % 60).padStart(2, '0')}`}</p>
                </div>
              </div>

            </div>
          </>
        )
      }
    </div>
  )
}

export default SongsTable
```


## Future Features
- Enhanced user and artist profiles.
- Social features to follow and unfollow users and artists.
- Like/unlike functionality for songs, albums, and playlists.
- Dynamic playlist cover generation based on song selection.

<br>