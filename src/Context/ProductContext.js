import { createContext, useReducer, useEffect } from "react";
import { productReducer } from "../Reducer/productReducer";
import { useAuthContext } from "../Hooks/useAuthContext";
import { getMyCart, getMyWishlist } from "../Utils/products";
import { SET_MY_CART, SET_MY_WISHLIST } from "../Constant/constant";

export const INITIAL_STATE = {
  products: [],
  myCart: {},
  myWishlist: {},
  price: null,
  priceRange: 200000,
  rating: null,
  category: [],
  brand: [],
  other: [],
  productLoading: false,
};

const ProductContext = createContext({
  productState: INITIAL_STATE,
  dispatchProduct: Function,
});

const ProductProvider = ({ children }) => {
  const { isAuthenticated, userInfo } = useAuthContext();
  const [productState, dispatchProduct] = useReducer(
    productReducer,
    INITIAL_STATE
  );

  const getAllMyCart = () => {
    if (isAuthenticated) {
      getMyCart(dispatchProduct, userInfo?.uid);
      return;
    }
    dispatchProduct({ type: SET_MY_CART, payload: {} });
  };
  const getAllMyWishlist = () => {
    if (isAuthenticated) {
      getMyWishlist(dispatchProduct, userInfo?.uid);
      return;
    }
    dispatchProduct({ type: SET_MY_WISHLIST, payload: {} });
  };

  useEffect(() => {
    getAllMyCart();
    getAllMyWishlist();

    // eslint-disable-next-line
  }, [isAuthenticated]);

  return (
    <ProductContext.Provider value={{ productState, dispatchProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
