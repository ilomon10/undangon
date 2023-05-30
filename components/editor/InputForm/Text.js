import { FormGroup, InputGroup } from "@blueprintjs/core";
import _pick from "lodash/pick";
import _get from "lodash.get";
import _set from "lodash/set";

export const TextInput = ({ label, defaultValue, onChange }) => {
  return (
    <FormGroup label={label}>
      <InputGroup defaultValue={defaultValue} onChange={onChange} />
    </FormGroup>
  );
};
