import { useEditor, useNode } from "@craftjs/core";
import { RevealSettings } from "./Settings";
import _get from "lodash.get";
import { Bounce, Fade, Flip, Roll, Rotate, Slide, Zoom } from "react-reveal";

export const Reveal = ({
  children,
  when,
  direction,
  effect,
  duration,
  fraction,
}) => {
  const { isEditing } = useEditor((state) => ({
    isEditing: state.options.enabled,
  }));
  const {
    connectors: { connect, drag },
    actions: { setProp },
  } = useNode((node) => ({
    isActive: node.events.selected,
  }));

  const props = {
    innerRef: connect,
    when: isEditing ? when : undefined,
    // when: true,
    top: direction === "top",
    right: direction === "right",
    bottom: direction === "bottom",
    left: direction === "left",
    ssrReveal: true,
    fraction,
    duration,
  };

  switch (effect) {
    case "flip":
      return <Flip {...props}>{children}</Flip>;
    case "rotate":
      return <Rotate {...props}>{children}</Rotate>;
    case "zoom":
      return <Zoom {...props}>{children}</Zoom>;
    case "bounce":
      return <Bounce {...props}>{children}</Bounce>;
    case "slide":
      return <Slide {...props}>{children}</Slide>;
    case "roll":
      return <Roll {...props}>{children}</Roll>;
    default:
      return <Fade {...props}>{children}</Fade>;
  }
};

Reveal.craft = {
  name: "Reveal",
  props: {
    fraction: 0.2,
    duration: undefined,
    when: undefined,
    direction: "bottom", // top, left, right, bottom, undefined
    effect: "fade", // fade, flip, rotate, zoom, bounce, slide, roll
  },
  related: {
    settings: RevealSettings,
  },
};
