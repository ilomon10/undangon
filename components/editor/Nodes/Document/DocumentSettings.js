import { FormGroup, InputGroup, Switch } from "@blueprintjs/core";
import { useNode } from "@craftjs/core";
import { SettingSection } from "components/editor/Sidepanel/SettingPanel/SettingSection";
import { useViewport } from "components/editor/Viewport/useViewport";
import { Box, Flex } from "components/Grid";
import _pick from "lodash/pick";
import _get from "lodash.get";
import _set from "lodash/set";
import { CloudinaryUploadWidgetButton } from "components/CloudinaryUploadWidget";

export const DocumentSettings = () => {
  const {
    actions: { setProp },
    values,
  } = useNode((node) => ({
    values: _pick(node.data.props, ["modalOptions", "musicOptions"]),
  }));

  const { id } = useViewport();

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
          label="Show Play Button"
          checked={values.showPlayButton || ""}
          onChange={(e) => {
            setProp((props) => (props.showPlayButton = e.target.checked));
          }}
        />
      </SettingSection>
      <SettingSection
        text="Modal"
        label={({ modalOptions }) => `${modalOptions.imageUrl}`}
        props={["modalOptions"]}
      >
        <FormGroup label="Url">
          <CloudinaryUploadWidgetButton
            onSave={(files) => {
              setProp((props) =>
                _set(props, "modalOptions.imageUrl", files[0].url)
              );
            }}
            folderTarget={`/manjo/assets/${id}`}
          />
          {/* <InputGroup value={values.url || ""} onChange={(e) => {
              setProp(props => props.url = e.target.value);
            }} /> */}
        </FormGroup>
        <Switch
          label="Close Modal"
          checked={_get(values, "modalOptions.open") || ""}
          onChange={(e) => {
            setProp(
              (props) => _set(props, "modalOptions.open", e.target.checked),
              200
            );
          }}
        />
      </SettingSection>
      <SettingSection text="Appearance"></SettingSection>
    </>
  );
};
