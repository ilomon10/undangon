import { Box, Flex } from "components/Grid";
import client from "components/client";
import { useQuery } from "@tanstack/react-query";
import { Button, Card, Dialog, Menu, MenuDivider, MenuItem } from "@blueprintjs/core";
import Link from "next/link";
import { TemplatesEditDialog } from "./Edit.Dialog";
import { State } from "components/State";
import { toaster } from "components/toaster";

export const TemplateList = () => {
  const { data, isLoading, isError, refetch } = useQuery(["templates"], async () => {
    let res = [];
    try {
      res = await client.getTemplates({
        populate: 1,
        fields: {
          name: 1,
          category: 1,
        },
      });
    } catch (err) {
      console.error(err);
    }
    return res;
  });
  if (isError) return <Box>Went Wrong</Box>;
  if (isLoading) return <Button loading />;
  if (!data) return null;

  return (
    <Menu>
      {data.map(({ _id, name, category }) => (
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
            <Link href={`/manager/template/editor/${_id}`} passHref>
              <Box as="a">{name}</Box>
            </Link>
          </Box>
          <Box color={"gray.5"}>{category.name}</Box>
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
                    <TemplatesEditDialog
                      defaultValue={{ _id, name, category }}
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
                          message: "Invitation saved.",
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
    </Menu>
  );
};
