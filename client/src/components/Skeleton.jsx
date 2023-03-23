import React from "react";

const Skeleton = ({ type }) => {
  if (type === "swiperProductCard") {
    return (
      <div className="h-5/6 w-full bg-gray-200 rounded-md animate-pulse"></div>
    );
  }
  if (type === "historyCard") {
    return (
      <div className="h-[190px] rounded-lg flex flex-col w-full border">
        <div className="bg-lightGray flex justify-between gap-2 items-center p-4 ">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-md bg-gray-200 animate-pulse"></div>
            <div className="bg-gray-200 rounded-md animate-pulse h-5 w-[100px]"></div>
          </div>
        </div>
        <div className="flex justify-between items-center p-2">
          <div className="flex items-center gap-5">
            <div className="h-[100px] w-[100px] bg-gray-200 rounded-md animate-pulse"></div>
            <div className="flex flex-col gap-2">
              <div className="h-2 w-[300px] bg-gray-200 rounded-md animate-pulse"></div>
              <div className="h-2 w-[100px] bg-gray-200 rounded-md animate-pulse"></div>
              <div className="h-2 w-[150px] bg-gray-200 rounded-md animate-pulse"></div>
              <div className="h-2 w-[250px] bg-gray-200 rounded-md animate-pulse"></div>
            </div>
          </div>
          <div className="h-[35px] w-[35px] bg-gray-200 rounded-md animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (type === "myProductCard") {
    return (
      <>
        {[...Array(10)].map((skeleton, i) => (
          <div
            key={i}
            className="h-[307px] w-full border flex flex-col overflow-hidden rounded-md"
          >
            <div className="h-[160px] w-full bg-gray-200 animate-pulse"></div>
            <div className="pt-6 px-2 flex flex-col gap-2">
              <div className="h-3 w-full bg-gray-200 rounded-md animate-pulse"></div>
              <div className="h-3 w-full bg-gray-200 rounded-md animate-pulse"></div>
              <div className="h-3 w-[120px] mt-2 bg-gray-200 rounded-md animate-pulse"></div>
              <div className="h-5 w-5 mt-2 bg-gray-200 rounded-md animate-pulse"></div>
            </div>
          </div>
        ))}
      </>
    );
  }
};

export default Skeleton;
