import { FormGroup, InputGroup, Switch } from "@blueprintjs/core";
import { useNode } from "@craftjs/core";
import { SettingSection } from "components/editor/Sidepanel/SettingPanel/SettingSection";
import { Box, Flex } from "components/Grid";
import _pick from "lodash/pick";
import _get from "lodash.get";
import _set from "lodash/set";

export const DocumentSettings = () => {
  const {
    actions: { setProp },
    values,
  } = useNode((node) => ({
    values: _pick(node.data.props, [
      "mapOptions",
      "borderRadius",
      "height",
      "width",
      "objectFit",
    ]),
  }));

  return (
    <>
      <SettingSection
        text="Music"
        label={({ musicUrl }) => `${musicUrl}`}
        props={["musicUrl"]}
      >
        <Flex>
          <FormGroup label="Music Url">
            <InputGroup
              value={values.musicUrl || ""}
              onChange={(e) => {
                setProp((props) => (props.musicUrl = e.target.value));
              }}
            />
          </FormGroup>
        </Flex>
        <Switch
          label="Show Music Button"
          checked={values.showPlayButton || ""}
          onChange={(e) => {
            setProp((props) => (props.showPlayButton = e.target.checked));
          }}
        />
      </SettingSection>
      <SettingSection text=""></SettingSection>
      <SettingSection text="Appearance"></SettingSection>
    </>
  );
};
