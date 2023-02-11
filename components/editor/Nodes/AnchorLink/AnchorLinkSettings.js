import { Button, Input } from "@mantine/core";
import { useNode } from "@craftjs/core";
import { DragValue } from "components/DragValue";
import { SettingSection } from "components/editor/Sidepanel/SettingPanel/SettingSection";
import { Box, Flex } from "components/Grid";
import _pick from "lodash/pick";
import _get from "lodash/get";
import _set from "lodash/set";

export const AnchorLinkSettings = () => {
  const {
    actions: { setProp },
    values,
  } = useNode((node) => ({
    values: _pick(node.data.props, ["href", "target"]),
  }));

  return (
    <>
      <SettingSection
        text="Attributes"
        label={({ href }) => `${href}`}
        props={["href"]}
      >
        <Input.Wrapper label="href">
          <Input
            defaultValue={values.href || ""}
            onChange={(e) => {
              setProp((props) => (props.href = e.target.value), 500);
            }}
          />
        </Input.Wrapper>
        <Input.Wrapper label="target">
          <Input
            defaultValue={values.target || ""}
            onChange={(e) => {
              setProp((props) => (props.target = e.target.value), 500);
            }}
          />
        </Input.Wrapper>
      </SettingSection>
    </>
  );
};
