import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { clearSessionStorage, successToast } from "../../Utils/utils";
import SideDrawerToggle from "../SideDrawer/SideDrawer";

const Header = ({ setSideDrawerOpened }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    clearSessionStorage(); // Call function to clear session storage
    successToast("Logged out");
    navigate("/login"); // Navigate to the "/login" page
  };

  return (
    <header className="bg-gray-100 px-5 md:px-7 p-2 shadow-lg">
      <nav className="flex justify-between items-center">
        {/* Left */}
        <div className="flex">
          <Link to="/" className="-m-1.5 p-1.5">
            <img className="h-14 w-h-14" src="/images/logo.png" alt="logo" />
          </Link>
        </div>

        {/* Bottom */}
        <div className="hidden md:block space-x-4 text-sm">
          <Link className="hover:text-[#28A887]" to="/customer-ledger">
            Customer Ledger
          </Link>
          <Link className="hover:text-[#28A887]" to="/customer-invoice">
            Customer Invoice
          </Link>
          <Link className="hover:text-[#28A887]" to="/customer-balances">
            Customer Balance
          </Link>
          <Link className="hover:text-[#28A887]" to="/sale-and-recovery">
            Monthly Sale & Recovery
          </Link>
        </div>

        {/* Right */}
        <div>
          {/* Hamburger Menu Icon */}
          <div className="block md:hidden">
            <SideDrawerToggle setSideDrawerOpened={setSideDrawerOpened} />
          </div>
          <CiLogout
            className="text-2xl hover:text-[#28A887] hover:cursor-pointer hidden md:block"
            onClick={() => handleLogout()}
          />
        </div>
      </nav>
    </header>
  );
};

export default Header;
