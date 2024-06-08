import React, { useState } from "react";
import CustomerLedgerForm from "../Components/CustomerLedger/CustomerLedgerForm/CustomerLedgerForm";
import CustomerLedgerDetails from "../Components/CustomerLedger/CustomerLedgerDetails/CustomerLedgerDetails";

const CustomerLedger = ({ setLoader, sideDrawerOpened }) => {
  const [ledgerDetails, setLedgerDetails] = useState(null);

  return (
    <div className="m-3 md:m-12 -z-10">
      <div className="bg-gray-200 p-4 md:p-10 rounded-md shadow-lg">
        <h3 className="text-2xl font-semibold text-center">Customer Ledger</h3>
        {/* <hr className="border border-gray-500 my-5" /> */}
        {/* Ledger Form */}
        <CustomerLedgerForm
          setLoader={setLoader}
          setLedgerDetails={setLedgerDetails}
          sideDrawerOpened={sideDrawerOpened}
        />

        {/* Ledger detail */}
        {ledgerDetails && (
          <CustomerLedgerDetails
            ledgerDetails={ledgerDetails}
            sideDrawerOpened={sideDrawerOpened}
          />
        )}
      </div>
    </div>
  );
};

export default CustomerLedger;
