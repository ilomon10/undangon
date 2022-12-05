import { useEditor, useNode } from "@craftjs/core";
import { RevealSettings } from "./Settings";
import _get from "lodash.get";
import Fade from "react-reveal";

export const Reveal = ({ children, when, direction }) => {
  const { isEditing } = useEditor((state) => ({
    isEditing: state.options.enabled,
  }));
  const {
    connectors: { connect, drag },
    actions: { setProp },
  } = useNode((node) => ({
    isActive: node.events.selected,
  }));

  console.log(isEditing);

  return (
    <Fade
      innerRef={connect}
      when={isEditing ? when : undefined}
      top={direction === "top"}
      right={direction === "right"}
      bottom={direction === "bottom"}
      left={direction === "left"}
      ssrReveal={true}
    >
      {children}
    </Fade>
  );
};

Reveal.craft = {
  name: "Reveal",
  props: {
    when: undefined,
    direction: "bottom",
  },
  related: {
    settings: RevealSettings,
  },
};
