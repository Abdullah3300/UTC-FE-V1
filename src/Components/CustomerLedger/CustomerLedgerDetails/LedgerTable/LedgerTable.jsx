import React from "react";

const LedgerTable = ({ ledgerDetails }) => {
  return (
    <div className="overflow-x-auto bg-white px-4 rounded-md overflow-y-scroll max-h-96">
      <table className="table table-xs">
        <thead className="bg-white sticky top-0">
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Invoice #</th>
            <th>Description</th>
            <th>Remarks</th>
            {ledgerDetails[0].ReportType === "Detail" && <th>Rate</th>}
            {ledgerDetails[0].ReportType === "Detail" && <th>Qty</th>}
            <th>Debit</th>
            <th>Credit</th>
            <th>Balance</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {ledgerDetails.map((ledgerData, i) => (
            <tr>
              <th>{i + 1}</th>
              <td>
                {ledgerData.Date
                  ? new Date(ledgerData.Date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "-"}
              </td>
              <td>{ledgerData.InvoiceNo || "-"}</td>
              <td>{ledgerData.Description || "-"}</td>
              <td>{ledgerData.Remarks || "-"}</td>
              {ledgerData.ReportType === "Detail" && (
                <td>{ledgerData.Rate || "-"}</td>
              )}
              {ledgerData.ReportType === "Detail" && (
                <td>{ledgerData.Qty || "-"}</td>
              )}

              <td>{ledgerData.Dr || "-"}</td>
              <td>{ledgerData.Cr || "-"}</td>
              <td>{ledgerData.Balance || "-"}</td>
              <td>
                <p className="m-1">{ledgerData.Status || "-"}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LedgerTable;
