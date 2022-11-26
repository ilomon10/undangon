import Head from "next/head";
import { Client } from "../../../components";
import Template from "../../../components/Template";

const Preview = ({
  slug,
  post: {
    id,
    bride,
    groom,
    theme,
    mode,
    location_time_date,
    gallery,
    music,
    featured_image,
    optional,
  }
}) => {
  return (
    <>
      <Head>
        <title>Undangan Pernikahan: {bride.nickname} dan {groom.nickname}</title>
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
        location_time_date={location_time_date}
        gallery={gallery}
        music={music}
        featured_image={featured_image}
        optional={optional}
      />
    </>
  );
}

export async function getServerSideProps(context) {
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

export default Preview;