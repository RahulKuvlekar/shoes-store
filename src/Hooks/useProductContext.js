import { useContext } from "react";
import { ProductContext } from "../Context/ProductContext";

const useProductContext = () => useContext(ProductContext);

export { useProductContext };
