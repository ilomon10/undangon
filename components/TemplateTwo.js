import Head from "next/head"
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import moment from "moment"
import { ThemeProvider } from "styled-components"
import { IoCalendarOutline, IoTimeOutline } from "react-icons/io5";
import { Fade, Flip } from "react-reveal";
import { AspectRatio, Button, Box, Client, Counter, Divider, Flex, Input, } from "./";
import { GoogleCalendarLink, MapboxImageLink } from "./helper"
import { vanilla as vanillaClient } from "./client"
import theme from "./theme"

const extTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    "accent": theme.colors["orange"][5]
  },
  fonts: {
    serif: "Roboto Slab",
    script: "Dancing Script"
  },
}


const TemplateTwo = ({
  post: { id },
  groom,
  bride,
  reception,
  contract,
  gallery,
  music
}) => {
  const receptionDateFunc = moment(reception.date);
  const contractDateFunc = moment(contract.date);

  const [comments, setComments] = useState([]);

  const { register, handleSubmit, setError, errors, formState: { isSubmitting } } = useForm();

  const onComment = async (data) => {
    const body = {
      "post": id,
      "author_name": data.name,
      "author_email": data.email,
      "content": data.content
    }
    try {
      const data = await vanillaClient.comments({
        method: "POST",
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
      setError("form", {
        type: err.response.data.status,
        message: err.response.message
      });
    }
  }

  useEffect(() => {
    const fetch = async () => {
      try {
        let resComments = await Client.comments({
          params: {
            "_fields": "id,author_name,date,content",
            "post": id
          }
        });
        setComments(resComments.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetch();
  }, []);

  return (
    <ThemeProvider theme={extTheme}>
      <Box sx={{ fontFamily: "serif" }}>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;700&family=Roboto+Slab:wght@300;400;500;600&display=swap" rel="stylesheet" />
        </Head>

        {/* Jumbotron */}
        <Flex as="section"
          sx={{
            height: "100vh",
            position: "relative"
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              "&:after": {
                content: "\"\"",
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                bg: "accent",
                opacity: 0.50,
              }
            }}
          >
            <Box
              as="img"
              src="https://via.placeholder.com/850x800"
              sx={{
                objectFit: "cover",
                height: "100%",
                width: "100%",
                opacity: 0.15,
              }}
            />
          </Box>
          <Flex
            sx={{
              width: "100%",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: "center",
              position: "relative"
            }}
          >
            <Box fontSize={2} mb={3} fontWeight="500">Kami mengundang Anda untuk datang di pernikahan kami</Box>
            <Box
              sx={{
                mb: 3,
                fontFamily: "script",
                color: "white",
                textShadow: "1px 1px 0 black",
                fontSize: 8,
              }}
            >{bride.nickname} & {groom.nickname}</Box>
            <Box fontSize={5} mb={4} fontWeight="lighter">{contractDateFunc.format("dddd, DD MMMM YYYY")}</Box>
            <Box>
              <Button
                as="a"
                target="_blank"
                href={GoogleCalendarLink({
                  text: `Pernikahan: ${"Moriane"} dan ${"Irwan"}`,
                  details: `Acara pernikahan\n\n${"Irwan Setiawan Sitaba, S.T."}\nputra dari ${"Bapak Ronny Sitaba & Ibu Indayani Amien"}\n${"Moriane Elisabeth Worotitjan, S.H."}\nputri dari ${"Bapak Max P. Worotitjan & Ibu Martje C. Langitan"}`,
                  dates: {
                    start: contractDateFunc.toISOString(),
                    end: contractDateFunc.add(2, "hours").toISOString()
                  },
                  location: "Pondok Daun Restaurant"
                })}
                text="Save the Date"
              />
            </Box>
          </Flex>
        </Flex>

        {/* Mempelai */}
        <Box as="section"
          sx={{ mt: 6, mx: "auto", px: 3, maxWidth: 710, textAlign: "center" }}
        >
          <Fade bottom>
            <Box textAlign="center">
              <Box fontFamily="script" fontSize={4} color="accent">Tentang Kami</Box>
              <Box fontSize={5}>Pasangan Mempelai</Box>
            </Box>
          </Fade>
          <Flex mt={5} mx={-2}>
            {[bride, groom].map((v, i) => (
              <Box key={i} width="50%">
                <Fade {...(i < 1 ? { left: true } : { right: true })}>
                  <Box sx={{ px: 2, textAlign: "center" }}>
                    <Box sx={{
                      mx: "auto",
                      height: 125,
                      width: 125,
                      borderRadius: 100,
                      overflow: "hidden"
                    }}>
                      <img height="100%" width="100%" src={v.image} />
                    </Box>
                    <Box fontSize={4} fontFamily="script" mt={4} color="accent">{v.full_name}</Box>
                    <Box mt={3} fontWeight="bold">{i > 1 ? "Putra" : "Putri"} dari</Box>
                    <Box mt={2}>
                      <Box>{v.father}</Box>
                      <Box>{" dan "}</Box>
                      <Box>{v.mother}</Box>
                    </Box>
                  </Box>
                </Fade>
              </Box>
            ))}
          </Flex>
        </Box>

        {/* Galery */}
        <Box as="section"
          sx={{ mt: 6, mx: "auto", px: 3, maxWidth: 710, textAlign: "center" }}
        >
          <Fade bottom>
            <Box fontFamily="script" fontSize={4} color="accent">Wedding</Box>
            <Box fontSize={5}>Gallery</Box>
          </Fade>
          <Flex mt={5} mx={-2} flexWrap="wrap" justifyContent="center">
            {gallery.map((url, i) => (
              <Box key={i} width={`${100 / 3}%`} px={2} pb={3}>
                <Flip bottom>
                  <AspectRatio ratio="1:1">
                    <Box as="img"
                      height="100%"
                      width="100%"
                      sx={{ objectFit: "cover" }}
                      src={url}
                    />
                  </AspectRatio>
                </Flip>
              </Box>
            ))}
          </Flex>
        </Box>

        {/* Ayat */}
        <Box as="section" sx={{ position: "relative", py: 5, mt: 5 }}>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              backgroundImage: `url(https://via.placeholder.com/850x800)`,
              backgroundAttachment: "fixed",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          />
          <Box sx={{ maxWidth: 710, mx: "auto" }}>
            <Flex sx={{ mx: -3, px: 3, textAlign: "center" }}>
              {[1, 2].map((_, i) => (
                <Box key={i} px={3}>
                  <Fade {...(i < 1 ? { left: true } : { right: true })}>
                    <Box sx={{
                      p: 3,
                      borderWidth: 2,
                      borderStyle: "solid",
                      borderColor: "black",
                      position: "relative",
                    }}>
                      <Box sx={{
                        position: "absolute",
                        top: 0, right: 0, bottom: 0, left: 0,
                        opacity: 0.5,
                        backgroundColor: "white",
                      }} />
                      <Box sx={{ position: "relative" }}>
                        <Box fontSize={3} fontWeight="bold" fontFamily="script" >Dan firman-Nya: Sebab itu laki-laki akan meninggalkan ayah dan ibunya dan bersatu dengan isterinya, sehingga keduanya itu menjadi satu daging. Demikianlah mereka bukan lagi dua, melainkan satu. Karena itu, apa yang telah dipersatukan Allah, tidak boleh diceraikan manusia.</Box>
                        <Box mt={2} fontSize={2} fontWeight="bold">Matius 19:5-6</Box>
                      </Box>
                    </Box>
                  </Fade>
                </Box>
              ))}
            </Flex>
          </Box>
        </Box>

        {/* Countdown */}
        <Box as="section" mt={5} px={2}>
          <Fade bottom>
            <Box textAlign="center">
              <Box fontFamily="script" fontSize={4} color="accent">Acara Spesial</Box>
              <Box fontSize={5}>Pernikahan Kami</Box>
            </Box>
          </Fade>
          <Flex justifyContent="center" mt={4}>
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
          <Box textAlign="center" mt={4}>
            <Button
              as="a"
              target="_blank"
              href={GoogleCalendarLink({
                text: `Pernikahan: ${"Moriane"} dan ${"Irwan"}`,
                details: `Acara pernikahan\n\n${"Irwan Setiawan Sitaba, S.T."}\nputra dari ${"Bapak Ronny Sitaba & Ibu Indayani Amien"}\n${"Moriane Elisabeth Worotitjan, S.H."}\nputri dari ${"Bapak Max P. Worotitjan & Ibu Martje C. Langitan"}`,
                dates: {
                  start: contractDateFunc.toISOString(),
                  end: contractDateFunc.add(2, "hours").toISOString()
                },
                location: "Pondok Daun Restaurant"
              })}
              text="Remind Me"
            />
          </Box>
        </Box>

        {/* Location */}
        <Flex as="section"
          sx={{ mt: 2, mx: "auto", px: 3, maxWidth: 710, textAlign: "center" }}
        >
          <Box px={3} width="50%">
            <Fade left>
              <Box fontFamily="script" fontSize={5} color="accent">Pemberkatan</Box>
              <Flex mt={4} mx={-2}>
                <Box width="50%" px={2}>
                  <Box as={IoCalendarOutline} color="gray.5" fontSize={6} />
                  <Box>{contractDateFunc.format("dddd")}</Box>
                  <Box>{contractDateFunc.format("DD MMMM YYYY")}</Box>
                </Box>
                <Divider />
                <Box width="50%" px={2}>
                  <Box as={IoTimeOutline} color="gray.5" fontSize={6} />
                  <Box>{contractDateFunc.format("hh:mm A")} - Selesai</Box>
                </Box>
              </Flex>
              <Box mt={3}>
                <Box fontWeight="bold" color="gray.6">Lokasi</Box>
                <Box fontSize={3}>{contract.location}</Box>
                <Box
                  as="a"
                  target="_blank"
                  href={`https://www.google.com/maps/search/?api=1&query=${contract.pinpoint.latitude},${contract.pinpoint.longitude}`}
                  sx={{ mt: 3, display: "block" }}
                >
                  <AspectRatio ratio="1:1">
                    <Box as="img"
                      sx={{
                        height: "100%",
                        width: "100%",
                        objectFit: "cover"
                      }}
                      src={MapboxImageLink({
                        height: 307,
                        width: 307,
                        contract: contract.pinpoint
                      })}
                    />
                  </AspectRatio>
                </Box>
              </Box>
            </Fade>
          </Box>
          <Divider />
          <Box px={3} width="50%">
            <Fade right>
              <Box fontFamily="script" fontSize={5} color="accent">Resepsi Pernikahan</Box>
              <Flex mt={4}>
                <Box width="50%">
                  <Box as={IoCalendarOutline} color="gray.5" fontSize={6} />
                  <Box>{receptionDateFunc.format("ddd")}</Box>
                  <Box>{receptionDateFunc.format("DD MMMM YYYY")}</Box>
                </Box>
                <Divider />
                <Box width="50%">
                  <Box as={IoTimeOutline} color="gray.5" fontSize={6} />
                  <Box>{receptionDateFunc.format("hh:mm A")} - Selesai</Box>
                </Box>
              </Flex>
              <Box mt={3}>
                <Box fontWeight="bold" color="gray.6">Lokasi</Box>
                <Box fontSize={3}>{reception.location}</Box>
                <Box
                  as="a"
                  target="_blank"
                  href={`https://www.google.com/maps/search/?api=1&query=${reception.pinpoint.latitude},${reception.pinpoint.longitude}`}
                  sx={{ mt: 3, display: "block" }}
                >
                  <AspectRatio ratio="1:1">
                    <Box as="img"
                      sx={{
                        height: "100%",
                        width: "100%",
                        objectFit: "cover"
                      }}
                      src={MapboxImageLink({
                        height: 307,
                        width: 307,
                        reception: reception.pinpoint
                      })}
                    />
                  </AspectRatio>
                </Box>
              </Box>
            </Fade>
          </Box>
        </Flex>

        {/* Guest Book */}
        <Box as="section"
          sx={{ mt: 5, py: 5, bg: "black" }}
        >
          <Fade bottom>
            <Box textAlign="center" color="white">
              <Box fontFamily="script" fontSize={4} color="accent">Kirimkan Pesan</Box>
              <Box fontSize={5}>Untuk Kami Berdua</Box>
            </Box>
          </Fade>

          <Box sx={{ mt: 4, mx: "auto", px: 3, maxWidth: 710 }}>
            {comments.map((comment, i) => (
              <Box key={i} sx={{ position: "relative", mb: i < (comments.length - 1) ? 4 : 0, }}>
                <Fade bottom>
                  <Box
                    sx={{
                      borderWidth: 1,
                      bg: "white",
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
                    <Box
                      sx={{
                        fontSize: 4,
                        fontFamily: "script",
                        p: 2,
                        "& p": {
                          m: 0
                        }
                      }}
                    >
                      <div dangerouslySetInnerHTML={{ __html: comment.content.rendered }} />
                    </Box>
                  </Box>
                </Fade>
              </Box>
            ))}
          </Box>

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
              <div>
                <Button text="Kirim" type="submit" disabled={isSubmitting} />
              </div>
              {errors && errors.form &&
                <Box color="red.3" mt={2} fontSize={1}>
                  <div>Error:</div>
                  <div>{errors.form.message}</div>
                </Box>
              }
            </form>
          </Box>

        </Box>

        {/* Caution */}
        <Box as="section"
          sx={{ mt: 5, mx: "auto", px: 3, maxWidth: 710, textAlign: "center", lineHeight: 1.5 }}
        >
          <Box>Jangan ragu untuk datang, kami sudah berkordinasi dengan semua pihak terkait pencegahan penularan COVID-19. Acara kami akan mengikuti segala prosedur protokol kesehatan untuk mencegah penularan COVID-19. So, don't be panic, we look forward to seeing you there!</Box>
          <Flex
            sx={{
              flexWrap: "wrap",
              width: 520,
              mt: 3,
              mx: "auto",
              "> div": {
                width: "50%",
                px: 2,
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
            {[
              "Tamu undangan wajib menggunakan masker.",
              "Suhu tubuh normal dibawah 37.5deg",
              "Jaga jarak antar orang minimal sekitar 1 meter.",
              "Cuci tangan menggunakan air dan sabun atau menggunkan hand sanitizer",
            ].map((v, i) => (
              <div key={i}>
                <div>
                  <AspectRatio ratio="21:9">
                    <Box
                      sx={{
                        position: "absolute",
                        left: 2,
                        bottom: 2,
                        lineHeight: 1,
                        color: "yellow.3",
                        fontSize: 4,
                      }}
                    >{i}</Box>
                    <Flex
                      sx={{
                        position: "absolute",
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Box px={2}>
                        {v}
                      </Box>
                    </Flex>
                  </AspectRatio>
                </div>
              </div>
            ))}
          </Flex>
          <Box>Bagi para tamu undangan diharapkan mengikuti protokol pencegahan COVID-19</Box>
        </Box>

        {/* Footer */}
        <Box as="footer" my={5} textAlign="center" color="gray.4">
          <div>Made with ❤ by Ba Undang</div>
        </Box>

      </Box>
    </ThemeProvider >
  )
}

export default TemplateTwo;