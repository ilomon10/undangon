import { Editor, Frame, Element } from '@craftjs/core';

import { Box } from "components";
import { Viewport } from 'components/editor';
import { RenderNode } from "components/editor/RenderNode";

export default function TemplateEditor() {
  return (
    <Box>
      <Editor
        onRender={RenderNode}
      >
        <Viewport>
          <Frame>
            <Element canvas/>
          </Frame>
        </Viewport>
      </Editor>
    </Box>
  )
}