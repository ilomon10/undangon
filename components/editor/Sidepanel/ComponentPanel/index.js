import { Menu, Icon, Classes } from "@blueprintjs/core";
import { Element, useEditor } from "@craftjs/core"
import { Box } from "components/Grid"
import { useEffect, useRef } from "react";
import { Button, Container, Text } from "../../Nodes";
import { PanelSection } from "../PanelSection";

export const ComponentPanel = () => {
  const { connectors, query } = useEditor();
  return (
    <PanelSection text="Components">
      <Menu>
        {[{
          icon: "widget-button",
          label: "Button",
          ref: ref => connectors.create(ref, <Button text="New Button" />)
        }, {
          icon: "rectangle",
          label: "Container",
          ref: ref => connectors.create(ref, <Element is={Container} canvas />)
        }, {
          icon: "paragraph",
          label: "Text",
          ref: ref => connectors.create(ref, <Text text="New Button" />)
        }].map(({ ref, label, icon }) =>
          <li key={label}>
            <button type="button" className={`${Classes.MENU_ITEM}`} ref={ref}>
              <Icon className={Classes.MENU_ITEM_ICON} icon={icon} />
              <span className={`${Classes.FILL} ${Classes.TEXT_OVERFLOW_ELLIPSIS}`}>{label}</span>
            </button>
          </li>)}
      </Menu>
    </PanelSection>
  )
}