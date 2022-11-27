import "normalize.css/normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import { ThemeProvider } from "styled-components";
import theme from "./theme";

export const BlueprintWrapper = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <div {...props} />
    </ThemeProvider>
  );
}