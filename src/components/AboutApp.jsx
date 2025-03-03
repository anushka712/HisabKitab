import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function Features() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: true, // Animation only happens once when scrolling
    });
  }, []);
  return (
    <div className="mx-[10%]">
      <div
        data-aos="fade-left"
        className="grid md:grid-cols-2   h-[400px] md:[h-400px] "
      >
        <div className=" flex justify-center items-center">
          <img src="/inventory.png" alt="" className="h-1/2" />
        </div>
        <div className=" flex flex-col justify-center items-center">
          <p className="text-center font-bold text-3xl pb-4">
            Manage <span className="text-green-600"> Inventory</span>
          </p>
          <p className="text-center text-gray-800 text-xl">
            With HisabKitab app you can manage all your business accounting from
            your mobile easily.
          </p>
        </div>
      </div>

      <div
        data-aos="fade-right"
        className="grid grid-cols-1 md:grid-cols-2   h-[400px] md:[h-400px] "
      >
        <div className=" flex flex-col justify-center items-center">
          <p className="text-center font-bold text-3xl pb-4">
            Use Both <span className="text-green-600"> Offline & Online</span>
          </p>
          <p className="text-center text-gray-800 text-xl">
            Run your business confidently with Karobar app wherever you are
            without worrying about an internet connection.
          </p>
        </div>
        <div className=" flex justify-center items-center">
          <img src="/online.png" alt="" className="h-1/2" />
        </div>
      </div>

      <div
        data-aos="fade-left"
        className="grid grid-cols-1 md:grid-cols-2   h-[400px] md:[h-400px]  "
      >
        <div className=" flex justify-center items-center">
          <img src="/hisab.png" alt="" className="h-1/2" />
        </div>
        <div className=" flex flex-col justify-center items-center">
          <p className="text-center font-bold text-3xl pb-4">
            Business on <span className="text-green-600"> Your Mobile</span>
          </p>
          <p className="text-center text-gray-800 text-xl">
            Maintain your business inventory easily with Karobar app and know
            how your stocks are performing.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Features;
