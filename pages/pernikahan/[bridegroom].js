import Head from "next/head";
import TemplateOne from "../../components/TemplateOne";
import Client from "../../components/client";

const DariID = ({ slug, post }) => {
  console.log(post);
  return (
    <>
      <Head>
        <title>{slug}</title>
      </Head>
      <TemplateOne
        post={{
          id: post.id,
          slug: post.slug
        }}
        bride={post.bride}
        groom={post.groom}
        contract={post.contract}
        reception={post.reception}
        gallery={post.gallery}
        music={post.music}
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
      "_fields": "id,acf",
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
