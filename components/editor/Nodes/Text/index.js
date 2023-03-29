import { EditableText } from "@blueprintjs/core";
import { useEditor, useNode } from "@craftjs/core";
import { Box } from "components/Grid";
import { useEffect, useState } from "react";
import ContentEditable from "react-contenteditable";
import { TextSettings } from "./TextSettings";
import FontFaceObserver from "fontfaceobserver";
import useFontFaceObserver from "use-font-face-observer";
import { useQueue } from "react-use";
import { useFontFace } from "./FontFaceProvider";

export const Text = ({
  lineHeight,
  text,
  textAlign,
  fontWeight,
  fontSize,
  fontFamily,
  color,
  margin,
  textShadow,
  children,
}) => {
  const {
    connectors: { connect },
    actions: { setProp },
  } = useNode((node) => ({
    isActive: node.events.selected,
  }));
  const { editorEnabled } = useEditor((state) => ({
    editorEnabled: state.options.enabled,
  }));
  const [isEditable, setIsEditable] = useState();

  const fontFace = useFontFace();

  const style = {
    lineHeight: `${lineHeight}px`,
    textAlign: textAlign,
    fontWeight: fontWeight,
    fontSize: fontSize,
    fontFamily: fontFamily,
    textShadow: textShadow,
    color: color,
    margin: margin.join(" "),
  };

  useEffect(async () => {
    if (!fontFamily) return;
    try {
      fontFace.load(fontFamily);
    } catch (err) {
      console.error(err);
    }
  }, [fontFamily]);

  if (children) {
    return (
      <Box ref={connect} style={style}>
        {children}
      </Box>
    );
  }

  if (!editorEnabled) {
    return (
      <Box ref={connect} style={style}>
        <div dangerouslySetInnerHTML={{ __html: text }} />
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
    textShadow: undefined,
    fontSize: 12,
    fontWeight: "normal",
    fontFamily: "Roboto",
    color: "inherit",
    margin: [0, 0, 0, 0],
  },
  related: {
    settings: TextSettings,
  },
};
