import { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import { useForm } from "react-hook-form";
import AudioPlayer from "react-audio-player";

import {
  AspectRatio, Box, Button, Input, Flex, State, Text, Counter,
} from "./";
import Client from "./client";
import theme from "./theme";

const extTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    "accent": "#ffab70"
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
    music
  } = props;

  const receptionDateFunc = moment(reception.date);
  const contractDateFunc = moment(contract.date);
  const [comments, setComments] = useState([]);

  const { register, handleSubmit, errors, formState: { isSubmitting } } = useForm();

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
  }

  useEffect(() => {
    const fetch = async () => {
      try {
        let resComments = await axios.get(`${window.location.origin}/api/guestBook`, {
          params: {
            "_fields": "id,author_name,date,content",
            "post": id
          }
        });

        console.log(resComments);
        setComments(resComments.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetch();
  }, []);

  return (
    <ThemeProvider theme={extTheme}>
      <Box sx={{ fontFamily: "serif" }} overflowX="hidden">
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;700&family=Roboto+Slab:wght@300;400;500;600&display=swap" rel="stylesheet" />
        </Head>

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
              src="https://via.placeholder.com/850x800"
              sx={{
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
            <Box sx={{ fontSize: [5, 6], mb: 4, color: "gray.6" }}>
              <Box display={["block", "inline-block"]}>SAVE</Box>
              <Box display={["block", "inline"]} fontFamily="script"> the </Box>
              <Box display={["block", "inline-block"]}>DATE</Box>
            </Box>
            <Box sx={{ fontSize: 5, mb: 4, fontWeight: 500 }}>
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
                  transform: `scale(0.95)`
                }}
              >
                <Box display={["inline", "block"]}>{bride.nickname}</Box>
                <Box
                  sx={{
                    display: ["inline", "block"],
                    textTransform: "lowercase",
                    fontFamily: "script"
                  }}
                >{` & `}</Box>
                <Box display={["inline", "block"]}>{groom.nickname}</Box>
              </Box>
            </Box>
            <Box color="gray.4" fontSize={1}>
              <div>To be followed by food, laughter</div>
              <div>and a happily ever after.</div>
            </Box>
          </Flex>
        </Flex>

        <Box as="section"
          className="page second-page"
          sx={{ mt: 6, mx: "auto", px: 3, maxWidth: 710, textAlign: "center" }}
        >
          <Text as="div" mb={3} fontFamily="script" fontSize={6} >We Found Love</Text>
          <Text as="p" mb={3} >And more than all, have love; the only way in which you may be completely joined together. And let the peace of Christ be ruling in your hearts, as it was the purpose of God for you to be one body; and give praise to God at all times</Text>
          <Text as="p" fontWeight="bold">Colossians 3:14-15</Text>
        </Box>

        <Flex as="section"
          sx={{
            mt: 6,
            mx: "auto",
            px: 3,
            maxWidth: 710,
            flexDirection: ["column", "row"],
            alignItems: "center",
          }}
        >
          <Flex
            sx={{
              mb: [4, 0],
              width: ["auto", "50%"],
              flexDirection: ["row", "column"],
              alignItems: "center",
            }}
          >
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
                src={bride.image}
                sx={{
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
            <Box sx={{ textAlign: ["left", "center"], mb: 3, fontSize: 1 }}>
              <Box as="div" sx={{ fontFamily: "script", fontSize: 6, mb: 1, color: "accent" }}>{bride.nickname}</Box>
              <Box as="div" sx={{ color: "gray.5", mb: [2, 4] }}>{bride.full_name}</Box>
              <Box sx={{ mb: 2 }}>Putri dari:</Box>
              <Box color="gray.5">
                <div>{bride.father}</div>
                <div>{bride.mother}</div>
              </Box>
            </Box>
          </Flex>
          <Flex
            sx={{
              mb: 0,
              width: ["auto", "50%"],
              flexDirection: ["row", "column"],
              alignItems: "center"
            }}
          >
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
              <Box as="div" sx={{ color: "gray.5", mb: [2, 4] }}>{groom.full_name}</Box>
              <Box sx={{ mb: 2 }}>Putra dari:</Box>
              <Box color="gray.5">
                <div>{groom.father}</div>
                <div>{groom.mother}</div>
              </Box>
            </Box>
          </Flex>
        </Flex>

        <Box as="section" mt={6} px={2}>
          <Box fontSize={2} color="gray.2" textAlign="center">Countdown</Box>
          <Flex justifyContent="center">
            <Counter
              target={contractDateFunc}
            >
              {({ diff }) => {
                const duration = moment.duration(diff);
                return (
                  <Flex
                    sx={{
                      "> div": {
                        textAlign: "center",
                        px: 2,
                        lineHeight: 1,
                        ".title": {
                          p: 2,
                          fontSize: [5, 6],
                        },
                        ".subtitle": {
                          fontSize: [1, 2],
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
                )
              }}
            </Counter>
          </Flex>
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
          <Text as="div" sx={{ fontFamily: "script", fontSize: 6, mb: 3, color: "accent" }}>Akad Nikah</Text>
          <Flex
            sx={{
              justifyContent: "center",
              alignItems: "center",
              mb: 3,
              "> *": {
                flexShrink: 0
              }
            }}
          >
            <Box width={["37.5%", "40%"]}>
              <Box
                sx={{
                  borderBottomWidth: 2,
                  borderBottomColor: "gray.3",
                  borderBottomStyle: "solid",
                  pb: 2,
                  mb: 2
                }}
              >{contractDateFunc.format("hh:mm")} WIB - Selesai</Box>
              <Box sx={{ fontFamily: "script", fontSize: [2, 4], fontWeight: "bold" }}>Akad Nikah</Box>
            </Box>
            <Box
              sx={{
                width: ["25%", "20%"],
                borderWidth: 2,
                borderColor: "black",
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
                  borderBottomColor: "gray.3",
                  borderBottomStyle: "solid",
                  pb: 2,
                  mb: 2
                }}
              >{contract.location}</Box>
              <Box sx={{ fontFamily: "script", fontSize: [2, 4], fontWeight: "bold" }}>Bandung</Box>
            </Box>
          </Flex>
          <Text color="gray.5">{contract.address}</Text>
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
          <Text as="div" sx={{ fontFamily: "script", fontSize: 6, mb: 3, color: "accent" }}>Resepsi</Text>
          <Flex
            sx={{
              justifyContent: "center",
              alignItems: "center",
              mb: 3,
              "> *": {
                flexShrink: 0
              }
            }}
          >
            <Box width={["37.5%", "40%"]}>
              <Box
                sx={{
                  borderBottomWidth: 2,
                  borderBottomColor: "gray.3",
                  borderBottomStyle: "solid",
                  pb: 2,
                  mb: 2
                }}
              >05:00 WIB - Selesai</Box>
              <Box sx={{ fontFamily: "script", fontSize: [2, 4], fontWeight: "bold" }}>Resepsi</Box>
            </Box>
            <Box
              sx={{
                width: ["25%", "20%"],
                borderWidth: 2,
                borderColor: "black",
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
                  borderBottomColor: "gray.3",
                  borderBottomStyle: "solid",
                  pb: 2,
                  mb: 2
                }}
              >{reception.location}</Box>
              <Box sx={{ fontFamily: "script", fontSize: [2, 4], fontWeight: "bold" }}>Bandung</Box>
            </Box>
          </Flex>
          <Text color="gray.5">{reception.address}</Text>
        </Box>

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

        <Box as="section" sx={{ mt: 5, mx: "auto", px: 3, maxWidth: 710, textAlign: "center" }}>
          <Text sx={{ display: "block", fontFamily: "script", fontSize: 6, mb: 4 }}>
            <div>Wedding</div>
            <div>Gallery</div>
          </Text>
          <Flex flexWrap="wrap" mx={-2}>
            {gallery.map((url, i) => (
              <Box key={i} width={[`${100 / 2}%`, `${100 / 3}%`]} sx={{ px: 2, pb: 3 }}>
                <Box as={AspectRatio} ratio="1:1" sx={{ borderRadius: 8, overflow: "hidden" }}>
                  <Box
                    as="img"
                    src={url}
                    sx={{
                      height: "100%",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              </Box>
            ))}
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
          <Flex sx={{ maxHeight: "85vh", flexDirection: "column" }}>
            <Box
              sx={{
                textAlign: "center",
                display: "block",
                fontFamily: "script",
                fontSize: 6,
                flexShrink: 0,
                mb: 4
              }}
            >
              <span>Guest Book</span>
            </Box>
            <Box flexGrow={1} flexShrink={1} overflowY="auto">
              {comments.map((comment, i) => (
                <Box key={i} sx={{ position: "relative", mb: i < (comments.length - 1) ? 4 : 0, }}>
                  <Box
                    sx={{
                      borderWidth: 1,
                      borderStyle: "solid",
                      borderColor: "gray.2"
                    }}
                  >
                    <Box sx={{
                      bg: "gray.1",
                      p: 2,
                      fontSize: 2,
                      // color: "gray.5",
                      borderBottomWidth: 1,
                      borderBottomStyle: "solid",
                      borderBottomColor: "gray.2"
                    }}>
                      <Box as="span" display={["block", "inline"]}>{comment["author_name"]}</Box>
                      <Box as="span" display={["block", "inline"]} color="gray.5"> - {moment(comment["date"]).calendar()}</Box>
                    </Box>
                    <Box fontSize={4} fontFamily="script" p={2}>
                      <div dangerouslySetInnerHTML={{ __html: comment.content.rendered }} />
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Flex>
          <Box sx={{ flexShrink: 1, maxWidth: [350], width: "100%", mx: "auto", pt: 4 }}>
            <form onSubmit={handleSubmit(onComment)}>
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
              <Box>
                <Button text="Send" type="submit" disabled={isSubmitting} />
              </Box>
            </form>
          </Box>
        </Box>

        {music &&
          <Box textAlign="center" pt={4}>
            <AudioPlayer
              src={music}
              autoPlay
              controls
            />
          </Box>
        }

        <Box as="footer" my={5} textAlign="center" color="gray.3">
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