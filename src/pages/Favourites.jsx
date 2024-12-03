import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import './css/ProductDetail.css'; 
import MyButton from '../components/MyButton';

const Favourites = () => {
    const { user } = useAuth();
    const [favorites, setFavorites] = useState([]);

    if (!user) {
        return (
            <div className="container">
                <h2>You need to log in to your account</h2>
                <MyButton>Login</MyButton>
            </div>
        );
    }

    const { products } = user;

    const toggleFavorite = (product) => {
        const isFavorite = favorites.some(fav => fav.id === product.id);
        if (isFavorite) {
            setFavorites(favorites.filter(fav => fav.id !== product.id));
        } else {
            setFavorites([...favorites, product]);
        }
    };

    return (
        <div className="favourites-container">
            <h2>Your Favourites</h2>
            <div className="favourites-list">
                {products && products.length > 0 ? (
                    products.map((product) => (
                        <div className="favourite-item" key={product.id}>
                            <img
                                src={product.image}
                                alt={product.title}
                                className="favourite-image"
                            />
                            <p className="product-title">{product.title}</p>
                            <p className="product-category">{product.category}</p>

                            <button 
                                className={`favorite-btn ${favorites.some(fav => fav.id === product.id) ? 'added' : ''}`}
                                onClick={() => toggleFavorite(product)}
                            >
                                {favorites.some(fav => fav.id === product.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                            </button>

                            <Link to={`/products/${product.id}`}>
                                <div className="btn">View Details</div>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>No products yet.</p>
                )}
            </div>
        </div>
    );
};

export default Favourites;
