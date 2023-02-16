import {
  RadioGroup,
  Switch,
} from "@mantine/core";
import { useNode } from "@craftjs/core";
import { SettingSection } from "components/editor/Sidepanel/SettingPanel/SettingSection";
import { Box, Flex } from "components/Grid";
import _pick from "lodash/pick";

export const RevealSettings = () => {
  const {
    actions: { setProp },
    values,
  } = useNode((node) => ({
    values: _pick(node.data.props, ["direction", "when"]),
  }));

  return (
    <>
      <SettingSection
        text="Settings"
        label={({ direction }) => `${direction}`}
        props={["direction"]}
      >
        <Switch
          checked={values.when || false}
          label="Trigger"
          onChange={() => setProp((props) => (props.when = !values.when))}
        />
        <RadioGroup
          label="Direction"
          selectedValue={values.direction || ""}
          onChange={(e) => {
            setProp((props) => (props.direction = e.target.value));
          }}
          options={[
            { label: "Top", value: "top" },
            { label: "Right", value: "right" },
            { label: "Bottom", value: "bottom" },
            { label: "Left", value: "left" },
          ]}
        />
      </SettingSection>
    </>
  );
};
