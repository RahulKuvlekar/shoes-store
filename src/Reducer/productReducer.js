import {
  ADD_PRODUCTS,
  ADD_TO_CART,
  ADD_TO_WISHLIST,
  CLEAR_FILTERS,
  REMOVE_FROM_CART,
  REMOVE_FROM_WISHLIST,
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
      return { ...prev, myCart: [...prev.myCart, action.payload] };
    case REMOVE_FROM_CART:
      return {
        ...prev,
        myCart: [
          ...prev.myCart.filter(
            (product) => product.productId !== action.payload
          ),
        ],
      };
    case ADD_TO_WISHLIST:
      return { ...prev, myWishlist: [...prev.myWishlist, action.payload] };
    case REMOVE_FROM_WISHLIST:
      return {
        ...prev,
        myWishlist: [
          ...prev.myCart.filter(
            (product) => product.productId !== action.payload
          ),
        ],
      };
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
