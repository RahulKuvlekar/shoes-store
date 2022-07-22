import React from "react";
import SelectAddress from "../../Components/Address/SelectAddress";

const MyAddress = () => {
  return (
    <React.Fragment>
      <h1 className="profile-title">Address</h1>
      <div className="profile-description">
        <SelectAddress />
      </div>
    </React.Fragment>
  );
};

export default MyAddress;
