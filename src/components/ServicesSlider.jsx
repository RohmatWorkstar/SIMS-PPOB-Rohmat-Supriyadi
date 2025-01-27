import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom"; 
import "swiper/css";

const ServicesSlider = ({ services }) => {
    return (
        <Swiper
            spaceBetween={20}
            slidesPerView={12}
            loop
            pagination={{ clickable: true }}
            breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 4 },
                1024: { slidesPerView: 12 },
            }}
        >
            {services.length > 0 ? (
                services.map((service) => (
                    <SwiperSlide key={service.service_code}>
                        <Link to={`/service/${service.service_code}`} className="flex flex-col items-center">
                            <img src={service.service_icon} alt={service.service_name} className="w-24 h-24 mb-4" />
                            <h6 className="text-center">{service.service_name}</h6>
                        </Link>
                    </SwiperSlide>
                ))
            ) : (
                <SwiperSlide>
                    <p>Loading...</p>
                </SwiperSlide>
            )}
        </Swiper>
    );
};

export default ServicesSlider;
