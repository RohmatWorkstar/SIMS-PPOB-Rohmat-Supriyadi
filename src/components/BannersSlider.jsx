import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const BannersSlider = ({ banners }) => {
    return (
        <Swiper spaceBetween={20} slidesPerView={4} loop pagination={{ clickable: true }}>
            {banners.length > 0 ? (
                banners.map((banner, index) => (
                    <SwiperSlide key={index}>
                        <div className="flex justify-center items-center mb-60">
                            <img src={banner.banner_image} alt={banner.banner_name} className="w-full h-auto rounded-lg" />
                        </div>
                    </SwiperSlide>
                ))
            ) : (
                <SwiperSlide>
                    <p>Loading Banners...</p>
                </SwiperSlide>
            )}
        </Swiper>
    );
};

export default BannersSlider;
