import lz from "lzutf8";
import { getTemplate } from "pages/api/getTemplate/[id]";
import { Template } from "../[id]";

export const getServerSideProps = async (context) => {
  const { id } = context.params;
  let { data } = await getTemplate({}, id);
  const content = lz.decompress(lz.decodeBase64(data.content));
  console.log(id);
  return {
    props: {
      ...data,
      content,
    },
  };
};

export default Template;
