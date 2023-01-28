import { Menu, Icon, Classes } from "@blueprintjs/core";
import { Element, useEditor } from "@craftjs/core";
import { Reveal } from "components/editor/Components";
import { UrlParameter } from "components/editor/Components/UrlParameter";
import { Box } from "components/Grid";
import { useEffect, useRef } from "react";
import { Button, Container, Countdown, Text } from "../../Nodes";
import { PanelSection } from "../PanelSection";

export const ComponentPanel = () => {
  const { connectors, query } = useEditor();
  return (
    <PanelSection text="Components">
      <Menu>
        {[
          {
            icon: "paragraph",
            label: "UrlParameter",
            ref: (ref) =>
              connectors.create(
                ref,
                <Text>
                  <UrlParameter />
                </Text>
              ),
          },
          {
            icon: "paragraph",
            label: "Reveal",
            ref: (ref) =>
              connectors.create(
                ref,
                <Reveal name="Reveal">
                  <Element is={Container} canvas />
                </Reveal>
              ),
          },
          {
            icon: "paragraph",
            label: "Countdown",
            ref: (ref) =>
              connectors.create(ref, <Countdown name="Countdown" />),
          },
        ].map(({ ref, label, icon }) => (
          <li key={label}>
            <button type="button" className={`${Classes.MENU_ITEM}`} ref={ref}>
              <Icon className={Classes.MENU_ITEM_ICON} icon={icon} />
              <span
                className={`${Classes.FILL} ${Classes.TEXT_OVERFLOW_ELLIPSIS}`}
              >
                {label}
              </span>
            </button>
          </li>
        ))}
      </Menu>
    </PanelSection>
  );
};
