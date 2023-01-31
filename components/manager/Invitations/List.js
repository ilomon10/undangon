import { Box, Flex } from "components/Grid";
import client from "components/client";
import { useQuery } from "@tanstack/react-query";
import {
  AnchorButton,
  Button,
  Card,
  Menu,
  MenuDivider,
  MenuItem,
} from "@blueprintjs/core";
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
          populate: 1,
        });
      } catch (err) {
        console.error(err);
      }
      return res;
    }
  );
  if (isError) return <Box>Went Wrong</Box>;
  if (isLoading) return <Button loading />;
  if (!data) return null;

  return (
    <Box>
      {data.map(({ _id, name, category, slug }) => (
        <Flex
          py={2}
          sx={{
            borderBottom: "1px solid black",
            borderBottomColor: "gray.3",
            alignItems: "center",
          }}
        >
          <Box flexGrow={1}>
            <Link key={_id} href={`/manager/invitation/editor/${_id}`} passHref>
              <Box as="a">{name}</Box>
            </Link>
          </Box>
          <Box color={"gray.5"}>{category.name}</Box>
          <Box pl={2}>
            <Link key={_id} href={`/manager/invitation/editor/${_id}`} passHref>
              <AnchorButton
                small
                title="Edit"
                icon="edit"
                minimal
                target="_blank"
              />
            </Link>
          </Box>
          <Box pl={2}>
            <Link key={_id} href={`/i/p/${slug}`} passHref>
              <AnchorButton
                small
                title="Preview"
                icon="share"
                minimal
                target="_blank"
              />
            </Link>
          </Box>
          <Box pl={2}>
            <Link key={_id} href={`/i/share/${slug}`} passHref>
              <AnchorButton
                small
                title="Share"
                icon="send-message"
                minimal
                target="_blank"
              />
            </Link>
          </Box>
        </Flex>
      ))}
    </Box>
  );
};
