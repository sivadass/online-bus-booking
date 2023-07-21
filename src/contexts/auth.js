import { useReducer, createContext } from "react";
import { postJSON } from "../utils/axios";
import useLocalStorage from "../hooks/use-localstorage";

const initialState = {
  isLoggingIn: false,
  isVerifyingEmail: false,
  isCheckingValidity: false,
  isResettingPassword: false,
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
  REGISTER_REQUEST: "REGISTER_REQUEST",
  REGISTER_SUCCESS: "REGISTER_SUCCESS",
  REGISTER_FAILURE: "REGISTER_FAILURE",
  CHECK_VALIDITY_REQUEST: "CHECK_VALIDITY_REQUEST",
  CHECK_VALIDITY_SUCCESS: "CHECK_VALIDITY_SUCCESS",
  CHECK_VALIDITY_FAILURE: "CHECK_VALIDITY_FAILURE",
  EMAIL_VERIFY_REQUEST: "EMAIL_VERIFY_REQUEST",
  EMAIL_VERIFY_SUCCESS: "EMAIL_VERIFY_SUCCESS",
  EMAIL_VERIFY_FAILURE: "EMAIL_VERIFY_FAILURE",
  RESET_PASSWORD_REQUEST: "RESET_PASSWORD_REQUEST",
  RESET_PASSWORD_SUCCESS: "RESET_PASSWORD_SUCCESS",
  RESET_PASSWORD_FAILURE: "RESET_PASSWORD_FAILURE",
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
    case ACTION_TYPES.EMAIL_VERIFY_REQUEST:
      return {
        ...state,
        isVerifyingEmail: true,
        error: null,
      };
    case ACTION_TYPES.EMAIL_VERIFY_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        isVerifyingEmail: false,
        user: action.payload.user,
        error: null,
      };
    case ACTION_TYPES.EMAIL_VERIFY_FAILURE:
      return {
        ...state,
        isVerifyingEmail: false,
        error: action.payload.error,
      };
    case ACTION_TYPES.RESET_PASSWORD_REQUEST:
      return {
        ...state,
        isResettingPassword: true,
        error: null,
      };
    case ACTION_TYPES.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isResettingPassword: false,
        error: null,
      };
    case ACTION_TYPES.RESET_PASSWORD_FAILURE:
      return {
        ...state,
        isResettingPassword: false,
        error: action.payload.error,
      };
    case ACTION_TYPES.REGISTER_FAILURE:
      return {
        ...state,
        ...initialState,
        error: action.payload.error,
      };
    case ACTION_TYPES.REGISTER_REQUEST:
    case ACTION_TYPES.REGISTER_SUCCESS:
    case ACTION_TYPES.LOGOUT_SUCCESS:
      return {
        ...state,
        ...initialState,
      };
    case ACTION_TYPES.CHECK_VALIDITY_REQUEST:
      return {
        ...state,
        isCheckingValidity: true,
        error: "",
      };
    case ACTION_TYPES.CHECK_VALIDITY_SUCCESS:
      return {
        ...state,
        isCheckingValidity: false,
      };
    case ACTION_TYPES.CHECK_VALIDITY_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        isCheckingValidity: false,
        error: action.payload.error,
      };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export const checkValidity = async (dispatch) => {
  try {
    dispatch({
      type: ACTION_TYPES.CHECK_VALIDITY_REQUEST,
    });
    const token = localStorage.getItem("token");
    if (token) {
      return dispatch({
        type: ACTION_TYPES.CHECK_VALIDITY_SUCCESS,
      });
    } else {
      dispatch({
        type: ACTION_TYPES.CHECK_VALIDITY_FAILURE,
        payload: {
          error: "Logged out due to expired session",
        },
      });
    }
  } catch (error) {
    return dispatch({
      type: ACTION_TYPES.CHECK_VALIDITY_FAILURE,
      payload: {
        error: `${error?.message}, please retry login!`,
      },
    });
  }
};

export const signIn = async (dispatch, userData) => {
  dispatch({
    type: ACTION_TYPES.LOGIN_REQUEST,
  });
  try {
    const response = await postJSON(`/api/auth/login`, userData);
    const token = response?.data?.["auth_token"];
    localStorage.setItem("token", token);
    const userProfile = {
      id: 1,
      name: "John Doe",
    };
    localStorage.setItem("user", JSON.stringify(userProfile));
    return dispatch({
      type: ACTION_TYPES.LOGIN_SUCCESS,
      payload: {
        user: userProfile?.data,
      },
    });
  } catch (error) {
    console.log("error", error);
    dispatch({
      type: ACTION_TYPES.LOGIN_FAILURE,
      payload: {
        error: error?.message,
      },
    });
  }
};

const AuthProvider = ({ children }) => {
  const [persistedUser] = useLocalStorage("user", {});
  console.log();
  const persistedUserState = {
    user: persistedUser,
    isLoggedIn: persistedUser?.id || "" > 0,
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
