import './App.css';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import LoginRegister from './pages/LoginRegister';
import Favourites from './pages/Favourites';
import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/drinks" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/login" element={<LoginRegister />} /> {/* Add login route */}
        <Route path="/favourites" element={<Favourites />} /> {/* Add favourites route */}
      </Routes>
    </AuthProvider>
  );
}

export default App;

