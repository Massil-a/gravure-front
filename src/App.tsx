import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Home from './pages/Home';
import CustomizePlaque from './pages/CustomizePlaque';
import Shop from './pages/Shop';
import Header from './components/Header';
import Footer from './components/Footer';
import Cart from './pages/Cart';

export default function App() {
  return (
    <CartProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/customize/:categoryId" element={<CustomizePlaque />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          {/* <Route path="/shop/:productId" element={<ProductDetail />} /> */}
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
}
