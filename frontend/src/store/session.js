import csrfFetch from './csrf';

const SET_CURRENT_USER = 'session/setCurrentUser';
const REMOVE_CURRENT_USER = 'session/removeCurrentUser';

const setCurrentUser = (user) => {
  // return {
  //   type: SET_CURRENT_USER,
  //   payload: user
  // };
  // ! Modified to include playlists array to User object slice
  // Ensure that the user object has a playlists field
  // const userWithPlaylists = { ...user, playlists: user.playlists || [] };
  return {
    type: SET_CURRENT_USER,
    // payload: userWithPlaylists
    payload: user
  };
};

const removeCurrentUser = () => {
  return {
    type: REMOVE_CURRENT_USER
  };
};

const storeCSRFToken = response => {
  const csrfToken = response.headers.get("X-CSRF-Token");
  if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
}

const storeCurrentUser = user => {
  if (user) sessionStorage.setItem("currentUser", JSON.stringify(user));
  else sessionStorage.removeItem("currentUser");
}

export const signup = (user) => async dispatch => {
  const { username, email, password, birth_date, gender, optin_marketing, playlists } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({ 
      username, 
      email, 
      password,
      birth_date,
      gender,
      optin_marketing,
      playlists 
    })
  });
  const data = await response.json();
  storeCurrentUser(data.user);
  dispatch(setCurrentUser(data.user));
  return response;
};

export const login = ({ credential, password }) => async dispatch => {
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({ credential, password })
  });
  const data = await response.json();
  storeCurrentUser(data.user);
  dispatch(setCurrentUser(data.user));
  return response;
};

export const logout = () => async dispatch => {
  const response = await csrfFetch("/api/session", {
    method: "DELETE"
  });
  // Check if logout is successful; you can also add error handling as needed
  if (response.ok) {
    // Remove the current user from the sessionStorage
    storeCurrentUser(null);
    // Dispatch an action to update the Redux store
    dispatch(removeCurrentUser());

  }
  return response;
};


export const restoreSession = () => async dispatch => {
  const response = await csrfFetch("/api/session");
  storeCSRFToken(response);
  const data = await response.json();
  storeCurrentUser(data.user);
  dispatch(setCurrentUser(data.user));
  return response;
};

const initialState = { 
  user: JSON.parse(sessionStorage.getItem("currentUser"))
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state, user: { ...action.payload } };
    case REMOVE_CURRENT_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default sessionReducer;