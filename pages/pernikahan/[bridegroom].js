import Head from "next/head";
import Template from "components/Template";
import Client from "components/client";

const DariID = ({
  slug,
  post: {
    id,
    bride,
    groom,
    theme,
    contract,
    reception,
    gallery,
    music,
    featured_image,
    optional
  }
}) => {
  return (
    <>
      <Head>
        <title>Undangan Pernikahan: {bride.nickname} dan {groom.nickname}</title>
        <meta property="og:image" content={featured_image} data-addsearch="no_crop" />
      </Head>
      <Template
        theme={theme}
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
      post,
    }
  }
}
