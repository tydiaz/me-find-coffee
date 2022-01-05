import { createContext, useReducer } from 'react';

export const StoreContext = createContext();
export const ACTION_TYPES = {
  SET_COORDINATES: 'SET_COORDINATES',
  SET_COFFEE_SHOPS: 'SET_COFFEE_SHOPS',
};

const storeReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_COORDINATES: {
      return { ...state, coordinates: action.payload.coordinates };
    }
    case ACTION_TYPES.SET_COFFEE_SHOPS: {
      return { ...state, coffeeShops: action.payload.coffeeShops };
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const StoreProvider = ({ children }) => {
  const initialState = {
    coordinates: '',
    coffeeShops: [],
  };

  const [state, dispatch] = useReducer(storeReducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
