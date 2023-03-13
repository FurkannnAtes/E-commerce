import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
//icons
import ReactStars from "react-stars";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white h-[90%] border hover:shadow-md duration-300 flex flex-col gap-3 pb-2 rounded-md">
      <div className="border-b pb-2 w-full flex justify-center ">
        <LazyLoadImage
          effect="blur"
          className="h-[150px] "
          src={product.image}
          placeholderSrc={product.image}
          alt=""
        />
      </div>
      <div className="flex flex-col h-full p-2">
        <div>
          <div className="line-clamp-2 h-[50px]">{product.title}</div>
          <div className="flex gap-2 items-center">
            <div className="flex">
              <ReactStars
                count={5}
                value={product.rating.rate}
                size={24}
                edit={false}
                color2={"#ffd700"}
                className="select-none"
              />
            </div>
            ({product.rating.rate})
          </div>
        </div>
        <div className="mt-auto">{product.price} $</div>
      </div>
    </div>
  );
};

export default ProductCard;
