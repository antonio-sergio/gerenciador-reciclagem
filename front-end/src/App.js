import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from 'react-router-dom';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';

// import AddProduct from './components/add-product';
import AddProduct from './components/add-product';
import Products from './components/products-list';
import Product from './components/product-component';
import Home from './pages/Home';
function App() {
  return (
   <>
        <Router>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/products"} element={<Products />} className="navbar-brand">
            Dashboard
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/products"}  element={<Products />} className="nav-link">
                Produtos
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"}  element={<AddProduct />} className="nav-link">
                Adicionar
              </Link>
            </li>

          </div>
        </nav>
          <Routes>
            <Route path="/" element={<Products/>} />
            <Route path="/products" element={<Products/>} />
            <Route path="/add" element={<AddProduct/>} />
            <Route path="/products/:id" element={<Product/>} />
          </Routes> 
        </Router>
        <Home />
          
   
   </>
          
  );
}

export default App;
