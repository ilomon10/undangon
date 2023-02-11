import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { CanvaLinksPage } from "components/manager/CanvaLinks";

export default function CanvaLinks() {
  return <CanvaLinksPage />;
}

export const getServerSideProps = withPageAuthRequired();
