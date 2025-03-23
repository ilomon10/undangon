import { Box, Flex } from "components/Grid";
import client from "components/client";
import { useQuery } from "@tanstack/react-query";
import { AnchorButton, Button, Dialog } from "@blueprintjs/core";
import Link from "next/link";
import { InvitationEditDialog } from "./Edit.Dialog";
import { State } from "components/State";
import { toaster } from "components/toaster";
import { usePagination } from "components/List/utils/usePagination";

export const InvitationList = () => {
  const pagination = usePagination({
    initialLimit: 10,
    initialSkip: 0,
  });

  const { data, isLoading, isError, isSuccess, refetch } = useQuery(
    [
      "invitations",
      `filter => limit=${pagination.limit}&skip=${pagination.skip}`,
    ],
    async () => {
      let res = [];
      try {
        let invitations = await client.getInvitations({
          populate: 1,
          fields: {
            content: 0,
          },
          sort: {
            _created: -1,
          },
          limit: pagination.limit,
          skip: pagination.skip,
        });

        pagination.updateTotal(invitations.meta.total);
        res = invitations.data;
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
    <>
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
              <Link href={`/manager/invitation/editor/${slug}/${_id}`} passHref>
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

      <Flex
        sx={{
          justifyContent: "space-between",
          py: 2,
        }}
      >
        <Button disabled={!pagination.canPrev} onClick={pagination.prevPage}>
          Previous
        </Button>
        <Button disabled={!pagination.canNext} onClick={pagination.nextPage}>
          Next
        </Button>
      </Flex>
    </>
  );
};
