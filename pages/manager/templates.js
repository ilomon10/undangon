import { Card, Menu, MenuDivider, MenuItem } from "@blueprintjs/core";
import { Box } from "components";
import Layout from "components/manager/Layout";
import Link from "next/link";

export default function Templates() {
  return (
    <Layout>
      <Box sx={{
        flexGrow: 1,
        py: 4
      }}>
        <Box sx={{
          maxWidth: 512,
          margin: "0 auto"
        }}>
          <Card>
            <Menu>
              <MenuDivider title="Templates" />
              <Link href="template/editor/1" passHref>
                <MenuItem text="Coba" label="Lagi" />
              </Link>
            </Menu>
          </Card>
        </Box>
      </Box>
    </Layout>
  )
}