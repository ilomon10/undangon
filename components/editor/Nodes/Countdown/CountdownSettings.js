import { FormGroup, InputGroup, Switch } from "@blueprintjs/core";
import { useNode } from "@craftjs/core";
import { SettingSection } from "components/editor/Sidepanel/SettingPanel/SettingSection";
import _pick from "lodash/pick";
import _get from "lodash/get";
import _set from "lodash/set";
import moment from "moment";

export const CountdownSettings = () => {
  const {
    actions: { setProp },
    values,
  } = useNode((node) => ({
    values: _pick(node.data.props, ["date"]),
  }));

  return (
    <>
      <SettingSection
        text="Settings"
        label={({ date }) => `${date}`}
        props={["date"]}
      >
        <FormGroup label="Date">
          <InputGroup
            type="date"
            initialValue={_get(values, "date") || ""}
            onChange={(e) => {
              setProp((props) => (props.date = moment(e.target.value).toISOString()), 500);
            }}
          />
        </FormGroup>
      </SettingSection>
    </>
  );
};
