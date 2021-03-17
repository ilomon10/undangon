import Head from "next/head";
import TemplateOne from "../../components/TemplateOne";

const serverUrl = process.env.serverUrl;

const DariID = ({ slug, post, comments }) => {
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
        comments={comments}
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
  let resComments = await fetch(`${serverUrl}/wp-json/wp/v2/comments?_fields=id,author_name,date,content&post=${post[0].id}`);
  let comments = await resComments.json();
  console.log(comments);
  return {
    props: {
      slug: bridegroom,
      post: {
        id: post[0].id,
        ...post[0].acf
      },
      comments
    }
  }
}
