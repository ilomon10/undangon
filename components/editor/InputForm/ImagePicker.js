import { FormGroup, InputGroup } from "@blueprintjs/core";
import { CloudinaryUploadWidgetButton } from "components/CloudinaryUploadWidget";

export const ImagePicker = ({
  label,
  onChange,
  value,
  withTextInput = false,
  folderTarget,
}) => {
  return (
    <FormGroup label={label}>
      <CloudinaryUploadWidgetButton
        onSave={onChange}
        folderTarget={folderTarget}
      />
      {withTextInput && <InputGroup defaultValue={value} onChange={onChange} />}
    </FormGroup>
  );
};
