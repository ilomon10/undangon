import { FormGroup, InputGroup } from "@blueprintjs/core";
import { useNode } from "@craftjs/core";
import { ColorPicker } from "components/ColorPicker";
import { SettingSection } from "components/editor/Sidepanel/SettingPanel/SettingSection";
import { Flex } from "components/Grid";

export const ContainerSettings = () => {
  const {
    actions: { setProp },
    height, width,
    paddingTop, paddingRight, paddingLeft, paddingBottom,
    marginTop, marginRight, marginLeft, marginBottom,
    backgroundColor,
    borderRadius
  } = useNode((node) => ({
    height: node.data.props.height,
    width: node.data.props.width,

    paddingTop: node.data.props.paddingTop,
    paddingRight: node.data.props.paddingRight,
    paddingBottom: node.data.props.paddingBottom,
    paddingLeft: node.data.props.paddingLeft,

    marginTop: node.data.props.marginTop,
    marginRight: node.data.props.marginRight,
    marginBottom: node.data.props.marginBottom,
    marginLeft: node.data.props.marginLeft,

    backgroundColor: node.data.props.backgroundColor,

    borderRadius: node.data.props.borderRadius,
  }));

  return (
    <>
      <SettingSection
        text="Dimensions"
        label={({ height, width }) => `${height || 0} x ${width || 0}`}
        props={["height", "width"]}>
        <Flex>
          <FormGroup label="Height">
            <InputGroup value={height || ""} onChange={(e) => {
              setProp(props => props.height = e.target.value);
            }} />
          </FormGroup>
          <FormGroup label="Width">
            <InputGroup value={width || ""} onChange={(e) => {
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
            <InputGroup value={paddingTop || ""} onChange={(e) => {
              setProp(props => props.paddingTop = e.target.value);
            }} />
          </FormGroup>
          <FormGroup label="Right">
            <InputGroup value={paddingRight || ""} onChange={(e) => {
              setProp(props => props.paddingRight = e.target.value);
            }} />
          </FormGroup>
          <FormGroup label="Left">
            <InputGroup value={paddingLeft || ""} onChange={(e) => {
              setProp(props => props.paddingLeft = e.target.value);
            }} />
          </FormGroup>
          <FormGroup label="Bottom">
            <InputGroup value={paddingBottom || ""} onChange={(e) => {
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
            <InputGroup value={marginTop || ""} onChange={(e) => {
              setProp(props => props.marginTop = e.target.value);
            }} />
          </FormGroup>
          <FormGroup label="Right">
            <InputGroup value={marginRight || ""} onChange={(e) => {
              setProp(props => props.marginRight = e.target.value);
            }} />
          </FormGroup>
          <FormGroup label="Left">
            <InputGroup value={marginLeft || ""} onChange={(e) => {
              setProp(props => props.marginLeft = e.target.value);
            }} />
          </FormGroup>
          <FormGroup label="Bottom">
            <InputGroup value={marginBottom || ""} onChange={(e) => {
              setProp(props => props.marginBottom = e.target.value);
            }} />
          </FormGroup>
        </Flex>
      </SettingSection>
      <SettingSection text="Appearance">
        <FormGroup label="Background Color">
          <ColorPicker value={backgroundColor} onChange={(color) => {
            setProp(props => props.backgroundColor = color.hex);
          }} />
        </FormGroup>
        <FormGroup label="Border Radius">
          <InputGroup value={borderRadius || ""} onChange={(e) => {
            setProp(props => props.borderRadius = e.target.value);
          }} />
        </FormGroup>
      </SettingSection>
    </>
  )
}