import { useNode } from "@craftjs/core";
import { ImageSettings } from "./ImageSettings";
import Zoom from "react-medium-image-zoom";
import { getPercentage, getRatioFromDimension } from "components/AspectRatio";
import { useViewport } from "components/editor/Viewport/useViewport";

export const Image = ({
  connect = true,
  url,
  height,
  width,
  objectFit,
  borderRadius,
  innerHeight,
  innerWidth,

  zoomable,

  display,
  flexWrap,
  flexDirection,
  alignItems,
  justifyContent,
}) => {
  const { connectors } = useNode();
  const { isProduction } = useViewport();

  const imageDOM = (
    <img
      style={{
        display: "block",
        width: innerWidth,
        height: innerHeight,
        objectFit,
        borderRadius,
      }}
      src={url}
    />
  );

  if (zoomable && isProduction) {
    return (
      <Zoom wrapStyle={{ height: `100%`, width: `100%` }}>{imageDOM}</Zoom>
    );
  }

  return (
    <div
      ref={(ref) => connect && connectors.connect(ref)}
      style={{
        height,
        width,

        display,
        flexWrap,
        flexDirection,
        alignItems,
        justifyContent,
      }}
    >
      {imageDOM}
    </div>
  );
};

Image.craft = {
  name: "Image",
  props: {
    url: "https://via.placeholder.com/150",
    height: "auto",
    width: "auto",
    innerHeight: "100%",
    innerWidth: "100%",
    borderRadius: "",
    objectFit: "fill",

    zoomable: false,

    display: "flex",
    flexWrap: "nowrap",
    flexDirection: "column",
    alignItems: undefined,
    justifyContent: undefined,
  },
  related: {
    settings: ImageSettings,
  },
};
