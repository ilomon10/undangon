import { useNode } from "@craftjs/core";
import { Box, Flex } from "components/Grid";
import { ContainerSettings } from "./ContainerSettings";
import _pick from "lodash/pick";
import { useViewport } from "components/editor/Viewport/useViewport";
import { ProcessUnitForViewport } from "./ProcessUnitForViewport";

export const Container = ({
  children,
  padding,
  margin,
  borderRadius,
  backgroundColor,
  background,
  ...style
}) => {
  const { media, isProduction } = useViewport();
  const {
    connectors: { connect },
    modes,
  } = useNode((node) => ({
    modes: _pick(node.data.custom.settingMode, [
      "opacity",
      "height",
      "width",
      "padding",
      "margin",
    ]),
  }));

  ["height", "maxHeight", "minHeight"].map((property) => {
    if (isProduction) return;
    style[property] = ProcessUnitForViewport(
      style[property],
      media.currentMedia.height
    );
  });
  ["width", "maxWidth", "minWidth"].map((property) => {
    if (isProduction) return;
    style[property] = ProcessUnitForViewport(
      style[property],
      media.currentMedia.width
    );
  });

  const { height, width } = style;

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
      }}
      style={{
        ...style,
        width: widthLookup[modes.width],
        height: heightLookup[modes.height],
        padding: `${padding[0]}px ${padding[1]}px ${padding[2]}px ${padding[3]}px`,
        margin: `${margin.join(" ")}`,
        borderRadius: `${borderRadius ? borderRadius.join(" ") : undefined}`,
        background: background || backgroundColor || undefined,
      }}
    >
      {children}
    </Flex>
  );
};

export const containerDefaultProps = {
  height: "100px",
  width: "100px",
  minHeight: undefined,
  minWidth: undefined,
  maxHeight: undefined,
  maxWidth: undefined,

  padding: [0, 0, 0, 0],
  margin: [0, 0, 0, 0],

  backgroundColor: undefined,
  background: undefined,
  borderRadius: [0, 0, 0, 0],
  border: undefined,
  overflow: undefined,
  opacity: 1,

  zIndex: undefined,

  flexWrap: "nowrap", // nowrap, wrap
  flexDirection: "column", // column, row, column-reverse, row-reverse
};

Container.craft = {
  name: "Container",
  props: containerDefaultProps,
  custom: {
    settingMode: {
      height: "hug", // fill, fixed, hug
      width: "hug", // fill, fixed, hug
      padding: "link", // single, link
      margin: "link", // single, link
      borderRadius: "link", // single, link
    },
  },
  related: {
    settings: ContainerSettings,
  },
};
