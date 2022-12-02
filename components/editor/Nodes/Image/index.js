import { useNode } from "@craftjs/core"
import { ImageSettings } from "./ImageSettings";

export const Image = ({
  url,
  height, width,
  objectFit,
  borderRadius,
}) => {
  const { connectors: { connect, drag } } = useNode();
  return (
    <div
      ref={ref => connect(drag(ref))}
      style={{
        height,
        width,
      }}
    >
      <img style={{
        display: "block",
        width: "100%",
        height: "100%",
        objectFit,
        borderRadius,
      }} src={url} />
    </div>
  )
}

Image.craft = {
  props: {
    url: "https://via.placeholder.com/150",
    height: "auto",
    width: "auto",
    borderRadius: "",
    objectFit: "fill"
  },
  related: {
    settings: ImageSettings
  }
}