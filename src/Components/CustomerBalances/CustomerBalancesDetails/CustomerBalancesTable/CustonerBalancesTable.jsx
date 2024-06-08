import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import React, { useState } from "react";
import { TbFileExport } from "react-icons/tb";

const CustomerBalanceTable = ({ customerBalancesDetails }) => {
  const [search, setSearch] = useState("");

  const preparePDFBody = () => {
    let body = [];
    customerBalancesDetails.forEach((element, i) => {
      let arr = [
        i + 1,
        element.Code || "-",
        element.CustomerName || "-",
        element.City || "-",
        element.Opening || "-",
        element.Dr || "-",
        element.Cr || "-",
        element.Balance || "-",
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
          "Code",
          "Customer Name",
          "City",
          "Opening",
          "Dr",
          "Cr",
          "Balance",
        ],
      ],
      body: customerBalancesDetails ? preparePDFBody() : [],
    });

    doc.save(`customer-balances.pdf`);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by customer name..."
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

      <div className="overflow-x-auto bg-white px-4 rounded-md overflow-y-scroll h-96">
        <table className="table table-xs">
          <thead className="bg-white sticky top-0">
            <tr>
              <th>#</th>
              <th>Code</th>
              <th>Customer Name</th>
              <th>City</th>
              <th>Opening</th>
              <th>Dr</th>
              <th>Cr</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {customerBalancesDetails ? (
              (() => {
                const filteredCustomers = customerBalancesDetails.filter(
                  (invoice) => {
                    if (search === "") {
                      return true;
                    } else {
                      return invoice.CustomerName.toLowerCase().includes(
                        search.toLowerCase()
                      );
                    }
                  }
                );

                if (filteredCustomers.length === 0) {
                  return (
                    <tr>
                      <td colSpan="9" className="text-center p-4 text-md">
                        No search result found.
                      </td>
                    </tr>
                  );
                }

                return filteredCustomers.map((ledgerData, i) => (
                  <tr>
                    <th>{i + 1}</th>
                    <td>{ledgerData.Code || "-"}</td>
                    <td>{ledgerData.CustomerName || "-"}</td>
                    <td>{ledgerData.City || "-"}</td>
                    <td>{ledgerData.Opening || "-"}</td>
                    <td>{ledgerData.Dr || "-"}</td>
                    <td>{ledgerData.Cr || "-"}</td>
                    <td>
                      <p className="m-1">{ledgerData.Balance || "-"}</p>
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

export default CustomerBalanceTable;
