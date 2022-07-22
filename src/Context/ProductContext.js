import { createContext, useReducer, useEffect } from "react";
import { productReducer } from "../Reducer/productReducer";
import { useAuthContext } from "../Hooks/useAuthContext";
import { getMyCart, getMyWishlist } from "../Utils/products";
import { SET_MY_CART, SET_MY_WISHLIST } from "../Constant/constant";
import { useToastContext } from "../Hooks/useToastContext";
import { getUserAddress } from "../Utils/address";

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
  const { isAuthenticated, userInfo, setUserAddress } = useAuthContext();
  const { dispatchToast } = useToastContext();
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

  const getMyAddress = async () => {
    if (!isAuthenticated) return;
    getUserAddress(userInfo, setUserAddress, dispatchToast);
  };

  useEffect(() => {
    getAllMyCart();
    getAllMyWishlist();
    getMyAddress();

    // eslint-disable-next-line
  }, [isAuthenticated]);

  return (
    <ProductContext.Provider value={{ productState, dispatchProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
