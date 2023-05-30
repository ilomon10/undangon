import lz from "lzutf8";
import { Editor, Frame } from "@craftjs/core";
import { Box } from "components";
import Head from "next/head";
import { useRouter } from "next/router";
import { getTemplates } from "pages/api/getTemplates";
import { getTemplate } from "pages/api/getTemplate/[id]";
import * as ResolverNodes from "components/editor/Nodes";
import * as ResolverComponents from "components/editor/Components";
import { Viewport } from "components/editor";

export const Template = ({ content, name }) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Template: {name}</title>
      </Head>
      <Viewport isProduction={true}>
        <Frame data={content}>
          <ResolverNodes.Container>
            <ResolverNodes.Text>Nothing to see</ResolverNodes.Text>
          </ResolverNodes.Container>
        </Frame>
      </Viewport>
    </>
  );
};

export const getStaticPaths = async () => {
  let { data } = await getTemplates({
    params: {
      fields: {
        _id: 1,
      },
    },
  });

  let paths = data.map((post) => ({
    params: {
      id: post._id,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async (context) => {
  const { id } = context.params;
  let { data } = await getTemplate({}, id);
  const content = lz.decompress(lz.decodeBase64(data.content));
  return {
    props: {
      ...data,
      content,
    },
    revalidate: 120,
  };
};

export default Template;
