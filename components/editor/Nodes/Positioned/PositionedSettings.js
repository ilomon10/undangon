import {
  Button,
  FormGroup,
  Icon,
  InputGroup,
  RadioGroup,
} from "@blueprintjs/core";
import { useNode } from "@craftjs/core";
import { ColorPicker } from "components/ColorPicker";
import { DragValue } from "components/DragValue";
import { SettingSection } from "components/editor/Sidepanel/SettingPanel/SettingSection";
import { Box, Flex } from "components/Grid";
import _pick from "lodash/pick";

export const PositionedSettings = () => {
  const {
    actions: { setProp },
    values,
  } = useNode((node) => ({
    values: _pick(node.data.props, ["top", "right", "bottom", "left"]),
  }));

  return (
    <>
      <SettingSection
        text="Position"
        label={({ top, right, bottom, left }) =>
          `${top}, ${right}, ${bottom}, ${left}`
        }
        props={["top", "right", "bottom", "left"]}
      >
        {[
          {
            property: "top",
            icon: {
              as: Icon,
              icon: "chevron-backward",
              sx: { transform: "rotate(90deg)" },
            },
          },
          {
            property: "right",
            icon: {
              as: Icon,
              icon: "chevron-backward",
              sx: { transform: "rotate(90deg)" },
            },
          },
          {
            property: "bottom",
            icon: {
              as: Icon,
              icon: "chevron-backward",
              sx: { transform: "rotate(90deg)" },
            },
          },
          {
            property: "left",
            icon: {
              as: Icon,
              icon: "chevron-backward",
              sx: { transform: "rotate(90deg)" },
            },
          },
        ].map(({ icon, property }, idx) => (
          <Box key={idx} width="50%" px={1}>
            <FormGroup>
              <InputGroup
                type="number"
                leftIcon={
                  <DragValue
                    min={0}
                    max={2048}
                    friction={5}
                    value={_get(values, property) || 0}
                    onChange={(value) =>
                      setProp((props) => _set(props, property, value), 100)
                    }
                  >
                    {({ handleMouseDown }) => (
                      <Box {...icon} onMouseDown={handleMouseDown} />
                    )}
                  </DragValue>
                }
                value={_get(values, property) || ""}
                onChange={(e) => {
                  setProp((props) =>
                    _set(props, property, Number(e.target.value), 100)
                  );
                }}
              />
            </FormGroup>
          </Box>
        ))}
        <Flex>
          <Box w="50%">
            <FormGroup label="Top">
              <InputGroup
                value={values.top || ""}
                onChange={(e) => {
                  setProp((props) => (props.top = e.target.value));
                }}
              />
            </FormGroup>
            <FormGroup label="Bottom">
              <InputGroup
                value={values.bottom || ""}
                onChange={(e) => {
                  setProp((props) => (props.bottom = e.target.value));
                }}
              />
            </FormGroup>
          </Box>
          <Box>
            <FormGroup label="Right">
              <InputGroup
                value={values.right || ""}
                onChange={(e) => {
                  setProp((props) => (props.right = e.target.value));
                }}
              />
            </FormGroup>
            <FormGroup label="Left">
              <InputGroup
                value={values.left || ""}
                onChange={(e) => {
                  setProp((props) => (props.left = e.target.value));
                }}
              />
            </FormGroup>
          </Box>
        </Flex>
      </SettingSection>
    </>
  );
};
