import { Box } from "components/Grid";
import client from "components/client";
import { useQuery } from "@tanstack/react-query";
import { Button, Card, Menu, MenuDivider, MenuItem } from "@blueprintjs/core";
import Link from "next/link";

export const TemplateList = () => {
  const { data, isLoading, isError } = useQuery(["templates"], async () => {
    let res = [];
    try {
      res = await client.getTemplates({
        populate: 1,
        fields: {
          name: 1,
          category: 1,
        },
      });
    } catch (err) {
      console.error(err);
    }
    return res;
  });
  if (isError) return <Box>Went Wrong</Box>;
  if (isLoading) return <Button loading />;
  if (!data) return null;

  return (
    <Menu>
      {data.map(({ _id, name, category }) => (
        <Link key={_id} href={`/manager/template/editor/${_id}`} passHref>
          <MenuItem text={name} label={category.name} />
        </Link>
      ))}
    </Menu>
  );
};
