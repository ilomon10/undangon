import { useNode } from "@craftjs/core";
import { ImageSettings } from "./ImageSettings";

export const Image = ({
  connect = true,
  url,
  height,
  width,
  objectFit,
  borderRadius,
  innerHeight,
  innerWidth,

  display,
  flexWrap,
  flexDirection,
  alignItems,
  justifyContent,
}) => {
  const { connectors } = useNode();

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
