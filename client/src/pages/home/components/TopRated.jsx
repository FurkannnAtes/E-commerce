import { useEffect, useState } from "react";
import { AliExpressProducts } from "@/helpers/Api";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";
import ProductCard from "@/components/ProductCard";
import Skeleton from "@/components/Skeleton";

const TopRated = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    AliExpressProducts().then((res) => setData(res));
  }, []);

  return (
    <div>
      <div className="wrapper mx-auto">
        <div className="text-3xl font-semibold py-2">Top Rated</div>
        <Swiper
          spaceBetween={30}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            600: {
              slidesPerView: 2,
            },
            720: {
              slidesPerView: 3,
            },
            1000: {
              slidesPerView: 4,
            },
            1200: {
              slidesPerView: 5,
            },
          }}
          loop
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="h-[360px] forYouSwiper rounded-md "
        >
          {data.length !== 0
            ? data?.map((product, i) => (
                <SwiperSlide key={i} className="h-full">
                  <ProductCard product={product} />
                </SwiperSlide>
              ))
            : [...Array(20)].map((skeleton, i) => (
                <SwiperSlide key={i} className="h-full">
                  <Skeleton type="swiperProductCard" />
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TopRated;
