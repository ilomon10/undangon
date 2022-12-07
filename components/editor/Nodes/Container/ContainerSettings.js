import {
  Button,
  FormGroup,
  HTMLSelect,
  Icon,
  InputGroup,
  RadioGroup,
} from "@blueprintjs/core";
import { ROOT_NODE, useNode } from "@craftjs/core";
import { ColorPicker } from "components/ColorPicker";
import { SettingSection } from "components/editor/Sidepanel/SettingPanel/SettingSection";
import { Box, Flex } from "components/Grid";
import _pick from "lodash/pick";
import _get from "lodash.get";
import { DragValue } from "components/DragValue";
import unitsCss from "units-css";

export const ContainerSettings = () => {
  const {
    isRoot,
    actions: { setProp, setCustom },
    modes,
    values,
  } = useNode((node) => ({
    isRoot: node.id === ROOT_NODE,
    modes: _pick(node.data.custom.settingMode, [
      "height",
      "width",
      "padding",
      "margin",
    ]),
    values: _pick(node.data.props, [
      "height",
      "width",
      "padding",
      "margin",
      "backgroundColor",
      "borderRadius",
      "flexDirection",
      "justifyContent",
      "alignItems",
    ]),
  }));

  return (
    <>
      {!isRoot && (
        <SettingSection
          text="Dimensions"
          label={({ height, width }) => `${height || 0} x ${width || 0}`}
          props={["height", "width"]}
        >
          <Flex mx={-1}>
            {[
              {
                property: "height",
                icon: "H",
              },
              {
                property: "width",
                icon: "W",
              },
            ].map(({ icon, property }, idx) => (
              <Box key={idx} width="50%" px={1}>
                <FormGroup>
                  <InputGroup
                    type="number"
                    disabled={modes[property] !== "fixed"}
                    leftElement={
                      <DragValue
                        min={0}
                        max={999999}
                        friction={5}
                        disabled={modes[property] !== "fixed"}
                        value={_get(values, property) || 0}
                        onChange={(value) =>
                          setProp((props) => (props[property] = value), 100)
                        }
                      >
                        {({ isDisabled, handleMouseDown }) => (
                          <Button
                            disabled={isDisabled}
                            style={{ cursor: !isDisabled ? "w-resize" : null }}
                            onMouseDown={handleMouseDown}
                            text={icon}
                          />
                        )}
                      </DragValue>
                    }
                    value={_get(values, property) || ""}
                    onChange={(e) => {
                      setProp(
                        (props) => (props[property] = Number(e.target.value))
                      );
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <HTMLSelect
                    options={[
                      {
                        label: "Fixed",
                        value: "fixed",
                      },
                      {
                        label: "Hug",
                        value: "hug",
                      },
                      {
                        label: "Fill",
                        value: "fill",
                      },
                    ]}
                    value={_get(modes, property) || ""}
                    onChange={(e) => {
                      console.log(_get(modes, property));
                      setCustom(
                        (p) => (p.settingMode[property] = e.target.value)
                      );
                    }}
                  />
                </FormGroup>
              </Box>
            ))}
          </Flex>
        </SettingSection>
      )}

      <SettingSection
        text="Padding"
        label={({ padding }) =>
          `${padding[0]}, ${padding[1]}, ${padding[2]}, ${padding[3]}`
        }
        props={["padding"]}
      >
        <Flex flexWrap="wrap" mx={-1}>
          {[
            {
              icon: {
                as: Icon,
                icon: "chevron-backward",
                sx: { transform: "rotate(90deg)" },
              },
            },
            {
              icon: { as: Icon, icon: "chevron-forward" },
            },
            {
              icon: {
                as: Icon,
                icon: "chevron-forward",
                sx: { transform: "rotate(90deg)" },
              },
            },
            {
              icon: {
                as: Icon,
                icon: "chevron-backward",
              },
            },
          ].map(({ icon }, idx) => (
            <Box key={idx} width="50%" px={1}>
              <FormGroup>
                <InputGroup
                  type="number"
                  leftElement={
                    <DragValue
                      min={0}
                      max={1000}
                      friction={5}
                      value={_get(values, `padding[${idx}]`) || 0}
                      onChange={(value) =>
                        setProp((props) => ((props.padding[idx] = value), 100))
                      }
                    >
                      {({ handleMouseDown }) => (
                        <Box
                          {...icon}
                          style={{ cursor: "w-resize" }}
                          onMouseDown={handleMouseDown}
                        />
                      )}
                    </DragValue>
                  }
                  value={_get(values, `padding[${idx}]`) || ""}
                  onChange={(e) => {
                    setProp(
                      (props) => (
                        (props.padding[idx] = Number(e.target.value)), 100
                      )
                    );
                  }}
                />
              </FormGroup>
            </Box>
          ))}
        </Flex>
      </SettingSection>
      {!isRoot && (
        <SettingSection
          text="Margin"
          label={({ margin }) =>
            `${margin[0]}, ${margin[1]}, ${margin[2]}, ${margin[3]}`
          }
          props={["margin"]}
        >
          <Flex flexWrap="wrap" mx={-1}>
            {[
              {
                icon: {
                  as: Icon,
                  icon: "chevron-backward",
                  sx: { transform: "rotate(90deg)" },
                },
              },
              {
                icon: { as: Icon, icon: "chevron-forward" },
              },
              {
                icon: {
                  as: Icon,
                  icon: "chevron-forward",
                  sx: { transform: "rotate(90deg)" },
                },
              },
              {
                icon: {
                  as: Icon,
                  icon: "chevron-backward",
                },
              },
            ].map(({ icon }, idx) => (
              <Box key={idx} width="50%" px={1}>
                <FormGroup>
                  <InputGroup
                    type="number"
                    leftElement={
                      <DragValue
                        min={0}
                        max={1000}
                        friction={5}
                        value={_get(values, `margin[${idx}]`) || 0}
                        onChange={(value) =>
                          setProp((props) => (props.margin[idx] = value))
                        }
                      >
                        {({ handleMouseDown }) => (
                          <Box
                            {...icon}
                            style={{ cursor: "w-resize" }}
                            onMouseDown={handleMouseDown}
                          />
                        )}
                      </DragValue>
                    }
                    value={_get(values, `margin[${idx}]`) || 0}
                    onChange={(e) => {
                      setProp((props) => (props.margin[idx] = e.target.value));
                    }}
                  />
                </FormGroup>
              </Box>
            ))}
          </Flex>
        </SettingSection>
      )}
      <SettingSection text="Appearance">
        <FormGroup label="Background Color">
          <ColorPicker
            value={values.backgroundColor}
            onChange={(color) => {
              setProp((props) => (props.backgroundColor = color.hex));
            }}
          />
        </FormGroup>
        <FormGroup label="Border Radius">
          <InputGroup
            value={values.borderRadius || ""}
            onChange={(e) => {
              setProp((props) => (props.borderRadius = e.target.value));
            }}
          />
        </FormGroup>
      </SettingSection>

      <SettingSection text="Layout">
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
