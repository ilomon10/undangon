import { Flex } from "../Grid";
import { Sidebar } from "./Sidebar";
import { BlueprintWrapper } from "../BlueprintWrapper";

const navList = [{
  text: "Dashboard",
  icon: "home",
  path: "/manager"
}, {
  text: "Invitations",
  icon: "projects",
  path: "/manager/invitations"
}, {
  text: "Templates",
  icon: "projects",
  path: "/manager/templates"
}]

const Layout = ({ children }) => {
  return (
    <BlueprintWrapper>
      <Flex sx={{
        position: "fixed",
        inset: 0,
        bg: "gray.2"
      }}>
        <Sidebar list={navList} />
        {children}
      </Flex>
    </BlueprintWrapper>
  )
}

export default Layout;