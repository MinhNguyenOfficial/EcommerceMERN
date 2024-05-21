import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Image } from 'antd';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function SliderComponent({ images }) {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <Image
            key={image}
            src={image}
            alt="slider"
            preview={false}
            width="100%"
            height="274px"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
