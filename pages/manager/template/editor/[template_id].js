import { Editor, Frame, Element } from '@craftjs/core';
import { Button, Container, Text } from "components/editor/Nodes";

import { Box } from "components";
import { Viewport } from 'components/editor';
import { BlueprintWrapper } from 'components/BlueprintWrapper';
import { RenderNode } from 'components/editor/Nodes/RenderNode';

export default function TemplateEditor() {
  return (
    <BlueprintWrapper>
      <Editor
        resolver={{
          Button,
          Container,
          Text
        }}
        onRender={RenderNode}
      >
        <Viewport>
          <Frame>
            <Element
              is={Container}
              height="auto"
              width="auto"
              custom={{ displayName: 'App' }}
              canvas
            >
              <Element is={Container}
                height="1500px"
                width="100%"
                marginRight="auto"
                marginLeft="auto"
                canvas
              >
                <Element is={Container} canvas height="auto" width="auto">
                  <Text text="Ini Text 1" />
                  <Text text="Text 2" />
                  <Button />
                </Element>
              </Element>
            </Element>
          </Frame>
        </Viewport>
      </Editor>
    </BlueprintWrapper>
  )
}