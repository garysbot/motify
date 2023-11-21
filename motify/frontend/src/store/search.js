import csrfFetch from "./csrf";

// ! Actions
export const START_SEARCH = 'search/START_SEARCH';
export const UPDATE_SEARCH_RESULTS = 'search/UPDATE_SEARCH_RESULTS';
export const CLEAR_SEARCH = 'search/CLEAR_SEARCH';

export const startSearch = () => ({
  type: START_SEARCH,
})

export const updateSearchResult = (searchResult) => ({
  type: UPDATE_SEARCH_RESULTS,
  payload: searchResult
})

export const clearSearch = () => ({
  type: CLEAR_SEARCH
})

const initialState = {
  query: '',
  results: [],
  isLoading: false
};

export const performSearch = (query) => async (dispatch) => {
  dispatch(startSearch());
  try {
    const response = await csrfFetch(`/api/search?q=${query}`);
    const data = await response.json();
    dispatch(updateSearchResult(data));
  } catch (error) {
    // dispatch an error action or handle the error
  }
};


const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_SEARCH: 
      return { ...state, isLoading: true }
    case UPDATE_SEARCH_RESULTS:
      return { ...state, results: action.payload, isLoading: false }
    case CLEAR_SEARCH:
      return initialState;
    default:
      return state;
  }
}

export default searchReducer