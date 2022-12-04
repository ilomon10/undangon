import { useNode } from "@craftjs/core";
import { Box } from "components/Grid";
import { FadeSettings } from "./Settings";
import _get from "lodash.get";
import RRFade from "react-reveal";

export const Fade = ({ children, when, direction }) => {
  const {
    connectors: { connect, drag },
    actions: { setProp },
  } = useNode((node) => ({
    isActive: node.events.selected,
  }));

  return (
    <RRFade
      innerRef={connect}
      when={when}
      top={direction === "top"}
      right={direction === "right"}
      bottom={direction === "bottom"}
      left={direction === "left"}
    >
      {children}
    </RRFade>
  );
};

Fade.craft = {
  name: "Fade",
  props: {
    when: undefined,
    direction: "bottom",
  },
  related: {
    settings: FadeSettings,
  },
};
