import React, { useState } from "react";
import CustomerBalancesForm from "../Components/CustomerBalances/CustomerBalancesForm/CustomerBalancesForm";
import CustomerBalancesDetails from "../Components/CustomerBalances/CustomerBalancesDetails/CustomerLedgerDetails";

const CustomerBalances = ({ setLoader, sideDrawerOpened }) => {
  const [customerBalancesDetails, setCustomerBalancesDetails] = useState(null);

  return (
    <div className="m-3 md:m-12 -z-10">
      <div className="bg-gray-200 p-4 md:p-10 rounded-md shadow-lg">
        <h3 className="text-2xl font-semibold text-center">
          Customer Balances
        </h3>
        {/* <hr className="border border-gray-500 my-5" /> */}
        {/* Customer balances Form */}
        <CustomerBalancesForm
          setLoader={setLoader}
          setCustomerBalancesDetails={setCustomerBalancesDetails}
          sideDrawerOpened={sideDrawerOpened}
        />

        {/* customer balances detail */}
        {customerBalancesDetails && (
          <CustomerBalancesDetails
            customerBalancesDetails={customerBalancesDetails}
            sideDrawerOpened={sideDrawerOpened}
          />
        )}
      </div>
    </div>
  );
};

export default CustomerBalances;
