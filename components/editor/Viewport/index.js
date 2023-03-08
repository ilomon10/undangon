import lz from "lzutf8";
import { Box, Flex } from "components/Grid";
import { LayerPanel } from "../Sidepanel/LayerPanel";
import { SettingPanel } from "../Sidepanel/SettingPanel";
import { Toolbar } from "../Toolbar";
import { Toolbox } from "../Sidepanel/Toolbox";
import { Editor, useEditor, serializeNode } from "@craftjs/core";
import { useViewport, ViewportProvider } from "./useViewport";
import { ComponentPanel } from "../Sidepanel/ComponentPanel";
import { RenderNode } from "../Nodes/RenderNode";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import * as ResolverNodes from "../Nodes";
import * as ResolverComponents from "../Components";
import { Tag, useHotkeys } from "@blueprintjs/core";
import { useCallback, useMemo } from "react";
import { getCloneTree } from "../utils/getCloneTree";
import { toaster } from "components/toaster";

export const ViewportWrapper = ({ children }) => {
  const {
    connectors,
    actions,
    selected,
    parseSerializedNode,
    getSerializedNodeById,
    getNodeById,
    getParentNodeById,
    getCloneNodeById,
  } = useEditor((state, query) => ({
    selected: state.events.selected,
    parseSerializedNode: (nodeId, node) => {
      return query
        .parseSerializedNode(node)
        .toNode((node) => (node.id = nodeId));
    },
    getSerializedNodeById: (nodeId) => {
      const nodeTree = getCloneTree(query, nodeId);
      const serialized = { rootNodeId: nodeTree.rootNodeId, nodes: {} };
      for (const node in nodeTree.nodes) {
        serialized.nodes[node] = serializeNode(
          nodeTree.nodes[node].data,
          state.options.resolver
        );
      }
      return JSON.stringify(serialized);
    },
    getNodeById: (nodeId) => query.node(nodeId),
    getParentNodeById: (nodeId) => query.node(nodeId).get().data.parent,
    getCloneNodeById: (nodeId) => getCloneTree(query, nodeId),
  }));
  const { media } = useViewport();

  const duplicateNode = useCallback(() => {
    const [selectedNodeId] = selected;
    if (!selectedNodeId) return;
    const freshNode = getCloneNodeById(selectedNodeId);
    const parent = getParentNodeById(selectedNodeId);
    actions.addNodeTree(freshNode, parent);
  }, [selected]);

  const copyNode = useCallback(async () => {
    const [selectedNodeId] = selected;
    if (!selectedNodeId) return;
    if (selectedNodeId === "ROOT") return;
    const freshNode = getSerializedNodeById(selectedNodeId);
    const data = [
      new ClipboardItem({
        ["web text/undangon"]: new Blob([freshNode], {
          type: "web text/undangon",
        }),
        // ["text/plain"]: new Blob([freshNode], { type: "text/plain" }),
      }),
    ];
    try {
      await navigator.clipboard.write(data);
      toaster.show({
        intent: "success",
        message: (
          <>
            Node <Tag>{selectedNodeId}</Tag> was copied
          </>
        ),
      });
    } catch (err) {
      console.error(err);
      toaster.show({
        intent: "warning",
        message: `Node cannot copied`,
      });
    }
  }, [selected]);

  const pasteNode = useCallback(
    async (e) => {
      let [selectedNodeId] = selected;
      if (!selectedNodeId) selectedNodeId = "ROOT";
      const items = await navigator.clipboard.read();
      let nodeTree = null;
      try {
        for (const item of items) {
          for (const type of item.types) {
            if (type === "web text/undangon") {
              nodeTree = JSON.parse(await (await item.getType(type)).text());
            }
          }
        }
      } catch (err) {
        console.error(err);
      }
      if (!nodeTree) return;
      for (const node in nodeTree.nodes) {
        nodeTree.nodes[node] = parseSerializedNode(node, nodeTree.nodes[node]);
      }
      actions.addNodeTree(nodeTree, selectedNodeId);
    },
    [selected]
  );

  const editorHotkeys = useMemo(
    () => [
      {
        combo: "ctrl+c",
        label: "Copy",
        group: "Editor",
        // preventDefault: true,
        onKeyDown: copyNode,
      },
      {
        combo: "ctrl+v",
        label: "Paste",
        group: "Editor",
        // preventDefault: true,
        onKeyDown: pasteNode,
      },
      {
        combo: "del",
        label: "Delete",
        group: "Editor",
        onKeyDown: (e) => {
          const [selectedNodeId] = selected;
          if (!selectedNodeId) return;
          const node = getNodeById(selectedNodeId);
          if (node.isDeletable()) {
            actions.delete(selectedNodeId);
          }
        },
      },
      {
        combo: "ctrl+d",
        label: "Duplicate",
        group: "Editor",
        preventDefault: true,
        onKeyDown: (e) => {
          duplicateNode();
        },
      },
      {
        combo: "ctrl+shift+z",
        label: "Redo",
        group: "Editor",
        onKeyDown: () => actions.history.redo(),
      },
      {
        combo: "ctrl+z",
        label: "Undo",
        group: "Editor",
        onKeyDown: () => actions.history.undo(),
      },
    ],
    [
      copyNode,
      pasteNode,
      duplicateNode,
      actions.history.undo,
      actions.history.redo,
    ]
  );

  const { handleKeyDown, handleKeyUp } = useHotkeys(editorHotkeys);

  return (
    <Flex
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      className="prevent-select"
      sx={{
        position: "fixed",
        inset: 0,
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          borderBottom: "1px solid white",
          borderBottomColor: "gray.3",
        }}
      >
        <Toolbar />
      </Box>
      <Flex
        sx={{
          flexGrow: 1,
        }}
      >
        <Box
          sx={{
            width: 280,
            borderRight: "1px solid white",
            borderRightColor: "gray.3",
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              overflow: "auto",
            }}
          >
            <Toolbox />
            <ComponentPanel />
            <LayerPanel />
          </Box>
        </Box>
        <Box
          className="page-container"
          sx={{
            flexGrow: 1,
          }}
        >
          <Box
            className="editor-renderer"
            sx={{
              backgroundColor: "gray.2",
              overflowY: "auto",
              overflowX: "hidden",
              height: "1px",
              minHeight: "100%",
            }}
            ref={(ref) => connectors.select(connectors.hover(ref, null), null)}
            position="absolute"
          >
            <Box py={4} px={2}>
              <Box
                style={{
                  maxWidth: media.currentMedia.width,
                  transition: "max-width 500ms ease",
                }}
                sx={{
                  position: "relative",
                  mx: "auto",
                  backgroundColor: "white",

                  "&:after": {
                    content: `" "`,
                    borderBottom: "1px dashed white",
                    borderBottomColor: "red.4",
                    position: "absolute",
                    width: "100%",
                    top: media.currentMedia.height,
                    transition: "top 500ms ease",
                  },
                }}
              >
                {children}
                <Box sx={{ position: "absolute", bottom: "100%", left: 0 }}>
                  {media.currentMedia.width} x {media.currentMedia.height}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            width: 280,
            borderLeft: "1px solid white",
            borderLeftColor: "gray.3",
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              overflow: "auto",
            }}
          >
            <SettingPanel />
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};

export const Viewport = ({ isProduction = false, children, ...props }) => {
  if (isProduction) {
    return (
      <Editor
        enabled={false}
        resolver={{
          ...ResolverNodes,
          ...ResolverComponents,
        }}
      >
        <ViewportProvider isProduction={true}>{children}</ViewportProvider>
      </Editor>
    );
  }
  return (
    <Editor
      resolver={{
        ...ResolverNodes,
        ...ResolverComponents,
      }}
      onRender={RenderNode}
    >
      <ViewportProvider {...props}>
        <ViewportWrapper>{children}</ViewportWrapper>
      </ViewportProvider>
    </Editor>
  );
};
