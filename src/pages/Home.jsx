import {Link} from 'react-router-dom'

const Home = () => {
    return(
        <div className="container">
            <div className="banner-container">
                <div className="banner">
                    <p>FakeStore</p>

                    <Link to={`/drinks`}>
                        <div className="btn">
                            View Products
                        </div>
                    </Link>
                    

                </div>
            </div>

        </div>
    )
}

export default Home