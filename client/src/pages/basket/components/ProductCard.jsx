import { BsTrash } from "react-icons/bs";

import { deleteProductFromBasket } from "@/helpers/Api";
import { getUserBasket } from "@/store/basket";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
const ProductCard = ({ item, setIsLoading }) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const deleted = (message) => toast.success(message);
  return (
    <div className="flex flex-col w-full  rounded-lg shadow-lg border overflow-y">
      <div className="bg-lightGray flex gap-2 items-center p-4 ">
        <div>
          <img className="w-10 h-10 rounded-md" src="/assets/logo.png" alt="" />
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
            <div>
              <span className="font-semibold">Brand: </span>
              {item.product.brand}
            </div>
          </div>
        </div>
        <div className="flex gap-5 items-center text-3xl mr-5">
          <div>
            {parseInt(item.product.price) * item.amount}
            <span className="text-green-400">$</span>{" "}
          </div>
          <button
            onClick={() => {
              setIsLoading(true);
              deleteProductFromBasket(user.userId, item.product._id).then(
                (res) => {
                  dispatch(getUserBasket(res));

                  deleted("Product has been deleted successfully");
                  setIsLoading(false);
                }
              );
            }}
          >
            <BsTrash className="text-mainRed" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
