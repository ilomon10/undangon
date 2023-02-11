import {
  ActionIcon,
  Anchor,
  Box,
  Button,
  Divider,
  Flex,
  Modal,
  Text,
} from "@mantine/core";
import Link from "next/link";
import { TemplatesDialog } from "./Dialog";
import { State } from "components/State";
import { useListContext } from "components/List/core";
import { MdAdd, MdCheck, MdEdit, MdError } from "react-icons/md";
import { Fragment } from "react";
import { showNotification } from "@mantine/notifications";

export const TemplateList = () => {
  const { items, isLoading, isError, refetch } = useListContext();
  if (isError) return <Box>Went Wrong</Box>;
  if (isLoading) return <Button loading />;
  if (!items) return null;

  return (
    <Box>
      {items.map(({ _id, name, category }) => (
        <Fragment key={_id}>
          <Flex py={2} align={"center"}>
            <Box w="100%">
              <Link href={`/manager/template/editor/${_id}`} passHref>
                <Anchor>{name}</Anchor>
              </Link>
            </Box>
            <Text w="20%" color={"gray.5"}>
              {category.name}
            </Text>
            <Box>
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
                      title="Edit"
                      opened={state}
                      onClose={() => setState(false)}
                    >
                      <TemplatesDialog
                        defaultValue={{ _id, name, category: category._id }}
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
