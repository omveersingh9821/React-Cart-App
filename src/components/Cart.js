import React, { useState } from "react";

const Cart = ({ cartItems, removeFromCart, createOrderMain }) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const createOrder = (e) => { 
    e.preventDefault();
    const order = {
      name,
      email,
      address,
      cartItems,
    };
    createOrderMain(order);
  }
  return (
    <div>
      {cartItems.length === 0 ? (
        <div className="cart cart-header">Cart is empty</div>
      ) : (
        <div className="cart cart-header">
          You have {cartItems.length} in the cart
        </div>
      )}

      <div>
        <div className="cart">
          <ul className="cart-items">
            {cartItems.map((item, index) => (
              <li key={index}>
                <div>
                  <img src={item.image} alt={item.title} />
                </div>
                <div>
                  <div>{item.title}</div>
                        <div className="right">
        
                    {`$${item.price}`} x {item.count}{" "}
                    <button
                      className="button"
                      onClick={() => {
                        removeFromCart(item);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {cartItems.length !== 0 && (
          <div>
          <div className="cart">
            <div className="total">
              <div>
                Total :{"  $"}
                {cartItems.reduce((a, c) => a + c.price * c.count, 0)}
              </div>
              <button className="button primary" onClick={()=>setShowCheckout(true)}>Proceed</button>
            </div>
          </div>
          {
          showCheckout && 
          <div className="cart">
                  <form onSubmit={createOrder}>
                    <ul className="form-container">
                      <li>
                        <label>Email</label>
                        <input name="email" type="email" required onChange={(e)=>setEmail(e.target.value)}></input>
                      </li>
                      <li>
                        <label>Name</label>
                        <input name="name" type="text" required onChange={(e) => setName(e.target.value)}></input>
                      </li>
                      <li>
                        <label>Address</label>
                        <input name="address" type="text" required onChange={(e) => setAddress(e.target.value)}></input>
                      </li>
                      <li>
                        <button className="button primary" type="submit">Checkout</button>
                      </li>
                    </ul>
            </form>
          </div>
        }
        </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
