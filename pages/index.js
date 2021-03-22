import { AspectRatio, Button, State } from 'components';
import Head from 'next/head';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Flex } from "../components/Grid";
import { IoLocationOutline } from "react-icons/io5";
import { BackgroundScrolling } from 'components/BackgroundScrolling';

export default function Home() {
  return (
    <Box>
      <Head>
        <title>Ba Undang - Undangan Digital</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box as="header">
        <Flex
          sx={{
            px: 3,
            maxWidth: 1280,
            mx: "auto",
            height: 168,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Box>
            <Box as="img" height={36} src="/baundang.svg" />
          </Box>
        </Flex>
      </Box>

      <Box as="main" textAlign="center" overflow="hidden">
        <Box as="section">
          <Box as="h1">Pakai Undangan Online</Box>
          <Box as="h3" mt={2}>Tanpa Kertas. Tanpa Ribet.</Box>
          <Button
            as="a"
            target="_blank"
            href="https://wa.link/roosi6"
            text="Pesan Sekarang"
            sx={{
              bg: "black",
              display: "inline-block",
              border: 0,
              borderRadius: 4,
              color: "white",
              fontWeight: "bold",
              mt: 3,
              px: 2,
              py: 3,
            }}
          />
        </Box>
        <Box as="section" mt={4} pb={3}>
          <Box
            sx={{
              width: "100%",
              position: "relative",
              ".slick-slide > div": {
                opacity: 0.25,
                transition: "opacity 2000ms ease",
              },
              ".slick-slide.slick-current > div": {
                opacity: 1
              }
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                height: 390,
                width: 250,
                transform: "translate(-50%,-50%)",
                zIndex: 1,
                pointerEvents: "none",
                ":after": {
                  content: "\"\"",
                  mt: "-3px",
                  display: "block",
                  height: "100%",
                  width: "100%",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundImage: `url(/phone-frame.png)`,
                }
              }}
            />
            <State
              defaultValue={{
                currentIndex: 0
              }}
            >
              {({ state, setState, ref }) => (
                <Slider
                  ref={ref}
                  dots={false}
                  centerMode={true}
                  infinite={true}
                  variableWidth={true}
                  draggable={false}
                  speed={1000}
                  autoplay={false}
                  pauseOnHover={true}
                  focusOnSelect={true}
                  cssEase={"ease"}
                  beforeChange={(_, next) => {
                    setState(state => ({
                      ...state,
                      currentIndex: next
                    }))
                  }}
                >
                  {[
                    "/TemplateTwo-Capture.png",
                    "/TemplateOne-Capture.png",
                    "/TemplateTwo-Capture.png",
                    "/TemplateOne-Capture.png",
                    "/TemplateTwo-Capture.png",
                    "/TemplateOne-Capture.png",
                  ].map((v, i) => (
                    <Box key={i} px={3}>
                      <Box sx={{ width: 168, position: "relative" }} >
                        <AspectRatio ratio="6:13">
                          <BackgroundScrolling
                            imageUrl={v}
                            height="100%"
                            width="100%"
                            pause={state.currentIndex !== i}
                            onChange={(pos) => {
                              if (pos === 0) {
                                ref.current.slickGoTo(state.currentIndex < 5 ? state.currentIndex + 1 : 0);
                                // setState(state => ({ ...state, autoplaySlide: true }))
                              }
                            }}
                          />
                        </AspectRatio>
                      </Box>
                    </Box>
                  ))}
                </Slider>
              )}
            </State>
          </Box>
        </Box>
      </Box>

      <Box as="footer">
        <Box py={4} px={3} sx={{ maxWidth: 750, mx: "auto" }}>
          <Flex flexDirection={["column", "row"]} alignItems="center" opacity={0.5}>
            <Flex alignItems="center" pb={[2, 0]}>
              <IoLocationOutline />
              <Box ml={2}>With love, from Manado</Box>
            </Flex>
            <Box flexGrow={1} />
            <div>&#169; Ba Undang</div>
          </Flex>
        </Box>
      </Box>
    </Box >
  )
}
