import React, { useEffect, useRef, useState } from "react";
import {
  clearSessionStorage,
  errorToast,
  formatDate,
  getSingleSaleInvoiceDetails,
  getTotalObjectValueCount,
} from "../../../Utils/utils";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { BsDownload } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";

const SingleInvoiceDetailModal = ({ invoiceId }) => {
  const navigate = useNavigate();

  const [invoiceData, setInvoiceData] = useState(null);
  const [details, setDetails] = useState(null);
  const [customerBioData, setCustomerBioData] = useState(null);
  const [categoryProductsQty, setCategoryProductsQty] = useState(null);
  //Amount before discount
  const [categoriesProductsTotalAmount, setCategoriesProductsTotalAmount] =
    useState(null);
  //Amount after discount
  const [categoriesProductsNetAmount, setCategoriesProductsNetAmount] =
    useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    //set first element of array of first object of invoice data
    if (invoiceData) {
      setCustomerBioData(invoiceData[Object.keys(invoiceData)[0]][0]);
    }
  }, [invoiceData]);
  const componentRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await getSingleSaleInvoiceDetails(invoiceId);
        if (response.data.success === "True") {
          setInvoiceData(response.data.data);
          setDetails(response.data.details);
          setCategoryProductsQty(response.data.categoriesProductsCount);
          setCategoriesProductsTotalAmount(
            response.data.categoriesProductsTotalAmount
          );
          setCategoriesProductsNetAmount(
            response.data.categoriesProductsNetAmount
          );
        } else {
          console.error("Error fetching invoice data");
        }
      } catch (error) {
        if (error.request.status === 401) {
          errorToast("Unauthorized");
          clearSessionStorage();
          navigate("/login");
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (invoiceId) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoiceId]);

  const dateParts = formatDate(details?.invoiceDate).split(" ");

  //Handle print invoice
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div id="revenue-modal">
      <input
        type="checkbox"
        id="invoice-modal"
        className="modal-toggle"
        // onChange={checkModalVisible}
      />
      <label
        htmlFor="invoice-modal"
        // ref={revenueInvoiceModal}
        className="modal"
      >
        <label
          className="modal-box p-0 rounded-none w-[96%] md:w-[44rem] lg:w-[56rem] relative max-w-[56rem]"
          htmlFor=""
          //   ref={modalRef}
        >
          {isLoading ? (
            <div className="p-10 flex justify-center items-center">
              <div role="status">
                <svg
                  aria-hidden="true"
                  class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              <div className=" flex justify-end items-center gap-2 m-2">
                <button
                  className="bg-[#5c7cbc] p-2 text-white text-sm rounded-sm"
                  onClick={handlePrint}
                >
                  <BsDownload className="font-bold text-md" />
                </button>
                <button className="bg-[#5c7cbc] p-2 text-white text-sm rounded-sm cursor-pointer">
                  <label htmlFor="invoice-modal">
                    <RxCross2 className="font-bold text-md cursor-pointer" />
                  </label>
                </button>
              </div>
              <div ref={componentRef} id="revenue-report-container">
                {/* Top Section */}
                <div className="p-4 flex justify-between gap-2">
                  <img
                    src="/images/UTC.png"
                    alt="utc-logo"
                    className="h-7 md:h-14"
                  />
                  <div className="text-[10px] text-center space-y-1">
                    <p className="font-bold text-md md:text-lg">
                      {details?.CompanyName || "USMAN TRADING COMPANY"}
                    </p>
                    <p>
                      {details?.Address ||
                        "HOUSE # 3, STREET # 1, BLOCK 14, LAL BUILDING, SARGODHA"}
                    </p>
                    <p>{details?.Phone || "048-3716999"}</p>
                  </div>
                  <div className="text-center text-xs">
                    {dateParts[0]} <br />
                    <span className="text-lg font-bold">{dateParts[1]}</span>
                    <br />
                    {dateParts[2]} {dateParts[3]}
                  </div>
                </div>

                {/* Horizontal line */}
                <hr className="mx-4 border border-gray-300" />

                {/* Top title */}
                <h1 className="text-center font-semibold text-lg md:text-xl py-3">
                  Sale Invoice
                </h1>

                {/* Invoice id section */}
                <div className="flex justify-between font-medium text-xs md:text-sm px-8 my-2">
                  <span>Invoice ID: {invoiceId}</span>
                </div>

                {/* Information bio section */}
                {customerBioData && (
                  <div className="bg-[#5ABCCC] bg-opacity-30 px-8 py-5 text-xs space-y-2">
                    <div className="grid md:grid-cols-2 gap-4 md:gap-8">
                      <div className="flex gap-5">
                        <p className="font-semibold w-20">Buyer's Code:</p>
                        <p className="flex-1 border-b border-black p-0">
                          {customerBioData.CustomerCode || "N/A"}
                        </p>
                      </div>
                      <div className="flex gap-5">
                        <p className="font-semibold w-20">Buyer's Name:</p>
                        <p className="flex-1 border-b border-black p-0">
                          {customerBioData.CustomerName || "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 md:gap-8">
                      <div className="flex gap-5">
                        <p className="font-semibold w-20">Sales Person:</p>
                        <p className="flex-1 border-b border-black p-0">
                          {customerBioData.SlsName || "N/A"}
                        </p>
                      </div>
                      <div className="flex gap-5">
                        <p className="font-semibold w-20">Address:</p>
                        <p className="flex-1 border-b border-black p-0">
                          {customerBioData.AddressC || "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 md:gap-8">
                      <div className="flex gap-5">
                        <p className="font-semibold w-20">Phone:</p>
                        <p className="flex-1 border-b border-black p-0">
                          {customerBioData.Phonec || "N/A"}
                        </p>
                      </div>
                      <div className="flex gap-5">
                        <p className="font-semibold w-20">City:</p>
                        <p className="flex-1 border-b border-black p-0">
                          {customerBioData.City || "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 md:gap-8">
                      <div className="flex gap-5">
                        <p className="font-semibold w-20">Reference:</p>
                        <p className="flex-1 border-b border-black p-0">
                          {customerBioData.ReferenceNo || "N/A"}
                        </p>
                      </div>

                      <div className="flex gap-5">
                        <p className="font-semibold w-20">Godown:</p>
                        <p className="flex-1 border-b border-black p-0">
                          {customerBioData.GodownName || "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 md:gap-8">
                      <div className="flex gap-5">
                        <p className="font-semibold w-20">Bilty:</p>
                        <p className="flex-1 border-b border-black p-0"></p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Table data */}
                <div className="md:mx-8 m-4 overflow-auto">
                  {/* Header of Table */}
                  <div className="grid grid-cols-12 text-xs font-semibold text-center p-2 bg-[#5c7cbc] text-white min-w-[650px]">
                    <p className="col-span-1">SR. #</p>
                    <p className="col-span-2">Product Code</p>
                    <p className="col-span-2">Product Name</p>
                    <p className="col-span-1">Qty</p>
                    <p className="col-span-1">Rate</p>
                    <p className="col-span-1">Disp</p>
                    <p className="col-span-1">DisRs</p>
                    <p className="col-span-1">NetRate</p>
                    <p className="col-span-2">Amount</p>
                  </div>
                  {/* Body of Table */}
                  {invoiceData &&
                    Object.keys(invoiceData).map((categoryName) => (
                      <div key={categoryName} className="category-section">
                        <p className="category-title text-sm min-w-[650px] font-semibold bg-gray-200 p-1 text-center">
                          {categoryName}
                        </p>
                        {invoiceData[categoryName].map((product, index) => (
                          <div
                            className="grid grid-cols-12 text-[10px] font-semibold p-2 text-center min-w-[650px] border-b"
                            key={index}
                          >
                            <p className="col-span-1">{index + 1}</p>
                            <p className="col-span-2">
                              {product.ProductCode || "-"}
                            </p>
                            <p className="col-span-2">
                              {product.ProductName || "-"}
                            </p>
                            <p className="col-span-1">{product.Qty || "-"}</p>
                            <p className="col-span-1">{product.Rate || "-"}</p>
                            <p className="col-span-1">{product.DisP || 0}%</p>
                            <p className="col-span-1">{product.DisRs || "-"}</p>
                            <p className="col-span-1">
                              {product.NetRate || "-"}
                            </p>
                            <p className="col-span-2">
                              {(product.NetRate * product.Qty).toFixed(2)}
                            </p>
                          </div>
                        ))}
                        {/* Show Total Products Qty of a category */}
                        <div className="grid grid-cols-12 text-[12px] font-semibold p-2 text-center min-w-[650px] border-b">
                          <p className="col-span-1"></p>
                          <p className="col-span-2"></p>
                          <p className="col-span-2"></p>
                          <p className="col-span-1 category-title font-semibold p-1 text-center bg-gray-100">
                            {categoryProductsQty[categoryName]}
                          </p>
                          <p className="col-span-1"></p>
                          <p className="col-span-1"></p>
                          <p className="col-span-1"></p>
                          <p className="col-span-1"></p>
                          <p className="col-span-2 category-title font-semibold p-1 text-center bg-gray-100">
                            {categoriesProductsNetAmount[categoryName]}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>

                {/* Collective info */}
                <div className="flex flex-col md:flex-row justify-between items-center md:mx-8 m-4 my-10">
                  <div className="hidden md:block">
                    <p className="border-[1px] border-black w-44 mb-1"></p>
                    <p className="text-[8px] text-center">
                      AUTHORIZED SIGNATURE
                    </p>
                  </div>
                  <div className="grid grid-cols-2 text-[12px] gap-2 p-1">
                    <p className="border-b">Total Quantity</p>
                    <p className="text-center border-b">
                      {categoryProductsQty &&
                        getTotalObjectValueCount(categoryProductsQty)}
                    </p>
                    <p className="border-b">Total Amount</p>
                    <p className="text-center border-b">
                      {categoriesProductsTotalAmount &&
                        getTotalObjectValueCount(categoriesProductsTotalAmount)}
                    </p>
                    <p className="border-b">Discount</p>
                    <p className="text-center border-b">
                      {categoriesProductsTotalAmount &&
                        categoriesProductsNetAmount &&
                        (
                          getTotalObjectValueCount(
                            categoriesProductsTotalAmount
                          ) -
                          getTotalObjectValueCount(categoriesProductsNetAmount)
                        ).toFixed(1)}
                    </p>
                    <p className="border-b">Net Amount</p>
                    <p className="text-center border-b">
                      {categoriesProductsNetAmount &&
                        getTotalObjectValueCount(categoriesProductsNetAmount)}
                    </p>
                    <p className="border-b">Previous Balance</p>
                    <p className="text-center border-b">
                      {details?.previousBalance || "0"}
                    </p>
                    <p>Total Balance</p>
                    <p className="text-center">
                      {categoriesProductsNetAmount &&
                        (
                          getTotalObjectValueCount(
                            categoriesProductsNetAmount
                          ) + details?.previousBalance
                        ).toFixed(1)}
                    </p>
                  </div>
                  <div className="block md:hidden mt-9">
                    <p className="border-[1px] border-black w-44 mb-1"></p>
                    <p className="text-[8px] text-center">
                      AUTHORIZED SIGNATURE
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="w-full text-xs p-4 opacity-40 text-center">
                  Software developed by GlobalSoft (Contact for software inquiry
                  only) +92-333-8110659
                </div>
              </div>
            </>
          )}
        </label>
      </label>
    </div>
  );
};

export default SingleInvoiceDetailModal;
