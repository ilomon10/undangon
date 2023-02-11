import { useCallback, useEffect, useMemo, useState } from "react";
import { Loader, Select } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

export const FetchAndSelect = ({
  fetchCallback,
  onFetched,
  onOpening = async () => {},
  initialValue,
  onChange,
  ...props
}) => {
  const isPreFetch = useMemo(() => {
    return initialValue !== null && initialValue !== undefined;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [lastQuery, setLastQuery] = useState(null);

  const fetchItems = useCallback(
    async (q) => {
      setLoading(() => true);
      try {
        const res = await fetchCallback();
        setItems(onFetched(res));
      } catch (err) {
        console.error(err);
      }
      setLoading(() => false);
    },
    [onFetched]
  );

  useEffect(() => {
    if (!isPreFetch) return;
    fetchItems("", {
      query: {
        id: initialValue,
      },
    });
  }, [isPreFetch]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Select
      {...props}
      onChange={(value) => {
        onChange(
          value,
          items.find((item) => item.value == value)
        );
      }}
      rightSection={loading ? <Loader size={16} /> : null}
      onSearchChange={async (query) => {
        if (lastQuery == query) return;
        await fetchItems(query);
        await setLastQuery(query);
      }}
      onDropdownOpen={async () => {
        await onOpening();
        await fetchItems();
      }}
      data={items}
    />
  );
};
