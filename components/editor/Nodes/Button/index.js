import { useNode } from "@craftjs/core";

export const Button = () => {
  const {
    connectors: { connect },
  } = useNode();
  return <div ref={(ref) => connect(ref)}>Button</div>;
};
