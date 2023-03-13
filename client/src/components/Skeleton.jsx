import React from "react";

const Skeleton = ({ type }) => {
  if (type === "swiperProductCard") {
    return (
      <div className="h-5/6 w-full bg-slate-400 rounded-md animate-pulse"></div>
    );
  }
};

export default Skeleton;
