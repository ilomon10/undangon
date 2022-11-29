import { Menu, MenuItem, Classes } from "@blueprintjs/core";
import { Element, useEditor } from "@craftjs/core"
import { Box } from "components/Grid"
import { useEffect, useRef } from "react";
import { Button, Container, Text } from "../Nodes";

export const Toolbox = () => {
  const { connectors, query } = useEditor();
  const testRef1 = useRef();
  const testRef2 = useRef();
  useEffect(() => {
    console.log(testRef1);
    console.log(testRef2);
  }, []);
  return (
    <Box sx={{
      width: 280
    }}>
      <Menu>
        <div ref={testRef1}></div>
        {[{
          label: "Button",
          ref: ref => connectors.create(ref, <Button text="New Button" />)
        }, {
          label: "Container",
          ref: ref => connectors.create(ref, <Element is={Container} canvas />)
        }, {
          label: "Text",
          ref: ref => connectors.create(ref, <Text text="New Button" />)
        }].map(({ ref, label }) =>
          <li key={label}>
            <a className={`${Classes.MENU_ITEM}`} ref={ref}>{label}</a>
          </li>)}
      </Menu>
    </Box>
  )
}