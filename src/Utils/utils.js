import axios from "axios";
import toast from "react-hot-toast";

//****************************************************************************** */
//                                                                               */
//                          //      API's     //                                 */
//                                                                               */
//****************************************************************************** */

const baseURL = process.env.REACT_APP_BASE_URL;
const axiosInstance = axios.create({
  baseURL,
});

// Add an Axios interceptor for requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("Auth-Token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//Login User API
export const loginUser = (userPayload) =>
  axiosInstance.post("/auth/login", userPayload);

//Get All Customers / Accounts details
export const getCustomersDetail = () =>
  axiosInstance.get("/getCustomersDetails");

//Get All invoices details
export const getCategories = () => axiosInstance.get("/getCategories");

//Get All invoices details
export const getAllInvoices = () => axiosInstance.get("/getAllInvoices");

//Get All ledger details
export const getLedgerDetails = (payload) =>
  axiosInstance.post("/getLedgerDetails", payload);

//Get cities
export const getCities = () => axiosInstance.get("/getAllCities");

//Get sales persons
export const getSalesPersons = () => axiosInstance.get("/getSalesPersons");

//Get customer balances report details
export const getCustomerBalancesDetails = (payload) =>
  axiosInstance.post("/getSalesPersonsReport", payload);

//Get monthly sales and recovery details
export const getSalesAndRecoveryDetails = (payload) =>
  axiosInstance.post("/getSalesAndRecoveryDetails", payload);

//Get sale invoice list
export const getSaleInvoiceList = (payload) =>
  axiosInstance.post("/getSaleInvoiceList", payload);

//Get single sale invoice details
export const getSingleSaleInvoiceDetails = (invoiceId) =>
  axiosInstance.get(`/getSingleSaleInvoice/${invoiceId}`);

//****************************************************************************** */
//                                                                               */
//            //       Clear local storage when logged out       //              */
//                                                                               */
//****************************************************************************** */
export const clearSessionStorage = () => {
  sessionStorage.removeItem("Auth-Token");
  sessionStorage.removeItem("CCode");
  sessionStorage.removeItem("UserId");
  sessionStorage.removeItem("UserName");
};

//****************************************************************************** */
//                                                                               */
//            //       Toasts to show alerts / messages          //              */
//                                                                               */
//****************************************************************************** */
export const errorToast = (message) => toast.error(message, { duration: 2500 });
export const successToast = (message) =>
  toast.success(message, { duration: 2000 });

//****************************************************************************** */
//                                                                               */
//            //       get structured data for dropdown          //              */
//                                                                               */
//****************************************************************************** */
export const getStructuredCustomerIdData = (data) => {
  return data.map((item) => ({
    value: item.CustomerName,
    label: item.CustomerCode,
  }));
};
export const getStructuredCustomerNameData = (data) => {
  return data.map((item) => ({
    value: item.CustomerCode,
    label: item.CustomerName,
  }));
};

//****************************************************************************** */
//                                                                               */
//        //      get formatted date i.e Friday 01 May 2023      //              */
//                                                                               */
//****************************************************************************** */

export const formatDate = (isoString) => {
  // Parse the date string
  const date = new Date(isoString);

  // Array of weekday names
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Array of month names
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Get components
  const dayOfWeek = weekdays[date.getUTCDay()];
  const day = String(date.getUTCDate()).padStart(2, "0"); // Add leading zero
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  // Format the date
  return `${dayOfWeek} ${day} ${month} ${year}`;
};

//****************************************************************************** */
//                                                                               */
//           //        get Sum of Values of object        //                     */
//                                                                               */
//****************************************************************************** */
export const getTotalObjectValueCount = (obj) => {
  return Object.values(obj).reduce((sum, value) => sum + parseFloat(value), 0);
};
