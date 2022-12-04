import { EditableText } from "@blueprintjs/core";
import { useNode } from "@craftjs/core";
import { Box } from "components/Grid";
import { useState } from "react";
import ContentEditable from "react-contenteditable";
import { TextSettings } from "./TextSettings";

export const Text = ({
  text,
  textAlign,
  fontWeight,
  fontSize,
  color,
  children,
}) => {
  const {
    connectors: { connect, drag },
    actions: { setProp },
  } = useNode((node) => ({
    isActive: node.events.selected,
  }));
  const [isEditable, setIsEditable] = useState();
  const style = {
    textAlign: textAlign,
    fontWeight: fontWeight,
    fontSize: fontSize,
    color: color,
  };

  if (children) {
    return (
      <Box ref={(ref) => connect(drag(ref))} style={style}>
        {children}
      </Box>
    );
  }

  return (
    <Box
      ref={(ref) => connect(drag(ref))}
      style={style}
      onDoubleClick={() => {
        setIsEditable(true);
      }}
      onBlur={() => {
        console.log("blur");
        setIsEditable(false);
      }}
    >
      {children}
      {!isEditable ? (
        <div dangerouslySetInnerHTML={{ __html: text }} />
      ) : (
        <ContentEditable
          disabled={false}
          html={text}
          onChange={(e) => {
            setProp((prop) => (prop.text = e.target.value), 500);
          }}
        />
      )}
    </Box>
  );
};

Text.craft = {
  name: "Text",
  props: {
    text: "Text Area",
    textAlign: "left",
    fontSize: "12px",
    fontWeight: "normal",
    color: "inherit",
  },
  related: {
    settings: TextSettings,
  },
};
