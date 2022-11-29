import { FormGroup, InputGroup } from "@blueprintjs/core";
import { useNode } from "@craftjs/core";
import { SettingSection } from "components/editor/SettingPanel/SettingSection";
import { Flex } from "components/Grid";

export const ContainerSettings = () => {
  const { actions: { setProp }, height, width } = useNode((node) => ({
    height: node.data.props.height,
    width: node.data.props.width
  }));

  return (
    <>
      <SettingSection text="Dimensions">
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
    </>
  )
}