import { Box, Text } from "@mantine/core";
import { useEditor } from "@craftjs/core";
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
        settings:
          state.nodes[currentNodeId].related &&
          state.nodes[currentNodeId].related.settings,
      };
    }
    return {
      selected,
    };
  });

  return (
    <PanelSection text="Design">
      <Box
        sx={{
          minHeight: 280,
        }}
      >
        {!selected && <Text>Select any nodes to start editing</Text>}
        {selected ? (
          <Box>{selected.settings && createElement(selected.settings)}</Box>
        ) : null}
      </Box>
    </PanelSection>
  );
};
