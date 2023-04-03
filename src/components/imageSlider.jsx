import { Slide } from "react-slideshow-image";
import PropTypes from "prop-types";
import "@styles/ImageSlider.scss";

const ImageSlider = ({ images, alt }) => {
  const proprietes = {
    indicators: true,
    arrows: false,
  };

  return (
    <div className="image-slider">
      <div className="image-slider__container">
        <Slide {...proprietes}>
          {images.map((image, i) => {
            return (
              <img
                src={image}
                key={i}
                className="image-slider__container--slide"
                alt={`${alt}-${i + 1}`}
              />
            );
          })}
        </Slide>
      </div>
    </div>
  );
};

ImageSlider.propTypes = {
  images: PropTypes.array,
  alt: PropTypes.string,
};

export default ImageSlider;
