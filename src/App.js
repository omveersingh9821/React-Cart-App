import React,{useState} from 'react';
import data from './data.json';
import Products from './components/Products';
import Filter from './components/Filter';

function App() {
  const [products, setProducts] = useState(data.products);
  const [size, setSize] = useState("");
  const [sort, setSort] = useState("");

  const filterProducts = (event) => { 
    if(event.target.value === ""){
      setSize(event.target.value);
      setProducts(data.products);
    } else {
      setSize(event.target.value);
      setProducts(data.products.filter(product => product.availableSizes.indexOf(event.target.value) >= 0));
    }
  }
  
  const sortProducts = (event) => { 
    const sort = event.target.value;
    setSort(sort);
    setProducts(products.slice().sort((a,b) => (
      sort === "lowest" ? 
      ((a.price > b.price) ? 1 : -1) :
      sort === "highest" ?
      ((a.price < b.price) ? 1 : -1) :
      ((a._id < b._id) ? 1 : -1)
    )));
  }

  return (
    <div className="container">
      <header>
        <a href="/">Shopping Cart</a>
      </header>
      <main>
        <div className="content">
          <div className="main">
            <Filter count={products.length} size={size} sort={sort}
            filterProducts={filterProducts} sortProducts={sortProducts}
            />
            <Products products={products}></Products>
          </div>
          <div className="sidebar">
            Cart Items
          </div> 
        </div>
      </main>
      <footer>
        All rights reserved.
      </footer>
    </div>
  );
}

export default App;
