import { Box, Card, Flex } from "@mantine/core";
import Layout from "../Layout";
import { CanvaLinksHeader } from "./Header";
import { CanvaLinkList } from "./List";
import { ListContextProvider } from "components/List/core";
import { useCallback } from "react";
import client from "components/client";

export const CanvaLinksPage = () => {
  const fetch = useCallback(async ({ filter, pagination }) => {
    try {
      const res = await client.getCanvaLinks();
      return {
        data: res,
      };
    } catch (err) {
      console.error(err);
      return {};
    }
  }, []);

  return (
    <ListContextProvider resource="canva_links" queryFn={fetch} limit={25}>
      <Layout>
        <Flex w={"100%"} direction={"column"} bg={"gray.1"}>
          <CanvaLinksHeader />
          <Box>
            <Box
              pt={24}
              pb={36}
              sx={{
                maxWidth: 650,
                margin: "0 auto",
              }}
            >
              <Card withBorder>
                <CanvaLinkList />
              </Card>
            </Box>
          </Box>
        </Flex>
      </Layout>
    </ListContextProvider>
  );
};
