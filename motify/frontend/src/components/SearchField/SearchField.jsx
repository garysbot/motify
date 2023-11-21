import { useState } from 'react';
import { useDispatch } from 'react-redux';
import searchIcon from '../../static/icons/search-inactive.svg'
import closeIcon from '../../static/icons/close.svg'
import { performSearch, clearSearch } from '../../store/search';

const SearchField = () => {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const newQuery = event.target.value;
    setInputValue(newQuery);
    if (newQuery) {
      dispatch(performSearch(newQuery)); // Dispatch Redux action for performing search
    } else {
      dispatch(clearSearch()); // Clear search if the input is empty
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
    </>
  );
}

export default SearchField;