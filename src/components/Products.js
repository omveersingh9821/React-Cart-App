import React,{useState} from 'react';
import Fade from 'react-reveal/Fade';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';


const Products = ({ products, addToCart }) => {
    const [showModal, setShowModal] = useState(false);
    const [product, setProduct] = useState({});
    const openModal = (product) => { 
        setProduct(product);
        setShowModal(true);
    }
    const closeModal = () => { 
        setProduct({});
        setShowModal(false);
    }
    return (
        <div>
            <Fade bottom cascade>
          <ul className="products">
              {
                  products.map((product, index) => (
                      <li key={product.id}>
                          <div className="product">
                              <a href={'#' + product.id} onClick={()=> openModal(product)}>
                                  <img src={product.image} alt={product.title} />
                              </a>
                              <p>{product.title}</p>
                          </div>
                          <div className="product-price">
                              <div>${product.price}</div>
                              <button className="button primary" onClick={()=>addToCart(product)}>Add To Cart</button>
                          </div>
                      </li>
                  ))
              }
                </ul>
            </Fade>
            {
                product && (
                    <Modal isOpen={showModal} onRequestClose={closeModal}>
                        <Zoom>
                            <div>
                                <button className="close-modal" onClick={closeModal}>x</button>
                            </div>
                            <div className="product-details">
                                <img src={product.image} alt={product.title} />
                                <div className="product-details-description">
                                    <p>
                                        <strong>{product.title}</strong>
                                    </p>
                                    <p>
                                        {product.description}
                                    </p>
                                    {/* <p>
                                        Available Sizes: {" "}
                                        {
                                            product&&
                                            product.availableSizes.map((x) => (
                                            <span>
                                                {" "}
                                                <button className="button">{x}</button>
                                            </span>
                                            ))
                                        }
                                    </p> */}
                                    <div className="product-price">
                                        <div>${product.price}</div>
                                        <button className="button primary" onClick={() => {
                                            addToCart(product);
                                            closeModal();
                                        }}>Add To Cart</button>
                                    </div>
                                </div>
                            </div>
                        </Zoom>
                    </Modal>
                )
            }
            </div>
  )
}

export default Products