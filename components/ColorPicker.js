import { Icon, InputGroup } from "@blueprintjs/core";
import { Popover2 } from "@blueprintjs/popover2";
import { ChromePicker } from "react-color";
import { Box } from "./Grid";

export const ColorPicker = ({ onChange, onChangeComplete, value }) => {
  return (
    <Box>
      <Popover2
        content={
          <ChromePicker
            color={value}
            onChange={onChange}
            onChangeComplete={onChangeComplete}
          />
        }
      >
        <InputGroup
          leftIcon={<Icon icon="symbol-circle" style={{ color: value }} />}
          readOnly={true}
          value={value}
        />
      </Popover2>
    </Box>
  );
};
