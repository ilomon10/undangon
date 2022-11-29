import { useEditor } from "@craftjs/core"
import { Box } from "components/Grid"
import { createElement } from "react";

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
    <Box sx={{
      my: 2,
      px: 2,
    }}>
      <Box as="h3" sx={{ mb: 2 }}>Design</Box>

      {selected ? (
        <Box>
          {selected.settings && createElement(selected.settings)}
        </Box>
      ) : null}
    </Box>
  );
}