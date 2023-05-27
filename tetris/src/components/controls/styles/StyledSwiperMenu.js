import styled from 'styled-components';

export const StyledSwiperMenu = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    
    height: 100%;
    width: 100%;
    background: transparent;
    
    margin: 0;
    padding: 0;
    top: 0;
    left: 0;

    font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
    font-size: 14px;
    color: #000;

    .swiper {
        width: 100%;
    }
      
    .swiper-slide {
        background-position: center;
        background-size: cover;
        width: 300px;
        height: 100vh;
    }
    
    .swiper-slide img {
        display: block;
        width: 100%;
    }

    @keyframes styled-swiper-menu-animation {
        0% {
            background: transparent;
        }
        100% {
            background: ${props => props.background ? props.background : 'rgba(0, 0, 0, 1)'};
        }
    }

    z-index: 3;
    animation: styled-swiper-menu-animation 1s ease forwards;

`

export default StyledSwiperMenu;