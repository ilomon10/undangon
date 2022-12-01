import { Box } from "components/Grid"
import client from "components/client";
import { useQuery } from "@tanstack/react-query";
import { Button, Card, Menu, MenuDivider, MenuItem } from "@blueprintjs/core";

export const TemplateList = () => {
  const { data, isLoading, isError, isSuccess } = useQuery(["templates"], async () => {
    let res = [];
    res = await client.templates("GET");
    console.log(res);
    return res;
  });
  if (isError) return <Box>Went Wrong</Box>;
  if (isLoading) return <Button loading />;
  if (!data) return null;

  return (
    <Menu>
      {data.map(({ id }) =>
        <Link key={id} href="/manager/template/editor/1" passHref>
          <MenuItem text="Coba" label="Lagi" />
        </Link>
      )}
    </Menu>
  )
}