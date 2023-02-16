import React, { useMemo } from "react";
import { ActionIcon, Button, Menu } from "@mantine/core";
import { useEditor } from "@craftjs/core";
import { Box, Flex } from "components/Grid";
import { useViewport } from "../Viewport/useViewport";
import { State } from "components/State";
import Link from "next/link";
import {
  MdKeyboardArrowDown,
  MdOpenInNew,
  MdRedo,
  MdShare,
  MdUndo,
} from "react-icons/md";

export const Toolbar = () => {
  const {
    media: { setMedia, currentMedia },
    handler,
  } = useViewport();
  const { canUndo, canRedo, actions, query } = useEditor((state, query) => ({
    enabled: state.options.enabled,
    canUndo: query.history.canUndo(),
    canRedo: query.history.canRedo(),
  }));

  const previewUrl = useMemo(() => {
    try {
      return handler.constructPreviewUrl();
    } catch (err) {
      return null;
    }
  }, [handler.constructPreviewUrl]);

  return (
    <Flex px={2} py={2} alignItems="center">
      <Box mr={2}>
        <Button onClick={handler.onClose} size="xs">
          Close
        </Button>
      </Box>
      <Box>
        <Button.Group>
          <ActionIcon
            size="md"
            disabled={!canUndo}
            onClick={() => actions.history.undo()}
          >
            <MdUndo size={18} />
          </ActionIcon>
          <ActionIcon
            size="md"
            disabled={!canRedo}
            onClick={() => actions.history.redo()}
          >
            <MdRedo size={18} />
          </ActionIcon>
        </Button.Group>
      </Box>
      {/* <Box ml={2}>
        <KeyCombo combo="shift+/" />
      </Box> */}
      <Flex sx={{ flexGrow: 1, justifyContent: "center" }}>
        <Button.Group>
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
        </Button.Group>
      </Flex>
      <Box>
        <Button.Group>
          <State defaultValue={false}>
            {({ state: isLoading, setState: setLoading }) => (
              <Button
                color="teal"
                loading={isLoading}
                onClick={() =>
                  handler.onPublish(query, { isLoading, setLoading })
                }
              >
                Publish
              </Button>
            )}
          </State>
          <Menu>
            <Menu.Target>
              <ActionIcon>
                <MdKeyboardArrowDown />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              {previewUrl && (
                <Link href={previewUrl} passHref>
                  <Menu.Item
                    component="a"
                    target="_blank"
                    icon={<MdOpenInNew />}
                    text="Preview"
                  />
                </Link>
              )}
              <Menu.Item text="Export" />
            </Menu.Dropdown>
          </Menu>
        </Button.Group>
      </Box>
    </Flex>
  );
};
