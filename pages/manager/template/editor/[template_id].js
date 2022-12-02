import lz from "lzutf8";
import { Editor, Frame, Element } from '@craftjs/core';
import { Button, Container, Text, Image } from "components/editor/Nodes";

import { Box } from "components";
import { Viewport } from 'components/editor';
import { BlueprintWrapper } from 'components/BlueprintWrapper';
import { RenderNode } from 'components/editor/Nodes/RenderNode';
import { useCallback, useEffect } from 'react';
import client from 'components/client';
import { useRouter } from "next/router";

export default function TemplateEditor({ content, ...props }) {
  const router = useRouter();

  const onPublish = useCallback(async (query) => {
    const json = query.serialize();
    const content = lz.encodeBase64(lz.compress(json));
    const response = await client.content.item.template({
      method: "POST",
      data: {
        data: {
          _id: props._id,
          content
        }
      }
    });
    console.log(response);
  }, [props]);

  const onClose = useCallback(() => {
    router.back();
  }, []);

  return (
    <BlueprintWrapper>
      <Editor
        resolver={{
          Button,
          Container,
          Text,
          Image
        }}
        onRender={RenderNode}
      >
        <Viewport
          onClose={onClose}
          onPublish={onPublish}
        >
          <Frame data={content}>
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

export const getServerSideProps = async (context) => {
  const { template_id } = context.params;
  let data = await client.content.item.template(
    {
      method: "GET"
    },
    template_id
  );
  const content = lz.decompress(lz.decodeBase64(data.content));

  return {
    props: {
      ...data,
      content
    }
  }
}
