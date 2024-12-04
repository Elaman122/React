import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import './css/Products.css';

const baseUrl = 'https://fakestoreapi.com/products';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const location = useLocation(); // To get query parameters

    // Extract search term from URL
    const queryParams = new URLSearchParams(location.search);
    const searchTerm = queryParams.get('search')?.toLowerCase() || '';

    // Fetch products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null); // Reset error before new fetch
                const response = await fetch(baseUrl);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setProducts(data || []); // Set empty array if no data
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('There was an error fetching the products. Please try again later.');
                setProducts([]); // Clear products if error
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Filter products by search term
    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm) || product.category.toLowerCase().includes(searchTerm)
    );

    return (
        <div className="container">
            <div className="products-container">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p> // Display error message if any
                ) : filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <div className="product-card" key={product.id}>
                            {/* Display product image */}
                            {product.image ? (
                                <img src={product.image} alt={product.title} loading="lazy" />
                            ) : (
                                <div className="no-image">No Image Available</div>
                            )}

                            <div className="product-info">
                                <div className="content-text">
                                    <h2 className="product-title">{product.title}</h2>
                                    <span className="product-category">{product.category}</span>
                                    <p className="product-price">${product.price.toFixed(2)}</p>
                                </div>
                                <Link to={`/products/${product.id}`}> {/* Updated to /products */}
                                    <div className="btn">View Details</div>
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No products found.</p>
                )}
            </div>
        </div>
    );
};

export default Products;
