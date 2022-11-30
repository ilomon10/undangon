import { useEditor, useNode } from "@craftjs/core"
import { Box, Flex } from "components/Grid";
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

  backgroundColor,
  borderRadius,

  flexDirection
}) => {
  const { connectors: { connect, drag } } = useNode();
  return (
    <Flex
      ref={ref => connect(drag(ref))}
      sx={{
        position: "relative",
        minHeight: 25,
      }}
      style={{
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

        backgroundColor,
        borderRadius,

        flexDirection,
      }}
    >
      {children}
    </Flex>
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

    backgroundColor: undefined,
    borderRadius: undefined,
    
    flexDirection: "column"
  },
  related: {
    settings: ContainerSettings
  }
}
