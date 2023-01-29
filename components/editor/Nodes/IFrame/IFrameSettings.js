import { FormGroup, InputGroup, RadioGroup, Switch } from "@blueprintjs/core";
import { useNode } from "@craftjs/core";
import { SettingSection } from "components/editor/Sidepanel/SettingPanel/SettingSection";
import _pick from "lodash/pick";
import _get from "lodash/get";
import _set from "lodash/set";
import moment from "moment";
import { Box } from "components/Grid";

export const IFrameSettings = () => {
  const {
    actions: { setProp },
    values,
  } = useNode((node) => ({
    values: _pick(node.data.props, [
      "url",
      "height",
      "width",
      "containerStyle",
    ]),
  }));

  return (
    <>
      <SettingSection
        text="Settings"
        label={({ url }) => `${url}`}
        props={["url"]}
      >
        <FormGroup label="Url">
          <InputGroup
            defaultValue={_get(values, "url") || ""}
            onChange={(e) => {
              setProp((props) => (props.url = e.target.value), 500);
            }}
          />
        </FormGroup>
      </SettingSection>
      <SettingSection
        text="Container Style"
        label={({ containerStyle }) => `${JSON.stringify(containerStyle)}`}
        props={["containerStyle"]}
      >
        <FormGroup label="height">
          <InputGroup
            defaultValue={_get(values, "containerStyle.height") || ""}
            onChange={(e) => {
              setProp(
                (props) => _set(props, "containerStyle.height", e.target.value),
                500
              );
            }}
          />
        </FormGroup>
        <FormGroup label="width">
          <InputGroup
            defaultValue={_get(values, "containerStyle.width") || ""}
            onChange={(e) => {
              setProp(
                (props) => _set(props, "containerStyle.width", e.target.value),
                500
              );
            }}
          />
        </FormGroup>
        <FormGroup label="iframe height">
          <InputGroup
            defaultValue={_get(values, "height") || ""}
            onChange={(e) => {
              setProp((props) => _set(props, "height", e.target.value), 500);
            }}
          />
        </FormGroup>
        <FormGroup label="iframe width">
          <InputGroup
            defaultValue={_get(values, "width") || ""}
            onChange={(e) => {
              setProp((props) => _set(props, "width", e.target.value), 500);
            }}
          />
        </FormGroup>
      </SettingSection>
    </>
  );
};
