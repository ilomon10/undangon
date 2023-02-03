import { useNode } from "@craftjs/core";
import { Box, Flex } from "components/Grid";
import { IFrameSettings } from "./IFrameSettings";
import moment from "moment";
import { Counter } from "components/Counter";
import _includes from "lodash/includes";

export const IFrame = ({
  children,
  url,
  height,
  width,

  containerStyle,
  ...iframeAttr
}) => {
  const {
    connectors: { connect },
  } = useNode();

  return (
    <div
      ref={connect}
      style={{
        height: containerStyle.height,
        width: containerStyle.width,
      }}
    >
      <iframe
        {...iframeAttr}
        src={url}
        height={height}
        width={width}
        style={{ border: 0 }}
      ></iframe>
    </div>
  );
};

IFrame.craft = {
  name: "IFrame",
  props: {
    url: "",
    height: "100",
    width: "100",
    referrerPolicy: "no-referrer-when-downgrade",
    containerStyle: {
      height: "100px",
      width: "100px",
    },
  },
  related: {
    settings: IFrameSettings,
  },
};
