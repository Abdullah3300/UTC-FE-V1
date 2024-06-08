import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import React, { useState } from "react";
import { TbFileExport } from "react-icons/tb";

const CustomerInvoiceTable = ({
  invoiceDetails,
  setInvoiceId,
  sideDrawerOpened,
}) => {
  const [search, setSearch] = useState("");

  const preparePDFBody = () => {
    let body = [];
    invoiceDetails.forEach((element, i) => {
      let arr = [
        i + 1,
        element.InvoiceNo || "-",
        element.ReferenceNo || "-",
        element.Date
          ? new Date(element.Date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : "-",
        element.CustomerCode || "-",
        element.CustomerName || "-",
        element.Amount || "-",
        element.Remarks || "-",
      ];
      body.push(arr);
    });

    return body;
  };

  const exportPDF = async () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [
        [
          "#",
          "Invoice #",
          "Reference",
          "Date",
          "Party Code",
          "Party Name",
          "Amount",
          "Remarks",
        ],
      ],
      body: invoiceDetails ? preparePDFBody() : [],
    });

    doc.save(`invoice-details.pdf`);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by party name..."
          className="my-3 px-3 py-2 rounded-md text-[14px] w-72"
          onChange={(e) => setSearch(e.target.value)}
        />
        <p
          onClick={() => exportPDF()}
          className="bg-[#28A887] flex items-center gap-1 cursor-pointer text-center  text-xs p-2 text-white m-1 rounded-md font-semibold"
        >
          Export Data
          <TbFileExport className="text-xl" />
        </p>
      </div>
      <div
        className={`overflow-x-auto px-4 bg-white rounded-md overflow-y-scroll h-96 ${
          sideDrawerOpened ? "hidden" : "block"
        }`}
      >
        <table className="table table-xs">
          <thead className="bg-white sticky top-0">
            <tr>
              <th>#</th>
              <th>Invoice #</th>
              <th>Reference</th>
              <th>Date</th>
              <th>Party Code</th>
              <th>Party Name</th>
              <th>Amount</th>
              <th>Remarks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoiceDetails ? (
              (() => {
                const filteredInvoices = invoiceDetails.filter((invoice) => {
                  if (search === "") {
                    return true;
                  } else {
                    return invoice.CustomerName.toLowerCase().includes(
                      search.toLowerCase()
                    );
                  }
                });

                if (filteredInvoices.length === 0) {
                  return (
                    <tr>
                      <td colSpan="9" className="text-center p-4 text-md">
                        No search result found.
                      </td>
                    </tr>
                  );
                }

                return filteredInvoices.map((invoiceData, i) => (
                  <tr key={invoiceData.InvoiceNo || i}>
                    <th>{i + 1}</th>
                    <td>{invoiceData.InvoiceNo || "-"}</td>
                    <td>{invoiceData.ReferenceNo || "-"}</td>
                    <td>
                      {invoiceData.Date
                        ? new Date(invoiceData.Date).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )
                        : "-"}
                    </td>
                    <td>{invoiceData.CustomerCode || "-"}</td>
                    <td>{invoiceData.CustomerName || "-"}</td>
                    <td>{invoiceData.Amount || "-"}</td>
                    <td>{invoiceData.Remarks || "-"}</td>
                    <td onClick={() => setInvoiceId(invoiceData.InvoiceNo)}>
                      <label htmlFor="invoice-modal">
                        <p className="bg-[#28A887] cursor-pointer text-center p-2 text-white w-24 m-1 rounded-md font-semibold">
                          View invoice
                        </p>
                      </label>
                    </td>
                  </tr>
                ));
              })()
            ) : (
              <p className="py-8">Loading...</p>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CustomerInvoiceTable;
