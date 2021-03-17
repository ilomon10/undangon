import Head from "next/head";
import TemplateOne from "../../components/TemplateOne";

const serverUrl = process.env.serverUrl;

const DariID = ({ slug, post }) => {
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
      />
    </>
  )
}

export default DariID;

export const getStaticPaths = async () => {
  let res = await fetch(`${serverUrl}/wp-json/wp/v2/posts?_fields=slug`);
  let json = await res.json();
  let paths = json.map(post => ({ params: { bridegroom: post.slug } }))
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async (context) => {
  const { bridegroom } = context.params;
  let resPost = await fetch(`${serverUrl}/wp-json/wp/v2/posts?_fields=id,acf&slug=${bridegroom}`);
  let post = await resPost.json();
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
