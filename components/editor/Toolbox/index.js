import { Menu, MenuItem } from "@blueprintjs/core"
import { Box } from "components/Grid"

export const Toolbox = () => {
  return (
    <Box>
      <Menu>
        <MenuItem text="Button" />
        <MenuItem text="Container" />
        <MenuItem text="Text" />
      </Menu>
    </Box>
  )
}