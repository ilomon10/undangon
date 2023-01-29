import { Box, Flex } from "components/Grid";
import { AnchorLinkSettings } from "./AnchorLinkSettings";
import _pick from "lodash/pick";
import { Element, useNode } from "@craftjs/core";
import { useViewport } from "components/editor/Viewport/useViewport";

export const AnchorLink = ({ children, href, target }) => {
  const {
    connectors: { connect },
  } = useNode();

  const { isProduction } = useViewport();

  return (
    <a
      ref={(ref) => connect(ref)}
      href={isProduction ? href : undefined}
      target={isProduction ? target : undefined}
      style={{ display: "block" }}
    >
      {children}
    </a>
  );
};

AnchorLink.craft = {
  name: "AnchorLink",
  props: {
    href: undefined,
    target: undefined,
  },
  related: {
    settings: AnchorLinkSettings,
  },
};
