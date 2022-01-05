// Import Swiper styled-components wrapper
import StyledSwiperMenu from "./styles/StyledSwiperMenu";

import { EffectCoverflow } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import 'swiper/swiper.min.css';
import 'swiper/modules/pagination/pagination.min.css';

import Menu from './Menu';
import Display from './Display';
import Button from './AltButton';

const SwiperMenu = () => {
    return (<StyledSwiperMenu>
        <Swiper modules={[EffectCoverflow]} effect={'coverflow'} grabCursor={true} centeredSlides={true} slidesPerView={'2'} coverflowEffect={{
            "rotate": 110,
            "stretch": 0,
            "depth": 100,
            "modifier": 1,
            "slideShadows": true
            }} 
            pagination={true} className="mySwiper">
                <SwiperSlide><Menu items={[<Display text="Audio Settings" />]} /></SwiperSlide>
                <SwiperSlide><Menu items={[<Display text="Game Settings" />]} /></SwiperSlide>
                <SwiperSlide><Menu items={[<Display text="Video Settings" />]} /></SwiperSlide>
                <SwiperSlide><Menu items={[<Display text="Developer Settings" />]} /></SwiperSlide>
        </Swiper>
    </StyledSwiperMenu>);
}

export default SwiperMenu;