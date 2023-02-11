import { Box, Card, Flex } from "@mantine/core";
import Layout from "../Layout";
import { TemplatesHeader } from "./Header";
import { TemplateList } from "./List";
import { ListContextProvider } from "components/List/core";
import { useCallback } from "react";
import client from "components/client";

export const TemplatePage = () => {
  const fetch = useCallback(async ({ filter, pagination }) => {
    try {
      const res = await client.getTemplates({
        populate: 1,
        fields: {
          name: 1,
          category: 1,
        },
      });
      return {
        data: res,
      };
    } catch (err) {
      console.error(err);
      return {};
    }
  }, []);

  return (
    <ListContextProvider resource="templates" queryFn={fetch} limit={25}>
      <Layout>
        <Flex w={"100%"} direction={"column"} bg={"gray.1"}>
          <TemplatesHeader />
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
                <TemplateList />
              </Card>
            </Box>
          </Box>
        </Flex>
      </Layout>
    </ListContextProvider>
  );
};
