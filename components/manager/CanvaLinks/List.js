import { ActionIcon, Anchor, Box, Button, Card, Divider, Flex, Modal } from "@mantine/core";
import { CanvaLinksDialog } from "./Dialog";
import { State } from "components/State";
import { useListContext } from "components/List/core";
import { Fragment } from "react";
import { MdCheck, MdEdit, MdError } from "react-icons/md";
import { showNotification } from "@mantine/notifications";

export const CanvaLinkList = () => {
  const { items, isLoading, isError, isSuccess, refetch } = useListContext();
  if (isError) return <Box>Went Wrong</Box>;
  if (isLoading) return <Button loading />;
  if (!items) return null;

  return (
    <Box>
      {items.map(({ _id, name, link }) => (
        <Fragment key={_id}>
          <Flex py={2} align={"center"}>
            <Box sx={{ flexGrow: 1 }}>
              <Anchor href={link} target="_blank">
                {name}
              </Anchor>
            </Box>
            <Box pl={2}>
              <State defaultValue={false}>
                {({ state, setState }) => (
                  <>
                    <ActionIcon
                      title="Edit"
                      icon="edit"
                      variant="subtle"
                      onClick={() => {
                        setState(true);
                      }}
                    >
                      <MdEdit />
                    </ActionIcon>
                    <Modal title="Edit" opened={state} onClose={() => setState(false)}>
                      <CanvaLinksDialog
                        defaultValue={{ _id, name, link }}
                        onErrorSubmitted={() => {
                          showNotification({
                            icon: <MdError />,
                            color: "red",
                            message: "Error Submitted.",
                          });
                          setState(false);
                        }}
                        onSubmitted={() => {
                          showNotification({
                            icon: <MdCheck />,
                            color: "teal",
                            message: "Template saved.",
                          });
                          refetch();
                          setState(false);
                        }}
                        onClose={() => {
                          setState(false);
                        }}
                      />
                    </Modal>
                  </>
                )}
              </State>
            </Box>
          </Flex>

          <Divider variant="dotted" />
        </Fragment>
      ))}
    </Box>
  );
};
