import React, { useEffect, useState } from "react";
import { db } from "../../Config/InitFirebase";
import { doc, getDoc } from "firebase/firestore";
import { SHOES_STORE_USER } from "../../Constant/constant";
import { useAuthContext } from "../../Hooks/useAuthContext";
import Loader from "../../Components/UI/Loader/Loader";
import OrderCard from "../../Components/OrderCard/OrderCard";

const MyOrder = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [orderData, setOrderData] = useState([]);
  const { userInfo } = useAuthContext();

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const docRef = doc(db, SHOES_STORE_USER, userInfo.uid);
        const dataRef = await getDoc(docRef);
        if (dataRef.exists()) {
          const data = dataRef.data().myOrder;
          setOrderData(data);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    })();
    // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      <h1 className="profile-title">Order</h1>
      <div>{isLoading && <Loader />}</div>
      <div>
        {[...orderData]
          .sort((a, b) => b.timestamp - a.timestamp)
          .map((order) => (
            <OrderCard key={`order-card-${order.orderId}`} orderData={order} />
          ))}
      </div>
    </React.Fragment>
  );
};

export default MyOrder;
