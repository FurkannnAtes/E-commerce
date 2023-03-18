import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getMyProducts } from "@/helpers/Api";

import MyProductCard from "./components/MyProductCards";

const MyProducts = () => {
  const [data, setData] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const params = useParams();
  useEffect(() => {
    getMyProducts(params.id).then((res) => setData(res));
  }, [params.id]);
  return (
    <div className="wrapper min-h-screen mx-auto pt-5">
      <div className="flex justify-end w-full ">
        <div>
          <Link
            to={`/createProduct/${user.userId}`}
            className="px-5 bg-green-500 py-2 rounded-md flex gap-2 items-center text-white text-lg duration-300 hover:bg-green-600"
          >
            Create Product <AiOutlinePlus />
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 py-5 px-2 ">
        {data?.map((product, i) => (
          <MyProductCard key={i} product={product} />
        ))}
      </div>
    </div>
  );
};

export default MyProducts;
