import { Box } from "./";

export const Divider = ({ sx, ...props }) => {
  return (
    <Box
      sx={{
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "gray.3",
        borderTop: 0,
        borderRight: 0,
        ...sx,
      }}
    />
  )
}