import { useNode } from "@craftjs/core";
import { Box, Flex } from "components/Grid";
import { ContainerSettings } from "./ContainerSettings";
import _pick from "lodash/pick";

export const Container = ({
  children,
  padding,
  margin,
  height,
  width,
  ...style
}) => {
  const {
    connectors: { connect },
    modes,
  } = useNode((node) => ({
    modes: _pick(node.data.custom.settingMode, [
      "height",
      "width",
      "padding",
      "margin",
    ]),
  }));

  let heightLookup = {
    fixed: height,
    hug: undefined,
    fill: "100%",
  };
  let widthLookup = {
    fixed: width,
    hug: undefined,
    fill: "100%",
  };

  return (
    <Flex
      ref={(ref) => connect(ref)}
      sx={{
        position: "relative",
        minHeight: 25,
      }}
      style={{
        ...style,
        width: widthLookup[modes.width],
        height: heightLookup[modes.height],
        padding: `${padding[0]}px ${padding[1]}px ${padding[2]}px ${padding[3]}px`,
        margin: `${margin.join("px ")}`,
      }}
    >
      {children}
    </Flex>
  );
};

Container.craft = {
  name: "Container",
  props: {
    height: 100,
    width: 100,

    padding: [0, 0, 0, 0],

    margin: [0, 0, 0, 0],

    backgroundColor: undefined,
    backgroundImage: undefined,
    borderRadius: undefined,

    flexDirection: "column",
  },
  custom: {
    settingMode: {
      height: "hug", // fill, fixed, hug
      width: "hug", // fill, fixed, hug
      padding: "link", // single, link
      margin: "link", // single, link
    },
  },
  related: {
    settings: ContainerSettings,
  },
};
