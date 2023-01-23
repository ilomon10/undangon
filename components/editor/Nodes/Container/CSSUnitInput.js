import { ControlGroup, InputGroup, Button, Menu } from "@blueprintjs/core";
import { DragValue } from "components/DragValue";
import { useCallback, useEffect, useState } from "react";
import _get from "lodash/get";
import { MenuItem2, Popover2 } from "@blueprintjs/popover2";
import { Box } from "components/Grid";

const unitOptions = ["px", "vh", "%"];

export const CSSUnitInput = ({
  label,
  disabled,
  iconProps,
  onChange,
  initialValue,
}) => {
  const [value, setValue] = useState(initialValue.value);
  const [unit, setUnit] = useState(initialValue.unit);

  const ChangeHandler = useCallback(
    (n) => {
      if (value !== n.value) setValue(n.value);
      if (unit !== n.unit) setUnit(n.unit);
      if (n.value && !n.unit) setUnit(unitOptions[0]);
      return onChange(
        n.value === undefined ? undefined : `${n.value}${n.unit}`,
        n
      );
    },
    [value, unit]
  );

  return (
    <ControlGroup fill={true}>
      <DragValue
        disabled={disabled}
        min={0}
        max={999999}
        friction={5}
        value={value || 0}
        onChange={(value) => {
          ChangeHandler({ value, unit });
        }}
      >
        {({ handleMouseDown }) => (
          <Button
            disabled={disabled}
            minimal={true}
            small={true}
            style={{
              zIndex: 1,
              cursor: disabled ? "auto" : "w-resize",
            }}
            onMouseDown={handleMouseDown}
            text={iconProps.text}
            icon={iconProps.icon}
            title={label}
          />
        )}
      </DragValue>
      <Box flexGrow={1}>
        <InputGroup
          disabled={disabled}
          style={{
            paddingLeft: 0,
          }}
          small={true}
          // type="number"
          value={value || ""}
          onKeyDown={(e) => {
            if (e.code === "ArrowUp") {
              ChangeHandler({ value: value + 1, unit });
            }
            if (e.code === "ArrowDown") {
              ChangeHandler({ value: value - 1, unit });
            }
          }}
          onChange={(e) => {
            ChangeHandler({ value: Number(e.target.value), unit });
          }}
          rightElement={
            <Popover2
              content={
                <Menu>
                  {unitOptions.map((u) => (
                    <MenuItem2
                      key={u}
                      text={u}
                      onClick={() => {
                        ChangeHandler({ value, unit: u });
                      }}
                    />
                  ))}
                </Menu>
              }
            >
              <Button
                disabled={disabled}
                minimal={true}
                small={true}
                text={unit}
              />
            </Popover2>
          }
        />
      </Box>
      {!!value && (
        <Button
          disabled={disabled}
          small={true}
          minimal={true}
          icon="cross"
          onClick={() => {
            ChangeHandler({ value: undefined, unit: undefined });
          }}
        />
      )}
    </ControlGroup>
  );
};
