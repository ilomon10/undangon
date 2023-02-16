import { Layers } from "@craftjs/layers";
import { Box } from "components/Grid";
import { PanelSection } from "../PanelSection";

export const LayerPanel = () => {
  return (
    <Box
      sx={{
        minHeight: "250px",
        ".craft-layer-node.ROOT > div": {
          pb: 4,
        },
      }}
    >
      <Layers />
    </Box>
  );
};
