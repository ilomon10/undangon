import { useNode } from "@craftjs/core";
import { Flex } from "components/Grid";
import { defaultProps as containerDefaultProps } from "../Container";
import _pick from "lodash/pick";
import { Container } from "../Container";
import { useMemo } from "react";
import { DocumentSettings } from "./DocumentSettings";

export const Document = ({ children, ...props }) => {
  const options = useMemo(
    () => ({
      container: _pick(props, Object.keys(containerDefaultProps)),
      documents: _pick(props, Object.keys(defaultProps)),
    }),
    [props]
  );

  const {
    connectors: { connect },
    modes,
  } = useNode((node) => ({
    modes: _pick(node.data.custom.settingMode, [
      "height",
      "width",
      "padding",
      "margin",
    ]),
  }));

  return (
    <Flex ref={(ref) => connect(ref)}>
      <Flex as={Container} {...options.container}>
        {children}
      </Flex>
    </Flex>
  );
};

export const defaultProps = {
  modalOpen: true,
};

Document.craft = {
  name: "Document",
  props: defaultProps,
  custom: {},
  related: {
    settings: DocumentSettings,
  },
};
