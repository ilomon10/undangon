import { EditableText } from "@blueprintjs/core";
import { useNode } from "@craftjs/core";
import { Box } from "components/Grid";
import { useEffect, useState } from "react";
import ContentEditable from "react-contenteditable";
import { TextSettings } from "./TextSettings";
import FontFaceObserver from "fontfaceobserver";

export const Text = ({
  text,
  textAlign,
  fontWeight,
  fontSize,
  fontFamily,
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
    fontFamily: fontFamily,
    color: color,
  };

  useEffect(async () => {
    if (!fontFamily) return;
    const font = new FontFaceObserver(fontFamily);
    try {
      const res = await font.load();
    } catch (err) {
      const WebFont = await import("webfontloader");
      WebFont.load({
        google: {
          families: [fontFamily],
        },
      });
      console.error(err.message);
    }
  }, [fontFamily]);

  if (children) {
    return (
      <Box ref={connect} style={style}>
        {children}
      </Box>
    );
  }

  return (
    <Box
      ref={connect}
      style={style}
      onDoubleClick={() => {
        setIsEditable(true);
      }}
      onBlur={() => {
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
    fontSize: 12,
    fontWeight: "normal",
    fontFamily: "Roboto",
    color: "inherit",
  },
  related: {
    settings: TextSettings,
  },
};
