import {
  Button,
  Menu,
  Text,
  Tooltip,
  Popover,
  Flex,
  Box,
  Anchor,
  ActionIcon,
} from "@mantine/core";
import { useRouter } from "next/router";
import Link from "next/link";
import { showNotification } from "@mantine/notifications";
import { MdLogout } from "react-icons/md";

export const Sidebar = (props) => {
  const { list } = props;
  const router = useRouter();

  return (
    <Flex
      sx={({ colors }) => ({
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        zIndex: 10,
        borderRight: "1px solid white",
        borderRightColor: colors.gray[3],
      })}
      bg="white"
      direction="column"
      justify="center"
    >
      <Box>
        {list.map(({ icon, text, path }) => (
          <Tooltip key={path} label={text} position="right">
            <Link href={path} passHref>
              <ActionIcon component="a" color="gray" size="xl">
                {icon}
              </ActionIcon>
            </Link>
          </Tooltip>
        ))}
        <Menu position="right">
          <Menu.Target>
            <ActionIcon color="red" size="xl">
              <MdLogout />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>Are you sure?</Menu.Label>
            <Menu.Divider />
            <Menu.Item
              color="red"
              icon={<MdLogout />}
              onClick={() => {
                showNotification({
                  color: "teal",
                  message: "Successfully Logout",
                });
                router.push("/login");
              }}
            >
              Sure
            </Menu.Item>
            <Menu.Item>Cancel</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Box>
    </Flex>
  );
};
