import { forwardRef } from "react";
import { Box } from "./Grid";

export const Text = forwardRef((props, ref) =>
  <Box
    ref={ref}
    as="span"
    tx="text"
    {...props}
    __css={{
      fontFamily: "serif",
      color: "black",
      fontSize: 1,
      // textShadow: "1px 1px rgb(0 0 0 / 25%)"
    }}
  />
)