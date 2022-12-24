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
import _get from "lodash/get";
import _set from "lodash/set";

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
        <Flex>
          {[
            {
              property: "top",
              icon: {
                as: Icon,
                icon: "chevron-backward",
                style: { transform: "rotate(90deg)" },
              },
            },
            {
              property: "right",
              icon: {
                as: Icon,
                icon: "chevron-backward",
                style: { transform: "rotate(180deg)" },
              },
            },
            {
              property: "bottom",
              icon: {
                as: Icon,
                icon: "chevron-backward",
                style: { transform: "rotate(-90deg)" },
              },
            },
            {
              property: "left",
              icon: {
                as: Icon,
                icon: "chevron-backward",
                style: { transform: "rotate(0deg)" },
              },
            },
          ].map(({ icon, property }, idx) => (
            <Box key={idx} width="50%" px={1}>
              <FormGroup>
                <InputGroup
                  leftIcon={
                    <DragValue
                      min={0}
                      max={2048}
                      friction={5}
                      value={_get(values, property) || 0}
                      onChange={(value) =>
                        setProp((props) => _set(props, property, Number(value)), 100)
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
        </Flex>
      </SettingSection>
    </>
  );
};
