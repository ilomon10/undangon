import { Menu } from "@mantine/core";
import { Element, useEditor } from "@craftjs/core";
import { Reveal } from "components/editor/Components";
import { UrlParameter } from "components/editor/Components/UrlParameter";
import { Container, Countdown, Text } from "../../Nodes";
import { PanelSection } from "../PanelSection";
import { MdTitle } from "react-icons/md";

export const ComponentPanel = () => {
  const { connectors, query } = useEditor();
  return (
    <PanelSection text="Components">
      <Menu>
        {[
          {
            icon: <MdTitle />,
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
            icon: <MdTitle />,
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
            icon: <MdTitle />,
            label: "Countdown",
            ref: (ref) =>
              connectors.create(ref, <Countdown name="Countdown" />),
          },
        ].map(({ label, icon }) => (
          <Menu.Item key={label} icon={icon}>{label}</Menu.Item>
        ))}
      </Menu>
    </PanelSection>
  );
};
