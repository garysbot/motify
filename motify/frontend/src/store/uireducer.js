export const toggleDropdown = () => ({
  type: 'TOGGLE_DROPDOWN'
});

const initialState = {
  isDropdownOpen: false
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_DROPDOWN':
      return {
        ...state,
        isDropdownOpen: !state.isDropdownOpen
      };
    default:
      return state;
  }
};

export default uiReducer;
