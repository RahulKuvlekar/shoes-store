import { arrayRemove, doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { db } from "../../Config/InitFirebase";
import {
  ADD_TOAST,
  INFO,
  SHOES_STORE_USER,
  WARNING,
} from "../../Constant/constant";
import { useAuthContext } from "../../Hooks/useAuthContext";
import { useToastContext } from "../../Hooks/useToastContext";
import { createToast } from "../../Utils/toast";
import Modal from "../UI/Modal/Modal";
import AddressModal from "./AddressModal";

const AddressCard = ({ item }) => {
  const { userInfo, userAddress, setUserAddress } = useAuthContext();
  const { dispatchToast } = useToastContext();
  const [editAddress, setEditAddress] = useState(false);

  const selectNewAddress = async (address) => {
    const updateAddressData = userAddress.map((item) =>
      item.addressId === address.addressId
        ? { ...item, isSelected: true }
        : { ...item, isSelected: false }
    );

    try {
      const docRef = doc(db, SHOES_STORE_USER, userInfo.uid);
      await setDoc(
        docRef,
        {
          myAddress: updateAddressData,
        },
        { merge: true }
      );

      setUserAddress(updateAddressData);
    } catch (error) {}
  };
  const deleteAddress = async (address) => {
    try {
      const docRef = doc(db, SHOES_STORE_USER, userInfo.uid);
      await setDoc(
        docRef,
        {
          myAddress: arrayRemove(address),
        },
        { merge: true }
      );

      setUserAddress((prev) =>
        prev.filter((item) => item.addressId !== address.addressId)
      );
      dispatchToast({
        type: ADD_TOAST,
        payload: createToast(INFO, "Address Deleted Succesfully"),
      });
    } catch (error) {
      dispatchToast({
        type: ADD_TOAST,
        payload: createToast(WARNING, error.message),
      });
    }
  };
  return (
    <React.Fragment>
      <li
        className="list-collapsable address-card"
        key={`user-address-${item.addressId}`}
      >
        <input
          type="radio"
          name="address"
          id={item.addressId}
          value={item.addressId}
          checked={item.isSelected ? true : false}
          onChange={() => selectNewAddress(item)}
        />
        <label htmlFor={item.addressId} className="address-label">
          <h4>{item.fullname}</h4>
          {`${item.street}, ${item.city}, ${item.state}, ${item.country}, ${item.zipcode} `}
          <p>Mobile No -{item.mobileNo}</p>
        </label>
        <div className="address-btn">
          <FaEdit onClick={() => setEditAddress(true)} />
          <FaTrash onClick={() => deleteAddress(item)} />
        </div>
      </li>
      <Modal isOpen={editAddress} onClose={() => setEditAddress(false)}>
        <AddressModal
          onClose={() => setEditAddress(false)}
          type="EDIT"
          defaultAddress={item}
        />
      </Modal>
    </React.Fragment>
  );
};

export default AddressCard;
