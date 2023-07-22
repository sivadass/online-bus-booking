import { useReducer, createContext } from "react";
import { getJSON } from "../utils/axios";

const initialState = {
  locations: null,
  selectedSchedule: null,
  selectedSeats: [],
};

export const CommonStateContext = createContext();
export const CommonDispatchContext = createContext();

const ACTION_TYPES = {
  SET_LOCATIONS: "SET_LOCATIONS",
  SET_SCHEDULE: "SET_SCHEDULE",
  SET_SELECTED_SEATS: "SET_SELECTED_SEATS",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_LOCATIONS:
      return {
        ...state,
        locations: action.payload.locations,
      };
    case ACTION_TYPES.SET_SCHEDULE:
      return {
        ...state,
        selectedSchedule: action.payload.selectedSchedule,
        // selectedSeats: [],
      };
    case ACTION_TYPES.SET_SELECTED_SEATS:
      return {
        ...state,
        selectedSeats: action.payload.selectedSeats,
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

export const setCurrentSchedule = (dispatch, selectedSchedule) => {
  dispatch({
    type: ACTION_TYPES.SET_SCHEDULE,
    payload: {
      selectedSchedule,
    },
  });
};

export const setSelectedSeats = (dispatch, selectedSeats) => {
  dispatch({
    type: ACTION_TYPES.SET_SELECTED_SEATS,
    payload: {
      selectedSeats,
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
