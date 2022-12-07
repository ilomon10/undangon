import { FormGroup, InputGroup, Radio, RadioGroup } from "@blueprintjs/core";
import { useNode } from "@craftjs/core";
import { ColorPicker } from "components/ColorPicker";
import { SettingSection } from "components/editor/Sidepanel/SettingPanel/SettingSection";
import { Box, Flex } from "components/Grid";
import _pick from "lodash/pick";

export const TextSettings = () => {
  const {
    actions: { setProp },
    values,
  } = useNode((node) => ({
    values: _pick(node.data.props, [
      "textAlign",
      "textWeight",
      "fontWeight",
      "fontFamily",
      "color",
    ]),
  }));

  return (
    <>
      <SettingSection
        text="Typography"
        label={({ fontSize, textAlign, fontWeight }) =>
          `${fontSize}, ${textAlign}, ${fontWeight}`
        }
        props={["fontSize", "textAlign", "fontWeight"]}
      >
        <FormGroup label="Font Size">
          <InputGroup
            value={values.fontSize || ""}
            onChange={(e) => {
              setProp((props) => (props.fontSize = e.target.value));
            }}
          />
        </FormGroup>
        <Flex>
          <Box sx={{ width: "50%" }}>
            <RadioGroup
              label="Align"
              selectedValue={values.textAlign || ""}
              onChange={(e) => {
                setProp((props) => (props.textAlign = e.target.value));
              }}
              options={[
                { label: "Left", value: "left" },
                { label: "Center", value: "center" },
                { label: "Right", value: "right" },
              ]}
            />
          </Box>
          <Box>
            <RadioGroup
              label="Weight"
              selectedValue={values.fontWeight || ""}
              onChange={(e) => {
                setProp((props) => (props.fontWeight = e.target.value));
              }}
            >
              <Radio label="Regular" value="normal" />
              <Radio label="Medium" value="500" />
              <Radio label="Bold" value="700" />
            </RadioGroup>
          </Box>
        </Flex>
      </SettingSection>
      <SettingSection text="Appearance">
        <FormGroup label="Color">
          <ColorPicker
            value={values.color}
            onChange={(color) => {
              setProp((props) => (props.color = color.hex));
            }}
          />
        </FormGroup>
      </SettingSection>
    </>
  );
};
