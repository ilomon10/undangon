import {
  Button,
  Checkbox,
  FormGroup,
  InputGroup,
  Radio,
  RadioGroup,
  Switch,
} from "@blueprintjs/core";
import { useNode } from "@craftjs/core";
import { ColorPicker } from "components/ColorPicker";
import { SettingSection } from "components/editor/Sidepanel/SettingPanel/SettingSection";
import { Box, Flex } from "components/Grid";
import _pick from "lodash/pick";

export const RevealSettings = () => {
  const {
    actions: { setProp },
    values,
  } = useNode((node) => ({
    values: _pick(node.data.props, [
      "direction",
      "effect",
      "when",
      "fraction",
      "duration",
    ]),
  }));

  return (
    <>
      <SettingSection
        text="Settings"
        label={({ effect, direction }) => `${effect}, ${direction}`}
        props={["direction", "effect"]}
      >
        <Switch
          checked={values.when}
          label={`Trigger ${values.when}`}
          onChange={(e) =>
            setProp((props) => (props.when = e.target.checked ? true : false))
          }
        />
        <RadioGroup
          label="Effect"
          selectedValue={values.effect || ""}
          onChange={(e) => {
            setProp((props) => (props.effect = e.target.value));
          }}
          options={[
            { label: "fade", value: "fade" },
            { label: "flip", value: "flip" },
            { label: "rotate", value: "rotate" },
            { label: "zoom", value: "zoom" },
            { label: "bounce", value: "bounce" },
            { label: "slide", value: "slide" },
            { label: "roll", value: "roll" },
          ]}
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
            { label: "Clear", value: "" },
          ]}
        />
        <FormGroup label="Fraction">
          <InputGroup
            defaultValue={values.fraction || 0}
            onChange={(e) => {
              setProp(
                (props) => (props.fraction = Number(e.target.value)),
                500
              );
            }}
          />
        </FormGroup>
        <FormGroup label="Duration">
          <InputGroup
            defaultValue={values.duration || 0}
            onChange={(e) => {
              setProp((props) => (props.duration = Number(e.target.value)), 500);
            }}
          />
        </FormGroup>
      </SettingSection>
    </>
  );
};
