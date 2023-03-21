import { Link, useLocation, useNavigate } from "react-router-dom";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/auth";
//icons
import { BiSearchAlt } from "react-icons/bi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { RxPerson } from "react-icons/rx";
import { IoMdNotificationsOutline } from "react-icons/io";
import { AiOutlineCaretUp } from "react-icons/ai";
import { logoutBasket } from "@/store/basket";

const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const unValidPaths = ["/register", "/login"];

  const user = useSelector((state) => state.auth.user);
  const basket = useSelector((state) => state.basket.basket);

  useEffect(() => {
    const userUnValidPages = ["/register", "/login"];
    if (user.userName) {
      if (userUnValidPages.includes(location.pathname)) {
        navigate("/");
      }
    }
    window.scrollTo(0, 0);
  }, [location.pathname, navigate, user]);

  return (
    <div
      className={`${
        unValidPaths.includes(location.pathname) ? "hidden" : "flex"
      }  flex-col `}
    >
      <div className="h-[120px] md:h-[81px] bg-mainRed  flex items-center fixed  w-full z-30">
        <div className="flex flex-col gap-2 md:flex-row p-2 md:justify-between wrapper mx-auto w-full ">
          <div className="relative w-full md:w-7/12 h-[48px]">
            <Link
              to="/"
              className="bg-lightGray absolute left-0 top-0 rounded-l-full flex items-center justify-center h-full px-5 py-2 gap-2 font-semibold "
            >
              <img
                className="h-full w-full rounded-md"
                src="/assets/logo.png"
                alt=""
              />
              <div>Ofenos</div>
            </Link>
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
            <button className="text-white text-4xl relative group">
              <Link to="/basket">
                <MdOutlineShoppingCart />
              </Link>

              {basket?.length === 0 ? null : (
                <div className="flex items-center justify-center text-xs bg-white text-mainRed rounded-full absolute -top-[2px] -right-[2px] w-[18px] h-[18px] font-semibold">
                  {basket?.length}
                </div>
              )}
              <div className="group-hover:flex hidden rounded-md  bg-white border   absolute right-0 top-[110%] w-[350px] ">
                <div className=" flex flex-col  text-sm w-full text-black relative">
                  <div className="bg-[#FFEAE5] p-2  rounded-t-md">
                    <div className="bg-white rounded-md p-2 flex items-center gap-2">
                      <img
                        className="h-[20px] w-[20px] rounded-md"
                        src="/assets/logo.png"
                        alt=""
                      />
                      <div className="font-semibold">Ofenos</div>
                    </div>
                  </div>
                  <div className="absolute -top-[20px] right-[4px] text-[#FFEAE5] text-3xl w-full flex justify-end">
                    <AiOutlineCaretUp />
                  </div>
                  {basket?.length === 0 ? (
                    <div className="text-lg text-gray-400 font-semibold">
                      Your cart is unfortunately empty :(
                    </div>
                  ) : (
                    <div>
                      <div
                        className="overflow-y-auto
                    max-h-[300px]"
                      >
                        <div className="flex flex-col">
                          {basket?.map((item, i) => (
                            <Link
                              to={`/productDetails/${item.product._id}`}
                              className="flex gap-2 p-2  border-b"
                              key={i}
                            >
                              <div>
                                <div className="!w-[50px] h-[90px] ">
                                  <img
                                    className="w-full h-full object-contain"
                                    src={item.product.picture[0]}
                                    alt=""
                                  />
                                </div>
                              </div>
                              <div className="flex flex-col h-full  items-start justify-between">
                                <div className="text-start w-full line-clamp-2">
                                  {item.product.caption}
                                </div>
                                <div className="text-start w-full line-clamp-2">
                                  Amount: {item.amount}
                                </div>
                                <div>
                                  {item.product.price}
                                  <span className="text-green-400">$</span>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-between items-center sticky py-5 px-2 bg-white left-0 -bottom-[1px]">
                        <Link
                          to="/basket"
                          className="py-2 px-4 border bg-white text-black rounded-md"
                        >
                          Go to basket
                        </Link>
                        <Link
                          to="/basket"
                          className="py-2 px-4 border bg-mainRed text-white rounded-md"
                        >
                          Complete transaction
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </button>
            <button className="text-white text-4xl ">
              <IoMdNotificationsOutline />
            </button>
            <div className="w-[1px] h-[20px] bg-black"></div>
            {!user.userName ? (
              <div className="text-white flex items-center gap-2">
                <RxPerson className="text-4xl " />
                <div className="flex flex-col">
                  <div className="text-xs font-semibold opacity-75">
                    My Account
                  </div>
                  <div className="flex items-center gap-2">
                    <Link to="/register">
                      <div className="hover:underline">Sing in</div>
                    </Link>
                    <Link to="/login">
                      <div className="hover:underline">Sing Up</div>
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="group relative">
                <img
                  className="h-10 w-10 rounded-full cursor-pointer "
                  src="/assets/pp.png"
                  alt=""
                />
                <div className="group-hover:flex hidden  bg-white border rounded-md  pb-2 absolute right-0 top-[130%] w-[150px] select-none">
                  <div className="relative flex flex-col gap-2 w-full ">
                    <div className="bg-[#FFEAE5] p-2  rounded-t-md">
                      <div className="bg-white rounded-md p-2 flex items-center gap-2">
                        <img
                          className="h-[20px] w-[20px] rounded-md"
                          src="/assets/logo.png"
                          alt=""
                        />
                        <div className="font-semibold">Ofenos</div>
                      </div>
                    </div>
                    <div className="w-full px-2 hover:text-gray-400 ">
                      <Link
                        to="/"
                        className="flex items-center gap-1 text-sm w-full  "
                      >
                        <span>Account</span>
                      </Link>
                    </div>
                    <div className="w-full px-2 hover:text-gray-400 ">
                      <Link
                        to={`/myProducts/${user.userId}`}
                        className="flex items-center gap-1 text-sm w-full"
                      >
                        <span>My products</span>
                      </Link>
                    </div>
                    <div className="w-full px-2 hover:text-gray-400  ">
                      <button
                        className="flex items-center gap-1 text-sm w-full  "
                        onClick={() => {
                          dispatch(logout());
                          dispatch(logoutBasket());
                        }}
                      >
                        <span>Log out</span>
                      </button>
                    </div>
                    <div className="absolute -top-[20px] right-[4px] text-[#FFEAE5] text-3xl w-full flex justify-end">
                      <AiOutlineCaretUp />
                    </div>
                  </div>
                </div>
              </div>
            )}
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
