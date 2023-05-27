// Import Swiper styled-components wrapper
import StyledSwiperMenu from "./styles/StyledSwiperMenu";

import { EffectCoverflow, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import 'swiper/swiper.min.css';
import 'swiper/modules/pagination/pagination.min.css';
import 'swiper/modules/navigation/navigation.min.css';

const SwiperMenu = ({ swiperSlides, background }) => {
    return (<StyledSwiperMenu background={background}>
        <Swiper modules={[Navigation, Pagination, EffectCoverflow]} 
                navigation={true}                                                    
                pagination={true}                                                    
                effect={'coverflow'}                                                   
                grabCursor={true}                                                  
                centeredSlides={true}                                                
                slidesPerView={'1'}                                             
                coverflowEffect={{
                    "rotate": 110,
                    "stretch": 0,
                    "depth": 100,
                    "modifier": 1,
                    "slideShadows": true,                                                
                }}>
                    {swiperSlides.map(item => <SwiperSlide>{item}</SwiperSlide>)}
        </Swiper>
    </StyledSwiperMenu>);
}

export default SwiperMenu;