import { Card } from "@blueprintjs/core";
import { Box, Flex } from "components";
import { InvitationsHeader } from "components/manager/Invitations/Header";
import { InvitationList } from "components/manager/Invitations/List";
import Layout from "components/manager/Layout";

export default function Invitations() {
  return (
    <Layout>
      <Flex flexGrow={1} flexDirection="column">
        <InvitationsHeader />
        <Box
          sx={{
            py: 4,
          }}
        >
          <Box
            sx={{
              maxWidth: 512,
              margin: "0 auto",
            }}
          >
            <Card>
              <InvitationList />
            </Card>
          </Box>
        </Box>
      </Flex>
    </Layout>
  );
}
