import csrfFetch from "./csrf";
import { debounce } from 'lodash';

// ! Actions
export const START_SEARCH = 'search/START_SEARCH';
export const UPDATE_QUERY = 'search/UPDATE_QUERY';
export const UPDATE_SEARCH_RESULTS = 'search/UPDATE_SEARCH_RESULTS';
export const SEARCH_ERROR = 'search/SEARCH_ERROR';
export const CLEAR_SEARCH = 'search/CLEAR_SEARCH';

export const startSearch = () => ({
  type: START_SEARCH,
})

export const updateQuery = (query) => ({
  type: UPDATE_QUERY,
  payload: query
});

export const updateSearchResult = (searchResult) => ({
  type: UPDATE_SEARCH_RESULTS,
  payload: searchResult
})

export const searchError = (error) => ({
  type: SEARCH_ERROR,
  payload: error
});

export const clearSearch = () => ({
  type: CLEAR_SEARCH
})

const initialState = {
  query: '',
  results: [],
  isLoading: false,
  error: null
};

// Debounce function
const debounceSearch = debounce(async (query, dispatch) => {
  try {
    const response = await csrfFetch(`/api/search?q=${query}`);
    const data = await response.json();
    dispatch(updateSearchResult(data));
  } catch (error) {
    dispatch(searchError(error));
  }
}, 500); // 500 ms delay

export const performSearch = (query) => (dispatch) => {
  dispatch(updateQuery(query)); // Update the query state
  dispatch(startSearch());
  debounceSearch(query, dispatch); // Debounced search
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_SEARCH:
      return { ...state, isLoading: true, error: null }
    case UPDATE_QUERY:
      return { ...state, query: action.payload };
    case UPDATE_SEARCH_RESULTS:
      return { ...state, results: action.payload, isLoading: false }
    case SEARCH_ERROR:
      return { ...state, error: action.payload, isLoading: false }
    case CLEAR_SEARCH:
      return initialState;
    default:
      return state;
  }
}

export default searchReducer;
