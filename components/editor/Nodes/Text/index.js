import { EditableText } from "@blueprintjs/core";
import { useNode } from "@craftjs/core"
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
}) => {
  const { connectors: { connect, drag }, actions: { setProp } } = useNode((node) => ({
    isActive: node.events.selected
  }));
  const [isEditable, setIsEditable] = useState();
  return (
    <Box
      ref={ref => connect(drag(ref))}
      style={{
        textAlign: textAlign,
        fontWeight: fontWeight,
        fontSize: fontSize,
        color: color
      }}
      onDoubleClick={() => {
        setIsEditable(true);
      }}
      onBlur={() => {
        console.log("blur");
        setIsEditable(false);
      }}
    >
      {!isEditable ? <div dangerouslySetInnerHTML={{ __html: text }} /> :
        <ContentEditable
          disabled={false}
          html={text}
          onChange={(e) => {
            setProp(prop => prop.text = e.target.value, 500)
          }}
        />}
    </Box>
  )
}

Text.craft = {
  props: {
    text: "Text Area",
    textAlign: "left",
    fontSize: "12px",
    fontWeight: "normal",
    color: "inherit",
  },
  related: {
    settings: TextSettings
  }
}