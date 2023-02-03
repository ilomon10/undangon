import { useCallback, useEffect, useMemo, useState } from "react";
import { Select } from "./index";

export const FetchAndSelect = ({
  fetchCallback,
  onFetched,
  onOpening = async () => { },
  initialValue,
  ...props
}) => {
  const isPreFetch = useMemo(() => {
    return initialValue !== null && initialValue !== undefined;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [loading, setLoading] = useState(false);

  const [items, setItems] = useState([]);

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
      loading={loading}
      onQueryChange={async (query) => {
        await fetchItems(query);
      }}
      onOpening={async () => {
        await onOpening();
        await fetchItems();
      }}
      options={items}
    />
  );
};
