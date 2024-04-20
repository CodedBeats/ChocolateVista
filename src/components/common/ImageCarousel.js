// dependencies
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';


let ImageCarousel = (props) => {
    return (
        <Carousel fade controls={false} indicators={false} interval={5000}>
            {props.images.map((image, index) => (
            <Carousel.Item>
                <div key={index}>
                    <Image 
                        className={props.imageClass}
                        src={image}
                        alt={[index]}
                    />
                </div>
            </Carousel.Item>
        ))}
        </Carousel>
    );
}

export default ImageCarousel;
