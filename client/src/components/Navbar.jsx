import React from "react";
import { Link } from "react-router-dom";
//icons
import { BiSearchAlt } from "react-icons/bi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { RxPerson } from "react-icons/rx";
const Navbar = () => {
  return (
    <div className=" flex flex-col ">
      <div className="h-[120px] md:h-[81px] bg-mainRed  flex items-center fixed w-full z-30">
        <div className="flex flex-col gap-2 md:flex-row p-2 md:justify-between wrapper mx-auto w-full">
          <div className="relative w-full md:w-7/12 h-[48px]">
            <div className="bg-lightGray absolute left-0 top-0 rounded-l-full flex items-center justify-center h-full px-5 py-2 gap-2 font-semibold ">
              <img
                className="h-full w-full rounded-md"
                src="assets/logo.png"
                alt=""
              />
              <div>Ofenos</div>
            </div>
            <input
              className="h-full w-full rounded-full pl-36 outline-none"
              type="text"
              placeholder="Search "
            />
            <button className="absolute top-1/2 -translate-y-1/2 right-4 text-2xl">
              <BiSearchAlt />
            </button>
          </div>
          <div className="flex gap-2 items-center ml-auto ">
            <button className="text-white text-4xl">
              <MdOutlineShoppingCart />
            </button>
            <div className="w-[1px] h-[20px] bg-black"></div>
            <div className="text-white flex items-center gap-2">
              <RxPerson className="text-4xl " />
              <div className="flex flex-col">
                <div className="text-sm font-semibold opacity-75">
                  My Account
                </div>
                <div className="flex items-center gap-2">
                  <Link to="/">
                    <div className="hover:underline">Sing in</div>
                  </Link>
                  <Link to="/">
                    <div className="hover:underline">Sing Up</div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[46px] flex items-center bg-lightGray border-b shadow-md mt-[120px] px-2 md:p-0 md:mt-[81px] ">
        <div className="flex gap-2  wrapper mx-auto w-full">Home</div>
      </div>
    </div>
  );
};

export default Navbar;
