import {
  AUTH_USER,
  ADD_USER,
  FETCH_USERS,
  EDIT_USER,
  DELETE_USER
} from "../constants";

const initialState = {
  user: {},
  users: [],
  total : 0
};

const  userReducers = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        user: action.user
      };
    case ADD_USER:
      return {
        ...state,
        users: [...state.users, action.user]
      };
    case FETCH_USERS:
      return {
        ...state,
        users: action.users,
        total: action.total
      };
    case EDIT_USER:
      return { 
        ...state, 
        users: state.users.map(user => {
          if (user.id === action.user.id) {
            return action.user;
          } else {
            return user;
          }
        })
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(({ id }) => id !== action.user)
      }
    default:
      return state;
  }
}

export default userReducers;

