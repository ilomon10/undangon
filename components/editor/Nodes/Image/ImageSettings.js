import { Button, FormGroup, InputGroup, RadioGroup } from "@blueprintjs/core";
import { useNode } from "@craftjs/core";
import { CloudinaryUploadWidgetButton } from "components/CloudinaryUploadWidget";
import { ColorPicker } from "components/ColorPicker";
import { SettingSection } from "components/editor/Sidepanel/SettingPanel/SettingSection";
import { Flex } from "components/Grid";
import { useViewport } from "components/editor/Viewport/useViewport";
import _pick from "lodash/pick";

export const ImageSettings = () => {
  const {
    actions: { setProp },
    values,
  } = useNode((node) => ({
    values: _pick(node.data.props, [
      "url",
      "borderRadius",
      "height",
      "width",
      "objectFit",
    ]),
  }));

  const { id } = useViewport();

  return (
    <>
      <SettingSection text="Source" label={({ url }) => url} props={["url"]}>
        <Flex>
          <FormGroup label="Url">
            <CloudinaryUploadWidgetButton
              onSave={(files) => {
                setProp((props) => (props.url = files[0].url));
              }}
              folderTarget={`/manjo/assets/${id}`}
            />
            {/* <InputGroup value={values.url || ""} onChange={(e) => {
              setProp(props => props.url = e.target.value);
            }} /> */}
          </FormGroup>
        </Flex>
      </SettingSection>
      <SettingSection
        text="Dimensions"
        label={({ height, width }) => `${height || 0} x ${width || 0}`}
        props={["height", "width"]}
      >
        <Flex>
          <FormGroup label="Height">
            <InputGroup
              value={values.height || ""}
              onChange={(e) => {
                setProp((props) => (props.height = e.target.value));
              }}
            />
          </FormGroup>
          <FormGroup label="Width">
            <InputGroup
              value={values.width || ""}
              onChange={(e) => {
                setProp((props) => (props.width = e.target.value));
              }}
            />
          </FormGroup>
        </Flex>
      </SettingSection>
      <SettingSection text="Appearance">
        <RadioGroup
          label="Object Fit"
          selectedValue={values.objectFit || ""}
          onChange={(e) => {
            setProp((props) => (props.objectFit = e.target.value));
          }}
          options={[
            { label: "Fill", value: "fill" },
            { label: "Cover", value: "cover" },
            { label: "Contain", value: "Contain" },
          ]}
        />
        <FormGroup label="Border Radius">
          <InputGroup
            value={values.borderRadius || ""}
            onChange={(e) => {
              setProp((props) => (props.borderRadius = e.target.value));
            }}
          />
        </FormGroup>
      </SettingSection>
    </>
  );
};
