import React, { useState } from "react";
import SaleAndRecoveryForm from "../Components/SaleAndRecovery/SaleAndRecoveryForm/SaleAndRecoveryForm";
import SaleAndRecoveryDetails from "../Components/SaleAndRecovery/SaleAndRecoveryDetails/SaleAndRecoveryDetails";
// import CustomerBalancesDetails from "../Components/CustomerBalances/CustomerBalancesDetails/CustomerLedgerDetails";

const MonthlySaleAndRecovery = ({ setLoader, sideDrawerOpened }) => {
  const [saleAndRecoveryDetails, setSaleAndRecoveryDetails] = useState(null);

  return (
    <div className="m-3 md:m-12 -z-10">
      <div className="bg-gray-200 p-4 md:p-10 rounded-md shadow-lg">
        <h3 className="text-2xl font-semibold text-center">
          Monthly Sale & Recovery
        </h3>
        {/* sale and recovery Form */}
        <SaleAndRecoveryForm
          setLoader={setLoader}
          setSaleAndRecoveryDetails={setSaleAndRecoveryDetails}
          sideDrawerOpened={sideDrawerOpened}
        />

        {/* sales and recovery detail */}
        {saleAndRecoveryDetails && (
          <SaleAndRecoveryDetails
            saleAndRecoveryDetails={saleAndRecoveryDetails}
            sideDrawerOpened={sideDrawerOpened}
          />
        )}
      </div>
    </div>
  );
};

export default MonthlySaleAndRecovery;
