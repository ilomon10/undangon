import {
  Button,
  FormGroup,
  InputGroup,
  RadioGroup,
  Switch,
} from "@blueprintjs/core";
import { useNode } from "@craftjs/core";
import { CloudinaryUploadWidgetButton } from "components/CloudinaryUploadWidget";
import { ColorPicker } from "components/ColorPicker";
import { SettingSection } from "components/editor/Sidepanel/SettingPanel/SettingSection";
import { Box, Flex } from "components/Grid";
import { useViewport } from "components/editor/Viewport/useViewport";
import _get from "lodash/get";
import _set from "lodash/set";
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
      "innerHeight",
      "innerWidth",

      "display",
      "flexWrap",
      "flexDirection",
      "alignItems",
      "justifyContent",
    ]),
  }));

  const { id } = useViewport();

  return (
    <>
      <SettingSection text="Source" label={({ url }) => url} props={["url"]}>
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
        <FormGroup label="Custom Url">
          <InputGroup
            defaultValue={values.url || ""}
            onChange={(e) => {
              setProp((props) => (props.url = e.target.value), 500);
            }}
          />
          {/* <InputGroup value={values.url || ""} onChange={(e) => {
              setProp(props => props.url = e.target.value);
            }} /> */}
        </FormGroup>
      </SettingSection>
      <SettingSection
        text="Dimensions"
        label={({ height, width }) => `${height || 0} x ${width || 0}`}
        props={["height", "width"]}
      >
        <Flex>
          <FormGroup label="Height">
            <InputGroup
              defaultValue={values.height || ""}
              onChange={(e) => {
                setProp((props) => (props.height = e.target.value), 500);
              }}
            />
          </FormGroup>
          <FormGroup label="Width">
            <InputGroup
              defaultValue={values.width || ""}
              onChange={(e) => {
                setProp((props) => (props.width = e.target.value), 500);
              }}
            />
          </FormGroup>
        </Flex>
        <Flex>
          <FormGroup label="Image Height">
            <InputGroup
              defaultValue={values.innerHeight || ""}
              onChange={(e) => {
                setProp((props) => (props.innerHeight = e.target.value), 500);
              }}
            />
          </FormGroup>
          <FormGroup label="Image Width">
            <InputGroup
              defaultValue={values.innerWidth || ""}
              onChange={(e) => {
                setProp((props) => (props.innerWidth = e.target.value), 500);
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

      <SettingSection text="Wrapper Layout" defaultOpen={true}>
        <FormGroup label="Direction">
          {[
            {
              icon: "arrow-down",
              value: "column",
            },
            {
              icon: "arrow-right",
              value: "row",
            },
          ].map(({ icon, value }) => (
            <Button
              key={value}
              minimal
              icon={icon}
              active={values.flexDirection === value}
              onClick={() => {
                setProp((props) => (props.flexDirection = value));
              }}
            />
          ))}
        </FormGroup>
        <FormGroup>
          <Switch
            label="Wrap Item"
            checked={_get(values, "flexWrap") === "wrap"}
            onChange={(e) => {
              setProp((props) => {
                _set(props, "flexWrap", e.target.checked ? "wrap" : "nowrap");
              });
            }}
          />
        </FormGroup>
        <Flex>
          <Box width={"50%"}>
            <RadioGroup
              label="Horizontal"
              selectedValue={values.alignItems || ""}
              onChange={(e) => {
                setProp((props) => (props.alignItems = e.target.value));
              }}
              options={[
                { label: "Unset", value: "" },
                { label: "Start", value: "start" },
                { label: "Center", value: "center" },
                { label: "End", value: "end " },
              ]}
            />
          </Box>
          <Box>
            <RadioGroup
              label="Vertical"
              selectedValue={values.justifyContent || ""}
              onChange={(e) => {
                setProp((props) => (props.justifyContent = e.target.value));
              }}
              options={[
                { label: "Unset", value: "" },
                { label: "Start", value: "start" },
                { label: "Center", value: "center" },
                { label: "End", value: "end " },
              ]}
            />
          </Box>
        </Flex>
      </SettingSection>
    </>
  );
};
