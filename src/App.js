import './App.css';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import LoginRegister from './pages/LoginRegister';
import Favourites from './pages/Favourites';
import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import CRUDPage from './pages/CRUDPage';

function App() {
  return (
    <AuthProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/crud" element={<CRUDPage />} /> {/* Добавленный маршрут */}
      </Routes>
    </AuthProvider>
  );
}

export default App;

