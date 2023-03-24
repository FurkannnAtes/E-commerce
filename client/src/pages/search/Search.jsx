import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchProduct } from "@/helpers/Api";
import ProductCard from "./components/ProductCard";
import Skeleton from "@/components/Skeleton";

const Search = () => {
  const [data, setData] = useState([]);
  const [sortQuery, setSortQuery] = useState("_createdAt desc");
  const [skeleton, setSkeleton] = useState(true);
  const { searchQuery } = useParams();

  useEffect(() => {
    searchProduct(searchQuery, sortQuery).then((res) => {
      setData(res);
      setSkeleton(false);
    });
  }, [searchQuery, sortQuery]);

  return (
    <>
      <div className="min-h-screen">
        {skeleton === false && data.length === 0 ? null : (
          <div className="flex flex-col wrapper mx-auto py-5 px-2 lg:px-0">
            <div className="flex items-center gap-2">
              <select
                value={sortQuery}
                onChange={(e) => {
                  setSortQuery(e.target.value);
                }}
                name="filter"
                id="filter"
                className="h-full border-gray-300 border  shadow-md p-2 outline-none
             "
              >
                <option value="price asc">Lowest Price</option>
                <option value="price desc">Highest Price</option>
                <option value="_createdAt desc">New Arrivals</option>
              </select>
            </div>
            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 py-5 ">
              {skeleton === false && data.length === 0
                ? null
                : data?.map((product, i) => (
                    <ProductCard key={i} product={product} />
                  ))}
              {skeleton ? <Skeleton type="myProductCard" /> : null}
            </div>
          </div>
        )}
      </div>
      {skeleton === false && data.length === 0 ? (
        <div className="text-gray-400 h-fit w-fit absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mx-auto flex items-center text-4xl  justify-center">
          Unfortunately no results found
        </div>
      ) : null}
    </>
  );
};

export default Search;
