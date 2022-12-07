import {
  FormGroup,
  HTMLSelect,
  InputGroup,
  Radio,
  RadioGroup,
} from "@blueprintjs/core";
import { useNode } from "@craftjs/core";
import { ColorPicker } from "components/ColorPicker";
import { SettingSection } from "components/editor/Sidepanel/SettingPanel/SettingSection";
import { Box, Flex } from "components/Grid";
import _pick from "lodash/pick";
import dynamic from "next/dynamic";
import { CONSTANTS } from "components/Constants";

const FontPicker = dynamic(() => import("font-picker-react"), { ssr: false });

export const TextSettings = () => {
  const {
    actions: { setProp },
    values,
  } = useNode((node) => ({
    values: _pick(node.data.props, [
      "textAlign",
      "textWeight",
      "fontSize",
      "fontFamily",
      "color",
    ]),
  }));

  return (
    <>
      <SettingSection
        text="Typography"
        label={({ fontSize, fontFamily, textAlign, fontWeight }) =>
          `${fontFamily}, ${fontSize}, ${textAlign}, ${fontWeight}`
        }
        props={["fontSize", "fontFamily", "textAlign", "fontWeight"]}
      >
        <FormGroup label="Font Family">
          <FontPicker
            apiKey={CONSTANTS.GOOGLE_API_KEY}
            activeFontFamily={values.fontFamily}
            limit="150"
            onChange={(nextFamily) =>
              setProp((props) => (props.fontFamily = nextFamily.family))
            }
          />
        </FormGroup>
        <FormGroup label="Font Size">
          <InputGroup
            type="number"
            value={values.fontSize || ""}
            onChange={(e) => {
              setProp((props) => (props.fontSize = Number(e.target.value)));
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
