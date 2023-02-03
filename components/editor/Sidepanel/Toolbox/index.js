import { Menu, Icon, Classes } from "@blueprintjs/core";
import { Element, useEditor } from "@craftjs/core";
import { Image } from "components/editor/Nodes/Image";
import { Box, Flex } from "components/Grid";
import { useEffect, useRef } from "react";
import {
  AnchorLink,
  AspectRatio,
  Button,
  Carousel,
  Container,
  GuestBook,
  IFrame,
  Positioned,
  StaticMapbox,
  Text,
} from "../../Nodes";
import { PanelSection } from "../PanelSection";

export const Toolbox = () => {
  const { connectors, query } = useEditor();
  return (
    <PanelSection text="Toolbox">
      <Menu>
        {[
          {
            icon: "widget-button",
            label: "Anchor",
            ref: (ref) =>
              connectors.create(ref, <Element is={AnchorLink} canvas />),
          },
          {
            icon: "rectangle",
            label: "Aspect Ratio",
            ref: (ref) =>
              connectors.create(
                ref,
                <Element
                  is={AspectRatio}
                  ratio={"1:1"}
                  portrait={false}
                  canvas
                />
              ),
          },
          {
            icon: "widget-button",
            label: "Button",
            ref: (ref) => connectors.create(ref, <Button text="New Button" />),
          },
          {
            icon: "media",
            label: "Image",
            ref: (ref) => connectors.create(ref, <Image />),
          },
          {
            icon: "rectangle",
            label: "Container",
            ref: (ref) =>
              connectors.create(ref, <Element is={Container} canvas />),
          },
          {
            icon: "clip",
            label: "Positioned",
            ref: (ref) =>
              connectors.create(
                ref,
                <Element is={Positioned} canvas>
                  <Element
                    is={Container}
                    canvas
                    width={100}
                    height={100}
                    custom={{
                      settingMode: { height: "fixed", width: "fixed" },
                    }}
                  />
                </Element>
              ),
          },
          {
            icon: "paragraph",
            label: "Text",
            ref: (ref) => connectors.create(ref, <Text text="New Text" />),
          },
          {
            icon: "rectangle",
            label: "IFrame",
            ref: (ref) => connectors.create(ref, <IFrame />),
          },
          {
            icon: "map",
            label: "Static Mapbox",
            ref: (ref) => connectors.create(ref, <StaticMapbox />),
          },
          {
            icon: "media",
            label: "Carousel",
            ref: (ref) => connectors.create(ref, <Carousel />),
          },
          {
            icon: "manual",
            label: "Guest Book",
            ref: (ref) => connectors.create(ref, <GuestBook />),
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
