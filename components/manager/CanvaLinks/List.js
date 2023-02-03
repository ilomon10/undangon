import { Box, Flex } from "components/Grid";
import client from "components/client";
import { useQuery } from "@tanstack/react-query";
import {
  AnchorButton,
  Button,
  Card,
  Dialog,
  Menu,
  MenuDivider,
  MenuItem,
} from "@blueprintjs/core";
import Link from "next/link";
import { CanvaLinksDialog } from "./Dialog";
import { State } from "components/State";
import { toaster } from "components/toaster";

export const CanvaLinkList = () => {
  const { data, isLoading, isError, isSuccess, refetch } = useQuery(
    ["canva_links"],
    async () => {
      let res = [];
      try {
        res = await client.getCanvaLinks();
      } catch (err) {
        console.error(err);
      }
      return res;
    }
  );
  if (isError) return <Box>Went Wrong</Box>;
  if (isLoading) return <Button loading />;
  if (!data) return null;

  return (
    <Box>
      {data.map(({ _id, name, link }) => (
        <Flex
          key={_id}
          py={2}
          sx={{
            borderBottom: "1px solid black",
            borderBottomColor: "gray.3",
            alignItems: "center",
          }}
        >
          <Box flexGrow={1}>
            <a href={link} target="_blank">
              {name}
            </a>
          </Box>
          <Box pl={2}>
            <State defaultValue={false}>
              {({ state, setState }) => (
                <>
                  <Button
                    small
                    title="Edit"
                    icon="edit"
                    minimal
                    onClick={() => {
                      setState(true);
                    }}
                  />
                  <Dialog isOpen={state} onClose={() => setState(false)}>
                    <CanvaLinksDialog
                      defaultValue={{ _id, name, link }}
                      onErrorSubmitted={() => {
                        toaster.show({
                          intent: "danger",
                          message: "Error Submitted.",
                        });
                        setState(false);
                      }}
                      onSubmitted={() => {
                        toaster.show({
                          intent: "success",
                          message: "Canva link saved.",
                        });
                        refetch();
                        setState(false);
                      }}
                      onClose={() => {
                        setState(false);
                      }}
                    />
                  </Dialog>
                </>
              )}
            </State>
          </Box>
        </Flex>
      ))}
    </Box>
  );
};
