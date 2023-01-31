import { FormGroup, InputGroup, Switch } from "@blueprintjs/core";
import { useNode } from "@craftjs/core";
import { SettingSection } from "components/editor/Sidepanel/SettingPanel/SettingSection";
import { useViewport } from "components/editor/Viewport/useViewport";
import { Box, Flex } from "components/Grid";
import _pick from "lodash/pick";
import _get from "lodash.get";
import _set from "lodash/set";
import { CloudinaryUploadWidgetButton } from "components/CloudinaryUploadWidget";

export const DocumentSettings = () => {
  const {
    actions: { setProp },
    values,
  } = useNode((node) => ({
    values: _pick(node.data.props, ["modalOptions", "musicOptions"]),
  }));

  const { id } = useViewport();

  return (
    <>
      <SettingSection
        text="Music"
        label={({ musicOptions }) => `${_get(musicOptions, "url")}`}
        props={["musicOptions"]}
      >
        <Flex>
          <FormGroup label="Music Url">
            <InputGroup
              defaultValue={_get(values, "musicOptions.url") || ""}
              onChange={(e) => {
                setProp((props) =>
                  _set(props, "musicOptions.url", e.target.value)
                );
              }}
            />
          </FormGroup>
        </Flex>
        <Switch
          label="Show Play Button"
          checked={_get(values, "musicOptions.showButton") || ""}
          onChange={(e) => {
            setProp((props) =>
              _set(props, "musicOptions.showButton", e.target.checked)
            );
          }}
        />
      </SettingSection>
      <SettingSection
        text="Modal"
        label={({ modalOptions }) => `${modalOptions.imageUrl}`}
        props={["modalOptions"]}
      >
        <FormGroup label="Url">
          <CloudinaryUploadWidgetButton
            onSave={(files) => {
              setProp((props) =>
                _set(props, "modalOptions.imageUrl", files[0].url)
              );
            }}
            folderTarget={`/manjo/assets/${id}`}
          />
          <InputGroup
            defaultValue={_get(values, "modalOptions.imageUrl") || ""}
            onChange={(e) => {
              setProp((props) =>
                _set(props, "modalOptions.imageUrl", e.target.value)
              );
            }}
          />
        </FormGroup>
        <Switch
          label="Close Modal"
          checked={_get(values, "modalOptions.open") || ""}
          onChange={(e) => {
            setProp(
              (props) => _set(props, "modalOptions.open", e.target.checked),
              200
            );
          }}
        />
      </SettingSection>

      <SettingSection
        text="Gradient Style"
        label={({ modalOptions }) =>
          `${JSON.stringify(_get(modalOptions, "gradientStyle"))}`
        }
        props={["modalOptions"]}
      >
        <FormGroup label="Background">
          <InputGroup
            defaultValue={
              _get(values, "modalOptions.gradientStyle.background") || ""
            }
            onChange={(e) => {
              setProp(
                (props) =>
                  _set(
                    props,
                    "modalOptions.gradientStyle.background",
                    e.target.value
                  ),
                500
              );
            }}
          />
        </FormGroup>
        <FormGroup label="Opacity">
          <InputGroup
            defaultValue={
              _get(values, "modalOptions.gradientStyle.opacity") || ""
            }
            onChange={(e) => {
              setProp(
                (props) =>
                  _set(
                    props,
                    "modalOptions.gradientStyle.opacity",
                    e.target.value
                  ),
                500
              );
            }}
          />
        </FormGroup>
      </SettingSection>
      <SettingSection
        text="Front Image Attributes"
        label={({ modalOptions }) =>
          `${JSON.stringify(_get(modalOptions, "frontImageAttribute"))}`
        }
        props={["modalOptions"]}
      >
        <FormGroup label="Src">
          <CloudinaryUploadWidgetButton
            onSave={(files) => {
              setProp((props) =>
                _set(
                  props,
                  "modalOptions.frontImageAttribute.src",
                  files[0].url
                )
              );
            }}
            folderTarget={`/manjo/assets/${id}`}
          />
          <InputGroup
            defaultValue={
              _get(values, "modalOptions.frontImageAttribute.src") || ""
            }
            onChange={(e) => {
              setProp((props) =>
                _set(
                  props,
                  "modalOptions.frontImageAttribute.src",
                  e.target.value
                )
              );
            }}
          />
        </FormGroup>
        <FormGroup label="Height">
          <InputGroup
            defaultValue={
              _get(values, "modalOptions.frontImageAttribute.style.height") ||
              ""
            }
            onChange={(e) => {
              setProp((props) =>
                _set(
                  props,
                  "modalOptions.frontImageAttribute.style.height",
                  e.target.value
                )
              );
            }}
          />
        </FormGroup>
        <FormGroup label="Width">
          <InputGroup
            defaultValue={
              _get(values, "modalOptions.frontImageAttribute.style.width") || ""
            }
            onChange={(e) => {
              setProp((props) =>
                _set(
                  props,
                  "modalOptions.frontImageAttribute.style.width",
                  e.target.value
                )
              );
            }}
          />
        </FormGroup>
      </SettingSection>
    </>
  );
};
