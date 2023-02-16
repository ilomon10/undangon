import { Menu } from "@mantine/core";
import { Element, useEditor } from "@craftjs/core";
import { Image } from "components/editor/Nodes/Image";
import {
  AnchorLink,
  AspectRatio,
  Button,
  Carousel,
  Container,
  GuestBook,
  IFrame,
  Positioned,
  Text,
} from "../../Nodes";
import { PanelSection } from "../PanelSection";
import {
  MdAspectRatio,
  MdBurstMode,
  MdCrop169,
  MdCropSquare,
  MdFilterFrames,
  MdImage,
  MdMenuBook,
  MdPictureInPicture,
  MdTitle,
} from "react-icons/md";

export const Toolbox = () => {
  const { connectors, query } = useEditor();
  return (
    <Menu
      styles={{
        item: {
          backgroundColor: "transparent",
        },
      }}
    >
      {[
        {
          icon: <MdCrop169 />,
          label: "Anchor",
          ref: (ref) =>
            connectors.create(ref, <Element is={AnchorLink} canvas />),
        },
        {
          icon: <MdAspectRatio />,
          label: "Aspect Ratio",
          ref: (ref) =>
            connectors.create(
              ref,
              <Element is={AspectRatio} ratio={"1:1"} portrait={false} canvas />
            ),
        },
        {
          icon: <MdCrop169 />,
          label: "Button",
          ref: (ref) => connectors.create(ref, <Button text="New Button" />),
        },
        {
          icon: <MdImage />,
          label: "Image",
          ref: (ref) => connectors.create(ref, <Image />),
        },
        {
          icon: <MdCropSquare />,
          label: "Container",
          ref: (ref) =>
            connectors.create(ref, <Element is={Container} canvas />),
        },
        {
          icon: <MdPictureInPicture />,
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
          icon: <MdTitle />,
          label: "Text",
          ref: (ref) => connectors.create(ref, <Text text="New Text" />),
        },
        {
          icon: <MdFilterFrames />,
          label: "IFrame",
          ref: (ref) => connectors.create(ref, <IFrame />),
        },
        {
          icon: <MdBurstMode />,
          label: "Carousel",
          ref: (ref) => connectors.create(ref, <Carousel />),
        },
        {
          icon: <MdMenuBook />,
          label: "Guest Book",
          ref: (ref) => connectors.create(ref, <GuestBook />),
        },
      ].map(({ ref, label, icon }) => (
        <Menu.Item icon={icon}>{label}</Menu.Item>
      ))}
    </Menu>
  );
};
