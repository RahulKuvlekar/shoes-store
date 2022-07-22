import React, { useState } from "react";
import "./PricingSection.css";
import { useProductContext } from "../../Hooks/useProductContext";
import { arrayUnion, doc, setDoc } from "firebase/firestore";
import {
  ADD_TOAST,
  CLEAR_CART,
  DANGER,
  SHOES_STORE_USER,
  SUCCESS,
} from "../../Constant/constant";
import { db } from "../../Config/InitFirebase";
import { useAuthContext } from "../../Hooks/useAuthContext";
import { v4 as uuid } from "uuid";
import { MdError } from "react-icons/md";
import Modal from "../UI/Modal/Modal";
import { useToastContext } from "../../Hooks/useToastContext";
import { createToast } from "../../Utils/toast";
import moment from "moment";
import SmallLoader from "../UI/SmallLoader/SmallLoader";

const PricingSection = ({ setOrderStatus }) => {
  const {
    productState: { myCart },
  } = useProductContext();
  const { userInfo, userAddress } = useAuthContext();
  const { dispatchProduct } = useProductContext();
  const { dispatchToast } = useToastContext();
  const [showError, setShowError] = useState(false);
  const [selectPaymentModal, setSelectPaymentModal] = useState(false);
  const [orderProcessing, setOrderProcessing] = useState(false);
  const [paymentMode, setPaymentMode] = useState("");

  const isAddressSelected = userAddress.find(
    (address) => address.isSelected === true
  );

  const TOTAL_PRICE = Object.values(myCart).reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );
  const TOTAL_DISCOUNT = Object.values(myCart).reduce(
    (acc, curr) => acc + (curr.price - curr.discountedPrice) * curr.quantity,
    0
  );

  const closePaymentModal = () => {
    setSelectPaymentModal(false);
    setPaymentMode("");
  };

  const confirmOrderHandler = async () => {
    if (paymentMode === "") {
      dispatchToast({
        type: ADD_TOAST,
        payload: createToast(DANGER, "Please Select payment Mode"),
      });
      return;
    }
    try {
      setOrderProcessing(true);
      const orderData = {
        items: Object.values(myCart),
        totalPrice: TOTAL_PRICE.toFixed(2),
        totalDiscount: TOTAL_DISCOUNT.toFixed(2),
        totalDiscountPrice: (TOTAL_PRICE - TOTAL_DISCOUNT).toFixed(0),
        paymentMode: paymentMode,
        timestamp: moment().valueOf(),
        orderId: uuid(),
        userInfo: isAddressSelected,
      };
      const docRef = doc(db, SHOES_STORE_USER, userInfo.uid);
      await setDoc(docRef, { myOrder: arrayUnion(orderData) }, { merge: true });

      setOrderProcessing(false);
      setOrderStatus({ type: "SUCCESS", orderId: orderData.orderId });

      dispatchProduct({ type: CLEAR_CART });

      dispatchToast({
        type: ADD_TOAST,
        payload: createToast(SUCCESS, "Order Place Successfully 🎉🎉🎉"),
      });
    } catch (error) {
      setOrderProcessing(false);
      dispatchToast({
        type: ADD_TOAST,
        payload: createToast(DANGER, error.message),
      });
    }
  };

  const placeOrderHandler = () => {
    if (!isAddressSelected) {
      setShowError(true);
      return;
    }
    setSelectPaymentModal(true);
  };

  return (
    <div className="price-section">
      <h1 className="price-title">Price Details</h1>
      <br />
      <hr />
      <br />

      {/* list   */}
      <ul className="list item-list">
        {Object.values(myCart).length > 0 &&
          Object.values(myCart).map(({ title, price, quantity, productId }) => (
            <li
              className="price-list text-grey-md"
              key={`PriceSection-Item-${productId}`}
            >
              <span>{title}</span>
              <span>
                ₹{price} * {quantity}
              </span>
            </li>
          ))}
      </ul>

      <hr />

      <ul className="list">
        <li className="price-list text-grey-md">
          <h4>Total MRP</h4>
          <h4>₹ {TOTAL_PRICE.toFixed(2)}</h4>
        </li>

        <li className="price-list text-grey-md">
          <h4>Discount on MRP</h4>
          <h4>₹ {TOTAL_DISCOUNT.toFixed(2)}</h4>
        </li>

        <li className="price-list text-grey-md">
          <h4>Convenience Fee</h4>
          <h4>
            <span className="text-strike">₹199 </span>
            <span className="text-success">FREE</span>
          </h4>
        </li>

        <hr />
        <br />
        <div className="price-list">
          <span className="h3 text-grey-dk">Total Amount</span>
          <span className="h3 text-grey-dk">
            ₹ {(TOTAL_PRICE - TOTAL_DISCOUNT).toFixed(0)}
          </span>
        </div>
      </ul>
      <br />
      <hr />
      <button
        className="btn btn-success btn-place-order"
        onClick={placeOrderHandler}
      >
        Place Order
      </button>
      {!isAddressSelected && showError && (
        <div className="error-message">
          <MdError />
          Please Select Address.
        </div>
      )}
      <Modal isOpen={selectPaymentModal} onClose={closePaymentModal}>
        <div className="payment-modal">
          <h1 className="modal-header">Select Payment Mode</h1>
          <div className="modal-body custom-scrollbar">
            <ul className="list">
              <li className="list-collapsable ">
                <input
                  type="radio"
                  name="payment"
                  id="payment-COD"
                  value="COD"
                  checked={paymentMode === "COD" ? true : false}
                  onChange={() => setPaymentMode("COD")}
                />
                <label htmlFor="payment-COD" className="">
                  {" "}
                  COD (Cash On Delivery)
                </label>
              </li>
              <li className="list-collapsable ">
                <input
                  type="radio"
                  name="payment"
                  id="payment-Online"
                  value="Online"
                  checked={paymentMode === "Online" ? true : false}
                  onChange={() => setPaymentMode("Online")}
                />
                <label htmlFor="payment-Online" className="">
                  {" "}
                  Online Payment (By RazorPay)
                </label>
              </li>
            </ul>
          </div>
        </div>
        <div className="modal-btns">
          <button className="btn btn-primary" onClick={confirmOrderHandler}>
            {orderProcessing ? <SmallLoader size="sm" /> : "Confirm"}
          </button>
          <button className="btn btn-primary" onClick={closePaymentModal}>
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default PricingSection;
