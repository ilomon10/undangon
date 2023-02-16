import lz from "lzutf8";
import { Frame, Element } from "@craftjs/core";
import { Button, Container, Text } from "components/editor/Nodes";

import { Viewport } from "components/editor";
import { useCallback } from "react";
import client from "components/client";
import { useRouter } from "next/router";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { showNotification } from "@mantine/notifications";
import { MdCheck, MdClose } from "react-icons/md";

export default function InvitationEditor({ content, ...props }) {
  const router = useRouter();

  const onPublish = useCallback(
    async (query, { setLoading }) => {
      setLoading(true);
      const json = query.serialize();
      const content = lz.encodeBase64(lz.compress(json));
      try {
        await client.postInvitation({
          _id: props._id,
          content,
        });
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
    router.replace("/manager/invitations");
  }, []);

  const constructPreviewUrl = useCallback(() => {
    return `/i/p/${props.slug}`;
  }, [props.slug]);

  return (
    <Viewport
      id={`invitations/${props._id}---${props.slug}`}
      onClose={onClose}
      onPublish={onPublish}
      constructPreviewUrl={constructPreviewUrl}
    >
      <Frame data={content}>
        <Element
          is={Container}
          height="auto"
          width="auto"
          custom={{ displayName: "App" }}
          canvas
        >
          <Element
            is={Container}
            height={1500}
            width={0}
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
  );
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    const { invitation_id } = context.params;
    let data = await client.getInvitation(invitation_id);
    const content = lz.decompress(lz.decodeBase64(data.content));
    return {
      props: {
        ...data,
        content,
      },
    };
  },
});
