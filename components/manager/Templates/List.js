import { Box } from "components/Grid"
import client from "components/client";
import { useQuery } from "@tanstack/react-query";
import { Button, Card, Menu, MenuDivider, MenuItem } from "@blueprintjs/core";
import Link from "next/link";

export const TemplateList = () => {
  const { data, isLoading, isError, isSuccess } = useQuery(["templates"], async () => {
    let res = [];
    res = await client.content.items.template();
    console.log(res);
    return res;
  });
  if (isError) return <Box>Went Wrong</Box>;
  if (isLoading) return <Button loading />;
  if (!data) return null;

  return (
    <Menu>
      {data.map(({ _id, name }) =>
        <Link key={_id} href={`/manager/template/editor/${_id}`} passHref>
          <MenuItem text={name} label="Lagi" />
        </Link>
      )}
    </Menu>
  )
}