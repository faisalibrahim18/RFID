import React from "react";

import Ds from "../../../assets/ds.png";
import Bro from "../../../assets/bro1.png";

const Dashboard = () => {
  return (
    <div className="md:p-5 p-2 font-semibold static ">
      <div className="flex flex-wrap flex-row  slide-in-bottom">
        <div className="flex-shrink max-w-full w-full  bg-white rounded-lg shadow-lg mb-6">
          <div className="pl-6 pt-6">
            <div className="flex flex-wrap flex-row">
              <div className="flex-shrink max-w-full w-full">
                <div className="flex flex-row justify-between pb-2">
                  <div className="flex flex-col">
                    <h3 className="text-xl font-bold">BAKTI KASIH ANUGRAH</h3>
                  </div>
                </div>
              </div>

              <div className="flex-shrink max-w-full w-full xl:w-1/2">
                <div className="static overflow-x-auto">
                  <p className="w-full pr-5">
                    Kami menyediakan kebutuhan linen untuk Rumah Sakit, kami melayani dengan sistim cuci sewa
                    linen bersih siap pakai dan atau mencuci linen milik RS.
                  </p>
                </div>
              </div>

              <div className="flex-shrink max-w-full w-full lg:w-1/2 md:pt-0 pt-10">
                {/* <button
                  type="button"
                  className="bg-[#A4BC92] p-3 rounded-xl pl-5 pr-3 text-white hover:bg-[#849e6f]"
                  onClick={() => setShowModal(true)}
                >
                  {" "}
                  <b className="pr-4 text-xl font-semibold">Schedule a pickup</b>
                  <i className=" fa-solid fa-chevron-down fa-rotate-270 fa-xl"></i>
                </button> */}
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src={Bro}
              className="md:absolute static w-52 md:right-10 md:pt-0 md:pl-0 pt-14 md:ml-0 ml-36"
            />
            <img src={Ds} alt="" className="rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
