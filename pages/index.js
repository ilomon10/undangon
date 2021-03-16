import Head from 'next/head'
import { Box, Flex } from "../components/Grid";

export default function Home() {
  return (
    <Box>
      <Head>
        <title>Ba Undang</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box as="main">
        <Box as="h1">Index</Box>
      </Box>

      <Box as="footer">
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" />
        </a>
      </Box>
    </Box>
  )
}
