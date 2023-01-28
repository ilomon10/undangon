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
            defaultValue={
              moment(_get(values, "date")).format("YYYY-MM-DD") || ""
            }
            onChange={(e) => {
              console.log(e.target.value);
              setProp(
                (props) =>
                  (props.date = moment(
                    e.target.value,
                    "YYYY-MM-DD"
                  ).toISOString()),
                500
              );
            }}
          />
        </FormGroup>
      </SettingSection>
    </>
  );
};
