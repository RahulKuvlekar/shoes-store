import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { db } from "../../Config/InitFirebase";
import {
  ADD_TOAST,
  SHOES_STORE_USER,
  SUCCESS,
  WARNING,
} from "../../Constant/constant";
import { arrayUnion, doc, setDoc } from "firebase/firestore";
import { useAuthContext } from "../../Hooks/useAuthContext";
import { useToastContext } from "../../Hooks/useToastContext";
import { createToast } from "../../Utils/toast";

const AddressModal = ({ onClose, type = "ADD", defaultAddress }) => {
  const { userInfo, userAddress, setUserAddress } = useAuthContext();
  const { dispatchToast } = useToastContext();
  const INITIAL_STATE = {
    fullname: "",
    street: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
    mobileNo: "",
  };
  const DUMMY_ADDRESS = {
    fullname: "Guest User",
    street: `Flat - ${Math.floor(Math.random() * 100)}, Guest Aparment`,
    city: "GuestCity",
    state: "GuestState",
    country: "India",
    zipcode: `4${Math.floor(Math.random() * 10000)}`,
    mobileNo: "7777777777",
  };

  const [addressInput, setAddressInput] = useState(
    type === "ADD" ? INITIAL_STATE : defaultAddress
  );
  const [addressError, setAddressError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const validate = ({
    fullname,
    street,
    city,
    state,
    country,
    zipcode,
    mobileNo,
  }) => {
    const error = {};
    const regex = /^([0|+[0-9]{1,5})?([0-9]{10})$/;
    if (!fullname) error.fullname = "Fullname is required*";

    if (!street) error.street = "Flat no,State & Colony is required*";

    if (!city) error.city = "City is required*";

    if (!state) error.state = "State is required*";

    if (!country) error.country = "Country is required*";

    if (!zipcode) error.zipcode = "Zipcode is required*";

    if (!mobileNo) error.mobileNo = "Mobile number is required*";
    else if (!regex.test(mobileNo))
      error.mobileNo = "Enter Valid Mobile number";

    return error;
  };

  const resetHandler = (event) => {
    setAddressInput(INITIAL_STATE);
    setAddressError({});
    setIsSubmit(false);
  };

  const inputHandler = (event) => {
    const { name, value } = event.target;
    setAddressInput((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setAddressError(validate(addressInput));
    setIsSubmit(true);
  };

  const focusHandler = (event) => {
    setAddressError({});
    setIsSubmit(false);
  };

  const addUserAddress = async () => {
    const addressData = {
      ...addressInput,
      addressId: uuid(),
      isSelected: false,
    };

    try {
      const docRef = doc(db, SHOES_STORE_USER, userInfo.uid);
      await setDoc(
        docRef,
        {
          myAddress: arrayUnion(addressData),
        },
        { merge: true }
      );

      setUserAddress((prev) => [...prev, addressData]);

      dispatchToast({
        type: ADD_TOAST,
        payload: createToast(SUCCESS, "New Address is been Added"),
      });
    } catch (error) {
      dispatchToast({
        type: ADD_TOAST,
        payload: createToast(WARNING, error.message),
      });
    }
  };
  const editUserAddress = async () => {
    const updateUserAddres = userAddress.map((item) =>
      item.addressId === defaultAddress.addressId ? addressInput : item
    );

    try {
      const docRef = doc(db, SHOES_STORE_USER, userInfo.uid);
      await setDoc(
        docRef,
        {
          myAddress: updateUserAddres,
        },
        { merge: true }
      );

      setUserAddress(updateUserAddres);

      dispatchToast({
        type: ADD_TOAST,
        payload: createToast(SUCCESS, "Address is been updated"),
      });
    } catch (error) {
      dispatchToast({
        type: ADD_TOAST,
        payload: createToast(WARNING, error.message),
      });
    }
  };

  useEffect(() => {
    if (isSubmit && Object.keys(addressError).length === 0) {
      type === "ADD" ? addUserAddress() : editUserAddress();
      resetHandler();
      onClose();
    }

    // eslint-disable-next-line
  }, [isSubmit]);

  return (
    <div className="address-modal">
      <h1 className="modal-header">
        {type === "ADD" ? "Add" : "Edit"} Address
      </h1>
      <div className="modal-body custom-scrollbar">
        <form>
          <div
            className={`input-group ${addressError.fullname && "input-error"}`}
          >
            <input
              type="text"
              placeholder="Enter Fullname"
              name="fullname"
              value={addressInput?.fullname}
              onChange={inputHandler}
              onFocus={focusHandler}
            />
            {addressError.fullname && (
              <p className="input-error-message text-sm">
                {addressError.fullname}{" "}
              </p>
            )}
          </div>
          <div
            className={`input-group ${addressError.street && "input-error"}`}
          >
            <input
              type="text"
              placeholder="Enter Flatno,Street,Colony"
              name="street"
              value={addressInput?.street}
              onChange={inputHandler}
              onFocus={focusHandler}
            />
            {addressError.street && (
              <p className="input-error-message text-sm">
                {addressError.street}{" "}
              </p>
            )}
          </div>
          <div className={`input-group ${addressError.city && "input-error"}`}>
            <input
              type="text"
              placeholder="Enter city"
              name="city"
              value={addressInput?.city}
              onChange={inputHandler}
              onFocus={focusHandler}
            />
            {addressError.city && (
              <p className="input-error-message text-sm">
                {addressError.city}{" "}
              </p>
            )}
          </div>
          <div className={`input-group ${addressError.state && "input-error"}`}>
            <input
              type="text"
              placeholder="Enter State"
              name="state"
              value={addressInput?.state}
              onChange={inputHandler}
              onFocus={focusHandler}
            />
            {addressError.state && (
              <p className="input-error-message text-sm">
                {addressError.state}{" "}
              </p>
            )}
          </div>
          <div
            className={`input-group ${addressError.country && "input-error"}`}
          >
            <input
              type="text"
              placeholder="Enter Country"
              name="country"
              value={addressInput?.country}
              onChange={inputHandler}
              onFocus={focusHandler}
            />
            {addressError.country && (
              <p className="input-error-message text-sm">
                {addressError.country}{" "}
              </p>
            )}
          </div>
          <div
            className={`input-group ${addressError.zipcode && "input-error"}`}
          >
            <input
              type="number"
              placeholder="Enter Zip-code"
              name="zipcode"
              value={addressInput?.zipcode}
              onChange={inputHandler}
              onFocus={focusHandler}
            />
            {addressError.zipcode && (
              <p className="input-error-message text-sm">
                {addressError.zipcode}{" "}
              </p>
            )}
          </div>
          <div
            className={`input-group ${addressError.mobileNo && "input-error"}`}
          >
            <input
              type="text"
              placeholder="Enter Mobile No"
              name="mobileNo"
              value={addressInput?.mobileNo}
              onChange={inputHandler}
              onFocus={focusHandler}
            />
            {addressError.mobileNo && (
              <p className="input-error-message text-sm">
                {addressError.mobileNo}{" "}
              </p>
            )}
          </div>
        </form>
      </div>
      <div className="modal-btns">
        <button
          className="btn btn-primary"
          type="button"
          onClick={submitHandler}
        >
          Save
        </button>
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => {
            resetHandler();
            setAddressInput(DUMMY_ADDRESS);
          }}
        >
          dummy credentials
        </button>
        <button className="btn btn-primary" type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddressModal;
