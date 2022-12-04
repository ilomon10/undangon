import { useNode } from "@craftjs/core";
import { Box } from "components/Grid";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { UrlParameterSettings } from "./Settings";
import _get from "lodash.get";

export const UrlParameter = ({ fieldName, defaultValue }) => {
  const { query: searchParams } = useRouter();
  const {
    connectors: { connect, drag },
    actions: { setProp },
  } = useNode((node) => ({
    isActive: node.events.selected,
  }));

  const value = useMemo(() => {
    return _get(searchParams, fieldName);
  }, [searchParams, fieldName]);

  return <Box ref={(ref) => connect(drag(ref))}>{value || defaultValue}</Box>;
};

UrlParameter.craft = {
  name: "UrlParameter",
  props: {
    fieldName: "",
    defaultValue: "DYNAMIC_VALUE",
  },
  related: {
    settings: UrlParameterSettings,
  },
};
