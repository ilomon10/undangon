import { NonIdealState } from "@blueprintjs/core";
import { useEditor } from "@craftjs/core"
import { Box } from "components/Grid"
import { createElement } from "react";
import { PanelSection } from "../PanelSection";

export const SettingPanel = () => {
  const { selected } = useEditor((state) => {
    const [currentNodeId] = state.events.selected;
    let selected;

    if (currentNodeId) {
      selected = {
        id: currentNodeId,
        name: state.nodes[currentNodeId].data.name,
        settings: state.nodes[currentNodeId].related && state.nodes[currentNodeId].related.settings
      };
    }
    return {
      selected
    }
  });

  return (
    <PanelSection text="Design">
      <Box
        sx={{
          minHeight: 280
        }}
      >
        {!selected &&
          <Box>
            <NonIdealState description="Select any nodes to start editing" />
          </Box>}
        {selected ? (
          <Box>
            {selected.settings && createElement(selected.settings)}
          </Box>
        ) : null}
      </Box>
    </PanelSection>
  );
}