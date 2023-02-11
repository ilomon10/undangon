import {
  ActionIcon,
  Anchor,
  Button,
  Box,
  Flex,
  Modal,
  Divider,
  Text,
} from "@mantine/core";
import Link from "next/link";
import _get from "lodash.get";
import { InvitationDialog } from "./Dialog";
import { State } from "components/State";
import { showNotification } from "@mantine/notifications";
import { MdEdit, MdError, MdPreview, MdShare } from "react-icons/md";
import { Fragment } from "react";
import { useListContext } from "components/List/core";

export const InvitationList = () => {
  const { items, isLoading, isError, isSuccess, refetch } = useListContext();
  if (isError) return <Box>Went Wrong</Box>;
  if (isLoading) return <Button loading />;
  if (!items) return null;

  return (
    <Box>
      {items.map(({ _id, name, category, slug, ...d }) => (
        <Fragment key={_id}>
          <Flex py={2} align={"center"}>
            <Box w={"70%"}>
              <Link href={`/manager/invitation/editor/${_id}`} passHref>
                <Anchor>{name}</Anchor>
              </Link>
            </Box>
            <Text w={"20%"} color={"gray"}>
              {_get(category, "name")}
            </Text>
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
                    <Modal
                      opened={state}
                      title="Edit"
                      onClose={() => setState(false)}
                    >
                      <InvitationDialog
                        method="edit"
                        defaultValue={{ _id, name, category, slug, ...d }}
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
                            icon: <MdAdd />,
                            color: "teal",
                            message: "Invitation saved.",
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
            <Box pl={2}>
              <Link href={`/i/p/${slug}`} passHref>
                <ActionIcon
                  component="a"
                  variant="subtle"
                  title="Preview"
                  icon="share"
                  target="_blank"
                >
                  <MdPreview size={24} />
                </ActionIcon>
              </Link>
            </Box>
            <Box pl={2}>
              <Link href={`/i/share/${slug}`} passHref>
                <ActionIcon
                  component="a"
                  variant="subtle"
                  title="Share"
                  icon="send-message"
                  target="_blank"
                >
                  <MdShare />
                </ActionIcon>
              </Link>
            </Box>
          </Flex>
          <Divider />
        </Fragment>
      ))}
    </Box>
  );
};
