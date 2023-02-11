import { Flex } from "@mantine/core";
import { Sidebar } from "./Sidebar";
import { MdAttachment, MdBook, MdDashboard, MdEmail } from "react-icons/md";

const navList = [
  {
    text: "Dashboard",
    icon: <MdDashboard />,
    path: "/manager",
  },
  {
    text: "Invitations",
    icon: <MdEmail />,
    path: "/manager/invitations",
  },
  {
    text: "Templates",
    icon: <MdBook />,
    path: "/manager/templates",
  },
  {
    text: "Canva Links",
    icon: <MdAttachment />,
    path: "/manager/canva_links",
  },
];

const Layout = ({ children }) => {
  return (
    <Flex
      sx={{
        backgroundColor: "gray.2",
      }}
      pl={44}
    >
      <Sidebar list={navList} />
      {children}
    </Flex>
  );
};

export default Layout;
