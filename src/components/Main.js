import React, { useState, useEffect } from 'react';
import Filter from './Filter';
import Products from './Products';
import Cart from './Cart';
import data from '../data.json';


const Main = ({createOrderApp}) => {
    const [products, setProducts] = useState(data.products);
    const [size, setSize] = useState("");
    const [sort, setSort] = useState("");
    const [cartItems, setCartItems] = useState([]);
    
   
  
    useEffect(() => {
      const cartItems = localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [];
        setCartItems(cartItems);
        
    }, []);
  
    //create order
    const createOrder = (order) => {
        // alert("Need to save order for " + order.name);
        createOrderApp(order)
    };
  
    const removeFromCart = (product) => {
      const updatedCartItems = cartItems.filter((item) => item.id !== product.id);
      setCartItems(updatedCartItems);
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    };
  
    const addToCart = (product) => {
      const updatedCartItems = [...cartItems]; // create a copy of the cartItems array
      let alreadyInCart = false;
      updatedCartItems.forEach((item) => {
        if (item.id === product.id) {
          item.count++;
          alreadyInCart = true;
        }
      });
      if (!alreadyInCart) {
        updatedCartItems.push({ ...product, count: 1 });
      }
      setCartItems(updatedCartItems);
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    };
  
    const filterProducts = (event) => {
      if (event.target.value === "") {
        setSize(event.target.value);
        setProducts(data.products);
      } else {
        setSize(event.target.value);
        setProducts(
          data.products.filter(
            (product) => product.availableSizes.indexOf(event.target.value) >= 0
          )
        );
      }
    };
  
    const sortProducts = (event) => {
      const sort = event.target.value;
      setSort(sort);
      setProducts(
        products
          .slice()
          .sort((a, b) =>
            sort === "lowest"
              ? a.price > b.price
                ? 1
                : -1
              : sort === "highest"
              ? a.price < b.price
                ? 1
                : -1
              : a._id < b._id
              ? 1
              : -1
          )
      );
    };
  
  return (
      <>
          <main>
        <div className="content">
          <div className="main">
            <Filter
              count={products.length}
              size={size}
              sort={sort}
              filterProducts={filterProducts}
              sortProducts={sortProducts}
            />
            <Products products={products} addToCart={addToCart} />
          </div>
          <div className="sidebar">
            <Cart
              cartItems={cartItems}
              removeFromCart={removeFromCart}
              createOrderMain={createOrder}
            />
          </div>
        </div>
      </main>
    </>
  )
}

export default Main;