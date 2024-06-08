import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import {
  clearSessionStorage,
  errorToast,
  getAllInvoices,
  getCategories,
  getCustomersDetail,
  getLedgerDetails,
  getStructuredCustomerIdData,
  getStructuredCustomerNameData,
} from "../../../Utils/utils";
import { useNavigate } from "react-router-dom";

const CustomerLedgerForm = ({
  setLoader,
  setLedgerDetails,
  sideDrawerOpened,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue, // Add setValue from useForm
    clearErrors,
  } = useForm();

  //Label should be Customer Code and value Customer Name
  const [customerCode, setCustomerCode] = useState("");
  //Label should be Customer Name and value Customer Code
  const [customerName, setCustomerName] = useState("");
  const [customerData, setCustomerData] = useState([]);
  const [customersIdData, setCustomersIdData] = useState([]);
  const [customersNameData, setCustomersNameData] = useState([]);
  const [invoicesData, setInvoicesData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getCustomersData = async () => {
      try {
        setLoader(true);
        const response = await getCustomersDetail();
        const invoices = await getAllInvoices();
        const categories = await getCategories();
        setLoader(false);

        if (response.data.error) {
          //show error message
          errorToast(response.data.error);
        } else if (response.data.success) {
          //Save data as it is getting from backend
          setCustomerData(response.data.data);
          //Save data in structured form that dropdown required
          setCustomersIdData(getStructuredCustomerIdData(response.data.data));
          setCustomersNameData(
            getStructuredCustomerNameData(response.data.data)
          );
        }
        // *********************************************************
        if (invoices.data.error) {
          //show error message
          errorToast(invoices.data.error);
        } else if (invoices.data.success) {
          //Save data as it is getting from backend
          setInvoicesData(invoices.data.data);
        }
        // *********************************************************
        if (categories.data.error) {
          //show error message
          errorToast(categories.data.error);
        } else if (categories.data.success) {
          //Save data as it is getting from backend
          setCategoriesData(categories.data.data);
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
    getCustomersData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Account Code handler
  const handleAccountCodeChange = (selectedOption) => {
    //selectedOption contains -> label is Customer Code and value is Customer Name

    //Find the customer whose code is selected
    const selectedCustomer = customerData.find(
      (item) => item.CustomerCode === selectedOption?.label
    );

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
    setValue("address", selectedCustomer?.Address || "N/A");
    setValue("city", selectedCustomer?.City || "N/A");

    //Remove validation errors if occurred
    clearErrors("accountName");
    clearErrors("accountCode");
    clearErrors("address");
    clearErrors("city");
  };
  //Account Name handler
  const handleAccountNameChange = (selectedOption) => {
    //selectedOption contains -> label is Customer Name and value is Customer Code

    //Find the customer whose name is selected
    const selectedCustomer = customerData.find(
      (item) => item.CustomerCode === selectedOption?.value
    );

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
    setValue("address", selectedCustomer?.Address || "N/A");
    setValue("city", selectedCustomer?.City || "N/A");

    //Remove validation errors if occurred
    clearErrors("accountName");
    clearErrors("accountCode");
    clearErrors("address");
    clearErrors("city");
  };

  //Form submit handler
  const handleLedgerFormSubmit = async (data) => {
    try {
      setLoader(true);
      const response = await getLedgerDetails(data);
      setLoader(false);

      if (response.data.error) {
        //show error message
        errorToast(response.data.error);
      } else if (response.data.success) {
        //set Ledger Details Data
        setLedgerDetails(response.data.data);
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

  return (
    <form
      onSubmit={handleSubmit(handleLedgerFormSubmit)}
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
            Select Account Code <span className="text-red-500">*</span>
          </label>
          <Select
            name="accountCode"
            id="accountCode"
            {...register("accountCode", {
              required: "Account Code is required",
            })}
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
            Select Account Name <span className="text-red-500">*</span>
          </label>
          <Select
            name="accountName"
            id="accountName"
            {...register("accountName", {
              required: "Account Name is required",
            })}
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
      {/* Address & City */}
      {getValues("accountName") && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              disabled
              {...register("address", { required: "Address is required" })}
              className="min-h-[37px] bg-white mt-1 block w-full border-gray-400 px-2 rounded-[3px] shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.address && (
              <p className="text-red-500 text-[11px] mt-1">
                {errors.address.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              disabled
              {...register("city", { required: "City is required" })}
              className="min-h-[37px] bg-white mt-1 block w-full border-gray-400 px-2 rounded-[3px] shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.city && (
              <p className="text-red-500 text-[11px] mt-1">
                {errors.city.message}
              </p>
            )}
          </div>
        </div>
      )}
      {/* Start Date & End date */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label
            htmlFor="startDate"
            className="block text-sm font-medium text-gray-700"
          >
            Start Date <span className="text-red-500">*</span>
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
            End Date <span className="text-red-500">*</span>
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

      {/* Invoice Type & Categories */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 ${
          sideDrawerOpened ? "hidden" : "block"
        }`}
      >
        <div>
          <label
            htmlFor="invoiceType"
            className="block text-sm font-medium text-gray-700"
          >
            Select Invoice Type
            <span className="text-gray-500 text-[9px] ml-1">(optional)</span>
          </label>
          <Select
            name="invoiceType"
            id="invoiceType"
            {...register("invoiceType")}
            // value={invoiceData.find(
            //   (item) => item.value === getValues("invoiceType")
            // )}
            onChange={(selectedOption) => {
              setValue("invoiceType", selectedOption?.label || ""); // Set value here
              clearErrors("invoiceType"); // Clear errors when a value is selected
            }}
            options={invoicesData}
            className="mt-1 rounded-md shadow-sm focus:ring-[#28A887] focus:border-[#28A887] sm:text-sm"
          />
          {errors.invoiceType && (
            <p className="text-red-500 text-[11px] mt-1">
              {errors.invoiceType.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="categories"
            className="block text-sm font-medium text-gray-700"
          >
            Select Categories <span className="text-red-500">*</span>
            <span className="text-[10px] text-gray-500 ml-2">
              You can choose more than one
            </span>
          </label>
          <Select
            name="categories"
            id="categories"
            {...register("categories", {
              required: "Categories are required",
            })}
            onChange={(selectedOptions) => {
              const selectedValues = selectedOptions
                ? selectedOptions.map((option) => option.value)
                : [];
              setValue("categories", selectedValues);
              clearErrors("categories");
            }}
            options={categoriesData}
            isMulti
            className="mt-1 rounded-md shadow-sm focus:ring-[#28A887] focus:border-[#28A887] sm:text-sm"
          />
          {errors.categories && (
            <p className="text-red-500 text-[11px] mt-1">
              {errors.categories.message}
            </p>
          )}
        </div>
      </div>
      {/* Report Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Report Type <span className="text-red-500">*</span>
          </label>
          <div className="mt-1 flex justify-center">
            <input
              type="radio"
              id="detail"
              {...register("reportType", {
                required: "Report Type is required",
              })}
              value="Detail"
              className="mr-2"
            />
            <label htmlFor="detail" className="inline-block mr-4">
              Detail
            </label>
            <input
              type="radio"
              id="summary"
              {...register("reportType", {
                required: "Report Type is required",
              })}
              value="Summary"
              className="mr-2"
            />
            <label htmlFor="summary" className="inline-block">
              Summary
            </label>
          </div>
          {errors.reportType && (
            <p className="text-red-500 text-[11px] mt-1">
              {errors.reportType.message}
            </p>
          )}
        </div>
      </div>

      <div className="mt-4 md:my-8 flex justify-center items-center">
        <button
          type="submit"
          className="w-full md:max-w-sm bg-[#28A887] hover:bg-[#19c496] text-white py-2 px-4 rounded-md"
        >
          View Report
        </button>
      </div>
    </form>
  );
};

export default CustomerLedgerForm;
