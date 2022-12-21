import { Button, Collapse, Icon } from "@blueprintjs/core";
import { useNode } from "@craftjs/core";
import { Box, Flex } from "components/Grid";
import { useMemo, useState } from "react";
import useCollapse from "react-collapsed";

export const PanelSection = ({ icon, text, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const { getCollapseProps, getToggleProps } = useCollapse({
    isExpanded: isOpen,
  });

  return (
    <Box
      sx={{
        borderBottom: "1px solid white",
        borderBottomColor: "gray.2",
      }}
    >
      <Flex
        type="button"
        sx={{
          cursor: "pointer",
          px: 2,
          py: 2,
          alignItems: "center",
        }}
        onClick={() => setIsOpen((open) => !open)}
      >
        {icon && (
          <span>
            <Icon icon={icon} />
          </span>
        )}
        <Box as="h4" sx={{ flexGrow: 1 }}>
          {text}
        </Box>
        <span>
          <Icon icon={isOpen ? "chevron-up" : "chevron-down"} />
        </span>
      </Flex>
      <Box {...getCollapseProps()}>{children}</Box>
    </Box>
  );
};
