import { useReducer, createContext } from "react";
import useLocalStorage from "../hooks/use-localstorage";

const initialState = {
  isLoggingIn: false,
  isLoggedIn: false,
  user: null,
  error: null,
};

export const AuthStateContext = createContext();
export const AuthDispatchContext = createContext();

const ACTION_TYPES = {
  LOGIN_REQUEST: "LOGIN_REQUEST",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILURE: "LOGIN_FAILURE",
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.LOGIN_REQUEST:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        isLoggingIn: true,
        error: null,
      };
    case ACTION_TYPES.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.user,
        isLoggingIn: false,
        error: null,
      };
    case ACTION_TYPES.LOGIN_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        isLoggingIn: false,
        error: action.payload.error,
      };
    case ACTION_TYPES.LOGOUT_SUCCESS:
      return {
        ...state,
        ...initialState,
      };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export const login = (dispatch, userData) => {
  dispatch({
    type: ACTION_TYPES.LOGIN_REQUEST,
  });
  if (userData?.mobile) {
    localStorage.setItem("user", userData.mobile);
    return dispatch({
      type: ACTION_TYPES.LOGIN_SUCCESS,
      payload: {
        user: userData.mobile,
      },
    });
  } else {
    dispatch({
      type: ACTION_TYPES.LOGIN_FAILURE,
      payload: {
        error: "Sorry, unable to login!",
      },
    });
  }
};

export const logout = async (dispatch) => {
  localStorage.removeItem("user");
  dispatch({
    type: ACTION_TYPES.LOGOUT_SUCCESS,
  });
};

const AuthProvider = ({ children }) => {
  const [persistedUser] = useLocalStorage("user", "");
  const persistedUserState = {
    user: persistedUser,
    isLoggedIn: persistedUser > 0,
  };
  const [state, dispatch] = useReducer(reducer, persistedUserState);
  return (
    <AuthDispatchContext.Provider value={dispatch}>
      <AuthStateContext.Provider value={state}>
        {children}
      </AuthStateContext.Provider>
    </AuthDispatchContext.Provider>
  );
};

export default AuthProvider;
