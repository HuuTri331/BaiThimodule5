import React from "react";
import CategoryList from "./components/category/CategoryList";
import ProductList from "./components/product/ProductList";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import ProductCreate from "./components/product/ProductCreate";

function App() {
  return (
    <BrowserRouter>
      <div className="container mt-5">
        <nav className="mb-4">
          <ul className="nav">
            <li className="nav-item">
              <NavLink
                to="/listCategory"
                className={({ isActive }) =>
                  isActive ? 'nav-link active' : 'nav-link'
                }
                style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}
              >
                Danh sách loại sản phẩm
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/listProducts"
                className={({ isActive }) =>
                  isActive ? 'nav-link active' : 'nav-link'
                }
                style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}
              >
                Danh sách sản phẩm
              </NavLink>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/listCategory" element={<CategoryList />} />
          <Route path="/listProducts" element={<ProductList />} />
          <Route path="/createProduct" element={<ProductCreate />} />
        </Routes>
      </div>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;