import React from "react";
import CustomerInvoiceTable from "./CustomerInvoiceTable/CustomerInvoiceTable";

const CustomerInvoiceDetails = ({
  invoiceDetails,
  setInvoiceId,
  sideDrawerOpened,
}) => {
  return (
    <div className="mt-5">
      {/* <hr className="border border-gray-500 my-5" /> */}
      <h3 className="text-2xl font-semibold text-center my-5">
        Customer Invoice Detail
      </h3>

      {invoiceDetails.length === 0 && (
        <p className="p-3">No invoice data found.</p>
      )}
      {invoiceDetails.length > 0 && (
        <CustomerInvoiceTable
          invoiceDetails={invoiceDetails}
          setInvoiceId={setInvoiceId}
          sideDrawerOpened={sideDrawerOpened}
        />
      )}
    </div>
  );
};

export default CustomerInvoiceDetails;
