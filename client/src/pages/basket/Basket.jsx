import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { buyBasket } from "@/helpers/Api";
import { logoutBasket } from "@/store/basket";
import ProductCard from "./components/ProductCard";
import LoadingModal from "@/components/LoadingModal";

//TOASTIFY
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Basket = () => {
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
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

  const bought = (message) => toast.success(message);
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
              <ProductCard item={item} setIsLoading={setIsLoading} key={i} />
            ))}
          </div>

          <div className="w-2/12 ">
            <div className="sticky top-0 right-0 pt-[25vh] w-full ">
              <div className="flex flex-col mx-auto w-full gap-5 ">
                <button
                  onClick={async () => {
                    setIsLoading(true);
                    await buyBasket(user.userId);
                    await dispatch(logoutBasket());
                    setIsLoading(false);
                    bought("Successful purchase");
                  }}
                  className="rounded-md text-white text-lg font-semibold bg-mainRed flex items-center justify-center gap-2 py-2"
                >
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
                <button
                  onClick={async () => {
                    setIsLoading(true);
                    await buyBasket(user.userId);
                    await dispatch(logoutBasket());
                    setIsLoading(false);
                    bought("Successful purchase");
                  }}
                  className="rounded-md text-white text-lg font-semibold bg-mainRed flex items-center justify-center gap-2 py-2"
                >
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

      {isLoading ? <LoadingModal /> : null}
    </div>
  );
};

export default Basket;
