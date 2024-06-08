import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdArrowBackIosNew } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { TbFileInvoice } from "react-icons/tb";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { BsGraphUpArrow } from "react-icons/bs";
import { TbMathMax } from "react-icons/tb";
import { clearSessionStorage, successToast } from "../../Utils/utils";
import { CiLogout } from "react-icons/ci";

const SideDrawerToggle = ({ setSideDrawerOpened }) => {
  const navigate = useNavigate();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleLogout = () => {
    clearSessionStorage(); // Call function to clear session storage
    successToast("Logged out");
    //close drawer if open
    handleMenuClick();
    navigate("/login"); // Navigate to the "/login" page
  };

  const handleMenuClick = () => {
    const drawerCheckbox = document.getElementById("my-drawer");
    if (drawerCheckbox.checked) {
      drawerCheckbox.checked = false;
      setIsDrawerOpen(false); // Update state
    } else {
      drawerCheckbox.checked = true;
      setIsDrawerOpen(true); // Update state
    }
  };

  //set drawer flag(true/false) in root file i.e app.js
  useEffect(() => {
    setSideDrawerOpened(isDrawerOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDrawerOpen]);

  return (
    <div>
      <div className="drawer">
        <input
          id="my-drawer"
          onChange={(e) => setIsDrawerOpen(e.target.checked)}
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content">
          {/* Drawer toggler */}
          <label htmlFor="my-drawer" className="drawer-button">
            <GiHamburgerMenu className="text-2xl text-[#28A887] hover:cursor-pointer" />
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          {/* Sidebar drawer internal content */}
          <div className="w-full sm:w-80 min-h-full bg-base-200 text-base-content">
            {/* Top Section */}
            <div className="bg-[#28A887] bg-opacity-20 p-5">
              {/* Side Drawer closer */}
              <label htmlFor="my-drawer" className="drawer-button">
                <MdArrowBackIosNew className="text-xl font-bold text-[#28A887] hover:cursor-pointer" />
              </label>
              <div className="bg-[#28A887] h-[65px] mx-auto w-[65px] p-3 rounded-full flex justify-center items-center">
                <FaUser className="text-2xl font-bold text-white" />
              </div>
              <p className="text-center my-3 text-xl font-semibold">
                {sessionStorage.getItem("UserName")}
              </p>
            </div>
            {/* Middle Section */}
            <div className="flex justify-center items-center mt-8">
              <div className="flex flex-col space-y-5">
                <Link
                  className="hover:text-[#28A887] flex items-center gap-4 text-md"
                  to="/customer-ledger"
                  onClick={() => handleMenuClick()}
                >
                  <p className="h-[30px] w-[30px] bg-[#28A887] text-white flex justify-center items-center rounded-md">
                    <TbMathMax className=" " />
                  </p>
                  Customer Ledger
                </Link>
                <Link
                  className="hover:text-[#28A887] flex items-center gap-4 text-md"
                  to="/customer-invoice"
                  onClick={() => handleMenuClick()}
                >
                  <p className="h-[30px] w-[30px] bg-[#28A887] text-white flex justify-center items-center rounded-md">
                    <TbFileInvoice />
                  </p>
                  Customer Invoice
                </Link>
                <Link
                  className="hover:text-[#28A887] flex items-center gap-4 text-md"
                  to="/customer-balances"
                  onClick={() => handleMenuClick()}
                >
                  <p className="h-[30px] w-[30px] bg-[#28A887] text-white flex justify-center items-center rounded-md">
                    <FaMoneyBillTransfer />
                  </p>
                  Customer Balance
                </Link>
                <Link
                  className="hover:text-[#28A887] flex items-center gap-4 text-md"
                  to="/sale-and-recovery"
                  onClick={() => handleMenuClick()}
                >
                  <p className="h-[30px] w-[30px] bg-[#28A887] text-white flex justify-center items-center rounded-md">
                    <BsGraphUpArrow />
                  </p>
                  Monthly Sale & Recovery
                </Link>
                <span
                  className="hover:text-[#28A887] flex items-center gap-4 text-md cursor-pointer"
                  onClick={() => handleLogout()}
                >
                  <p className="h-[30px] w-[30px] bg-[#28A887] text-white flex justify-center items-center rounded-md">
                    <CiLogout />
                  </p>
                  Logout
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideDrawerToggle;
