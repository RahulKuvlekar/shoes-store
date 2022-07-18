import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categoryData = [
  {
    id: uuid(),
    categoryName: "Men",
    categoryImage: "/Images/Category/men.jpeg",
  },
  {
    id: uuid(),
    categoryName: "Women",
    categoryImage: "/Images/Category/women.jpeg",
  },
  {
    id: uuid(),
    categoryName: "Apparel",
    categoryImage: "/Images/Category/apparel.jpeg",
  },
];
