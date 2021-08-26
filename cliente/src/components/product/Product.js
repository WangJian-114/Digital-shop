import Modal from './Modal';
const Product = ( {producto}) => {
    return (         
        <div className="card">
                <img src={`${process.env.REACT_APP_BACKEND_URL_IMG}/${producto.img}`}  className="imagen-producto" alt="imagen producto"/>
                
                <div className="info-card">
                    <h4>{producto.name}</h4>
                    <p>Garantia de 6 meses</p>
                    <p className="precio">${producto.price} </p> 
                    <Modal 
                        producto = {producto}
                    />
                </div>
        </div>     
    );
}
export default Product;