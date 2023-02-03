import {
  Button,
  ButtonGroup,
  Card,
  FormGroup,
  InputGroup,
  RadioGroup,
  Switch,
  Text,
} from "@blueprintjs/core";
import { useNode } from "@craftjs/core";
import { CloudinaryUploadWidgetButton } from "components/CloudinaryUploadWidget";
import { ColorPicker } from "components/ColorPicker";
import { SettingSection } from "components/editor/Sidepanel/SettingPanel/SettingSection";
import { Box, Flex } from "components/Grid";
import { useViewport } from "components/editor/Viewport/useViewport";
import { Image } from "../Image";
import { generateId } from "components/utils/generateId";
import _pick from "lodash/pick";
import _get from "lodash/get";
import _set from "lodash/set";
import _remove from "lodash/remove";
import { swapArrayLocs } from "components/utils/swapArrayLocs";
import { props } from "@styled-system/should-forward-prop";
import { AspectRatio } from "components/AspectRatio";

export const CarouselSettings = () => {
  const {
    actions: { setProp },
    values,
  } = useNode((node) => ({
    values: _pick(node.data.props, ["images", "settings", "height", "width"]),
  }));

  const { id } = useViewport();

  return (
    <>
      <SettingSection
        text="Images"
        label={({ images }) => images.length}
        props={["images"]}
      >
        <Button
          onClick={() => {
            setProp((props) =>
              props.images.push({ id: generateId(), ...Image.craft.props })
            );
          }}
          text="Add Image"
        />
        {values.images.map((imageProps, i) => (
          <Box key={imageProps.id} as={Card} p={2}>
            <Box as={Card} p={0} width={75}>
              <AspectRatio ratio={"1:1"}>
                <img style={{ width: "100%" }} src={imageProps.url} />
              </AspectRatio>
            </Box>
            <FormGroup
              label="Url"
              labelInfo={<Text ellipsize>{_get(imageProps, "url")}</Text>}
            >
              <CloudinaryUploadWidgetButton
                onSave={(files) => {
                  setProp((props) =>
                    _set(props, `images[${i}].url`, files[0].url)
                  );
                }}
                folderTarget={`/manjo/assets/${id}`}
              />
            </FormGroup>
            <RadioGroup
              label="Object Fit"
              selectedValue={_get(values, `images[${i}].objectFit`) || ""}
              onChange={(e) => {
                setProp((props) =>
                  _set(props, `images[${i}].objectFit`, e.target.value)
                );
              }}
              options={[
                { label: "Fill", value: "fill" },
                { label: "Cover", value: "cover" },
                { label: "Contain", value: "Contain" },
              ]}
            />
            <ButtonGroup>
              <Button
                onClick={() => {
                  setProp((props) =>
                    _remove(props.images, (_, idx) => idx === i)
                  );
                }}
                intent="danger"
                icon="trash"
              />
              <Button
                disabled={i <= 0}
                onClick={() => {
                  setProp((props) => swapArrayLocs(props.images, i, i - 1));
                }}
                icon="chevron-up"
              />
              <Button
                disabled={i >= values.images.length - 1}
                onClick={() => {
                  setProp((props) => swapArrayLocs(props.images, i, i + 1));
                }}
                icon="chevron-down"
              />
            </ButtonGroup>
          </Box>
        ))}
      </SettingSection>
      <SettingSection
        text="Settings"
        label={({ settings }) => `${JSON.stringify(settings)}`}
        props={["settings"]}
      >
        <Switch
          label="Fade"
          checked={_get(values, "settings.fade") || false}
          onChange={(e) => {
            setProp((props) => _set(props, "settings.fade", e.target.checked));
          }}
        />
        <Switch
          label="Autoplay"
          checked={_get(values, "settings.autoplay") || false}
          onChange={(e) => {
            setProp((props) =>
              _set(props, "settings.autoplay", e.target.checked)
            );
          }}
        />
        <Switch
          label="Dots"
          checked={_get(values, "settings.dots") || false}
          onChange={(e) => {
            setProp((props) => _set(props, "settings.dots", e.target.checked));
          }}
        />
        <Switch
          label="Arrows"
          checked={_get(values, "settings.arrows") || false}
          onChange={(e) => {
            setProp((props) =>
              _set(props, "settings.arrows", e.target.checked)
            );
          }}
        />
        <FormGroup label="Speed">
          <InputGroup
            defaultValue={_get(values, "settings.speed") || ""}
            onChange={(e) => {
              setProp(
                (props) => _set(props, "settings.speed", Number(e.target.value)),
                500
              );
            }}
          />
        </FormGroup>
        <FormGroup label="Autoplay Speed">
          <InputGroup
            defaultValue={_get(values, "settings.autoplaySpeed") || ""}
            onChange={(e) => {
              setProp(
                (props) =>
                  _set(props, "settings.autoplaySpeed", Number(e.target.value)),
                500
              );
            }}
          />
        </FormGroup>
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
                setProp((props) => (props.height = e.target.value), 500);
              }}
            />
          </FormGroup>
          <FormGroup label="Width">
            <InputGroup
              value={values.width || ""}
              onChange={(e) => {
                setProp((props) => (props.width = e.target.value), 500);
              }}
            />
          </FormGroup>
        </Flex>
      </SettingSection>
    </>
  );
};
