import React from "react";

const HomePage = () => {
  return (
    <div className="p-10 text-2xl">
      Welcome, {sessionStorage.getItem("UserName")}
    </div>
  );
};

export default HomePage;
