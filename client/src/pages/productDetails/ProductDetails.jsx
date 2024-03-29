import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CounterInput from "react-counter-input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getSingleProduct,
  evaluationCalculate,
  getSingleUser,
  addBasket,
  calcMaxAmount,
} from "@/helpers/Api";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { MdOutlineShoppingCart } from "react-icons/md";
import ReactStars from "react-stars";
import { useDispatch, useSelector } from "react-redux";
import { getUserBasket } from "@/store/basket";
import { client } from "@/utils/client";
import { ImSpinner2 } from "react-icons/im";
const ProductDetails = () => {
  const [data, setData] = useState({});
  const [amount, setAmount] = useState(1);
  const [maxAmount, setMaxAmount] = useState(0);
  const [calcLoad, setCalcLoad] = useState(true);
  const [renderPage, setRenderPage] = useState(0);
  const [productUser, setProductUser] = useState({});
  const [evaluation, setEvaluation] = useState(0);
  const [showImg, setShowImg] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    getSingleProduct(params.id).then((res) => {
      setData(res);

      evaluationCalculate(params.id).then((res) => setEvaluation(res));
      getSingleUser(res?.sellingBy?._ref).then((res) => setProductUser(res));
      calcMaxAmount(user.userId, res._id, res.stock).then((res) => {
        setMaxAmount(res);
        setCalcLoad(false);
      });
      const query = `*[_type == "user" && subId == "${user.userId}"][0]`;
      client.fetch(query).then((res) => dispatch(getUserBasket(res.basket)));
    });
  }, [navigate, params.id, user.userId, renderPage, dispatch]);
  const addBasketSuccess = (message) => toast.success(message);
  const addBasketError = (message) => toast.error(message);
  return (
    <div className="min-h-screen py-5 flex flex-col gap-5 wrapper mx-auto select-none">
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

      <div className="flex flex-col-reverse md:flex-row md:h-[580px]   gap-5 border rounded-md p-5 ">
        {data.picture ? (
          <div className="flex flex-col items-center w-full md:w-1/2 border rounded-md p-5 justify-between">
            <div>
              {data.picture ? (
                <LazyLoadImage
                  effect="blur"
                  className="h-[400px]"
                  src={data?.picture[showImg]}
                  placeholderSrc={data?.picture[showImg]}
                  alt=""
                />
              ) : null}
            </div>
            <div className="flex gap-5 items-center">
              {data?.picture?.map((picture, i) => (
                <div
                  onClick={() => setShowImg(i)}
                  className="w-20 h-20 cursor-pointer"
                  key={i}
                >
                  <LazyLoadImage
                    effect="blur"
                    className="h-20 w-20 object-contain border rounded-md  "
                    src={picture}
                    placeholderSrc={picture}
                    alt=""
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="h-full bg-gray-200 animate-pulse  w-full md:w-1/2 rounded-md"></div>
        )}
        <div className=" w-full md:w-1/2 h-full flex flex-col  ">
          <div className="flex flex-col gap-2 border-b pb-5">
            <div className="text-xl font-semibold">
              {data.caption || (
                <div className="h-5 bg-gray-200 animate-pulse w-full rounded-md"></div>
              )}
            </div>

            {productUser?.userName ? (
              <div className="text-xl font-semibold flex gap-2">
                <span className="text-mainRed">Seller: </span>
                <Link
                  to={`/myProducts/${productUser._id}`}
                  className="hover:underline "
                >
                  {" "}
                  {productUser?.userName}
                </Link>
              </div>
            ) : (
              <div className="h-5 bg-gray-200 animate-pulse w-[100px] rounded-md"></div>
            )}

            {data.brand ? (
              <div className="text-xl font-semibold">
                <span className="text-mainRed ">Brand: </span>
                {data.brand}
              </div>
            ) : (
              <div className="h-5 bg-gray-200 animate-pulse w-[100px] rounded-md"></div>
            )}
            <div className="flex gap-2 items-center ">
              <div className="flex ">
                <ReactStars
                  count={5}
                  value={evaluation}
                  size={24}
                  edit={false}
                  color2={"#ffd700"}
                  className="select-none"
                />
              </div>
              <div>
                Evaluated
                <span> {data.comments?.length || 0} </span>
                people
              </div>
            </div>
            <div className="text-3xl font-semibold">
              {data.price ? (
                <div>
                  {data.price} <span className="text-green-400">$</span>
                </div>
              ) : (
                <div className="h-10 bg-gray-200 animate-pulse w-[100px] rounded-md"></div>
              )}
            </div>
          </div>
          <div>
            {calcLoad ? (
              <div className="h-10 bg-gray-200 animate-pulse w-[100px] rounded-md my-2"></div>
            ) : maxAmount === 0 ? (
              <div className="border  text-xl border-mainRed font-semibold text-mainRed w-fit p-2 rounded-md my-2 opacity-80">
                Out of stock
              </div>
            ) : (
              <CounterInput
                min={1}
                count={amount}
                max={parseInt(maxAmount)}
                onCountChange={(count) => setAmount(count)}
              />
            )}
          </div>
          <p className="h-full line-clamp-6">
            {data.description || (
              <div className="flex flex-col gap-1">
                <div className="h-3 bg-gray-200 animate-pulse w-full rounded-md "></div>
                <div className="h-3 bg-gray-200 animate-pulse w-full rounded-md "></div>
                <div className="h-3 bg-gray-200 animate-pulse w-full rounded-md "></div>
              </div>
            )}
          </p>

          <div className="mt-auto ">
            <button
              disabled={isLoading || maxAmount === 0 || !user.userName}
              onClick={async () => {
                setIsLoading(true);
                try {
                  await addBasket(user.userId, data._id, amount);
                  addBasketSuccess(
                    "The product has been successfully added to the cart"
                  );
                } catch (error) {
                  addBasketError("There was a problem adding the product cart");
                }
                setAmount(1);
                setRenderPage(renderPage + 1);
                setIsLoading(false);
              }}
              className="bg-green-400 h-[40px] w-full rounded-md text-white flex justify-center items-center text-xl font-semibold"
            >
              {isLoading ? (
                <ImSpinner2 className="animate-spin " />
              ) : (
                <>
                  {maxAmount === 0 ? (
                    "Out of Stock"
                  ) : (
                    <div className="flex items-center gap-2">
                      <MdOutlineShoppingCart />
                      <span>Add Basket</span>
                    </div>
                  )}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col ">
        <div className="border-b w-full">
          <div className="border-b-2 border-mainRed w-fit px-5 py-2 text-center text-xl font-semibold">
            Comments
          </div>
        </div>
        {data.comments?.length === undefined ? (
          <div className="text-gray-400 text-3xl font-semibold">
            Unfortunately no comments found
          </div>
        ) : (
          <div className="max-h-[500px] overflow-y-auto">
            {data.comments?.map((comment, i) => (
              <div key={i} className="flex flex-col gap-2 border-b py-5">
                <div className="flex items-center gap-2">
                  <div className=" min-w-[100px]">
                    <ReactStars
                      count={5}
                      value={parseInt(comment.star)}
                      size={24}
                      edit={false}
                      color2={"#ffd700"}
                      className="select-none"
                    />
                  </div>
                  <div>{comment.caption} </div>
                </div>
                <div>
                  <div>{comment.comment} </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-mainRed">Commented by: </span>
                  <span>{comment.userName}</span>
                  <span className="text-gray-400">
                    {comment.date.slice(0, 10)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
        {data.comments?.length === 0 ? (
          <div className="text-gray-400 text-3xl font-semibold">
            Unfortunately no comments found
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ProductDetails;
