import React, { useState } from "react";
import Modal from "../UI/Modal/Modal";
import "./Address.css";
import { useAuthContext } from "../../Hooks/useAuthContext";
import SelectAddress from "./SelectAddress";

const Address = () => {
  const { userAddress } = useAuthContext();
  const [selectAddressModal, setSelectAddressModal] = useState(false);

  const selectedAddress = userAddress.find(
    (address) => address.isSelected === true
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
      </Modal>
    </div>
  );
};

export default Address;
