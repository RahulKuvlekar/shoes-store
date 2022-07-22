import React, { useState } from "react";
import { useAuthContext } from "../../Hooks/useAuthContext";
import Modal from "../UI/Modal/Modal";
import AddressModal from "./AddressModal";
import { useToastContext } from "../../Hooks/useToastContext";
import AddressCard from "./AddressCard";
import { FaPlus } from "react-icons/fa";

const SelectAddress = () => {
  const { userAddress } = useAuthContext();
  useToastContext();
  const [addressModal, setAddressModal] = useState(false);

  return (
    <React.Fragment>
      <button
        className="btn-addNewAddess"
        onClick={() => setAddressModal(true)}
      >
        <FaPlus /> Add Address
      </button>
      <ul className="list address-card-listing">
        {userAddress.map((item) => (
          <AddressCard
            item={item}
            key={`address-card-list-${item.addressId}`}
          />
        ))}
      </ul>

      <Modal isOpen={addressModal} onClose={() => setAddressModal(false)}>
        <AddressModal onClose={() => setAddressModal(false)} />
      </Modal>
    </React.Fragment>
  );
};

export default SelectAddress;
