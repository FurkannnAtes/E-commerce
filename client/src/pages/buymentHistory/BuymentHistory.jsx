import React, { useEffect, useState } from "react";
import { getSingleUser } from "@/helpers/Api";
import { useSelector } from "react-redux";
import ProductCard from "./components/ProductCard";
import Skeleton from "@/components/Skeleton";

const BuymentHistory = () => {
  const [data, setData] = useState([]);
  const [skeleton, setSkeleton] = useState(true);
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    getSingleUser(user.userId).then((res) => {
      setData(res.buymentStory);
      setSkeleton(false);
    });
  }, [user?.userId]);
  return (
    <div className="wrapper mx-auto min-h-screen py-5  flex flex-col gap-5">
      {skeleton === false && data?.length === 0 ? (
        <div className="text-3xl m-auto  mt-52 w-fit h-fit  text-gray-400 font-semibold">
          Unfortunately the purchase history is empty :(
        </div>
      ) : (
        data?.map((item, i) => <ProductCard item={item} key={i} />)
      )}

      {skeleton ? (
        <div className="flex flex-col gap-5">
          {[...Array(5)].map((skeleton, i) => (
            <Skeleton key={i} type="historyCard" />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default BuymentHistory;
