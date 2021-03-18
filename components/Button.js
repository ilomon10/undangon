import { Box } from "./";

export const Button = ({
  text,
  ...props
}) => {
  return (
    <Box
      as="button"
      sx={{
        appearance: "none",
        display: "inline-block",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "gray.5",
        color: "black",
        borderRadius: 4,
        py: 1,
        px: 2,
        bg: "gray.1",
      }}
      {...props}
    >{text}</Box>
  )
}