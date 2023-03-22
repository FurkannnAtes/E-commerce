import React, { useEffect, useState } from "react";
import { getSingleUser } from "@/helpers/Api";
import { useSelector } from "react-redux";
import ProductCard from "./components/ProductCard";

const BuymentHistory = () => {
  const [data, setData] = useState([]);
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    getSingleUser(user.userId).then((res) => setData(res.buymentStory));
  }, [user.userId]);
  return (
    <div className="wrapper mx-auto min-h-screen py-5  flex flex-col gap-5">
      {data?.length === 0 ? (
        <div className="text-3xl m-auto  mt-52 w-fit h-fit  text-gray-400 font-semibold">
          Unfortunately the purchase history is empty :(
        </div>
      ) : (
        data?.map((item, i) => <ProductCard item={item} key={i} />)
      )}
    </div>
  );
};

export default BuymentHistory;
