import React, { useState } from "react";
import CustomerInvoiceForm from "../Components/CustomerInvoice/CustomerInvoiceForm/CustomerInvoiceForm";
import CustomerInvoiceDetails from "../Components/CustomerInvoice/CustomerInvoiceDetails/CustomerInvoiceDetails";
import SingleInvoiceDetailModal from "../Components/CustomerInvoice/SingleInvoiceDetailModal/SingleInvoiceDetailModal";

const CustomerInvoice = ({ setLoader, sideDrawerOpened }) => {
  const [invoiceDetails, setInvoiceDetails] = useState(null);
  const [invoiceId, setInvoiceId] = useState(null);

  return (
    <div className="m-3 md:m-12 -z-10">
      <div className="bg-gray-200 p-4 md:p-10 rounded-md shadow-lg">
        <h3 className="text-2xl font-semibold text-center">Customer Invoice</h3>
        {/* <hr className="border border-gray-500 my-5" /> */}
        {/* Customer Invoice Form */}
        <CustomerInvoiceForm
          setLoader={setLoader}
          setInvoiceDetails={setInvoiceDetails}
          sideDrawerOpened={sideDrawerOpened}
        />

        {/* customer invoice detail */}
        {invoiceDetails && (
          <CustomerInvoiceDetails
            invoiceDetails={invoiceDetails}
            setInvoiceId={setInvoiceId}
            sideDrawerOpened={sideDrawerOpened}
          />
        )}
      </div>

      {/* Modal to show single invoice details  */}
      <SingleInvoiceDetailModal invoiceId={invoiceId} />
    </div>
  );
};

export default CustomerInvoice;
