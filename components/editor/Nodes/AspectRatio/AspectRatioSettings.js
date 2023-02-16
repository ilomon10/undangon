import { Input, Switch } from "@mantine/core";
import { useNode } from "@craftjs/core";
import { SettingSection } from "components/editor/Sidepanel/SettingPanel/SettingSection";
import _pick from "lodash/pick";
import _get from "lodash/get";
import _set from "lodash/set";

export const AspectRatioSettings = () => {
  const {
    actions: { setProp },
    values,
  } = useNode((node) => ({
    values: _pick(node.data.props, ["ratio", "portrait"]),
  }));

  return (
    <>
      <SettingSection
        text="Settings"
        label={({ ratio, portrait }) => `${ratio}, ${portrait}`}
        props={["ratio", "portrait"]}
      >
        <Input.Wrapper label="Ratio">
          <Input
            defaultValue={_get(values, "ratio") || ""}
            onChange={(e) => {
              setProp((props) => (props.ratio = e.target.value), 500);
            }}
          />
        </Input.Wrapper>
        <Input.Wrapper>
          <Switch
            label="Portrait"
            checked={_get(values, "portrait")}
            innerLabel="Landscape"
            innerLabelChecked="Portrait"
            onChange={(e) => {
              setProp((props) => {
                _set(props, "portrait", e.target.checked);
              });
            }}
          />
        </Input.Wrapper>
      </SettingSection>
    </>
  );
};
