import {
  Button,
  FormGroup,
  Icon,
  InputGroup,
  RadioGroup,
} from "@blueprintjs/core";
import { useNode } from "@craftjs/core";
import { ColorPicker } from "components/ColorPicker";
import { DragValue } from "components/DragValue";
import { SettingSection } from "components/editor/Sidepanel/SettingPanel/SettingSection";
import { Box, Flex } from "components/Grid";
import _pick from "lodash/pick";
import _get from "lodash/get";
import _set from "lodash/set";

export const GuestBookSettings = () => {
  const {
    actions: { setProp },
    values,
  } = useNode((node) => ({
    values: _pick(node.data.props, ["token"]),
  }));

  return (
    <>
      <SettingSection
        text="Settings"
        label={({ token }) => `${token}`}
        props={["token"]}
      >
        <FormGroup label="Token">
          <InputGroup
            value={values.token || ""}
            onChange={(e) => {
              setProp((props) => (props.token = e.target.value), 500);
            }}
          />
        </FormGroup>
      </SettingSection>
    </>
  );
};
