import { Box, Flex } from "components/Grid";
import { LayerPanel } from "../Sidepanel/LayerPanel";
import { SettingPanel } from "../Sidepanel/SettingPanel";
import { Toolbar } from "../Toolbar";
import { Toolbox } from "../Sidepanel/Toolbox";
import { Editor, useEditor } from "@craftjs/core";
import { useViewport, ViewportProvider } from "./useViewport";
import { ComponentPanel } from "../Sidepanel/ComponentPanel";
import { RenderNode } from "../Nodes/RenderNode";

import * as ResolverNodes from "../Nodes";
import * as ResolverComponents from "../Components";

export const ViewportWrapper = ({ children }) => {
  const { connectors } = useEditor();
  const { media } = useViewport();

  return (
    <Flex
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
          }}
        >
          <Toolbox />
          <ComponentPanel />
        </Box>
        <Box
          className="page-container"
          sx={{
            flexGrow: 1,
          }}
        >
          <Box
            className="craftjs-renderer"
            sx={{
              backgroundColor: "gray.2",
              overflowY: "auto",
              height: "1px",
              minHeight: "100%",
            }}
            ref={(ref) => connectors.select(connectors.hover(ref, null), null)}
            position="absolute"
          >
            <Box
              style={{
                maxWidth: media.currentMedia.width,
                transition: "max-width 500ms ease",
              }}
              sx={{
                position: "relative",
                my: 4,
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
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            width: 280,
            borderLeft: "1px solid white",
            borderLeftColor: "gray.3",
          }}
        >
          <SettingPanel />
          <LayerPanel />
        </Box>
      </Flex>
    </Flex>
  );
};

export const Viewport = ({ children, ...props }) => {
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
