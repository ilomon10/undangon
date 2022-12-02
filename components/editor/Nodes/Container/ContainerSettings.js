import { Button, FormGroup, InputGroup, RadioGroup } from "@blueprintjs/core";
import { useNode } from "@craftjs/core";
import { ColorPicker } from "components/ColorPicker";
import { SettingSection } from "components/editor/Sidepanel/SettingPanel/SettingSection";
import { Box, Flex } from "components/Grid";
import _pick from "lodash/pick";

export const ContainerSettings = () => {
  const {
    actions: { setProp },
    values,
  } = useNode((node) => ({
    values: _pick(
      node.data.props,
      [
        "height", "width",
        "paddingTop", "paddingRight", "paddingBottom", "paddingLeft",
        "marginTop", "marginRight", "marginBottom", "marginLeft",
        "backgroundColor",
        "borderRadius",
        "flexDirection",
        "justifyContent",
        "alignItems",
      ],
    ),
  }));

  return (
    <>
      <SettingSection
        text="Dimensions"
        label={({ height, width }) => `${height || 0} x ${width || 0}`}
        props={["height", "width"]}>
        <Flex>
          <FormGroup label="Height">
            <InputGroup value={values.height || ""} onChange={(e) => {
              setProp(props => props.height = e.target.value);
            }} />
          </FormGroup>
          <FormGroup label="Width">
            <InputGroup value={values.width || ""} onChange={(e) => {
              setProp(props => props.width = e.target.value);
            }} />
          </FormGroup>
        </Flex>
      </SettingSection>
      <SettingSection
        text="Padding"
        label={({ paddingTop, paddingRight, paddingBottom, paddingLeft }) => `${paddingTop}, ${paddingRight}, ${paddingBottom}, ${paddingLeft}`}
        props={["paddingTop", "paddingRight", "paddingBottom", "paddingLeft"]}>
        <Flex>
          <FormGroup label="Top">
            <InputGroup value={values.paddingTop || ""} onChange={(e) => {
              setProp(props => props.paddingTop = e.target.value);
            }} />
          </FormGroup>
          <FormGroup label="Right">
            <InputGroup value={values.paddingRight || ""} onChange={(e) => {
              setProp(props => props.paddingRight = e.target.value);
            }} />
          </FormGroup>
          <FormGroup label="Left">
            <InputGroup value={values.paddingLeft || ""} onChange={(e) => {
              setProp(props => props.paddingLeft = e.target.value);
            }} />
          </FormGroup>
          <FormGroup label="Bottom">
            <InputGroup value={values.paddingBottom || ""} onChange={(e) => {
              setProp(props => props.paddingBottom = e.target.value);
            }} />
          </FormGroup>
        </Flex>
      </SettingSection>
      <SettingSection
        text="Margin"
        label={({ marginTop, marginRight, marginBottom, marginLeft }) => `${marginTop}, ${marginRight}, ${marginBottom}, ${marginLeft}`}
        props={["marginTop", "marginRight", "marginBottom", "marginLeft"]}>
        <Flex>
          <FormGroup label="Top">
            <InputGroup value={values.marginTop || ""} onChange={(e) => {
              setProp(props => props.marginTop = e.target.value);
            }} />
          </FormGroup>
          <FormGroup label="Right">
            <InputGroup value={values.marginRight || ""} onChange={(e) => {
              setProp(props => props.marginRight = e.target.value);
            }} />
          </FormGroup>
          <FormGroup label="Left">
            <InputGroup value={values.marginLeft || ""} onChange={(e) => {
              setProp(props => props.marginLeft = e.target.value);
            }} />
          </FormGroup>
          <FormGroup label="Bottom">
            <InputGroup value={values.marginBottom || ""} onChange={(e) => {
              setProp(props => props.marginBottom = e.target.value);
            }} />
          </FormGroup>
        </Flex>
      </SettingSection>
      <SettingSection text="Appearance">
        <FormGroup label="Background Color">
          <ColorPicker value={values.backgroundColor} onChange={(color) => {
            setProp(props => props.backgroundColor = color.hex);
          }} />
        </FormGroup>
        <FormGroup label="Border Radius">
          <InputGroup value={values.borderRadius || ""} onChange={(e) => {
            setProp(props => props.borderRadius = e.target.value);
          }} />
        </FormGroup>
      </SettingSection>

      <SettingSection text="Layout">
        <FormGroup label="Direction">
          {[{
            icon: "arrow-down",
            value: "column"
          }, {
            icon: "arrow-right",
            value: "row"
          }].map(({ icon, value }) =>
            <Button
              key={value}
              minimal
              icon={icon}
              active={values.flexDirection === value}
              onClick={() => {
                setProp(props => props.flexDirection = value);
              }} />
          )}
        </FormGroup>
        <Flex>
          <Box width={"50%"}>
            <RadioGroup
              label="Horizontal"
              selectedValue={values.alignItems || ""}
              onChange={(e) => {
                setProp(props => props.alignItems = e.target.value);
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
                setProp(props => props.justifyContent = e.target.value);
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
  )
}