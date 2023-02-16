import { Input, Radio } from "@mantine/core";
import { useNode } from "@craftjs/core";
import { SettingSection } from "components/editor/Sidepanel/SettingPanel/SettingSection";
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
        <Input.Wrapper label="Field Name">
          <Input
            value={values.fieldName || ""}
            onChange={(e) => {
              setProp((props) => (props.fieldName = e.target.value));
            }}
          />
        </Input.Wrapper>
        <Input.Wrapper label="Default Value">
          <Input
            value={values.defaultValue || ""}
            onChange={(e) => {
              setProp((props) => (props.defaultValue = e.target.value));
            }}
          />
        </Input.Wrapper>
      </SettingSection>
    </>
  );
};
