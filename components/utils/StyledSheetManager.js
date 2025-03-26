import React from "react";
import isPropValid from "@emotion/is-prop-valid";
import { StyleSheetManager } from "styled-components";
// import { useServerInsertedHTML } from "next/navigation";
// import { ServerStyleSheet } from "styled-components";

const shouldForwardProp = (propName, target) => {
  return typeof target === "string" ? isPropValid(propName) : true;
};

export default function StyledSheetManager({ children }) {
  // if (typeof window !== "undefined") {
  return (
    <StyleSheetManager
      enableVendorPrefixes
      shouldForwardProp={shouldForwardProp}
    >
      {children}
    </StyleSheetManager>
  );
  // }
}
