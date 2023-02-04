import {
  Button,
  Classes,
  Icon,
  Menu,
  MenuDivider,
  MenuItem,
  Position,
  Text,
} from "@blueprintjs/core";
import { Popover2, Tooltip2 } from "@blueprintjs/popover2";
import { Box, Flex } from "../Grid";
import { toaster } from "../toaster";
import { useRouter } from "next/router";
import Link from "next/link";

export const Sidebar = (props) => {
  const { list } = props;
  const router = useRouter();

  return (
    <Flex
      sx={{
        // position: "absolute",
        // top: 0,
        // bottom: 0,
        // left: 0,
        backgroundColor: "white",
        flexDirection: "column",
        justifyContent: "center",
        borderRight: "1px solid white",
        borderRightColor: "gray.3",
      }}
    >
      <Box
        className={`${Classes.MENU}`}
        sx={{
          maxWidth: "40px",
        }}
      >
        {list.map(({ icon, text, path }) => (
          <li key={path}>
            <Link href={path} passHref>
              <div
                className={`${Classes.MENU_ITEM} ${
                  router.pathname === path ? Classes.ACTIVE : ""
                }`}
              >
                <Tooltip2 content={text}>
                  <Icon className={`${Classes.MENU_ITEM_ICON}`} icon={icon} />
                </Tooltip2>
                <Text className={`${Classes.FILL}`} ellipsize={true}>
                  {text}
                </Text>
              </div>
            </Link>
          </li>
        ))}
        <MenuDivider />
        <Popover2
          position={Position.RIGHT}
          content={
            <Menu>
              <MenuDivider title="Are you sure?" />
              <MenuItem
                text={"Sure"}
                intent="danger"
                icon="log-out"
                onClick={() => {
                  toaster.show({
                    intent: "success",
                    message: "Successfully Logout",
                  });
                  router.push("/login");
                }}
              />
              <MenuItem text={"Cancel"} icon="blank" />
            </Menu>
          }
          renderTarget={({ isOpen, ref, ...popoverProps }) => (
            <Button
              {...popoverProps}
              elementRef={ref}
              minimal={true}
              active={isOpen}
              icon="log-out"
              title="Logout"
              intent="danger"
            />
          )}
        />
      </Box>
    </Flex>
  );
};
