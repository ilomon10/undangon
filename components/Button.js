import { Box } from "./";

export const Button = ({
  text,
  ...props
}) => {
  return (
    <Box
      as="button"
      sx={{
        // appearance: "none",
        // border: 0,
        // borderRadius: 4,
        py: 1,
        px: 2,
        // bg: "accent",
      }}
      {...props}
    >{text}</Box>
  )
}