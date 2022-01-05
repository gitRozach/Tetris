import styled from 'styled-components';

export const StyledSwiperMenu = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.9);
    
    margin: 0;
    padding: 0;
    top: 0;
    left: 0;

    font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
    font-size: 14px;
    color: #000;

    .swiper {
        width: 100%;
        padding-top: 50px;
        padding-bottom: 50px;
    }
      
    .swiper-slide {
        background-position: center;
        background-size: cover;
        width: 300px;
        height: 500px;
    }
    
    .swiper-slide img {
        display: block;
        width: 100%;
    }

    z-index: 10;
`

export default StyledSwiperMenu;