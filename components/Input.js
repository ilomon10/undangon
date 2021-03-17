import { forwardRef } from "react";
import { Box } from "./";

export const Input = forwardRef(({
  textarea = false,
  fill,
  sx,
  ...props
}, ref) => {
  return (
    <Box
      ref={ref}
      as={textarea ? "textarea" : "input"}
      sx={{
        fontFamily: "serif",
        display: fill ? "block" : "inline-block",
        width: fill ? "100%" : "auto",
        ...sx,
      }}
      {...props}
    />
  )
})