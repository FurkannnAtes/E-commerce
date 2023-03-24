import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import ReactStars from "react-stars";
import { evaluationCalculate } from "@/helpers/Api";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const [evaluation, setEvaluation] = useState(0);

  useEffect(() => {
    evaluationCalculate(product._id).then((res) => setEvaluation(res));
  }, [product._id]);

  return (
    <div className="bg-white w-full   max-w-[300px] mx-auto group border hover:shadow-md duration-300 flex flex-col gap-3 pb-2 rounded-md relative">
      <Link
        to={`/productDetails/${product._id}`}
        className="border-b pb-2 w-full flex justify-center "
      >
        <LazyLoadImage
          effect="blur"
          className="h-[150px] "
          src={product.picture[0]}
          placeholderSrc={product.picture[0]}
          alt=""
        />
      </Link>

      <div className="flex flex-col h-full p-2">
        <div>
          <div className="line-clamp-2 h-[50px]">{product.caption}</div>
          <div className="flex gap-2 items-center">
            <div className="flex">
              <ReactStars
                count={5}
                value={evaluation}
                size={24}
                edit={false}
                color2={"#ffd700"}
                className="select-none"
              />
            </div>
            ({product.comments?.length})
          </div>
        </div>
        <div className="mt-auto">{product.price} $</div>
      </div>
    </div>
  );
};

export default ProductCard;
