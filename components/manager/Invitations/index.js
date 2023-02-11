import { Box, Card, Flex } from "@mantine/core";
import Layout from "../Layout";
import { InvitationsHeader } from "./Header";
import { InvitationList } from "./List";
import { ListContextProvider } from "components/List/core";
import { useCallback } from "react";
import client from "components/client";

export const InvitationPage = () => {
  const fetch = useCallback(async ({ filter, pagination }) => {
    try {
      const res = await client.getInvitations({
        fields: {
          content: 0,
        },
        populate: 1,
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
    <ListContextProvider resource="invitations" queryFn={fetch} limit={25}>
      <Layout>
        <Flex w={"100%"} direction={"column"} bg={"gray.1"}>
          <InvitationsHeader />
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
                <InvitationList />
              </Card>
            </Box>
          </Box>
        </Flex>
      </Layout>
    </ListContextProvider>
  );
};
