import { Box, Button, Flex, Modal } from "@mantine/core";
import { useState } from "react";
import { CanvaLinksDialog } from "./Dialog";
import { useListContext } from "components/List/core";
import { showNotification } from "@mantine/notifications";
import { MdAdd, MdCheck } from "react-icons/md";

export const CanvaLinksHeader = () => {
  const [dialogOpen, setDialogOpen] = useState(null);
  const { refetch } = useListContext();
  return (
    <Flex
      py={4}
      px={8}
      sx={({ colors }) => ({
        position: "sticky",
        top: 0,
        right: 0,
        zIndex: 9,
        backgroundColor: "white",
        borderBottom: "1px solid white",
        borderBottomColor: colors.gray[3],
        alignItems: "center",
      })}
    >
      <Box w={"100%"}>Canva Links</Box>
      <Box />
      <Box>
        <Button
          size="xs"
          leftIcon={<MdAdd />}
          onClick={() => setDialogOpen("create")}
        >
          Create Canva Link
        </Button>
        <Modal
          title="Add"
          opened={dialogOpen === "create"}
          onClose={() => setDialogOpen(null)}
        >
          <CanvaLinksDialog
            onSubmitted={() => {
              refetch();
              showNotification({
                icon: <MdCheck />,
                color: "teal",
                message: "Template Added",
              });
            }}
            onClose={() => setDialogOpen(null)}
          />
        </Modal>
      </Box>
    </Flex>
  );
};
