import { Collapse, Icon, Label } from "@blueprintjs/core"
import { Box, Flex } from "components/Grid"
import { useState } from "react"

export const SettingSection = ({
  icon,
  label,
  text,
  props,
  children
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Box>
      <Flex
        sx={{
          borderBottom: "1px solid white",
          borderBottomColor: "gray.1"
        }}
        onClick={() => setIsOpen(open => !open)}
      >
        {icon &&
          <span><Icon icon={icon} /></span>}
        <span>{text}</span>
        {label &&
          <span>{label}</span>}
      </Flex>
      <Collapse isOpen={isOpen}>
        {children}
      </Collapse>
    </Box>
  )
}