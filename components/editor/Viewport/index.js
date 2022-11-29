import { Box, Flex } from "components/Grid"
import { SettingPanel } from "../SettingPanel"
import { Toolbar } from "../Toolbar"
import { Toolbox } from "../Toolbox"

export const Viewport = ({ children }) => {
  return (
    <Flex sx={{
      position: "fixed",
      inset: 0,
      flexDirection: "column"
    }}>
      <Box sx={{
        borderBottom: "1px solid white",
        borderBottomColor: "gray.3",
      }}>
        <Toolbar />
      </Box>
      <Flex sx={{
        flexGrow: 1
      }}>
        <Box sx={{
          borderRight: "1px solid white",
          borderRightColor: "gray.3",
        }}>
          <Toolbox />
        </Box>
        <Box sx={{
          flexGrow: 1,
          backgroundColor: "gray.2",
          overflowY: "auto",
          height: "1px",
          minHeight: "100%"
        }}>{children}</Box>
        <Box sx={{
          width: 280,
          borderLeft: "1px solid white",
          borderLeftColor: "gray.3",
        }}>
          <SettingPanel />
        </Box>
      </Flex>
    </Flex>
  )
}