import { useReducer, createContext } from "react";

const initialState = {
  isMenuOpen: true,
};

export const CommonStateContext = createContext();
export const CommonDispatchContext = createContext();

const ACTION_TYPES = {
  TOGGLE_MENU: "TOGGLE_MENU",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.TOGGLE_MENU:
      return {
        ...state,
        isMenuOpen: action.payload.isMenuOpen,
        isMobile: action.payload.isMenuOpen,
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

export const toggleMenu = (dispatch, isMenuOpen, isMobile = false) => {
  dispatch({
    type: ACTION_TYPES.TOGGLE_MENU,
    payload: {
      isMenuOpen,
      isMobile,
    },
  });
};

export default CommonProvider;
