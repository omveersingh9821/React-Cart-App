import React from 'react';

const Products = ({ products, addToCart }) => {
  return (
          <ul className="products">
              {
                  products.map((product, index) => (
                      <li key={product.id}>
                          <div className="product">
                              <a href={'#' + product.id}>
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
  )
}

export default Products