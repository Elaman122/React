import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import './css/ProductDetail.css';

const url = `https://fakestoreapi.com/products/`;

const ProductDetail = () => {
    const { id: productId } = useParams();
    const { user, setUser } = useAuth();
    const [product, setProduct] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${url}${productId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const productData = await response.json();
                setProduct(productData);

                if (user && user.products && user.products.some((p) => p.id === productData.id)) {
                    setIsFavorite(true);
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [productId, user]);

    useEffect(() => {
        if (user) {
            const updatedUser = { ...user };
            updatedUser.products = updatedUser.products || [];
            try {
                // Save user data after updating favorites
                fetch(`https://67415a25e4647499008d72f6.mockapi.io/api/v1/users/${user.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updatedUser),
                });
            } catch (err) {
                console.error("Failed to update user data:", err);
            }
        }
    }, [user]);

    const toggleFavorite = async () => {
        if (!user) {
            alert('You need to log in to your account');
            return;
        }

        const updatedProducts = isFavorite
            ? user.products.filter((p) => p.id !== product.id)
            : [...user.products, { id: product.id, title: product.title, image: product.image, category: product.category }];
        
        const updatedUser = { ...user, products: updatedProducts };
        setUser(updatedUser);
        setIsFavorite(!isFavorite);

        try {
            await fetch(`https://67415a25e4647499008d72f6.mockapi.io/api/v1/users/${user.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedUser),
            });
        } catch (err) {
            console.error("Failed to update user data:", err);
        }
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <div className="product">
                <div className="favorite-icon" onClick={toggleFavorite}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        style={{ fill: isFavorite ? 'red' : 'white' }} // Inline style for color change
                        className="size-6 heart-icon"
                    >
                        <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                    </svg>
                </div>
                <div className="flex-container">
                    <img
                        src={product.image}
                        className="product-img"
                        alt={product.title}
                    />
                    <div className="product-info">
                        <div className="row">
                            <h3 className="label">Name:</h3>
                            <p className="text">{product.title}</p>
                        </div>
                        <div className="row">
                            <h3 className="label">Category:</h3>
                            <p className="text">{product.category}</p>
                        </div>
                        <div className="row">
                            <h3 className="label">Price:</h3>
                            <p className="text">${product.price}</p>
                        </div>
                        <div className="row">
                            <h3 className="label">Description:</h3>
                            <p className="text">{product.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
