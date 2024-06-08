import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import {
  clearSessionStorage,
  errorToast,
  getCategories,
  getCities,
  getCustomerBalancesDetails,
  getCustomersDetail,
  getSalesPersons,
  getStructuredCustomerIdData,
  getStructuredCustomerNameData,
} from "../../../Utils/utils";
import { useNavigate } from "react-router-dom";
import { STATUSES } from "../../../Constants/constants";

const CustomerBalancesForm = ({
  setLoader,
  setCustomerBalancesDetails,
  sideDrawerOpened,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, // Add setValue from useForm
    clearErrors,
  } = useForm();

  const [categoriesData, setCategoriesData] = useState([]);
  const [cities, setCities] = useState([]);
  const [salePersons, setSalePersons] = useState([]);

  //Label should be Customer Code and value Customer Name
  const [customerCode, setCustomerCode] = useState("");
  //Label should be Customer Name and value Customer Code
  const [customerName, setCustomerName] = useState("");

  const [customersIdData, setCustomersIdData] = useState([]);
  const [customersNameData, setCustomersNameData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getCustomersData = async () => {
      try {
        setLoader(true);
        const response = await getCustomersDetail();
        const categories = await getCategories();
        const cities = await getCities();
        const salesPersons = await getSalesPersons();
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
        // *********************************************************
        if (categories.data.error) {
          //show error message
          errorToast(categories.data.error);
        } else if (categories.data.success) {
          //Save data as it is getting from backend
          setCategoriesData(categories.data.data);
        }
        // *********************************************************
        if (cities.data.error) {
          //show error message
          errorToast(cities.data.error);
        } else if (cities.data.success) {
          //Save data as it is getting from backend
          setCities(cities.data.data);
        }
        // *********************************************************
        if (salesPersons.data.error) {
          //show error message
          errorToast(salesPersons.data.error);
        } else if (salesPersons.data.success) {
          //Save data as it is getting from backend
          setSalePersons(salesPersons.data.data);
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
  const handleCustomerBalancesFormSubmit = async (data) => {
    try {
      setLoader(true);
      const response = await getCustomerBalancesDetails(data);
      setLoader(false);

      if (response.data.error) {
        //show error message
        errorToast(response.data.error);
      } else if (response.data.success) {
        //set Ledger Details Data
        setCustomerBalancesDetails(response.data.data);
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
      onSubmit={handleSubmit(handleCustomerBalancesFormSubmit)}
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

      {/* Sales person & Categories */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 ${
          sideDrawerOpened ? "hidden" : "block"
        }`}
      >
        <div>
          <label
            htmlFor="salesPerson"
            className="block text-sm font-medium text-gray-700"
          >
            Select Sales Person
            <span className="text-gray-500 text-[9px] ml-1">(optional)</span>
          </label>
          <Select
            name="salesPerson"
            id="salesPerson"
            {...register("salesPerson")}
            onChange={(selectedOption) => {
              setValue("salesPerson", selectedOption?.value || ""); // Set value here
              clearErrors("salesPerson"); // Clear errors when a value is selected
            }}
            options={salePersons}
            className="mt-1 rounded-md shadow-sm focus:ring-[#28A887] focus:border-[#28A887] sm:text-sm"
          />
          {errors.salesPerson && (
            <p className="text-red-500 text-[11px] mt-1">
              {errors.salesPerson.message}
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
      {/* City and Status */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 ${
          sideDrawerOpened ? "hidden" : "block"
        }`}
      >
        <div>
          <label
            htmlFor="selectedCity"
            className="block text-sm font-medium text-gray-700"
          >
            Select City
            <span className="text-gray-500 text-[9px] ml-1">(optional)</span>
          </label>
          <Select
            name="selectedCity"
            id="selectedCity"
            {...register("selectedCity")}
            onChange={(selectedOption) => {
              setValue("selectedCity", selectedOption?.value || ""); // Set value here
              clearErrors("selectedCity"); // Clear errors when a value is selected
            }}
            options={cities}
            className="mt-1 rounded-md shadow-sm focus:ring-[#28A887] focus:border-[#28A887] sm:text-sm"
          />
          {errors.selectedCity && (
            <p className="text-red-500 text-[11px] mt-1">
              {errors.selectedCity.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="invoiceType"
            className="block text-sm font-medium text-gray-700"
          >
            Select Status
            <span className="text-gray-500 text-[9px] ml-1">(optional)</span>
          </label>
          <Select
            name="status"
            id="status"
            {...register("status")}
            onChange={(selectedOption) => {
              setValue("status", selectedOption?.label || ""); // Set value here
              clearErrors("status"); // Clear errors when a value is selected
            }}
            options={STATUSES}
            className="mt-1 rounded-md shadow-sm focus:ring-[#28A887] focus:border-[#28A887] sm:text-sm"
          />
          {errors.status && (
            <p className="text-red-500 text-[11px] mt-1">
              {errors.status.message}
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

export default CustomerBalancesForm;
