import { createContext, useReducer } from "react";
import { productReducer } from "../Reducer/productReducer";

export const INITIAL_STATE = {
  price: null,
  priceRange: 200000,
  rating: null,
  category: [],
  brand: [],
  other: [],
};

const ProductContext = createContext({
  filterState: INITIAL_STATE,
  dispatchFilter: Function,
});

const ProductProvider = ({ children }) => {
  const [filterState, dispatchFilter] = useReducer(
    productReducer,
    INITIAL_STATE
  );

  return (
    <ProductContext.Provider value={{ filterState, dispatchFilter }}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
