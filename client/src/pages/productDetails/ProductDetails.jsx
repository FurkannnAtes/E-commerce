import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getSingleProduct,
  evaluationCalculate,
  getSingleUser,
} from "@/helpers/Api";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { MdOutlineShoppingCart } from "react-icons/md";
import ReactStars from "react-stars";

const ProductDetails = () => {
  const [data, setData] = useState({});
  const [productUser, setProductUser] = useState({});
  const [evaluation, setEvaluation] = useState(0);
  const [showImg, setShowImg] = useState(0);

  const params = useParams();
  useEffect(() => {
    getSingleProduct(params.id).then((res) => {
      setData(res);

      evaluationCalculate(params.id).then((res) => setEvaluation(res));
      getSingleUser(res?.sellingBy?._ref).then((res) => setProductUser(res));
    });
  }, [params.id]);

  return (
    <div className="min-h-screen py-5 flex flex-col gap-5 wrapper mx-auto ">
      <div className="flex h-[580px]   gap-5 border rounded-md p-5 ">
        <div className="flex flex-col items-center w-1/2 border rounded-md p-5 justify-between">
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
        <div className="w-1/2 h-full flex flex-col  ">
          <div className="flex flex-col gap-2 border-b pb-5">
            <div className="text-xl font-semibold">{data.caption}</div>
            <div className="text-xl font-semibold">
              <span className="text-mainRed">Seller: </span>
              <Link
                to={`/myProducts/${productUser._id}`}
                className="hover:underline "
              >
                {" "}
                {productUser?.userName}
              </Link>
            </div>
            <div className="text-xl font-semibold">
              <span className="text-mainRed ">Brand: </span>
              {data.brand}
            </div>

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
              {data.price} <span className="text-green-400">$</span>
            </div>
          </div>
          <p className="h-full line-clamp-6">{data.description}</p>
          <div className="mt-auto ">
            <button className="bg-green-400 py-2 w-full rounded-md text-white flex justify-center items-center text-xl font-semibold">
              <MdOutlineShoppingCart /> <span>Add Basket</span>
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
                      value={comment.star}
                      size={24}
                      edit={false}
                      color2={"#ffd700"}
                      className="select-none"
                    />
                  </div>
                  <div>{comment.comment} </div>
                </div>
                <div>
                  <span className="text-mainRed">Commented by: </span>
                  <span>{comment.userName}</span>
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
