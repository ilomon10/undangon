import lz from "lzutf8";
import { Editor, Frame } from "@craftjs/core";
import { Box } from "components";
import { CONSTANTS } from "components/Constants";
import { ParseImageUrl } from "components/utils/parseImageUrl";
import { Button, Container, Text, Image } from "components/editor/Nodes";
import { UrlParameter } from "components/editor/Components";
import Head from "next/head";
import { useRouter } from "next/router";
import { getInvitations } from "pages/api/getInvitations";
import { getInvitationBySlug } from "pages/api/getInvitation/by/[slug]";
import { Viewport } from "components/editor";

export const Invitation = ({ content, meta }) => {
  const router = useRouter();

  if (router.isFallback) {
    return "Loading...";
  }

  return (
    <>
      <Head>
        <title>{meta.title}</title>

        <meta name="twitter:card" content="summary" key="twcard" />

        <meta property="og:type" content="article" key="ogtype" />
        <meta
          property="og:title"
          content={`${meta.og_title} - ${CONSTANTS.APP_NAME}`}
          key="ogtitle"
        />
        <meta
          property="og:description"
          content={`${meta.og_description}`}
          key="ogdesc"
        />
        {meta.og_image && (
          <>
            <meta
              property="og:image"
              content={ParseImageUrl(meta.og_image._id, {
                m: "thumbnail",
                h: 100,
                w: 250,
              })}
              key="ogimage"
            />
            <meta
              property="og:image:width"
              content={meta.og_image.width}
              key="ogimagewidth"
            />
            <meta
              property="og:image:height"
              content={meta.og_image.height}
              key="ogimageheight"
            />
          </>
        )}
        <meta
          property="og:site_name"
          content={CONSTANTS.APP_NAME}
          key="ogsitename"
        />
        <meta
          property="og:url"
          content={`https://${CONSTANTS.APP_DOMAIN}${router.asPath}`}
          key="ogurl"
        />
      </Head>
      <Viewport isProduction={true}>
        <Box
          // sx={{
          //   position: "fixed",
          //   inset: 0,
          //   overflowY: "auto",
          //   overflowX: "hidden",
          // }}
        >
          <Frame data={content}>
            <Container>
              <Text>Coba</Text>
            </Container>
          </Frame>
        </Box>
      </Viewport>
    </>
  );
};

export const getStaticPaths = async () => {
  let { data } = await getInvitations({
    params: {
      fields: {
        slug: 1,
      },
    },
  });

  let paths = data.map((post) => ({
    params: {
      slug: post.slug,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async (context) => {
  const { slug } = context.params;
  let { data } = await getInvitationBySlug(slug);
  const content = lz.decompress(lz.decodeBase64(data.content));
  return {
    props: {
      slug,
      ...data,
      content,
    },
    revalidate: 120,
  };
};

export default Invitation;
