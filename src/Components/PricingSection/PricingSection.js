import React, { useMemo, useState } from "react";
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
import { FaTags, FaTimes } from "react-icons/fa";

const couponsList = [
  {
    name: "New Year Sale: ₹1000 off on orders above ₹15,000",
    value: 1000,
    id: 1,
    minValue: 15000,
  },
  {
    name: "Clearance Sale: ₹5000 off on orders above ₹50,000",
    value: 5000,
    id: 2,
    minValue: 50000,
  },
];

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
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [couponValue, setCouponValue] = useState(0);

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

  const FINAL_AMOUNT = useMemo(
    () => (TOTAL_PRICE - TOTAL_DISCOUNT - couponValue).toFixed(0),
    [TOTAL_PRICE, TOTAL_DISCOUNT, couponValue]
  );

  const isCODChecked = useMemo(() => {
    if (paymentMode === "COD") return true;
    else if (FINAL_AMOUNT > 500000) return true;
    else return false;
    // eslint-disable-next-line
  }, [paymentMode, FINAL_AMOUNT]);

  const isOnlineChecked = useMemo(() => {
    if (FINAL_AMOUNT > 500000) return false;
    else if (paymentMode === "Online") return true;
    else return false;
    // eslint-disable-next-line
  }, [paymentMode, FINAL_AMOUNT]);

  const closePaymentModal = () => {
    setSelectPaymentModal(false);
    setPaymentMode("");
  };

  const openCouponModal = () => {
    setShowCouponModal(true);
  };

  const closeCouponModal = () => {
    setShowCouponModal(false);
  };

  const placeOrder = async () => {
    try {
      setOrderProcessing(true);
      const orderData = {
        items: Object.values(myCart),
        totalPrice: TOTAL_PRICE.toFixed(2),
        totalDiscount: TOTAL_DISCOUNT.toFixed(2),
        totalDiscountPrice: FINAL_AMOUNT,
        couponDiscount: couponValue,
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
    } finally {
      setOrderProcessing(true);
    }
  };

  const confirmOrderHandler = async () => {
    if (paymentMode === "") {
      dispatchToast({
        type: ADD_TOAST,
        payload: createToast(DANGER, "Please Select payment Mode"),
      });
      return;
    }

    if (paymentMode === "Online") {
      setSelectPaymentModal(false);
      const options = {
        key: "rzp_test_FC6fC3qTUpWJ4Q",
        currency: "INR",
        amount: FINAL_AMOUNT * 100,
        name: "Shoes Store",
        description: "Order for products",
        handler: async function (response) {
          placeOrder();
        },
        prefill: {
          name: userInfo.displayName,
          email: userInfo.email,
          contact: "777777777",
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } else if (paymentMode === "COD") {
      setSelectPaymentModal(false);
      placeOrder();
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
      <div className="coupon-section">
        <h4 onClick={openCouponModal}>
          <FaTags />
          Apply Coupon
        </h4>
        <button
          className="btn btn-outline-primary btn-noShadow"
          onClick={openCouponModal}
        >
          Apply
        </button>
      </div>
      <hr />
      <br />
      <h2 className="price-title">Price Details</h2>
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
          <h4>- ₹ {TOTAL_DISCOUNT.toFixed(2)}</h4>
        </li>
        <li className="price-list text-grey-md">
          <h4 className="coupon-discount-title">
            {couponValue > 0 && <FaTimes onClick={() => setCouponValue(0)} />}
            Coupon Discount
          </h4>
          <h4>- ₹ {couponValue}</h4>
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
          <span className="h3 text-grey-dk">₹ {FINAL_AMOUNT}</span>
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
                  checked={isCODChecked ? true : false}
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
                  checked={isOnlineChecked ? true : false}
                  onChange={() => setPaymentMode("Online")}
                />
                <label htmlFor="payment-Online" className="">
                  {" "}
                  Online Payment (By RazorPay)
                </label>
              </li>
              {FINAL_AMOUNT > 500000 && (
                <h5 className="text-grey-dark">
                  *If Total Bill Amount is greater than 5,00,000 Rs. You cannot
                  select Online Payment Mode
                </h5>
              )}
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
      <Modal isOpen={showCouponModal} onClose={closeCouponModal}>
        <div className="coupon-modal">
          <h1 className="modal-header">Apply Coupon</h1>
          <div className="modal-body custom-scrollbar">
            <ul className="list">
              {couponsList.length > 0 &&
                couponsList.map((coupon) => (
                  <li
                    key={`coupon-list-tag-${coupon.id}`}
                    className={`list-collapsable coupon-tag ${
                      FINAL_AMOUNT >= coupon.minValue ? "" : "invalid-coupon"
                    }`}
                    onClick={() => setCouponValue(coupon.value)}
                  >
                    <input
                      type="radio"
                      name="coupon"
                      id={coupon.id}
                      value={coupon.value}
                      checked={coupon.value === couponValue ? true : false}
                    />
                    <label htmlFor={coupon.id} className="">
                      {" "}
                      {coupon.name}
                    </label>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PricingSection;
