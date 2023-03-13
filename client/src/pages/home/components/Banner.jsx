// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

const Banner = () => {
  return (
    <div>
      <div className="wrapper mx-auto">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
          }}
          loop
          navigation={true}
          effect="fade"
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          className="h-[440px] homeBanner rounded-md "
        >
          <SwiperSlide className="h-full bg-[url('https://n11scdn.akamaized.net/a1/1180_440/23/03/13/67/79/10/03/18/74/67/05/61/43154364260766498091.jpg')] bg-cover bg-center"></SwiperSlide>
          <SwiperSlide className="h-full bg-[url('https://n11scdn.akamaized.net/a1/1180_440/23/03/13/86/53/30/05/47/86/82/77/93/35780115108132376564.jpg')] bg-cover bg-center"></SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Banner;
