// dependencies
import Image from 'react-bootstrap/Image';

// style
import "./css/about.css";


let About = () => {

    return (
        <div className="container">
            <div className="logo-container">
                <Image src="/imgs/logo.png" className="logo-img" rounded />
            </div>
            <div className="about-title">ChocolateVista</div>
            <div className="about-text">
                ChocolateVista is your go-to destination for discovering and reviewing a delightful selection of boxed chocolates. Whether you're on the hunt for the perfect gift or simply indulging your own sweet tooth, ChocolateVista offers a user-driven platform where chocolate enthusiasts can explore, rate, and review an array of delectable treats. Our website is designed to empower users to make informed decisions about their chocolate purchases, guided by the collective wisdom of fellow chocolate lovers.<br />
                At ChocolateVista, we believe in the power of community. Our platform fosters a sense of camaraderie among chocolate enthusiasts, encouraging them to share their passion, insights, and recommendations. Whether it's discovering hidden gems, sharing personal favourites, or engaging in lively discussions, our community is united by a shared love for all things chocolate.<br />
                "ChocolateVista" captures the essence of your website as a platform for discovering, exploring, and experiencing the rich and diverse world of boxed chocolates.
            </div>
        </div>
    )
}

export default About;
