import { Box } from "components/Grid";
import client from "components/client";
import { useQuery } from "@tanstack/react-query";
import { Button, Card, Menu, MenuDivider, MenuItem } from "@blueprintjs/core";
import Link from "next/link";

export const InvitationList = () => {
  const { data, isLoading, isError, isSuccess } = useQuery(
    ["invitations"],
    async () => {
      let res = [];
      try {
        res = await client.getInvitations({
          fields: {
            content: 0,
          },
          populate: 1
        });
      } catch (err) {
        console.error(err);
      }
      console.log(res);
      return res;
    }
  );
  if (isError) return <Box>Went Wrong</Box>;
  if (isLoading) return <Button loading />;
  if (!data) return null;

  return (
    <Menu>
      {data.map(({ _id, name, category }) => (
        <Link key={_id} href={`/manager/invitation/editor/${_id}`} passHref>
          <MenuItem text={name} label={category.name} />
        </Link>
      ))}
    </Menu>
  );
};
