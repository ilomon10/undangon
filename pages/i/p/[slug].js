import lz from "lzutf8";
import { getInvitationBySlug } from "pages/api/getInvitation/by/[slug]";
import Invitation from "../[slug]";

export const getServerSideProps = async (context) => {
  const { slug } = context.params;
  let { data } = await getInvitationBySlug(slug);
  const content = lz.decompress(lz.decodeBase64(data.content));
  return {
    props: {
      slug,
      ...data,
      content,
    },
  };
};

export default Invitation;
