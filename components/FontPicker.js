import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CONSTANTS } from "./Constants";
import Select, { createFilter, components } from "react-select";
import _pick from "lodash/pick";
import { Box, Flex } from "./Grid";

const Option = (props) => {
  const {
    innerProps,
    label,
    data: { data },
  } = props;
  return (
    <Flex
      {...innerProps}
      p={2}
      sx={{
        "&:hover": {
          backgroundColor: "gray.3",
        },
      }}
    >
      <Box flexGrow={1}>{label}</Box>
      <Box sx={{ fontSize: 0, color: "gray.5" }}>{data.category}</Box>
    </Flex>
  );
};

export const FontPicker = ({ activeFontFamily, onChange }) => {
  const { data, isLoading, isError, refetch } = useQuery(
    ["font_picker"],
    async () => {
      let res = [];
      try {
        res = await axios.get(
          `https://www.googleapis.com/webfonts/v1/webfonts?key=${CONSTANTS.GOOGLE_API_KEY}`
        );
        res = res.data.items.map((item) => ({
          value: item.family,
          label: item.family,
          data: _pick(item, ["family", "category"]),
        }));
      } catch (err) {
        console.error(err);
      }
      return res;
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );

  return (
    <Select
      defaultValue={(data || []).find(
        ({ value }) => value === activeFontFamily
      )}
      components={{ Option }}
      onChange={(value) => onChange(value.data)}
      options={data}
      isSearchable={true}
      isLoading={isLoading}
      filterOption={createFilter({ ignoreAccents: false })}
    />
  );
};
