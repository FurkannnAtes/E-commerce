import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  getMyProducts,
  getMyProductsSortedByPriceLowest,
  getMyProductsSortedByHighest,
  evaluationAllCalculate,
  getSingleUser,
} from "@/helpers/Api";

import MyProductCard from "./components/MyProductCards";
import Skeleton from "@/components/Skeleton";

const MyProducts = () => {
  const [data, setData] = useState([]);
  const [seller, setSeller] = useState({});
  const [productFilter, setProductFilter] = useState("new");
  const [skeleton, setSkeleton] = useState(true);

  const user = useSelector((state) => state.auth.user);
  const params = useParams();
  useEffect(() => {
    filterProducts();
    getSingleUser(params.id).then((res) => {
      setSeller(res);
      setSkeleton(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, productFilter]);

  //filter Products
  const filterProducts = () => {
    if (productFilter === "lowest") {
      getMyProductsSortedByPriceLowest(params.id).then((res) => setData(res));
    } else if (productFilter === "highest") {
      getMyProductsSortedByHighest(params.id).then((res) => setData(res));
    } else if (productFilter === "new") {
      getMyProducts(params.id).then((res) => setData(res));
    } else {
      evaluationAllCalculate(params.id).then((res) => setData(res));
    }
  };

  return (
    <div className="wrapper min-h-screen mx-auto pt-5 px-2 lg:px-0 relative">
      <div className="flex justify-between w-full px-2">
        <div className="flex items-center gap-2">
          <select
            value={productFilter}
            onChange={(e) => {
              setProductFilter(e.target.value);
            }}
            name="filter"
            id="filter"
            className="h-full border-gray-300 border  shadow-md p-2 outline-none
              "
          >
            <option value="lowest">Lowest Price</option>
            <option value="highest">Highest Price</option>
            <option value="new">New Arrivals</option>
            <option value="rated">Most Rated</option>
          </select>

          <div className="flex flex-col ">
            <div className="font-semibold">{seller?.userName}</div>
            <div>
              {data?.length === 0 ? null : (
                <div>
                  <span className="font-semibold">Items:</span> {data?.length}
                </div>
              )}
            </div>
          </div>
        </div>{" "}
        <div>
          {user?.userId === params.id ? (
            <div>
              <Link
                to={`/createProduct`}
                className="px-5 bg-green-500 py-2 rounded-md flex gap-2 items-center text-white text-lg duration-300 hover:bg-green-600"
              >
                Create Product <AiOutlinePlus />
              </Link>
            </div>
          ) : null}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 py-5 px-0  ">
        {data?.map((product, i) => (
          <MyProductCard key={i} product={product} />
        ))}
        {!skeleton && data.length === 0 ? (
          <div className="text-gray-400 font-semibold text-4xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            Unfortunately there is no product
          </div>
        ) : null}
        {skeleton ? <Skeleton type="myProductCard" /> : null}
      </div>
    </div>
  );
};

export default MyProducts;
