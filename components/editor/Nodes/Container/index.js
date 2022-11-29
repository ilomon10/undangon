import { useEditor, useNode } from "@craftjs/core"
import { Box } from "components/Grid";
import { useEffect } from "react";
import { ContainerSettings } from "./ContainerSettings";

export const Container = ({ height, width, children }) => {
  const { isActive, connectors: { connect, drag } } = useNode((node) => ({
    isActive: node.events.selected,
  }));
  const { isDragged } = useEditor(state => {
    const [draggedId] = state.events.dragged;
    return {
      isDragged: !!draggedId,
    }
  });
  return (
    <Box
      ref={ref => connect(drag(ref))}
      sx={{
        position: "relative",
        minHeight: 25,
        height: height,
        width: width
      }}
    >
      {(isActive || isDragged) &&
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
  related: {
    settings: ContainerSettings
  }
}
