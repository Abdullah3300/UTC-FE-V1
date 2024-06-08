import React from "react";
import LedgerTable from "./LedgerTable/LedgerTable";
import { TbFileExport } from "react-icons/tb";
import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";

const CustomerLedgerDetails = ({ ledgerDetails, sideDrawerOpened }) => {
  const preparePDFBody = () => {
    let body = [];

    if (ledgerDetails[0].ReportType === "Detail") {
      ledgerDetails.forEach((element, i) => {
        let arr = [
          i + 1,
          element.Date
            ? new Date(element.Date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "-",
          element.InvoiceNo || "-",
          element.Description || "-",
          element.Remarks || "-",
          element.Rate || "-",
          element.Qty || "-",
          element.Dr || "-",
          element.Cr || "-",
          element.Balance || "-",
          element.Status || "-",
        ];
        body.push(arr);
      });
    } else {
      ledgerDetails.forEach((element, i) => {
        let arr = [
          i + 1,
          element.Date
            ? new Date(element.Date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "-",
          element.InvoiceNo || "-",
          element.Description || "-",
          element.Remarks || "-",
          element.Dr || "-",
          element.Cr || "-",
          element.Balance || "-",
          element.Status || "-",
        ];
        body.push(arr);
      });
    }

    return body;
  };

  const exportPDF = async () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head:
        ledgerDetails[0].ReportType === "Detail"
          ? [
              [
                "#",
                "Date",
                "Invoice #",
                "Description",
                "Remarks",
                "Rate",
                "Qty",
                "Debit",
                "Credit",
                "Balance",
                "Status",
              ],
            ]
          : [
              [
                "#",
                "Date",
                "Invoice #",
                "Description",
                "Remarks",
                "Debit",
                "Credit",
                "Balance",
                "Status",
              ],
            ],
      body: ledgerDetails ? preparePDFBody() : [],
    });

    doc.save(`ledger-details.pdf`);
  };

  return (
    <div className={`mt-5 ${sideDrawerOpened ? "hidden" : "block"}`}>
      {/* <hr className="border border-gray-500 my-5" /> */}
      <h3 className="text-lg md:text-2xl font-semibold md:text-center my-5 relative">
        Customer Ledger Detail
        <p
          onClick={() => exportPDF()}
          className="bg-[#28A887] absolute right-0 -top-1 flex items-center gap-1 cursor-pointer text-center  text-xs p-2 text-white m-1 rounded-md font-semibold"
        >
          Export Data
          <TbFileExport className="text-xl" />
        </p>
      </h3>

      {ledgerDetails.length === 0 && (
        <p className="p-3">No ledger data found.</p>
      )}
      {ledgerDetails.length > 0 && (
        <LedgerTable ledgerDetails={ledgerDetails} />
      )}
    </div>
  );
};

export default CustomerLedgerDetails;
