import {
  ADD_PRODUCTS,
  ADD_TO_CART,
  ADD_TO_WISHLIST,
  CLEAR_FILTERS,
  DECREMENT_CART_QUANTITY,
  INCREMENT_CART_QUANTITY,
  REMOVE_FROM_CART,
  REMOVE_FROM_WISHLIST,
  SET_LOADING,
  SET_MY_CART,
  SET_MY_WISHLIST,
  SORT_BY_BRAND,
  SORT_BY_CATEGORY,
  SORT_BY_OTHER,
  SORT_BY_PRICE,
  SORT_BY_PRICE_RANGE,
  SORT_BY_RATING,
} from "../Constant/constant";
import { INITIAL_STATE } from "../Context/ProductContext";

export const productReducer = (prev, action) => {
  switch (action.type) {
    case ADD_PRODUCTS:
      return { ...prev, products: action.payload };
    case SORT_BY_PRICE:
      return { ...prev, price: action.payload };
    case SORT_BY_PRICE_RANGE:
      return { ...prev, priceRange: action.payload };
    case SORT_BY_RATING:
      return { ...prev, rating: action.payload };
    case SORT_BY_CATEGORY:
      return prev.category.find((category) => category === action.payload)
        ? {
            ...prev,
            category: [
              ...prev.category.filter(
                (category) => category !== action.payload
              ),
            ],
          }
        : { ...prev, category: [...prev.category, action.payload] };
    case SORT_BY_BRAND:
      return prev.brand.find((brand) => brand === action.payload)
        ? {
            ...prev,
            brand: [...prev.brand.filter((brand) => brand !== action.payload)],
          }
        : { ...prev, brand: [...prev.brand, action.payload] };
    case SORT_BY_OTHER:
      return prev.other.find((other) => other === action.payload)
        ? {
            ...prev,
            other: [...prev.other.filter((other) => other !== action.payload)],
          }
        : { ...prev, other: [...prev.other, action.payload] };

    case ADD_TO_CART:
      return {
        ...prev,
        myCart: {
          ...prev.myCart,
          [action.payload.productId]: action.payload,
        },
      };
    case REMOVE_FROM_CART:
      delete prev.myCart[action.payload.productId];
      return prev;

    case ADD_TO_WISHLIST:
      return {
        ...prev,
        myWishlist: {
          ...prev.myWishlist,
          [action.payload.productId]: action.payload,
        },
      };
    case REMOVE_FROM_WISHLIST:
      delete prev.myWishlist[action.payload.productId];
      return prev;

    case SET_MY_CART:
      return { ...prev, myCart: action.payload };

    case SET_MY_WISHLIST:
      return { ...prev, myWishlist: action.payload };

    case SET_LOADING:
      return { ...prev, productLoading: action.payload };

    case INCREMENT_CART_QUANTITY: {
      const PRODUCT_ID = action.payload.productId;
      return {
        ...prev,
        myCart: {
          ...prev.myCart,
          [PRODUCT_ID]: {
            ...prev.myCart[PRODUCT_ID],
            quantity: prev.myCart[PRODUCT_ID].quantity + 1,
          },
        },
      };
    }
    case DECREMENT_CART_QUANTITY: {
      const PRODUCT_ID = action.payload.productId;
      return {
        ...prev,
        myCart: {
          ...prev.myCart,
          [PRODUCT_ID]: {
            ...prev.myCart[PRODUCT_ID],
            quantity: prev.myCart[PRODUCT_ID].quantity - 1,
          },
        },
      };
    }

    case CLEAR_FILTERS:
      return {
        ...prev,
        price: null,
        priceRange: 200000,
        rating: null,
        category: [],
        brand: [],
        other: [],
      };
    default:
      return INITIAL_STATE;
  }
};
