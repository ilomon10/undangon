import { useEditor, useNode } from "@craftjs/core"
import { Box } from "components/Grid";
import { useEffect, useMemo } from "react";
import { ContainerSettings } from "./ContainerSettings";

export const Container = ({
  children,
  height, width,

  paddingTop,
  paddingRight,
  paddingLeft,
  paddingBottom,

  marginTop,
  marginRight,
  marginLeft,
  marginBottom,
}) => {
  const { isActive, connectors: { connect, drag } } = useNode((node) => ({
    isActive: node.events.selected,
  }));
  return (
    <Box
      ref={ref => connect(drag(ref))}
      sx={{
        position: "relative",
        minHeight: 25,
        height: height,
        width: width,

        paddingTop,
        paddingRight,
        paddingLeft,
        paddingBottom,

        marginTop,
        marginRight,
        marginLeft,
        marginBottom,
      }}
    >
      {(isActive) &&
        <Box sx={{
          pointerEvent: "none",
          position: "absolute",
          inset: 1,
          border: "1px dashed white",
          borderColor: "red.2"
        }} />}
      {children}
    </Box>
  )
}

Container.craft = {
  props: {
    height: 100,
    width: 100,

    paddingTop: 0,
    paddingRight: 0,
    paddingLeft: 0,
    paddingBottom: 0,

    marginTop: 0,
    marginRight: 0,
    marginLeft: 0,
    marginBottom: 0,
  },
  related: {
    settings: ContainerSettings
  }
}
