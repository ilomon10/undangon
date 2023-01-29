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

export const AnchorLinkSettings = () => {
  const {
    actions: { setProp },
    values,
  } = useNode((node) => ({
    values: _pick(node.data.props, ["href"]),
  }));

  return (
    <>
      <SettingSection
        text="Attributes"
        label={({ href }) => `${href}`}
        props={["href"]}
      >
        <FormGroup label="href">
          <InputGroup
            defaultValue={values.href || ""}
            onChange={(e) => {
              setProp((props) => (props.href = e.target.value), 500);
            }}
          />
        </FormGroup>
      </SettingSection>
    </>
  );
};
