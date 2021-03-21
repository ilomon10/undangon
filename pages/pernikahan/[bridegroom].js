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
  let { data: post } = await Client.posts({
    params: {
      // "_fields": "id,acf,thumbnail",
      "slug": bridegroom
    }
  });
  return {
    props: {
      slug: bridegroom,
      post: {
        id: post[0].id,
        ...post[0].acf
      }
    }
  }
}
