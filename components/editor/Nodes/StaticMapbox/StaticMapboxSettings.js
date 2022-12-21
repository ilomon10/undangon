import {
  AnchorButton,
  Button,
  Card,
  FormGroup,
  Icon,
  InputGroup,
  RadioGroup,
  Tag,
} from "@blueprintjs/core";
import { useNode } from "@craftjs/core";
import { CloudinaryUploadWidgetButton } from "components/CloudinaryUploadWidget";
import { ColorPicker } from "components/ColorPicker";
import { SettingSection } from "components/editor/Sidepanel/SettingPanel/SettingSection";
import { Box, Flex } from "components/Grid";
import { useViewport } from "components/editor/Viewport/useViewport";
import _pick from "lodash/pick";
import { DragValue } from "components/DragValue";
import _get from "lodash.get";
import _set from "lodash/set";
import { staticMapUrl } from ".";

export const StaticMapboxSettings = () => {
  const {
    actions: { setProp },
    values,
  } = useNode((node) => ({
    values: _pick(node.data.props, [
      "mapOptions",
      "borderRadius",
      "height",
      "width",
      "objectFit",
    ]),
  }));

  return (
    <>
      <SettingSection text="Map Options">
        <Box mb={3}>
          <AnchorButton
            icon="share"
            text="Open image in new page"
            href={staticMapUrl(values.mapOptions)}
            target="_blank"
          />
        </Box>
        <Flex mx={-1}>
          {[
            {
              property: "mapOptions.height",
              icon: "H",
            },
            {
              property: "mapOptions.width",
              icon: "W",
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
                      {({ isDisabled, handleMouseDown }) => (
                        <Button
                          minimal={true}
                          disabled={isDisabled}
                          style={{
                            cursor: !isDisabled ? "w-resize" : null,
                            zIndex: 1,
                          }}
                          onMouseDown={handleMouseDown}
                          text={icon}
                        />
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
        <FormGroup>
          <InputGroup
            title="Padding"
            type="number"
            leftIcon={
              <DragValue
                min={0}
                max={1000}
                friction={5}
                value={_get(values, `mapOptions.padding`) || 0}
                onChange={(value) =>
                  setProp((props) => (props.mapOptions.padding = value))
                }
              >
                {({ handleMouseDown }) => (
                  <Box
                    as={Icon}
                    icon="square"
                    style={{ cursor: "w-resize" }}
                    onMouseDown={handleMouseDown}
                  />
                )}
              </DragValue>
            }
            value={_get(values, `mapOptions.padding`) || ""}
            onChange={(e) => {
              setProp(
                (props) => (props.mapOptions.padding = Number(e.target.value)),
                200
              );
            }}
          />
        </FormGroup>
      </SettingSection>
      <SettingSection text="Pins" label={({ url }) => url} props={["url"]}>
        <Box mb={2}>
          <Button
            icon="add"
            text="Add pin"
            onClick={() => {
              setProp((props) =>
                props.mapOptions.pins.push({
                  icon: "heart",
                  color: "#fff",
                  longitude: "-122.4208",
                  latitude: "37.7694",
                })
              );
            }}
          />
        </Box>
        {values.mapOptions.pins.map(
          ({ icon, color, longitude, latitude }, i) => (
            <Box key={i} as={Card} sx={{ p: 2, mb: 2 }}>
              <Flex mx={-1}>
                <Box px={1}>
                  <FormGroup
                    label="Icon"
                    labelInfo={
                      <a
                        style={{ display: "inline-flex" }}
                        href="https://map.michelstuyts.be/icons/"
                        target="_blank"
                      >
                        <Icon
                          style={{ display: "inline-block" }}
                          icon="info-sign"
                          size={12}
                        />
                      </a>
                    }
                  >
                    <InputGroup
                      value={icon || ""}
                      onChange={(e) => {
                        setProp(
                          (props) =>
                            (props.mapOptions.pins[i].icon = e.target.value),
                          200
                        );
                      }}
                    />
                  </FormGroup>
                </Box>

                <Box px={1}>
                  <FormGroup label="Color">
                    <ColorPicker
                      value={color}
                      onChange={(color) => {
                        setProp(
                          (props) =>
                            (props.mapOptions.pins[i].color = color.hex)
                        );
                      }}
                    />
                  </FormGroup>
                </Box>
              </Flex>
              <Flex mx={-1}>
                <Box px={1}>
                  <FormGroup label="Longitude">
                    <InputGroup
                      value={longitude || ""}
                      onChange={(e) => {
                        setProp(
                          (props) =>
                            (props.mapOptions.pins[i].longitude =
                              e.target.value),
                          200
                        );
                      }}
                    />
                  </FormGroup>
                </Box>
                <Box px={1}>
                  <FormGroup label="Latitude">
                    <InputGroup
                      value={latitude || ""}
                      onChange={(e) => {
                        setProp(
                          (props) =>
                            (props.mapOptions.pins[i].latitude =
                              e.target.value),
                          200
                        );
                      }}
                    />
                  </FormGroup>
                </Box>
              </Flex>
            </Box>
          )
        )}
      </SettingSection>
      <SettingSection
        text="Dimensions"
        label={({ height, width }) => `${height || 0} x ${width || 0}`}
        props={["height", "width"]}
      >
        <Flex>
          <FormGroup label="Height">
            <InputGroup
              value={values.height || ""}
              onChange={(e) => {
                setProp((props) => (props.height = e.target.value));
              }}
            />
          </FormGroup>
          <FormGroup label="Width">
            <InputGroup
              value={values.width || ""}
              onChange={(e) => {
                setProp((props) => (props.width = e.target.value));
              }}
            />
          </FormGroup>
        </Flex>
      </SettingSection>
      <SettingSection text="Appearance">
        <RadioGroup
          label="Object Fit"
          selectedValue={values.objectFit || ""}
          onChange={(e) => {
            setProp((props) => (props.objectFit = e.target.value));
          }}
          options={[
            { label: "Fill", value: "fill" },
            { label: "Cover", value: "cover" },
            { label: "Contain", value: "Contain" },
          ]}
        />
        <FormGroup label="Border Radius">
          <InputGroup
            value={values.borderRadius || ""}
            onChange={(e) => {
              setProp((props) => (props.borderRadius = e.target.value));
            }}
          />
        </FormGroup>
      </SettingSection>
    </>
  );
};
