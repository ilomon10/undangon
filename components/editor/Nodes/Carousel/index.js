import { Element, useNode } from "@craftjs/core";
import { CarouselSettings } from "./Settings";
import { Image } from "../Image";
import Slider from "react-slick";

export const Carousel = ({ images, settings, height, width }) => {
  const {
    connectors: { connect },
  } = useNode();
  console.log(settings);
  return (
    <div
      ref={connect}
      style={{
        height,
        width,
      }}
    >
      <Slider {...settings}>
        {images.map(({ id, ...imageProps }) => (
          <div key={id}>
            <Image {...imageProps} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

Carousel.craft = {
  name: "Carousel",
  props: {
    images: [],
    settings: {
      infinite: true,
      speed: 500,
      dots: true,
      autoplaySpeed: 500,
    },
    height: "auto",
    width: "auto",
  },
  related: {
    settings: CarouselSettings,
  },
};
