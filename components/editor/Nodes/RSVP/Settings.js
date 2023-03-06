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

export const RSVPSettings = () => {
  const {
    actions: { setProp },
    values,
  } = useNode((node) => ({
    values: _pick(node.data.props, ["message", "phone_number"]),
  }));

  return (
    <>
      <SettingSection
        text="Settings"
        label={({ message, phone_number }) => `${phone_number}, ${message}`}
        props={["message", "phone_number"]}
      >
        <FormGroup label="Phone Number">
          <InputGroup
            value={values.phone_number || ""}
            onChange={(e) => {
              setProp((props) => (props.phone_number = e.target.value), 500);
            }}
          />
        </FormGroup>
        <FormGroup label="Message">
          <TextArea
            value={values.message || ""}
            onChange={(e) => {
              setProp((props) => (props.message = e.target.value), 500);
            }}
            growVertically={true}
            fill={true}
          />
        </FormGroup>
      </SettingSection>
    </>
  );
};
