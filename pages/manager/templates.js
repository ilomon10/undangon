import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { Card, Menu, MenuDivider, MenuItem } from "@blueprintjs/core";
import { Box, Flex } from "components";
import Layout from "components/manager/Layout";
import { TemplatesHeader } from "components/manager/Templates/Header";
import { TemplateList } from "components/manager/Templates/List";
import Link from "next/link";

export default function Templates() {
  return (
    <Layout>
      <Flex flexGrow={1} flexDirection="column">
        <TemplatesHeader />
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
              <TemplateList />
            </Card>
          </Box>
        </Box>
      </Flex>
    </Layout>
  );
}

export const getServerSideProps = withPageAuthRequired();
