import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { TemplatePage } from "components/manager/Templates";

export default function Templates() {
  return <TemplatePage />;
}

export const getServerSideProps = withPageAuthRequired();
