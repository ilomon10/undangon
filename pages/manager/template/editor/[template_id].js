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
                <Text />
                <Text />
                <Button />
              </Element>
            </Container>
          </Frame>
        </Viewport>
      </Editor>
    </BlueprintWrapper>
  )
}