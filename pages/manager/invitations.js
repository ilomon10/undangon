import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { InvitationPage } from "components/manager/Invitations";

export default function Invitations() {
  return <InvitationPage />;
}

export const getServerSideProps = withPageAuthRequired();
