import React,{Fragment} from 'react';

import image_1 from "../../img/images/collection_01.png";
import image_2 from "../../img/images/collection_02.png";

const Collection = () => {
    return ( 
        <Fragment>
            <section id="collection" className="section collection container">
                <div className="collection__container" data-aos="fade-up" data-aos-duration="1200">
                    <div className="collection__box">
                        <div className="img__container">
                            <img className="collection_02" src={image_1}alt=""/>
                        </div>
                        <div className="collection__content">
                            <div className="collection__data">
                                <span>New Colors Introduced</span>
                                <h1>HEADPHONES</h1>
                                <a href="#shop">COMPRAR AHORA</a>
                            </div>
                        </div>
                    </div>

                    <div className="collection__box">
                        <div className="img__container">
                            <img className="collection_01" src={image_2} alt=""/>
                        </div>
                        <div className="collection__content">
                            <div className="collection__data">
                                <span>Phone Device Presets</span>
                                <h1>SMARTPHONES</h1>
                                <a href="#">COMPRAR AHORA</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>

     );
}
 
export default Collection;