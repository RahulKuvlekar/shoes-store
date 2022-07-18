import {
  CLEAR_FILTERS,
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
    case CLEAR_FILTERS:
      return INITIAL_STATE;
    default:
      return INITIAL_STATE;
  }
};
