import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Payment from "./components/Payment";

function App() {
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();
  const createOrder = (order) => {
    setOrder(order);

    navigate("/payment");
   
  };

  return (
    <div className="container">
      <Navbar />
      
        <Routes>
          <Route path="/" element={<Main createOrderApp={createOrder} />} />

          <Route path="/payment" element={<Payment order={order} />} />
        </Routes>
      

      <footer>All rights reserved.</footer>
    </div>
  );
}

export default App;
