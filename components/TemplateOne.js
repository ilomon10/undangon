import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect, useRef, useMemo } from "react";
import moment from "moment";
import axios from "axios";
import PropTypes from "prop-types";
import { ThemeProvider } from "styled-components";
import { useForm } from "react-hook-form";
import AudioPlayer from "react-audio-player";
import Zoom from "react-medium-image-zoom";
import ReCAPTCHA from "react-google-recaptcha";
import { Fade, Flip } from "react-reveal";

import {
  AspectRatio, Box, Input, Flex, Text, Counter,
} from "./";
import { AnchorButton, Button } from "@blueprintjs/core";
import theme, { getTheme } from "./theme";
import { getPercentage, getRatioFromDimension } from "./AspectRatio";
import { GRADIENT } from "./blurImage";

import "normalize.css/normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";

const extTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    "accent": "#ffab70",
    "text": theme.colors["black"],
    "background": theme.colors["white"],
    "lightText": theme.colors["gray"][4],
    "lighterText": theme.colors["gray"][6],
    modes: {
      "dark": {
        "lighterText": theme.colors["gray"][4],
        "lightText": theme.colors["gray"][6],
        "text": theme.colors["white"],
        "background": theme.colors["black"],
        "borderLine": theme.colors["gray"][8]
      }
    }
  },
  fonts: {
    serif: "Roboto Slab",
    script: "Dancing Script"
  },
}

