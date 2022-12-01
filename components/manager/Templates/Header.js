import { Button, Classes, Dialog } from "@blueprintjs/core";
import { Box, Flex } from "components/Grid";
import { useState } from "react";
import { TemplatesAddDialog } from "./Add.Dialog";

export const TemplatesHeader = () => {
  const [dialogOpen, setDialogOpen] = useState(null);
  return (
    <Flex sx={{
      px: 2,
      py: 2,
      backgroundColor: "white",
      borderBottom: "1px solid white",
      borderBottomColor: "gray.3",
      alignItems: "center"
    }}>
      <Box className={Classes.HEADING} as="h4">
        Templates
      </Box>
      <Box flexGrow={1} />
      <Box>
        <Button
          icon="add"
          text="Create Template"
          onClick={() => setDialogOpen("create")}
        />
        <Dialog
          isOpen={dialogOpen === "create"}
          onClose={() => setDialogOpen(null)}
        >
          <TemplatesAddDialog />
        </Dialog>
      </Box>
    </Flex>
  );
}