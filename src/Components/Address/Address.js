import React, { useEffect, useState } from "react";
import Modal from "../UI/Modal/Modal";
import "./Address.css";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Config/InitFirebase";
import { ADD_TOAST, SHOES_STORE_USER, WARNING } from "../../Constant/constant";
import { useAuthContext } from "../../Hooks/useAuthContext";
import { useToastContext } from "../../Hooks/useToastContext";
import { createToast } from "../../Utils/toast";
import SelectAddress from "./SelectAddress";

const Address = () => {
  const { userInfo, userAddress, setUserAddress } = useAuthContext();
  const { dispatchToast } = useToastContext();
  const [selectAddressModal, setSelectAddressModal] = useState(false);

  const selectedAddress = userAddress.find(
    (address) => address.isSelected === true
  );

  useEffect(
    () => {
      (async () => {
        try {
          const docRef = doc(db, SHOES_STORE_USER, userInfo.uid);
          const dataRef = await getDoc(docRef);
          if (dataRef.exists()) {
            setUserAddress(dataRef.data().myAddress);
          }
        } catch (error) {
          dispatchToast({
            type: ADD_TOAST,
            payload: createToast(WARNING, error.message),
          });
        }
      })();
    },
    // eslint-disable-next-line
    []
  );

  return (
    <div className="address-section">
      <h3>Delivered to :-</h3>
      {selectedAddress ? (
        <div>
          <h4 className="text-grey-md">{selectedAddress.fullname}</h4>
          <h4 className="text-grey-md">
            {`${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}, ${selectedAddress.zipcode}.`}
          </h4>
          <h4 className="text-grey-md">
            Mobile No:- {selectedAddress.mobileNo}
          </h4>
        </div>
      ) : (
        <h3 className="text-grey-md">Address not selected</h3>
      )}
      <button
        className="btn-changeAddress"
        onClick={() => setSelectAddressModal(true)}
      >
        Change
      </button>
      <Modal
        isOpen={selectAddressModal}
        onClose={() => setSelectAddressModal(false)}
      >
        <div className="address-modal">
          <h1 className="modal-header">Select Address</h1>
          <div className="modal-body custom-scrollbar">
            <SelectAddress onClose={() => setSelectAddressModal(false)} />
          </div>
        </div>
        {/* <div className="modal-btns">
          <button
            className="btn btn-primary"
            //   onClick={submitHandler}
          >
            Save
          </button>
          <button
            className="btn btn-primary"
            onClick={() => setSelectAddressModal(false)}
          >
            Cancel
          </button>
        </div> */}
      </Modal>
    </div>
  );
};

export default Address;