const TemplateOne = (props) => {
  const {
    post: { id },
    groom,
    bride,
    reception,
    contract,
    gallery,
    music,
    featured_image,
    optional,
    mode
  } = props;

  const baseTheme = useMemo(() => {
    return getTheme(mode, extTheme);
  }, [mode]);

  const { query: searchParams } = useRouter();
  const [opened, setOpened] = useState(false);

  const receptionDateFunc = moment(reception.date);
  const contractDateFunc = moment(contract.date);
  const [comments, setComments] = useState([]);

  const recaptchaRef = useRef();
  const audioPlayerRef = useRef();

  const { register, handleSubmit, errors, reset } = useForm();

  const [loading, setLoading] = useState(false);

  const onComment = async (data) => {

    const body = {
      "post": id,
      "author_name": data.name,
      "author_email": data.email,
      "content": data.content
    }
    try {
      const { data } = await axios.request({
        method: "POST",
        url: `${window.location.origin}/api/guestBook`,
        data: body,
        params: {
          "_fields": "id,post,author_name,content,date"
        }
      });
      setComments(comments => [
        ...comments,
        {
          "id": data["id"],
          "author_name": data["author_name"],
          "content": data["content"],
          "date": data["date"]
        }
      ]);
    } catch (err) {
      console.log(err);
    }
    reset();
  }

  const executeRecaptcha = (event) => {
    setLoading(true);
    event.preventDefault();
    recaptchaRef.current.execute();
  }

  const onReCAPTCHAChange = async (captchaCode) => {
    if (captchaCode) {
      await handleSubmit(onComment)();
    }
    setLoading(false);
    recaptchaRef.current.reset();
  }

  const openInvitation = async (force = true) => {
    document.body.style.overflow = "";
    if (force) {
      const audioEl = audioPlayerRef.current.audioEl.current;
      audioEl.play();
    }
    setOpened(true);
  }

  const closeInvitation = async () => {
    document.body.style.overflow = "hidden";
    setOpened(false);
  }

  useEffect(() => {
    if (searchParams.untuk) {
      closeInvitation();
    } else {
      openInvitation(false);
    }
  }, [searchParams.untuk]);

  useEffect(() => {
    const fetch = async () => {
      try {
        let resComments = await axios.get(`${window.location.origin}/api/guestBook`, {
          params: {
            "_fields": "id,author_name,date,content",
            "post": id
          }
        });
        setComments(resComments.data);
      } catch (err) {
        // do nothing
      }
    }
    fetch();
  }, []);

  return (
    <ThemeProvider theme={baseTheme}>
      <Box sx={{
        fontFamily: "serif",
        backgroundColor: "background"
      }} overflowX="hidden">
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;700&family=Roboto+Slab:wght@300;400;500;600&display=swap" rel="stylesheet" />
        </Head>

        {(searchParams.untuk) &&
          <Box
            className={opened && "opened"}
            sx={{
              position: "fixed",
              zIndex: 999,
              inset: 0,
              opacity: "1",
              transitionDelay: "0ms",
              transition: "0ms ease-out",
              "&.opened": {
                opacity: "0",
                visibility: "hidden",
                transition: "500ms ease-out",
                transitionDelay: "2000ms",
              },
              "& > .image": {
                opacity: "1",
                transform: "translateX(0)",
                transition: "0ms ease-out",
                transitionDelay: "0ms",
              },
              "&.opened > .image": {
                opacity: "0",
                transform: "translateX(393px)",
                transition: "500ms ease-out",
                transitionDelay: "1500ms",
              },
              "& > .image .overlay": {
                opacity: "0.5",
                transition: "0ms ease-out",
                transitionDelay: "0ms",
              },
              "&.opened > .image .overlay": {
                opacity: "0",
                transition: "500ms ease-out 500ms",
                transitionDelay: "500ms",
              },
              "& > .text": {
                opacity: "1",
                transition: "0ms ease-out",
                transitionDelay: "0ms",
              },
              "&.opened > .text": {
                opacity: "0",
                transition: "500ms ease-out",
                transitionDelay: "0ms",
              }
            }}
          >
            <Box sx={{
              position: "absolute",
              inset: 0,
              background: "rgb(0,142,145)",
              background: "linear-gradient(35deg, rgba(0,142,145,1) 0%, rgba(255,171,112,1) 100%)",
              opacity: 0.95
            }} />
            <Box
              className="image"
              sx={{
                position: "absolute",
                inset: 0,
                p: 3,
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  borderRadius: 8,
                  overflow: "hidden",
                  maxWidth: 512,
                  maxHeight: 851,
                  height: "100%",
                  width: "100%",
                  boxShadow: "0px 0px 36px -16px grey",
                }}
              >
                <Box
                  className="overlay"
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background: "rgb(0,142,145)",
                    background: "linear-gradient(35deg, rgba(255,171,112,1) 0%, rgba(0,142,145,1) 100%)",
                    opacity: 0.50
                  }}
                />
                <Box
                  as="img"
                  src={featured_image["url"]}
                  sx={{
                    display: "block",
                    height: "100%",
                    width: "100%",
                    objectFit: "cover"
                  }}
                />
              </Box>
            </Box>
            <Flex
              className="text"
              sx={{
                position: "absolute",
                inset: 0,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column"
              }}
            >
              <Box sx={{
                py: 4,
                px: 2,
                color: "white",
                textAlign: "center",
                maxWidth: 512,
              }}>
                <Box sx={{ textShadow: "1px 1px 4px rgba(0,0,0,0.65)" }}>
                  <Box sx={{ fontSize: 2, fontWeight: "bold", mb: 2, mt: 4 }}>Dear Mr/Mrs/Ms</Box>
                  <Box sx={{ fontSize: 5, mb: 4 }}>{searchParams.untuk}</Box>
                  <Box sx={{ fontSize: 2, mb: 4 }}>You are invited to our wedding</Box>
                </Box>
                <Box
                  as="button"
                  onClick={() => {
                    if (opened) {
                      closeInvitation();
                    } else {
                      openInvitation();
                    }
                  }}
                  sx={{
                    border: "1px solid white",
                    borderColor: "gray.4",
                    borderRadius: 4,
                    px: 3,
                    py: 2,
                  }}
                >
                  Open Invitation
                </Box>
              </Box>
            </Flex>
          </Box>}

        <Flex as="section"
          sx={{
            height: "100vh",
            flexDirection: ["column", "row"]
          }}
        >
          <Box
            sx={{
              width: ["100%", "50%", "60%"],
              height: ["25%", "auto"],
              position: "relative",
              "img": {
                objectFit: "cover"
              }
            }}
          >
            <Box
              as="img"
              src={featured_image["url"]}
              sx={{
                display: "block",
                height: "100%",
                width: "100%",
                objectFit: "cover"
              }}
            />
          </Box>
          <Flex
            sx={{
              width: ["100%", "50%", "40%"],
              height: ["75%", "auto"],
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              px: 3,
            }}
          >
            <Fade bottom>
              <Box sx={{ fontSize: [5, 6], mb: 4, color: "lightText" }}>
                <Box display={["block", "inline-block"]}>SAVE</Box>
                <Box display={["block", "inline"]} fontFamily="script"> the </Box>
                <Box display={["block", "inline-block"]}>DATE</Box>
              </Box>
              <Box sx={{ fontSize: 5, mb: 4, fontWeight: 500, color: "text" }}>
                <span>{contractDateFunc.format("MMM")}</span>
                <Box
                  as="span"
                  sx={{
                    borderWidth: 2,
                    borderColor: "gray.3",
                    borderStyle: "solid",
                    borderTop: 0,
                    borderBottom: 0,
                    fontWeight: 400,
                    px: 3,
                    mx: 3,
                  }}
                >{receptionDateFunc.format("DD")}</Box>
                <span>{receptionDateFunc.get("year")}</span>
              </Box>
              <Box mb={4}>
                <Box sx={{ color: "accent", fontSize: 2 }}>For Wedding Of</Box>
                <Box
                  sx={{
                    fontSize: [5, 6],
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                    transform: `scale(0.95)`,
                    color: "text"
                  }}
                >
                  <Box display={["inline", "block"]}>{groom.nickname}</Box>
                  <Box
                    sx={{
                      display: ["inline", "block"],
                      textTransform: "lowercase",
                      fontFamily: "script"
                    }}
                  >{` & `}</Box>
                  <Box display={["inline", "block"]}>{bride.nickname}</Box>
                </Box>
              </Box>
              <Box color="lightText" fontSize={1}>
                <div>To be followed by food, laughter</div>
                <div>and a happily ever after.</div>
              </Box>
            </Fade>
          </Flex>
        </Flex>

        <Box as="section"
          className="page second-page"
          sx={{
            mt: 6,
            mx: "auto",
            px: 3,
            maxWidth: 710,
            textAlign: "center",
          }}
        >
          <Fade bottom>
            <Text as="div" color="accent" mb={3} fontFamily="script" fontSize={6} >We Found Love</Text>
            <Text as="p" color="text" mb={3} >{optional.verse_quote[0].content}</Text>
            <Text as="p" color="lightText" fontWeight="bold">{optional.verse_quote[0].verse}</Text>
          </Fade>
        </Box>

        <Flex as="section"
          sx={{
            // height: "75vh",
            mt: 6,
            mx: "auto",
            px: 3,
            maxWidth: 710,
            flexDirection: ["column", "row"],
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Flex
            sx={{
              mb: 0,
              width: ["auto", "50%"],
              flexDirection: ["row", "column"],
              alignItems: "center"
            }}
          >
            <Fade right>
              <Box
                sx={{
                  mx: [0, "auto"],
                  mb: [0, 4],
                  mr: [3, "auto"],
                  overflow: "hidden",
                  height: [115, 175],
                  width: [115, 175],
                  borderRadius: "100%",
                  position: "relative",
                  flexShrink: 0
                }}
              >
                <Box
                  as="img"
                  src={groom.image}
                  sx={{
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
              <Box sx={{ textAlign: ["left", "center"], mb: 3, fontSize: 1 }}>
                <Box as="div" sx={{ fontFamily: "script", fontSize: 6, mb: 1, color: "accent" }}>{groom.nickname}</Box>
                <Box as="div" sx={{ color: "lighterText", mb: [2, 4] }}>{groom.full_name}</Box>
                <Box sx={{ mb: 2, color: "lightText" }}>Putra dari:</Box>
                <Box color="lighterText">
                  <div>{groom.father}</div>
                  <div>{groom.mother}</div>
                </Box>
              </Box>
            </Fade>
          </Flex>
          <Flex
            sx={{
              mb: [4, 0],
              width: ["auto", "50%"],
              flexDirection: ["row-reverse", "column"],
              alignItems: "center",
            }}
          >
            <Fade left>
              <Box
                sx={{
                  mx: [0, "auto"],
                  mb: [0, 4],
                  ml: [3, "auto"],
                  overflow: "hidden",
                  height: [115, 175],
                  width: [115, 175],
                  borderRadius: "100%",
                  position: "relative",
                  flexShrink: 0
                }}
              >
                <Box
                  as="img"
                  src={bride.image}
                  sx={{
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
              <Box sx={{ textAlign: ["right", "center"], mb: 3, fontSize: 1 }}>
                <Box as="div" sx={{ fontFamily: "script", fontSize: 6, mb: 1, color: "accent" }}>{bride.nickname}</Box>
                <Box as="div" sx={{ color: "lighterText", mb: [2, 4] }}>{bride.full_name}</Box>
                <Box sx={{ mb: 2, color: "lightText" }}>Putri dari:</Box>
                <Box color="lighterText">
                  <div>{bride.father}</div>
                  <div>{bride.mother}</div>
                </Box>
              </Box>
            </Fade>
          </Flex>

        </Flex>

        <Counter target={contractDateFunc}>
          {({ diff }) => {
            const duration = moment.duration(diff);
            if (duration.milliseconds() < 0 || duration.seconds() < 0) { return null; }
            return (
              <Box as="section" mt={6} px={2}>
                <Box fontSize={2} color="lightText" textAlign="center">Countdown</Box>
                <Flex justifyContent="center">
                  <Flex
                    sx={{
                      "> div": {
                        textAlign: "center",
                        px: 2,
                        lineHeight: 1,
                        ".title": {
                          p: 2,
                          fontSize: [5, 6],
                          color: "text",
                        },
                        ".subtitle": {
                          fontSize: [1, 2],
                          color: "lighterText"
                        }
                      }
                    }}
                  >
                    <div>
                      <div className="title">{duration.days()}</div>
                      <div className="subtitle">Days</div>
                    </div>
                    <div>
                      <div className="title">{duration.hours()}</div>
                      <div className="subtitle">Hours</div>
                    </div>
                    <div>
                      <div className="title">{duration.minutes()}</div>
                      <div className="subtitle">Minutes</div>
                    </div>
                    <div>
                      <div className="title">{duration.seconds()}</div>
                      <div className="subtitle">Seconds</div>
                    </div>
                  </Flex>
                </Flex>
              </Box>
            )
          }}
        </Counter>

        <Box
          as="section"
          sx={{
            mt: [4, 5],
            mx: "auto",
            px: 3,
            maxWidth: 710,
            textAlign: "center",
            whiteSpace: ["normal", "nowrap"],
          }}
        >
          <Fade bottom>
            <Text as="div" sx={{ fontFamily: "script", fontSize: 6, mb: 3, color: "accent" }}>Pemberkatan Nikah</Text>
            <Flex
              sx={{
                justifyContent: "center",
                alignItems: "center",
                mb: 3,
                color: "lighterText",
                "> *": {
                  flexShrink: 0
                }
              }}
            >
              <Box width={["37.5%", "40%"]}>
                <Box
                  sx={{
                    borderBottomWidth: 2,
                    borderBottomColor: "borderLine",
                    borderBottomStyle: "solid",
                    pb: 2,
                    mb: 2
                  }}
                >{contractDateFunc.format("HH:mm")} WITA - Selesai</Box>
                <Box sx={{ fontFamily: "script", fontSize: [2, 4], fontWeight: "bold" }}>Pemberkatan Nikah</Box>
              </Box>
              <Box
                sx={{
                  width: ["25%", "20%"],
                  borderWidth: 2,
                  borderColor: "borderLine",
                  borderStyle: "solid",
                  borderBottom: 0,
                  borderTop: 0,
                  px: [1, 2],
                  // mx: [2, 4]
                }}
              >
                <Box sx={{ fontSize: 2 }}>{contractDateFunc.format("MMMM")}</Box>
                <Box sx={{ fontSize: [5, 6], lineHeight: 1 }}>{contractDateFunc.format("DD")}</Box>
                <Box sx={{ fontSize: 3 }}>{contractDateFunc.format("YYYY")}</Box>
              </Box>
              <Box width={["37.5%", "40%"]}>
                <Box
                  sx={{
                    borderBottomWidth: 2,
                    borderBottomColor: "borderLine",
                    borderBottomStyle: "solid",
                    pb: 2,
                    mb: 2
                  }}
                >{contract.location}</Box>
                <Box sx={{ fontFamily: "script", fontSize: [2, 4], fontWeight: "bold" }}>{contract.city}</Box>
              </Box>
            </Flex>
            <Text color="lightText">{contract.address}</Text>
            <Box mt={2}>
              <AnchorButton
                href={`https://www.google.com/maps/search/?api=1&query=${contract.pinpoint.latitude},${contract.pinpoint.longitude}`}
                outlined={true}
                intent="warning"
                text="See location on Google Maps"
              />
            </Box>
          </Fade>
        </Box>

        <Box
          as="section"
          sx={{
            mt: [4, 5],
            mx: "auto",
            px: 3,
            maxWidth: 710,
            textAlign: "center",
            whiteSpace: ["normal", "nowrap"],
          }}
        >
          <Fade bottom>
            <Text as="div" sx={{ fontFamily: "script", fontSize: 6, mb: 3, color: "accent" }}>Resepsi</Text>
            <Flex
              sx={{
                justifyContent: "center",
                alignItems: "center",
                mb: 3,
                color: "lighterText",
                "> *": {
                  flexShrink: 0
                }
              }}
            >
              <Box width={["37.5%", "40%"]}>
                <Box
                  sx={{
                    borderBottomWidth: 2,
                    borderBottomColor: "borderLine",
                    borderBottomStyle: "solid",
                    pb: 2,
                    mb: 2
                  }}
                >{receptionDateFunc.format("HH:mm")} WITA - Selesai</Box>
                <Box sx={{ fontFamily: "script", fontSize: [2, 4], fontWeight: "bold" }}>Resepsi</Box>
              </Box>
              <Box
                sx={{
                  width: ["25%", "20%"],
                  borderWidth: 2,
                  borderColor: "borderLine",
                  borderStyle: "solid",
                  borderBottom: 0,
                  borderTop: 0,
                  px: [1, 2],
                  // mx: [2, 4]
                }}
              >
                <Box sx={{ fontSize: 2 }}>{receptionDateFunc.format("MMMM")}</Box>
                <Box sx={{ fontSize: [5, 6], lineHeight: 1 }}>{receptionDateFunc.format("DD")}</Box>
                <Box sx={{ fontSize: 3 }}>{receptionDateFunc.format("YYYY")}</Box>
              </Box>
              <Box width={["37.5%", "40%"]}>
                <Box
                  sx={{
                    borderBottomWidth: 2,
                    borderBottomColor: "borderLine",
                    borderBottomStyle: "solid",
                    pb: 2,
                    mb: 2
                  }}
                >{reception.location}</Box>
                <Box sx={{ fontFamily: "script", fontSize: [2, 4], fontWeight: "bold" }}>{reception.city}</Box>
              </Box>
            </Flex>
            <Text color="gray.5">{reception.address}</Text>
            <Box mt={2}>
              <AnchorButton
                href={`https://www.google.com/maps/search/?api=1&query=${reception.pinpoint.latitude},${reception.pinpoint.longitude}`}
                outlined={true}
                intent="warning"
                text="See location on Google Maps"
              />
            </Box>
          </Fade>
        </Box>

        {/* Maps */}
        <Box
          sx={{
            mt: 5,
            height: "50vh",
            position: "relative",
            "img": {
              objectFit: "cover"
            }
          }}
        >
          <Box
            as="img"
            src={`https://api.mapbox.com/styles/v1/mapbox/light-v10/static/pin-s-heart+ff0000(${contract.pinpoint.longitude},${contract.pinpoint.latitude}),pin-s-restaurant+00eeff(${reception.pinpoint.longitude},${reception.pinpoint.latitude})/auto/${1024}x${300}@2x?access_token=pk.eyJ1IjoiaWxvbW9uMTAiLCJhIjoiY2piZjh1cHVwMTRnbjJ3bzI1MWwwN2g3ZCJ9.txWBAfB2D7-vueg7G9FORA&attribution=false&logo=false&padding=100`}
            sx={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
            }}
          />
        </Box>

        {/* Wedding Gallery */}
        <Box as="section" sx={{ mt: 5, mx: "auto", px: 3, maxWidth: 710, textAlign: "center" }}>
          <Text sx={{ display: "block", fontFamily: "script", fontSize: 6, mb: 4, color: "lighterText" }}>
            <div>Wedding</div>
            <div>Gallery</div>
          </Text>
          <Flex flexWrap="wrap" mx={-2}>
            {gallery.map(({ url, alt, id, height, width }) => {
              let ratio;
              let perc = { h: 100, w: 100 };
              if (width > height) {
                ratio = getRatioFromDimension(height, width);
                perc.w = getPercentage(width - height, height);
                perc.w = perc.w + 100;
              } else {
                ratio = getRatioFromDimension(height, width);
                perc.h = getPercentage(width - height, height);
                perc.h = perc.h + 100;
              }
              return (
                <Box key={id} width={[`${100 / 2}%`, `${100 / 3}%`]} sx={{ px: 2, pb: 3 }}>
                  <Flip bottom fraction={0.5}>
                    <Box
                      as={AspectRatio}
                      ratio="1:1"
                      sx={{
                        borderRadius: 8,
                        overflow: "hidden",
                        ".img": {
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%,-50%)"
                        }
                      }}
                    >
                      <Box
                        className="img"
                        as={AspectRatio}
                        portrait={!ratio.isPortrait}
                        ratio={ratio.isPortrait ? `${width}:${height}` : `${height}:${width}`}
                      >
                        <Zoom wrapStyle={{ height: `100%`, width: `100%` }}>
                          <div
                            style={{
                              display: "flex",
                              height: "100%",
                              width: "100%",
                              justifyContent: "center",
                              alignItems: "center"
                            }}
                          >
                            <Image
                              alt={alt}
                              placeholder="blur"
                              blurDataURL={GRADIENT}
                              height={height}
                              width={width}
                              src={url}
                            />
                          </div>
                        </Zoom>
                      </Box>
                    </Box>
                  </Flip>
                </Box>
              )
            })}
          </Flex>
        </Box>

        {/* Guest Book */}
        <Box as="section"
          sx={{
            mt: 5,
            mx: "auto",
            px: 4,
            maxWidth: 710,
          }}
        >
          <Flex sx={{ flexDirection: "column" }}>
            <Box
              sx={{
                textAlign: "center",
                display: "block",
                fontFamily: "script",
                fontSize: 6,
                flexShrink: 0,
                mb: 4,
                color: "lighterText"
              }}
            >
              <span>Guest Book</span>
            </Box>
            <Box flexGrow={1} flexShrink={1}>
              {comments.map((comment, i) => (
                <Box key={i} sx={{ position: "relative", mb: i < (comments.length - 1) ? 4 : 0, }}>
                  <Fade bottom>
                    <Box
                      sx={{
                        borderWidth: 1,
                        borderStyle: "solid",
                        borderColor: "borderLine"
                      }}
                    >
                      <Box sx={{
                        bg: "borderLine",
                        p: 2,
                        fontSize: 2,
                        color: "text",
                        borderBottomWidth: 1,
                        borderBottomStyle: "solid",
                        borderBottomColor: "borderLine"
                      }}>
                        <Box as="span" display={["block", "inline"]}>{comment["author_name"]}</Box>
                        <Box as="span" display={["block", "inline"]} color="lighterText"> - {moment(comment["date"]).calendar()}</Box>
                      </Box>
                      <Box fontSize={4} fontFamily="script" p={2} color="text">
                        <div dangerouslySetInnerHTML={{ __html: comment.content.rendered }} />
                      </Box>
                    </Box>
                  </Fade>
                </Box>
              ))}
            </Box>
          </Flex>
          <Box sx={{ flexShrink: 1, maxWidth: [350], width: "100%", mx: "auto", pt: 4 }}>
            <form onSubmit={executeRecaptcha}>
              <Flex mb={2} mx={-2}>
                <Box px={2} width="50%">
                  <Input
                    name="name"
                    ref={register({ required: true })}
                    fill
                    placeholder="Name (required)"
                  />
                </Box>
                <Box px={2} width="50%">
                  <Input
                    name="email"
                    ref={register({ required: true })}
                    fill
                    placeholder="Email (required)"
                  />
                </Box>
              </Flex>
              <Box mb={2}>
                <Input
                  name="content"
                  ref={register({ required: true })}
                  textarea
                  fill
                  placeholder="Some word"
                  sx={{ resize: "vertical" }}
                />
              </Box>
              <Flex mt={2}>
                <Box>
                  <Button
                    text={"Send"}
                    type="submit"
                    loading={loading}
                  />
                </Box>
                <Box sx={{
                  height: 30,
                  width: "100%",
                  ".grecaptcha-badge": {
                    mx: "auto"
                  },
                  "> div": {
                    mt: -3,
                    transform: "scale(0.5)",
                  },
                }}>
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    size="invisible"
                    badge="inline"
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                    onChange={onReCAPTCHAChange}
                  />
                </Box>
              </Flex>
            </form>
          </Box>
        </Box>

        {/* Caution */}
        <Box
          as="section"
          sx={{
            mt: 5,
            mx: "auto",
            px: 3,
            maxWidth: 710,
            textAlign: "center",
            lineHeight: 1.5,
            color: "lightText"
          }}
        >
          <Box textAlign={["justify", "center"]}>Jangan ragu untuk datang, kami sudah berkordinasi dengan semua pihak terkait pencegahan penularan COVID-19. Acara kami akan mengikuti segala prosedur protokol kesehatan untuk mencegah penularan COVID-19. So, don't be panic, we look forward to seeing you there!</Box>
          <Flex
            sx={{
              flexWrap: "wrap",
              flexDirection: ["column", "row"],
              maxWidth: 520,
              mt: 3,
              mx: "auto",
              "> div": {
                width: ["100%", "50%"],
                px: [3, 2],
                pb: 3,
                "> div": {
                  borderRadius: 4,
                  borderWidth: 2,
                  borderStyle: "solid",
                  borderColor: "yellow.5",
                }
              }
            }}
          >
            {[{
              desc: "Tamu undangan wajib menggunakan masker.",
              imgUrl: "/safety_protocol-wear_mask.jpg",
            }, {
              desc: "Suhu tubuh normal dibawah 37.5deg",
              imgUrl: "/safety_protocol-check_temp.jpeg",
            }, {
              desc: "Jaga jarak antar orang minimal sekitar 1 meter.",
              imgUrl: "/safety_protocol-social_distancing.jpg",
            }, {
              desc: "Cuci tangan menggunakan air dan sabun atau menggunkan hand sanitizer",
              imgUrl: "/safety_protocol-wash_hand.jpg",
            },
            ].map((v, i) => (
              <div key={i}>
                <div>
                  <AspectRatio ratio="21:9">
                    <Box
                      sx={{
                        backgroundImage: `url(${v["imgUrl"]})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        left: "-2px",
                        bottom: "-2px",
                        lineHeight: 1,
                        color: "yellow.6",
                        fontSize: 4,
                        height: 30,
                        width: 30,
                        backgroundColor: "background",
                        borderRadius: 4,
                        border: "2px solid white",
                        borderColor: "yellow.6",
                      }}
                    >{i + 1}</Box>
                    <Flex
                      sx={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        px={2}
                        sx={{
                          color: "yellow.5",
                          fontWeight: "bold",
                          textShadow: "1px 1px 2px rgb(0,0,0)"
                        }}
                      >
                        {v["desc"]}
                      </Box>
                    </Flex>
                  </AspectRatio>
                </div>
              </div>
            ))}
          </Flex>
          <Box>Bagi para tamu undangan diharapkan mengikuti protokol pencegahan COVID-19</Box>
        </Box>

        {
          music &&
          <Box textAlign="center" pt={4}>
            <AudioPlayer
              ref={audioPlayerRef}
              src={music}
              controls
            />
          </Box>
        }

        <Box as="footer" my={5} textAlign="center" color="lightText">
          <div>Made with ❤ by Ba Undang.</div>
        </Box>
      </Box>
    </ThemeProvider >
  );
}

TemplateOne.propTypes = {
  groom: PropTypes.shape({
    full_name: PropTypes.string,
    nickname: PropTypes.string,
    father: PropTypes.string,
    mother: PropTypes.string,
    image: PropTypes.string,
  }),
  bride: PropTypes.shape({
    full_name: PropTypes.string,
    nickname: PropTypes.string,
    father: PropTypes.string,
    mother: PropTypes.string,
    image: PropTypes.string,
  }),
  alsoInvite: PropTypes.arrayOf(PropTypes.string),
  reception: PropTypes.shape({
    date: PropTypes.string,
    location: PropTypes.string,
    image: PropTypes.string,
    pinpoint: PropTypes.shape({
      lat: PropTypes.number,
      long: PropTypes.number
    })
  }),
  contract: PropTypes.shape({
    date: PropTypes.string,
    location: PropTypes.string,
    image: PropTypes.string,
    pinpoint: PropTypes.shape({
      lat: PropTypes.number,
      long: PropTypes.number
    })
  }),
}

TemplateOne.defaultProps = {
  bride: {
    nickname: "noni",
    full_name: "noni",
    father: "mr. fathernya noni",
    mother: "mr. mothernya noni",
    image: ""
  },
  groom: {
    nickname: "nyong",
    full_name: "nyong",
    father: "mr. fathernya nyong",
    mother: "mr. mothernya nyong",
    image: ""
  },
  alsoInvite: [],
  reception: {
    date: moment().toISOString(),
    location: "here",
    image: ""
  },
  contract: {
    date: moment().toISOString(),
    location: "here",
    image: ""
  },
}
export default TemplateOne;