import { FormGroup, InputGroup, Radio, RadioGroup } from "@blueprintjs/core";
import { useNode } from "@craftjs/core";
import { ColorPicker } from "components/ColorPicker";
import { SettingSection } from "components/editor/Sidepanel/SettingPanel/SettingSection";
import { Box, Flex } from "components/Grid";
import _pick from "lodash/pick";

export const UrlParameterSettings = () => {
  const {
    actions: { setProp },
    values,
  } = useNode((node) => ({
    values: _pick(node.data.props, ["fieldName", "defaultValue"]),
  }));

  return (
    <>
      <SettingSection
        text="Source"
        label={({ fieldName, defaultValue }) =>
          `${fieldName} ~ ${defaultValue}`
        }
        props={["fieldName", "defaultValue"]}
      >
        <FormGroup label="Field Name">
          <InputGroup
            value={values.fieldName || ""}
            onChange={(e) => {
              setProp((props) => (props.fieldName = e.target.value));
            }}
          />
        </FormGroup>
        <FormGroup label="Default Value">
          <InputGroup
            value={values.defaultValue || ""}
            onChange={(e) => {
              setProp((props) => (props.defaultValue = e.target.value));
            }}
          />
        </FormGroup>
      </SettingSection>
    </>
  );
};
