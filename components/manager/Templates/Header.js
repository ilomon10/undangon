import { Button, Modal, Box, Flex } from "@mantine/core";
import { useState } from "react";
import { TemplatesDialog } from "./Dialog";
import { MdAdd } from "react-icons/md";
import { useListContext } from "components/List/core";
import { showNotification } from "@mantine/notifications";

export const TemplatesHeader = () => {
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
      <Box as="h4">Templates</Box>
      <Box w={"100%"} />
      <Box>
        <Button
          size="xs"
          leftIcon={<MdAdd />}
          onClick={() => setDialogOpen("create")}
        >
          Create Template
        </Button>
        <Modal
          title="Add Template"
          opened={dialogOpen === "create"}
          onClose={() => setDialogOpen(null)}
        >
          <TemplatesDialog
            onSubmitted={() => {
              refetch();
              showNotification({
                icon: <MdAdd />,
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
