import { EditableText } from "@blueprintjs/core";
import { useNode } from "@craftjs/core"
import { Box } from "components/Grid";
import { useState } from "react";
import { TextSettings } from "./TextSettings";

export const Text = ({ text, fontSize }) => {
  const { connectors: { connect, drag }, actions: { setProp } } = useNode((node) => ({
    isActive: node.events.selected
  }));
  const [isEditable, setIsEditable] = useState();
  return (
    <Box
      ref={ref => connect(drag(ref))}
      sx={{
        fontSize: fontSize
      }}
      onDoubleClick={() => {
        setIsEditable(true);
      }}
      onBlur={() => {
        console.log("blur");
        setIsEditable(false);
      }}
    >
      {!isEditable ? text :
        <EditableText isEditing={false} value={text} onChange={(e) => {
          setProp(prop => prop.text = e.replace(/<\/?[^>]+(>|$)/g, ""))
        }} />}
    </Box>
  )
}

Text.craft = {
  props: {
    text: "Text Area",
    fontSize: 6
  },
  related: {
    settings: TextSettings
  }
}