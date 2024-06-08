import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Login from "./Pages/LoginPage";
import Auth from "./Auth/Auth";
import HomePage from "./Pages/HomePage";
import Loader from "./Components/Loader/Loader";
import { useState } from "react";
import Header from "./Components/Header/Header";
import { Toaster } from "react-hot-toast";
import CustomerLedger from "./Pages/CustomerLedger";
import CustomerBalances from "./Pages/CustomerBalances";
import CustomerInvoice from "./Pages/CustomerInvoice";
import MonthlySaleAndRecovery from "./Pages/MonthlySaleAndRecovery";

function App() {
  const [loader, setLoader] = useState(false);
  const location = useLocation();

  const [sideDrawerOpened, setSideDrawerOpened] = useState(false);

  return (
    <div>
      <Toaster />
      {loader && <Loader />}

      {location.pathname !== "/login" && (
        <Header setSideDrawerOpened={setSideDrawerOpened} />
      )}

      <Routes>
        <Route path="/login" element={<Login setLoader={setLoader} />} />
        <Route element={<Auth />}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/customer-ledger"
            element={
              <CustomerLedger
                setLoader={setLoader}
                sideDrawerOpened={sideDrawerOpened}
              />
            }
          />
          <Route
            path="/customer-invoice"
            element={
              <CustomerInvoice
                setLoader={setLoader}
                sideDrawerOpened={sideDrawerOpened}
              />
            }
          />
          <Route
            path="/customer-balances"
            element={
              <CustomerBalances
                setLoader={setLoader}
                sideDrawerOpened={sideDrawerOpened}
              />
            }
          />
          <Route
            path="/sale-and-recovery"
            element={
              <MonthlySaleAndRecovery
                setLoader={setLoader}
                sideDrawerOpened={sideDrawerOpened}
              />
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
