import Head from "next/head";
import Template from "components/Template";
import Client from "components/client";
import moment from "moment";
import { useRouter } from "next/router";

const DariID = ({
  slug,
  post: {
    id,
    bride,
    groom,
    theme,
    mode,
    contract,
    reception,
    gallery,
    music,
    featured_image,
    optional,
  }
}) => {
  const router = useRouter();
  const previewImage = featured_image["sizes"]["post-thumbnail"];
  const previewImageWidth = featured_image["sizes"]["post-thumbnail-width"];
  const previewImageHeight = featured_image["sizes"]["post-thumbnail-height"];
  return (
    <>
      <Head>
        <title>Undangan Pernikahan: {bride.nickname} dan {groom.nickname}</title>

        <meta name="twitter:card" content="summary" key="twcard" />

        <meta property="og:type" content="article" key="ogtype" />
        <meta property="og:title" content={`The Wedding of ${bride.nickname} & ${groom.nickname} - Ba Undang`} key="ogtitle" />
        <meta property="og:description" content={`Save the date ${moment(contract.date).format("DD MMMM YYYY")}`} key="ogdesc" />
        <meta property="og:image" content={previewImage} key="ogimage" />
        <meta property="og:image:width" content={previewImageWidth} key="ogimagewidth" />
        <meta property="og:image:height" content={previewImageHeight} key="ogimageheight" />
        <meta property="og:site_name" content="Ba Undang" key="ogsitename" />
        <meta property="og:url" content={`https://baundang.me${router.asPath}`} key="ogurl" />
      </Head>
      <Template
        theme={theme}
        mode={mode}
        post={{
          id: id,
          slug: slug
        }}
        bride={bride}
        groom={groom}
        contract={contract}
        reception={reception}
        gallery={gallery}
        music={music}
        featured_image={featured_image}
        optional={optional}
      />
    </>
  )
}

export default DariID;

export const getStaticPaths = async () => {
  let { data } = await Client.posts({
    params: { "_fields": "slug" }
  });
  let paths = data.map(post => ({ params: { bridegroom: post.slug } }))
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async (context) => {
  const { bridegroom } = context.params;
  let { data } = await Client.posts({
    params: {
      "_fields": "id,acf",
      "slug": bridegroom
    }
  });
  const post = {
    id: data[0].id,
    ...data[0].acf
  };

  post.gallery = post.gallery.map(({ id, url, name, alt, width, height }) => {
    return { id, url, name, alt, width, height };
  });

  return {
    props: {
      slug: bridegroom,
      post
    }
  }
}
