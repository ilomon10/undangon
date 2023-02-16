import { Collapse, Icon, Text } from "@mantine/core";
import { useNode } from "@craftjs/core";
import { importProps } from "components/editor/utils/importProps";
import { Box, Flex } from "components/Grid";
import { useMemo, useState } from "react";
import useCollapse from "react-collapsed";

export const SettingSection = ({ icon, label, text, props, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen || false);
  const [isExpanded, setIsExpanded] = useState(defaultOpen || false);
  const { nodeProps } = useNode((node) => ({
    nodeProps: props && importProps(node, props),
  }));
  const summary = useMemo(() => {
    let ret;
    if (typeof label !== "function") {
      ret = label;
    } else {
      ret = label(
        props.reduce((acc, key) => {
          acc[key] = nodeProps[key];
          return acc;
        }, {})
      );
    }
    return ret;
  }, [label, props, nodeProps]);

  const { getCollapseProps } = useCollapse({
    isExpanded: isOpen,
    onCollapseEnd: () => {
      setIsExpanded(false);
    },
    onExpandStart: () => {
      setIsExpanded(true);
    },
  });

  return (
    <Box
      sx={{
        borderTop: "1px solid white",
        borderTopColor: "gray.2",
      }}
    >
      <Flex
        type="button"
        sx={{
          cursor: "pointer",
          px: 2,
          py: 2,
        }}
        onClick={() => setIsOpen((open) => !open)}
      >
        {icon && (
          <div>
            <Icon icon={icon} />
          </div>
        )}
        <Box sx={{ flexShrink: 0 }}>{text}</Box>
        {summary && (
          <Box
            as={Text}
            ellipsize={true}
            sx={{ color: "gray.5", textAlign: "right", flexGrow: 1, ml: 2 }}
          >
            {summary}
          </Box>
        )}
      </Flex>
      <Box {...getCollapseProps()}>
        <Box
          sx={{
            px: 2,
            my: 2,
          }}
        >
          {isExpanded && children}
        </Box>
      </Box>
    </Box>
  );
};
