import { Box, Flex } from "components/Grid";
import client from "components/client";
import { useQuery } from "@tanstack/react-query";
import { AnchorButton, Button, Dialog } from "@blueprintjs/core";
import Link from "next/link";
import { InvitationEditDialog } from "./Edit.Dialog";
import { State } from "components/State";
import { toaster } from "components/toaster";

export const InvitationList = () => {
  const { data, isLoading, isError, isSuccess, refetch } = useQuery(
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
      {data.map(({ _id, name, category, slug, ...d }) => (
        <Flex
          key={_id}
          py={2}
          sx={{
            borderBottom: "1px solid black",
            borderBottomColor: "gray.3",
            alignItems: "center",
          }}
        >
          <Box flexGrow={1}>
            <Link href={`/manager/invitation/editor/${_id}`} passHref>
              <Box as="a">{name}</Box>
            </Link>
          </Box>
          <Box color={"gray.5"}>{category.name}</Box>
          <Box pl={2}>
            <State defaultValue={false}>
              {({ state, setState }) => (
                <>
                  <Button
                    small
                    title="Edit"
                    icon="edit"
                    minimal
                    onClick={() => {
                      setState(true);
                    }}
                  />
                  <Dialog isOpen={state} onClose={() => setState(false)}>
                    <InvitationEditDialog
                      defaultValue={{ _id, name, category, slug, ...d }}
                      onErrorSubmitted={() => {
                        toaster.show({
                          intent: "danger",
                          message: "Error Submitted.",
                        });
                        setState(false);
                      }}
                      onSubmitted={() => {
                        toaster.show({
                          intent: "success",
                          message: "Invitation saved.",
                        });
                        refetch();
                        setState(false);
                      }}
                      onClose={() => {
                        setState(false);
                      }}
                    />
                  </Dialog>
                </>
              )}
            </State>
          </Box>
          <Box pl={2}>
            <Link href={`/i/p/${slug}`} passHref>
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
            <Link href={`/i/share/${slug}`} passHref>
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
