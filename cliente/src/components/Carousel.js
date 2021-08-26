import React ,{Fragment} from 'react';

import carouselItem_1 from '../img/images/banner_01.png'; 
import carouselItem_2 from '../img/images/banner_02.png'; 


const Carousel = () => {
   
    return ( 
        <Fragment>
            <div className="margin-80">
                <div className="hero">
                    <div className="glide" id="glide_1">
                        <div className="glide__track" data-glide-el="track">
                            <ul className="glide__slides">
                                <li className="glide__slide">
                                    <div className="hero__center">
                                        <div className="hero__left">
                                            <span className="">New Inspiration 2020</span>
                                                <h1 className="">PHONES MADE FOR YOU!</h1>
                                                <p>Trending from mobile and headphone style collection</p>
                                                <a href="#"><button className="hero__btn">SHOP NOW</button></a>
                                        </div>
                                        <div className="hero__right">
                                            <div className="hero__img-container">
                                                <img className="banner_01" src={carouselItem_1} alt="banner2" />
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="glide__slide">
                                    <div className="hero__center">
                                        <div className="hero__left">
                                            <span>New Inspiration 2020</span>
                                            <h1>PHONES MADE FOR YOU!</h1>
                                            <p>Trending from mobile and headphone style collection</p>
                                            <a href="#"><button className="hero__btn">SHOP NOW</button></a>
                                        </div>
                                        <div className="hero__right">
                                            <img className="banner_02" src={carouselItem_2} alt="banner2" />
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="glide__bullets" data-glide-el="controls[nav]">
                            <button className="glide__bullet" data-glide-dir="=0"></button>
                            <button className="glide__bullet" data-glide-dir="=1"></button>
                        </div>
                        {/* <div class="glide__arrows" data-glide-el="controls">
                            <button class="glide__arrow glide__arrow--left" data-glide-dir="<">prev</button>
                            <button class="glide__arrow glide__arrow--right" data-glide-dir=">">next</button>
                        </div> */}
                    </div>
                </div>
            </div>
        </Fragment>

    );
}
 
export default Carousel;