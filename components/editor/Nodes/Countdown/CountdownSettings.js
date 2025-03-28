import { FormGroup, InputGroup, RadioGroup, Switch } from "@blueprintjs/core";
import { useNode } from "@craftjs/core";
import { SettingSection } from "components/editor/Sidepanel/SettingPanel/SettingSection";
import _pick from "lodash/pick";
import _get from "lodash/get";
import _set from "lodash/set";
import moment from "moment";
import { Box } from "components/Grid";
import DateTime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { ColorPicker } from "components/ColorPicker";

export const CountdownSettings = () => {
  const {
    actions: { setProp },
    values,
  } = useNode((node) => ({
    values: _pick(node.data.props, [
      "date",
      "single",
      "showLabel",
      "titleFontSize",
      "subtitleFontSize",
      "color",
    ]),
  }));

  return (
    <>
      <SettingSection
        text="Settings"
        label={({ date }) => `${date}`}
        props={["date"]}
      >
        <FormGroup label="Date">
          <DateTime
            onChange={(e) =>
              setProp((props) => (props.date = moment(e).toISOString()), 500)
            }
            value={moment(_get(values, "date")).toDate() || ""}
          />
          {/* <InputGroup
            type="date"
            defaultValue={
              moment(_get(values, "date")).format("YYYY-MM-DD") || ""
            }
            onChange={(e) => {
              setProp(
                (props) =>
                  (props.date = moment(
                    e.target.value,
                    "YYYY-MM-DD"
                  ).toISOString()),
                500
              );
            }}
          /> */}
        </FormGroup>
        <Box>
          <RadioGroup
            label="Single"
            selectedValue={_get(values, "single") || ""}
            onChange={(e) => {
              setProp((props) => _set(props, "single", e.target.value));
            }}
            options={[
              { label: "Unset", value: "" },
              { label: "days", value: "days" },
              { label: "hours", value: "hours" },
              { label: "minutes", value: "minutes" },
              { label: "seconds", value: "seconds" },
            ]}
          />
        </Box>
        <Box
          sx={{
            mt: 3,
          }}
        >
          <Switch
            label="Show Label"
            value={_get(values, "showLabel") || false}
            onChange={(e) => {
              setProp((props) => _set(props, "showLabel", e.target.checked));
            }}
          />
        </Box>
        <Box
          sx={{
            mt: 3,
          }}
        >
          <InputGroup
            placeholder="Time Font Size"
            value={_get(values, "titleFontSize") || ""}
            onChange={(e) => {
              setProp((props) => _set(props, "titleFontSize", e.target.value));
            }}
          />
        </Box>
        <Box
          sx={{
            mt: 3,
          }}
        >
          <InputGroup
            placeholder="Label Font Size"
            value={_get(values, "subtitleFontSize") || ""}
            onChange={(e) => {
              setProp((props) =>
                _set(props, "subtitleFontSize", e.target.value)
              );
            }}
          />
        </Box>
        <Box
          sx={{
            mt: 3,
          }}
        >
          <FormGroup label="Color">
            <InputGroup
              value={_get(values, "color") || ""}
              onChange={(e) => {
                setProp((props) => _set(props, "color", e.target.value));
              }}
            />
          </FormGroup>
        </Box>
      </SettingSection>
    </>
  );
};
