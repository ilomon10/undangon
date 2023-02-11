import { Box, Button, Dialog, Flex, Modal } from "@mantine/core";
import { useState } from "react";
import { InvitationDialog } from "./Dialog";
import { MdAdd } from "react-icons/md";
import { useListContext } from "components/List/core";
import { showNotification } from "@mantine/notifications";

export const InvitationsHeader = () => {
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
      <Box as="h4">Invitation</Box>
      <Box sx={{ flexGrow: 1 }} />
      <Box>
        <Button
          size="xs"
          leftIcon={<MdAdd size={18} />}
          onClick={() => setDialogOpen("create")}
        >
          Create Invitation
        </Button>
        <Modal
          title="Add Invitation"
          opened={dialogOpen === "create"}
          onClose={() => setDialogOpen(null)}
        >
          <InvitationDialog
            onSubmitted={() => {
              refetch();
              showNotification({
                icon: <MdAdd />,
                color: "teal",
                message: "Invitation Added",
              });
            }}
            onClose={() => setDialogOpen(null)}
          />
        </Modal>
      </Box>
    </Flex>
  );
};
