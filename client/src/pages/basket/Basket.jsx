import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsTrash } from "react-icons/bs";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { deleteProductFromBasket } from "@/helpers/Api";
import { getUserBasket } from "@/store/basket";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Basket = () => {
  const [total, setTotal] = useState(0);
  const basket = useSelector((state) => state.basket.basket);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  useEffect(() => {
    calcTotal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [basket]);
  const calcTotal = () => {
    let num = 0;

    for (let i = 0; i < basket?.length; i++) {
      num += basket[i].amount * basket[i].product.price;
    }
    setTotal(num);
  };
  const deleted = (message) => toast.success(message);
  return (
    <div className="wrapper mx-auto  min-h-screen relative w-full   py-5 ">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {basket?.length !== 0 ? (
        <div className="flex gap-5  ">
          <div className="flex flex-col gap-5 w-10/12 relative">
            {basket?.map((item, i) => (
              <div
                className="flex flex-col w-full  rounded-lg shadow-lg border overflow-y"
                key={i}
              >
                <div className="bg-lightGray flex gap-2 items-center p-4 ">
                  <div>
                    <img
                      className="w-10 h-10 rounded-md"
                      src="/assets/logo.png"
                      alt=""
                    />
                  </div>
                  <div className="font-semibold text-lg">Ofenos</div>
                </div>
                <div className="flex justify-between py-2">
                  <div className="flex gap-2 items-center">
                    <div className="h-[100px] w-[100px]">
                      <img
                        className="w-full h-full object-contain"
                        src={item.product.picture[0]}
                        alt=""
                      />
                    </div>
                    <div className="flex flex-col">
                      <div>{item.product.caption}</div>
                      <div>
                        <span className="font-semibold">Amount: </span>
                        {item.amount}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-5 items-center text-3xl mr-5">
                    <div>
                      {item.product.price}
                      <span className="text-green-400">$</span>{" "}
                    </div>
                    <button
                      onClick={() =>
                        deleteProductFromBasket(
                          user.userId,
                          item.product._id
                        ).then((res) => {
                          dispatch(getUserBasket(res));
                          deleted("Product has been deleted successfully");
                        })
                      }
                    >
                      <BsTrash className="text-mainRed" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="w-2/12 ">
            <div className="sticky top-0 right-0 pt-[25vh] w-full ">
              <div className="flex flex-col mx-auto w-full gap-5 ">
                <button className="rounded-md text-white text-lg font-semibold bg-mainRed flex items-center justify-center gap-2 py-2">
                  Confirm cart <AiOutlineDoubleRight />
                </button>
                <div className="flex flex-col gap-2 p-2 border rounded-md">
                  <div className="text-2xl font-semibold">Order summary</div>
                  <div>
                    <strong>Product total: </strong> <span>{total}</span>
                  </div>
                  <div className="border-b">
                    <strong>Cargo: </strong> Free
                  </div>
                  <div>
                    <strong>Total: </strong> {total}{" "}
                    <span className="text-green-400">$</span>
                  </div>
                </div>
                <button className="rounded-md text-white text-lg font-semibold bg-mainRed flex items-center justify-center gap-2 py-2">
                  Confirm cart <AiOutlineDoubleRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-3xl w-fit h-fit mx-auto mt-52 text-gray-400 font-semibold">
          Your cart is unfortunately empty :(
        </div>
      )}
    </div>
  );
};

export default Basket;
