import lz from "lzutf8";
import { Editor, Frame, Element } from "@craftjs/core";
import { Button, Container, Text, Image } from "components/editor/Nodes";
import { UrlParameter } from "components/editor/Components";
import { Viewport } from "components/editor";
import { BlueprintWrapper } from "components/BlueprintWrapper";
import { RenderNode } from "components/editor/Nodes/RenderNode";
import { useCallback, useEffect } from "react";
import client from "components/client";
import { useRouter } from "next/router";

export default function TemplateEditor({ content, ...props }) {
  const router = useRouter();

  const onPublish = useCallback(
    async (query, { setLoading }) => {
      setLoading(true);
      const json = query.serialize();
      const content = lz.encodeBase64(lz.compress(json));
      const data = {
        _id: props._id,
        content,
      };
      try {
        await client.postTemplate(data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    },
    [props]
  );

  const onClose = useCallback(() => {
    router.back();
  }, []);

  const constructPreviewUrl = useCallback(() => {
    return `/t/p/${props._id}`;
  }, [props._id]);

  return (
    <BlueprintWrapper>
      <Viewport
        onClose={onClose}
        onPublish={onPublish}
        constructPreviewUrl={constructPreviewUrl}
      >
        <Frame data={content}>
          <Element
            is={Container}
            custom={{
              displayName: "App",
              settingMode: { height: "hug", width: "fill" },
            }}
            canvas
          >
            <Element is={Container} marginRight="auto" marginLeft="auto" canvas>
              <Element is={Container} canvas>
                <Text text="Ini Text 1" />
                <Text text="Text 2" />
                <Button />
              </Element>
            </Element>
          </Element>
        </Frame>
      </Viewport>
    </BlueprintWrapper>
  );
}

export const getServerSideProps = async (context) => {
  const { template_id } = context.params;
  let data = await client.getTemplate(template_id);
  const content = lz.decompress(lz.decodeBase64(data.content));

  return {
    props: {
      ...data,
      content,
    },
  };
};
