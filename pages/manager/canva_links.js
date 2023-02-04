import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { Card } from "@blueprintjs/core";
import { Box, Flex } from "components";
import { CanvaLinksHeader } from "components/manager/CanvaLinks/Header";
import { CanvaLinkList } from "components/manager/CanvaLinks/List";
import Layout from "components/manager/Layout";

export default function CanvaLinks() {
  return (
    <Layout>
      <Flex flexGrow={1} flexDirection="column">
        <CanvaLinksHeader />
        <Box
          sx={{
            py: 4,
            overflowY: "auto",
          }}
        >
          <Box
            sx={{
              maxWidth: 512,
              margin: "0 auto",
            }}
          >
            <Card>
              <CanvaLinkList />
            </Card>
          </Box>
        </Box>
      </Flex>
    </Layout>
  );
}

export const getServerSideProps = withPageAuthRequired();
