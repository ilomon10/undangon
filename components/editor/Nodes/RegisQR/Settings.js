import {
  Button,
  FormGroup,
  Icon,
  InputGroup,
  RadioGroup,
  TextArea,
} from "@blueprintjs/core";
import { useNode } from "@craftjs/core";
import { ColorPicker } from "components/ColorPicker";
import { DragValue } from "components/DragValue";
import { SettingSection } from "components/editor/Sidepanel/SettingPanel/SettingSection";
import { Box, Flex } from "components/Grid";
import _pick from "lodash/pick";
import _get from "lodash/get";
import _set from "lodash/set";

export const RegisQRSettings = () => {
  const {
    actions: { setProp },
    values,
  } = useNode((node) => ({
    values: _pick(node.data.props, ["field_name"]),
  }));

  return (
    <>
      <SettingSection
        text="Settings"
        label={({ field_name }) => `${field_name}`}
        props={["field_name"]}
      >
        <FormGroup label="Field Name">
          <InputGroup
            value={values.field_name || ""}
            onChange={(e) => {
              setProp((props) => (props.field_name = e.target.value), 500);
            }}
          />
        </FormGroup>
      </SettingSection>
    </>
  );
};
