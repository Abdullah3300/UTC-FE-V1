import React, { useState } from "react";

const SaleAndRecoveryDetails = ({
  saleAndRecoveryDetails,
  sideDrawerOpened,
}) => {
  const [search, setSearch] = useState("");

  return (
    <div className={`mt-5 ${sideDrawerOpened ? "hidden" : "block"}`}>
      {/* <hr className="border border-gray-500 my-5" /> */}
      <h3 className="text-lg md:text-2xl font-semibold md:text-center my-5 relative">
        Sales & Recovery Analysis
      </h3>

      {saleAndRecoveryDetails.data.length === 0 &&
        saleAndRecoveryDetails.headers.length === 0 && (
          <p className="p-3">No Sale & Recovery data found.</p>
        )}

      {/* Sale and recovery Matrix */}
      {saleAndRecoveryDetails.data.length > 0 &&
        saleAndRecoveryDetails.headers.length > 0 && (
          <>
            <input
              type="text"
              placeholder="Search by customer name..."
              className="my-3 px-3 py-2 rounded-md text-[14px] w-72"
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="parent w-full overflow-x-auto thin-scrollbar h-[500px] overflow-y-auto">
              {/* Headers */}
              <div>
                {/* 1st row */}
                <div className="flex">
                  {/* Empty header column */}
                  <div className="flex-none w-[70px] bg-white p-1 m-[1px]"></div>
                  {/* Empty header column */}
                  <div className="flex-none w-[200px] bg-white p-1 m-[1px]"></div>
                  {saleAndRecoveryDetails.headers.map((header, index) => (
                    <div
                      className="flex-none bg-white w-[348px] m-[1px] text-center p-1 font-semibold"
                      key={index}
                    >
                      {header}
                    </div>
                  ))}
                  {/* Empty header column */}
                  <div className="flex-none w-[100px] bg-white p-1 m-[1px]"></div>
                </div>
                {/* 2nd row */}
                <div className="flex">
                  {/* Empty header column */}
                  <div className="flex-none w-[70px] bg-white p-1 m-[1px]"></div>
                  {/* Empty header column */}
                  <div className="flex-none w-[200px] bg-white p-1 m-[1px]"></div>
                  {saleAndRecoveryDetails.headers.map((header, index) => (
                    <div
                      className="flex-none w-[350px] text-xs font-semibold"
                      key={index}
                    >
                      <div className="flex">
                        <p className="w-[33%] text-center p-1 bg-white  m-[1px]">
                          Sales
                        </p>
                        <p className="w-[33%] text-center p-1 bg-white  m-[1px]">
                          Receipts
                        </p>
                        <p className="w-[33%] text-center p-1 bg-white  m-[1px]">
                          Cheques
                        </p>
                      </div>
                    </div>
                  ))}
                  {/* Column for balance field */}
                  {saleAndRecoveryDetails.headers.map((header, index) => (
                    <>
                      <div className="flex">
                        {index ===
                          saleAndRecoveryDetails.headers.length - 1 && (
                          <div className=" flex-none text-center p-1 bg-white  m-[1px] w-[100px] text-xs font-semibold">
                            Balance
                          </div>
                        )}
                      </div>
                    </>
                  ))}
                </div>
              </div>
              {/* Body of headers */}
              <div>
                {/* row */}
                {saleAndRecoveryDetails
                  ? (() => {
                      const filteredData = saleAndRecoveryDetails?.data?.filter(
                        (data) => {
                          if (search === "") {
                            return true;
                          } else {
                            return data.CustomerName.toLowerCase().includes(
                              search.toLowerCase()
                            );
                          }
                        }
                      );

                      if (filteredData.length === 0) {
                        return (
                          <p className="text-center p-4 text-md">
                            No search result found.
                          </p>
                        );
                      }

                      return filteredData?.map((data) => (
                        <div className="flex">
                          {/* AcNo of Customer */}
                          <div className="flex-none w-[70px] p-1 text-xs bg-white m-[1px] text-center">
                            {data.AcNo}
                          </div>
                          {/* Name of Customer */}
                          <div className="flex-none w-[200px] p-1 text-xs bg-white m-[1px]">
                            {data.CustomerName}
                          </div>
                          {/* Transactions details of customers */}
                          {saleAndRecoveryDetails.headers.map(
                            (header, index) => {
                              //Extract Transaction objects from saleAndRecoveryDetails
                              // if its Date is equal to header
                              const transactionsData = data.Transactions.filter(
                                (data) => data.Date === header
                              );

                              //Columns values that must be shown on each header
                              const defaultColumns = {
                                Sales: 0,
                                Receipts: 0,
                                Cheques: 0,
                              };

                              transactionsData.forEach((transaction) => {
                                switch (
                                  transaction.TransationDescription.trim()
                                ) {
                                  case "Sales":
                                    defaultColumns.Sales = transaction.Bal;
                                    break;
                                  case "Receipts":
                                    defaultColumns.Receipts = transaction.Bal;
                                    break;
                                  case "Cheques":
                                    defaultColumns.Cheques = transaction.Bal;
                                    break;

                                  default:
                                    break;
                                }
                              });

                              return (
                                <div
                                  className="flex-none w-[350px] text-xs "
                                  key={index}
                                >
                                  <div className="flex  h-[100%]">
                                    <p className="w-[33%] text-center bg-white p-1 m-[1px] flex justify-center items-center">
                                      {defaultColumns.Sales || "-"}
                                    </p>
                                    <p className="w-[33%] text-center bg-white p-1 m-[1px] flex justify-center items-center">
                                      {defaultColumns.Receipts || "-"}
                                    </p>
                                    <p className="w-[33%] text-center bg-white p-1 m-[1px] flex justify-center items-center">
                                      {defaultColumns.Cheques || "-"}
                                    </p>
                                  </div>
                                </div>
                              );
                            }
                          )}
                          <div className="flex-none w-[100px] p-1 text-xs bg-white m-[1px] text-center flex justify-center items-center">
                            {data.Balance || "-"}
                          </div>
                        </div>
                      ));
                    })()
                  : "Loading..."}
              </div>
            </div>
          </>
        )}
    </div>
  );
};

export default SaleAndRecoveryDetails;
