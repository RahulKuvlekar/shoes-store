import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Config/InitFirebase";
import { SHOES_STORE_POST } from "../../Constant/constant";
import "./ProductListing.css";
import ProductCard from "../ProductCard/ProductCard";
import Skeleton from "../UI/Skeleton/Skeleton";

const ProductListing = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const docRef = collection(db, SHOES_STORE_POST);
        const snapshotRef = await getDocs(docRef);
        const data = snapshotRef.docs.map((data) => ({
          productId: data.id,
          ...data.data(),
        }));
        setProductData(data);
      } catch (error) {
        console.log("error ", error.message);
      } finally {
        setIsLoading(false);
      }
    })();

    return () => setProductData([]);
  }, []);
  return (
    <div className="products-listing-section custom-scrollbar">
      <div className="product-listing grid ">
        {isLoading ? (
          <Skeleton counter={10} type="Feed" />
        ) : (
          productData.length > 0 &&
          productData.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default ProductListing;
