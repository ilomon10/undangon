import { Button, FormGroup, InputGroup, RadioGroup } from "@blueprintjs/core";
import { useNode } from "@craftjs/core";
import { ColorPicker } from "components/ColorPicker";
import { SettingSection } from "components/editor/Sidepanel/SettingPanel/SettingSection";
import { Box, Flex } from "components/Grid";
import _pick from "lodash/pick";

export const PositionedSettings = () => {
  const {
    actions: { setProp },
    values,
  } = useNode((node) => ({
    values: _pick(node.data.props, ["top", "right", "bottom", "left"]),
  }));

  return (
    <>
      <SettingSection
        text="Position"
        label={({ top, right, bottom, left }) =>
          `${top}, ${right}, ${bottom}, ${left}`
        }
        props={["top", "right", "bottom", "left"]}
      >
        <Flex>
          <Box w="50%">
            <FormGroup label="Top">
              <InputGroup
                value={values.top || ""}
                onChange={(e) => {
                  setProp((props) => (props.top = e.target.value));
                }}
              />
            </FormGroup>
            <FormGroup label="Bottom">
              <InputGroup
                value={values.bottom || ""}
                onChange={(e) => {
                  setProp((props) => (props.bottom = e.target.value));
                }}
              />
            </FormGroup>
          </Box>
          <Box>
            <FormGroup label="Right">
              <InputGroup
                value={values.right || ""}
                onChange={(e) => {
                  setProp((props) => (props.right = e.target.value));
                }}
              />
            </FormGroup>
            <FormGroup label="Left">
              <InputGroup
                value={values.left || ""}
                onChange={(e) => {
                  setProp((props) => (props.left = e.target.value));
                }}
              />
            </FormGroup>
          </Box>
        </Flex>
      </SettingSection>
    </>
  );
};
