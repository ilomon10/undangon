import { FormGroup, InputGroup } from "@blueprintjs/core";
import { useNode } from "@craftjs/core";

export const TextSettings = () => {
  const { actions: { setProp }, fontSize } = useNode((node) => ({
    fontSize: node.data.props.fontSize
  }));

  return (
    <>
      <FormGroup label="Font Size">
        <InputGroup value={fontSize || ""} onChange={(e) => {
          setProp(props => props.fontSize = e.target.value);
        }} />
      </FormGroup>
    </>
  )
}