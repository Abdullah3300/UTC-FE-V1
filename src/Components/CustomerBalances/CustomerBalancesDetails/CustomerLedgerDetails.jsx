import React from "react";
import CustomerBalanceTable from "./CustomerBalancesTable/CustonerBalancesTable";

const CustomerBalancesDetails = ({
  customerBalancesDetails,
  sideDrawerOpened,
}) => {
  return (
    <div className={`mt-5 ${sideDrawerOpened ? "hidden" : "block"}`}>
      {/* <hr className="border border-gray-500 my-5" /> */}
      <h3 className="text-2xl font-semibold text-center my-5">
        Customer Balances Detail
      </h3>

      {customerBalancesDetails.length === 0 && (
        <p className="p-3">No data found.</p>
      )}
      {customerBalancesDetails.length > 0 && (
        <CustomerBalanceTable
          customerBalancesDetails={customerBalancesDetails}
        />
      )}
    </div>
  );
};

export default CustomerBalancesDetails;
