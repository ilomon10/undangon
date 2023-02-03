import { Button, Classes, Dialog } from "@blueprintjs/core";
import { Box, Flex } from "components/Grid";
import { useState } from "react";
import { CanvaLinksDialog } from "./Dialog";

export const CanvaLinksHeader = () => {
  const [dialogOpen, setDialogOpen] = useState(null);
  return (
    <Flex
      sx={{
        px: 2,
        py: 2,
        backgroundColor: "white",
        borderBottom: "1px solid white",
        borderBottomColor: "gray.3",
        alignItems: "center",
      }}
    >
      <Box className={Classes.HEADING} as="h4">
        Canva Links
      </Box>
      <Box flexGrow={1} />
      <Box>
        <Button
          icon="add"
          text="Create Canva Link"
          onClick={() => setDialogOpen("create")}
        />
        <Dialog
          isOpen={dialogOpen === "create"}
          onClose={() => setDialogOpen(null)}
        >
          <CanvaLinksDialog onClose={() => setDialogOpen(null)} />
        </Dialog>
      </Box>
    </Flex>
  );
};
