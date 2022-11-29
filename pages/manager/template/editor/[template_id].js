import { Editor, Frame, Element } from '@craftjs/core';
import { Button, Container, Text } from "components/editor/Nodes";

import { Box } from "components";
import { Viewport } from 'components/editor';
import { BlueprintWrapper } from 'components/BlueprintWrapper';

export default function TemplateEditor() {
  return (
    <BlueprintWrapper>
      <Editor
        resolver={{
          Button,
          Container,
          Text
        }}
      >
        <Viewport>
          <Frame>
            <Container>
              <Element is={Container} canvas>
                <Text text="Ini Text 1" />
                <Text text="Text 2" />
                <Button />
              </Element>
            </Container>
          </Frame>
        </Viewport>
      </Editor>
    </BlueprintWrapper>
  )
}