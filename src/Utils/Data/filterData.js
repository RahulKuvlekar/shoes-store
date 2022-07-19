import { v4 as uuid } from "uuid";

export const priceFilter = [
  { name: "Low to High", value: "Low to High", id: uuid() },
  { name: "High to Low", value: "High to Low", id: uuid() },
];

export const ratingFilter = [
  {
    name: "5 & Above",
    value: 5,
    id: uuid(),
  },
  {
    name: "4 & Above",
    value: 4,
    id: uuid(),
  },
  {
    name: "3 & Above",
    value: 3,
    id: uuid(),
  },
  {
    name: "2 & Above",
    value: 2,
    id: uuid(),
  },
  {
    name: "1 & Above",
    value: 1,
    id: uuid(),
  },
];

export const otherFilter = [
  { name: "Fast Shipping", value: "FastShipping", id: uuid() },
  { name: "Out of Stock", value: "OutOfStock", id: uuid() },
];
