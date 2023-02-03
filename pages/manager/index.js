import Link from "next/link"
import axios from "axios";
import { Box, Flex } from "components";
import { CONSTANTS } from "components/Constants";
import Layout from "components/manager/Layout";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

const Manager = ({ posts }) => {
  return (
    <Layout>
      <Box>
        Manager
      </Box>
    </Layout>
  )
}

export const getServerSideProps = withPageAuthRequired();

export default Manager;