import React from "react";

const Featured = () => {
  return (
    <div
      className="mx-[10%] sm:mt-24 flex flex-col md:flex-row justify-center items-center gap-10 pb-10"
    >
      <div className="ml-4 rounded-lg  w-1/2">
        <img src="/cover.jpg" alt="" className="w-full h-full  rounded-lg" />
      </div>

      <div>
        <h2 className="font-bold text-3xl text-center pb-2 text-gray-800">
          What Can You Do With{" "}
          <span className="text-green-600"> HisabKitab?</span>
        </h2>
        <p className="text-gray-700 text-center">
          HisabKitab app is built for Nepali businesses to help them manage
          their accounting from mobile. Here are some of the features which you
          can make use of:
        </p>

        <div className="grid grid-cols-2 space-y-2 mt-2 text-gray-700">
          <p> Maintain Stocks </p>
          <p>Record Sales & Purchases</p>
          <p>Quick Billing </p>
          <p> View 15+ Reports</p>
          <p> Import Data From Excel</p>
          <p> Enable App Lock</p>
          <p>Manage Parties</p>
          <p>Send Invoices</p>
          <p> Business Stats</p>
          <p>Record Income Expenses</p>
        </div>
      </div>
    </div>
  );
};

export default Featured;
