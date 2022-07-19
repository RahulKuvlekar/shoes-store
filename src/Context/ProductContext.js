import { createContext, useReducer } from "react";
import { productReducer } from "../Reducer/productReducer";

export const INITIAL_STATE = {
  products: [],
  myCart: [],
  myWishlist: [],
  price: null,
  priceRange: 200000,
  rating: null,
  category: [],
  brand: [],
  other: [],
};

const ProductContext = createContext({
  productState: INITIAL_STATE,
  dispatchProduct: Function,
});

const ProductProvider = ({ children }) => {
  const [productState, dispatchProduct] = useReducer(
    productReducer,
    INITIAL_STATE
  );

  return (
    <ProductContext.Provider value={{ productState, dispatchProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
