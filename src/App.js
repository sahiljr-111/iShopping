import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom"
import Home from './Home';
import Product from './Product';
import Cart from './Cart';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart/:id" element={<Cart />} />
      </Routes>
    </>
  );
}

export default App;
