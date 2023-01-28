import { useNode } from "@craftjs/core";
import { Flex } from "components/Grid";
import { AspectRatioSettings } from "./AspectRatioSettings";
import { AspectRatio as BaseAspectRatio } from "components/AspectRatio";

export const AspectRatio = ({ children, ratio, portrait, ...style }) => {
  const {
    connectors: { connect },
  } = useNode();
  return (
    <div ref={connect}>
      <BaseAspectRatio ratio={ratio} portrait={portrait}>
        {children}
      </BaseAspectRatio>
    </div>
  );
};

AspectRatio.craft = {
  name: "AspectRatio",
  props: {
    ratio: "1:1",
    portrait: false,
  },
  related: {
    settings: AspectRatioSettings,
  },
};
