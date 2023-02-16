import { Input, Switch } from "@mantine/core";
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
          <Input.Wrapper label="Music Url">
            <Input
              defaultValue={_get(values, "musicOptions.url") || ""}
              onChange={(e) => {
                setProp((props) =>
                  _set(props, "musicOptions.url", e.target.value)
                );
              }}
            />
          </Input.Wrapper>
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
        <Input.Wrapper label="Url">
          <CloudinaryUploadWidgetButton
            onSave={(files) => {
              setProp((props) =>
                _set(props, "modalOptions.imageUrl", files[0].url)
              );
            }}
            folderTarget={`/manjo/assets/${id}`}
          />
          <Input
            defaultValue={_get(values, "modalOptions.imageUrl") || ""}
            onChange={(e) => {
              setProp((props) =>
                _set(props, "modalOptions.imageUrl", e.target.value)
              );
            }}
          />
        </Input.Wrapper>
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
        text="Modal Description"
        label={({ modalOptions }) =>
          `${JSON.stringify(_get(modalOptions, "descriptions"))}`
        }
        props={["modalOptions"]}
      >
        <Input.Wrapper label="One">
          <Input
            defaultValue={_get(values, "modalOptions.descriptions.one") || ""}
            onChange={(e) => {
              setProp(
                (props) =>
                  _set(props, "modalOptions.descriptions.one", e.target.value),
                500
              );
            }}
          />
        </Input.Wrapper>
        <Input.Wrapper label="Two">
          <Input
            defaultValue={_get(values, "modalOptions.descriptions.two") || ""}
            onChange={(e) => {
              setProp(
                (props) =>
                  _set(props, "modalOptions.descriptions.two", e.target.value),
                500
              );
            }}
          />
        </Input.Wrapper>
      </SettingSection>
      <SettingSection
        text="Gradient Style"
        label={({ modalOptions }) =>
          `${JSON.stringify(_get(modalOptions, "gradientStyle"))}`
        }
        props={["modalOptions"]}
      >
        <Input.Wrapper label="Background">
          <Input
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
        </Input.Wrapper>
        <Input.Wrapper label="Opacity">
          <Input
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
        </Input.Wrapper>
      </SettingSection>
      <SettingSection
        text="Front Image Attributes"
        label={({ modalOptions }) =>
          `${JSON.stringify(_get(modalOptions, "frontImageAttribute"))}`
        }
        props={["modalOptions"]}
      >
        <Input.Wrapper label="Src">
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
          <Input
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
        </Input.Wrapper>
        <Input.Wrapper label="Height">
          <Input
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
        </Input.Wrapper>
        <Input.Wrapper label="Width">
          <Input
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
        </Input.Wrapper>
      </SettingSection>
    </>
  );
};
