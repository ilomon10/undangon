import lz from "lzutf8";
import { Frame, Element } from "@craftjs/core";
import { Button, Container, Text, Document } from "components/editor/Nodes";
import { Viewport } from "components/editor";
import { useCallback } from "react";
import client from "components/client";
import { useRouter } from "next/router";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { showNotification } from "@mantine/notifications";
import { MdCheck, MdClose } from "react-icons/md";

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
        showNotification({
          color: "teal",
          icon: <MdCheck />,
          message: "Project is saved.",
        });
      } catch (err) {
        showNotification({
          color: "red",
          icon: <MdClose />,
          message: "Error while saving the project.",
        });
        console.error(err);
      }
      setLoading(false);
    },
    [props]
  );

  const onClose = useCallback(() => {
    router.replace("/manager/templates");
  }, []);

  const constructPreviewUrl = useCallback(() => {
    return `/t/p/${props._id}`;
  }, [props._id]);

  return (
    <Viewport
      id={`templates/${props._id}`}
      onClose={onClose}
      onPublish={onPublish}
      constructPreviewUrl={constructPreviewUrl}
    >
      <Frame data={content}>
        <Element is={Document} canvas></Element>
      </Frame>
    </Viewport>
  );
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    // let data = await client.getTemplate(template_id);
    // const content = lz.decompress(lz.decodeBase64(data.content));
    return {
      props: {},
    };
  },
});
