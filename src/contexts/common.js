import { useReducer, createContext } from "react";
import { getJSON } from "../utils/axios";

const initialState = {
  isMenuOpen: true,
  locations: null,
};

export const CommonStateContext = createContext();
export const CommonDispatchContext = createContext();

const ACTION_TYPES = {
  TOGGLE_MENU: "TOGGLE_MENU",
  SET_LOCATIONS: "SET_LOCATIONS",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_LOCATIONS:
      return {
        ...state,
        locations: action.payload.locations,
      };
    case ACTION_TYPES.TOGGLE_MENU:
      return {
        ...state,
        isMenuOpen: action.payload.isMenuOpen,
      };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

const CommonProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <CommonDispatchContext.Provider value={dispatch}>
      <CommonStateContext.Provider value={state}>
        {children}
      </CommonStateContext.Provider>
    </CommonDispatchContext.Provider>
  );
};

export const toggleMenu = (dispatch, isMenuOpen) => {
  dispatch({
    type: ACTION_TYPES.TOGGLE_MENU,
    payload: {
      isMenuOpen,
    },
  });
};

export const getLocations = async (dispatch) => {
  try {
    const response = await getJSON("/api/locations");
    if (response?.data?.locations) {
      const locationsData = response?.data?.locations?.map((l) => {
        return {
          label: l.name,
          value: l.id,
        };
      });

      return dispatch({
        type: ACTION_TYPES.SET_LOCATIONS,
        payload: {
          locations: locationsData,
        },
      });
    }
  } catch (error) {
    dispatch({
      type: ACTION_TYPES.SET_LOCATIONS,
      payload: {
        locations: [],
      },
    });
  }
};

export default CommonProvider;
