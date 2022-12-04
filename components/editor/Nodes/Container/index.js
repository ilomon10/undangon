import { useEditor, useNode } from "@craftjs/core"
import { Box, Flex } from "components/Grid";
import { useEffect, useMemo } from "react";
import { ContainerSettings } from "./ContainerSettings";

export const Container = ({
  children,
  ...style
}) => {
  const { connectors: { connect, drag } } = useNode();
  return (
    <Flex
      ref={ref => connect(drag(ref))}
      sx={{
        position: "relative",
        minHeight: 25,
      }}
      style={style}
    >
      {children}
    </Flex>
  )
}

Container.craft = {
  name: "Container",
  props: {
    height: "100px",
    width: "auto",

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
