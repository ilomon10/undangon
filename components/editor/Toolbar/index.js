import { Button, ButtonGroup } from '@blueprintjs/core';
import { useEditor } from '@craftjs/core';
import { Box, Flex } from 'components/Grid';
import React, { useEffect } from 'react';

export const Toolbar = () => {
  return (
    <Flex sx={{
      px: 2,
      py: 2,
    }}>
      <Box>
        <ButtonGroup>
          <Button icon="undo" />
          <Button icon="redo" />
          <Button icon="floppy-disk" />
        </ButtonGroup>
      </Box>
    </Flex>
  );
};
