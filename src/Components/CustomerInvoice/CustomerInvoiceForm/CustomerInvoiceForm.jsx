import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import {
  clearSessionStorage,
  errorToast,
  getCustomersDetail,
  getSaleInvoiceList,
  getStructuredCustomerIdData,
  getStructuredCustomerNameData,
} from "../../../Utils/utils";
import { useNavigate } from "react-router-dom";

const CustomerInvoiceForm = ({
  setLoader,
  setInvoiceDetails,
  sideDrawerOpened,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, // Add setValue from useForm
    clearErrors,
  } = useForm();

  //Label should be Customer Code and value Customer Name
  const [customerCode, setCustomerCode] = useState("");
  //Label should be Customer Name and value Customer Code
  const [customerName, setCustomerName] = useState("");

  const [customersIdData, setCustomersIdData] = useState([]);
  const [customersNameData, setCustomersNameData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getInvoiceData = async () => {
      try {
        setLoader(true);
        const response = await getCustomersDetail();
        const invoiceList = await getSaleInvoiceList();
        setLoader(false);

        if (response.data.error) {
          //show error message
          errorToast(response.data.error);
        } else if (response.data.success) {
          //Save data in structured form that dropdown required
          setCustomersIdData(getStructuredCustomerIdData(response.data.data));
          setCustomersNameData(
            getStructuredCustomerNameData(response.data.data)
          );
        }
        if (invoiceList.data.error) {
          //show error message
          errorToast(invoiceList.data.error);
        } else if (invoiceList.data.success) {
          //Save data to show
          setInvoiceDetails(invoiceList.data.data);
        }
      } catch (error) {
        setLoader(false);
        if (error.request.status === 401) {
          errorToast("Unauthorized");
          clearSessionStorage();
          navigate("/login");
        }
      }
    };

    //Calling function
    getInvoiceData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Account Code handler
  const handleAccountCodeChange = (selectedOption) => {
    //selectedOption contains -> label is Customer Code and value is Customer Name

    //set value for Customer Code dropdown itself
    setCustomerCode(selectedOption);

    //set value for Customer Name Dropdown
    setCustomerName({
      label: selectedOption.value,
      value: selectedOption.label,
    });

    //set Values for fields based on Account name
    setValue("accountName", selectedOption?.value || "");
    setValue("accountCode", selectedOption?.label || "");

    //Remove validation errors if occurred
    clearErrors("accountName");
    clearErrors("accountCode");
  };

  //Account Name handler
  const handleAccountNameChange = (selectedOption) => {
    //selectedOption contains -> label is Customer Name and value is Customer Code

    //set value for Customer Name dropdown itself
    setCustomerName(selectedOption);

    //set value for Customer Code Dropdown
    setCustomerCode({
      label: selectedOption.value,
      value: selectedOption.label,
    });

    //set Values for fields based on Account name
    setValue("accountName", selectedOption?.label || "");
    setValue("accountCode", selectedOption?.value || "");

    //Remove validation errors if occurred
    clearErrors("accountName");
    clearErrors("accountCode");
  };

  //Form submit handler
  const handleInvoiceFormSubmit = async (data) => {
    try {
      setLoader(true);
      const response = await getSaleInvoiceList(data);
      setLoader(false);

      if (response.data.error) {
        //show error message
        errorToast(response.data.error);
      } else if (response.data.success) {
        //set Ledger Details Data
        setInvoiceDetails(response.data.data);
      }
    } catch (error) {
      setLoader(false);
      if (error.request.status === 401) {
        errorToast("Unauthorized");
        clearSessionStorage();
        navigate("/login");
      }
    }

    // console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(handleInvoiceFormSubmit)}
      className="w-full mt-8"
    >
      {/* Account code & Account Name */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 ${
          sideDrawerOpened ? "hidden" : "block"
        }`}
      >
        <div>
          <label
            htmlFor="accountName"
            className="block text-sm font-medium text-gray-700"
          >
            Select Account Code
            <span className="text-gray-500 text-[9px] ml-1">(optional)</span>
          </label>
          <Select
            name="accountCode"
            id="accountCode"
            {...register("accountCode")}
            onChange={(selectedOption) => {
              handleAccountCodeChange(selectedOption);
            }}
            options={customersIdData}
            value={customerCode}
            className="mt-1 rounded-md shadow-sm focus:ring-[#28A887] focus:border-[#28A887] sm:text-sm"
          />
          {errors.accountCode && (
            <p className="text-red-500 text-[11px] mt-1">
              {errors.accountCode.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="accountName"
            className="block text-sm font-medium text-gray-700"
          >
            Select Account Name
            <span className="text-gray-500 text-[9px] ml-1">(optional)</span>
          </label>
          <Select
            name="accountName"
            id="accountName"
            {...register("accountName")}
            onChange={(selectedOption) => {
              handleAccountNameChange(selectedOption);
            }}
            options={customersNameData}
            value={customerName}
            className="mt-1 rounded-md shadow-sm focus:ring-[#28A887] focus:border-[#28A887] sm:text-sm"
          />
          {errors.accountName && (
            <p className="text-red-500 text-[11px] mt-1">
              {errors.accountName.message}
            </p>
          )}
        </div>
      </div>

      {/* Start Date & End date */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label
            htmlFor="startDate"
            className="block text-sm font-medium text-gray-700"
          >
            Select Start Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="startDate"
            {...register("startDate", { required: "Start Date is required" })}
            className="min-h-[37px] mt-1 block w-full border-gray-400 px-2 rounded-[3px] shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.startDate && (
            <p className="text-red-500 text-[11px] mt-1">
              {errors.startDate.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="endDate"
            className="block text-sm font-medium text-gray-700"
          >
            Select End Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="endDate"
            {...register("endDate", { required: "End Date is required" })}
            className="min-h-[37px] mt-1 block w-full border-gray-400 px-2 rounded-[3px] shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.endDate && (
            <p className="text-red-500 text-[11px] mt-1">
              {errors.endDate.message}
            </p>
          )}
        </div>
      </div>

      <div className="mt-4 md:my-8 flex justify-center items-center">
        <button
          type="submit"
          className="w-full md:max-w-sm bg-[#28A887] hover:bg-[#19c496] text-white py-2 px-4 rounded-md"
        >
          Display Invoice
        </button>
      </div>
    </form>
  );
};

export default CustomerInvoiceForm;
