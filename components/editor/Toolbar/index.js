import { Button, ButtonGroup, Menu, MenuItem } from '@blueprintjs/core';
import { Popover2 } from '@blueprintjs/popover2';
import { useEditor } from '@craftjs/core';
import { Box, Flex } from 'components/Grid';
import React from 'react';
import { useViewport } from '../Viewport/useViewport';

export const Toolbar = () => {
  const { media: { setMedia, currentMedia } } = useViewport();
  const { enabled, canUndo, canRedo, actions } = useEditor((state, query) => ({
    enabled: state.options.enabled,
    canUndo: query.history.canUndo(),
    canRedo: query.history.canRedo(),
  }));
  return (
    <Flex px={2} py={2}>
      <Box mr={2}>
        <Button text="Close" />
      </Box>
      <Box>
        <ButtonGroup>
          <Button disabled={!canUndo} icon="undo" onClick={() => actions.history.undo()} />
          <Button disabled={!canRedo} icon="redo" onClick={() => actions.history.redo()} />
        </ButtonGroup>
      </Box>
      <Flex sx={{ flexGrow: 1, justifyContent: "center" }} >
        <ButtonGroup>
          <Button
            active={currentMedia.name === "mobile"}
            icon="mobile-phone"
            onClick={() => {
              setMedia("mobile");
            }}
          />
          <Button
            active={currentMedia.name === "desktop"}
            icon="desktop"
            onClick={() => {
              setMedia("desktop");
            }}
          />
        </ButtonGroup>
      </Flex>
      <Box>
        <ButtonGroup>
          <Button
            text="Publish"
            intent="success"
          />
          <Popover2
            content={
              <Menu>
                <MenuItem text="Save Draft" />
                <MenuItem text="Export" />
              </Menu>
            }
          >
            <Button
              icon="chevron-down"
              intent="success"
            />
          </Popover2>
        </ButtonGroup>
      </Box>
    </Flex>
  );
};
