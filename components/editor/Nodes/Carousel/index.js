import { Element, useNode } from "@craftjs/core";
import { CarouselSettings } from "./Settings";
import { Image } from "../Image";
import Slider from "react-slick";
import { Box } from "components/Grid";

export const Carousel = ({ images, settings, height, width }) => {
  const {
    connectors: { connect },
  } = useNode();

  return (
    <Box
      ref={connect}
      style={{
        height,
        width,
      }}
      sx={{
        ".slick-slider": {
          height: "100%",
        },
        ".slick-list": {
          height: "100%",
        },
        ".slick-slide": {
          height: "auto",
          "*": {
            height: "100% !important",
          },
        },
        ".slick-track": {
          height: "100%",
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          alignItems: "stretch",
        },
      }}
    >
      <Slider {...settings}>
        {images.map(({ id, ...imageProps }) => (
          <div key={id}>
            <Image {...imageProps} />
          </div>
        ))}
      </Slider>
    </Box>
  );
};

Carousel.craft = {
  name: "Carousel",
  props: {
    images: [],
    settings: {
      fade: false,
      infinite: true,
      speed: 500,
      dots: true,
      arrows: true,
      autoplaySpeed: 500,
    },
    height: "auto",
    width: "auto",
  },
  related: {
    settings: CarouselSettings,
  },
};
