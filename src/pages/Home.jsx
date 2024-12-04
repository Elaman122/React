import {Link} from 'react-router-dom'

const Home = () => {
    return (
        <div className="container">
            <div className="banner-container">
                <div className="banner">
                    <p>FakeStore</p>

                    {/* Ensure the Link points to the correct route */}
                    <Link to={`/products`}>
                        <div className="btn">
                            View Products
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home