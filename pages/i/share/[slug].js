import "normalize.css/normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import {
  Classes,
  Collapse,
  FormGroup,
  InputGroup,
  Text,
  TextArea,
} from "@blueprintjs/core";
import { Box, Button, Flex } from "components";
import { Formik } from "formik";
import Head from "next/head";
import { useRouter } from "next/router";
import { getInvitationBySlug } from "pages/api/getInvitation/by/[slug]";
import { getInvitations } from "pages/api/getInvitations";
import { APP_DOMAIN } from "components/Constants";
import _get from "lodash.get";
import { useCallback, useRef } from "react";
import { toaster } from "components/toaster";
import client from "components/client";

const htmlFormat = [
  { symbol: "*", open: "<b>", close: "</b>" },
  { symbol: "_", open: "<em>", close: "</em>" },
  { symbol: "~", open: "<del>", close: "</del>" },
];

const transformDescription = (raw, opt) => {
  let text = raw;
  let data = {
    to: "",
    url: "",
    ...opt,
  };

  for (let key in data) {
    text = text.replace(`{{${key}}}`, data[key]);
  }

  return { text, keys: Object.keys(data) };
};

const transformToPreview = (raw, opt) => {
  let text = raw;
  try {
    for (let { symbol, open, close } of htmlFormat) {
      if (!text) return text;

      const rx = `\\${symbol}([^\\${symbol}~]+)\\${symbol}`;
      const regex = new RegExp(rx, "g");
      const match = text.match(regex);

      if (!match) return text;

      match.forEach((m) => {
        let formatted = m;
        for (let i = 0; i < 2; i++) {
          formatted = formatted.replace(symbol, i > 0 ? close : open);
        }
        text = text.replace(m, formatted);
      });
    }
  } catch (err) {
    console.error(err);
  }
  return text;
};

const default_share_message = `Demikianlah mereka bukan lagi dua, melainkan satu. Karena itu, apa yang telah dipersatukan Allah, tidak boleh diceraikan manusia. (Matius 19:6)\nTanpa mengurangi rasa hormat, perkenankan kami menginformasikan kepada Bapak/Ibu/Saudara/i, teman sekaligus sahabat acara pernikahan kami:\n*Nama Mempelai & Nama Mempelai*\nMerupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i untuk memberikan doa restu kepada kami.\nJangan lupa isi Guestbook ya..\n\nTerima Kasih..\n\nWith pray & love,\n*Nama Panggilan & Nama Panggilan*\n#Manjo`;

const DariID = ({ _id, slug, meta, share_message = default_share_message }) => {
  const router = useRouter();

  const urlRaw = `https://${APP_DOMAIN}/i/${slug}`;

  let temp_share_message = useRef(
    typeof share_message === "string" ? share_message : default_share_message
  );

  const onUpdateMessage = useCallback(
    async (value) => {
      await client.postInvitation({
        _id,
        share_message: value,
      });
    },
    [slug]
  );

  return (
    <>
      <Head>
        <title>Share Undangan: {slug}</title>
      </Head>
      <Box
        sx={{
          maxWidth: 512,
          mx: "auto",
          py: 4,
          px: 3,
          textarea: {
            resize: "vertical",
          },
        }}
      >
        <Formik
          initialValues={{
            isVarOpen: false,
            to: "",
            url: urlRaw,
            description: temp_share_message.current,
          }}
          onSubmit={async (values, { setSubmitting, ...rest }, b) => {
            const { text, keys } = transformDescription(values["description"], {
              to: values["to"],
              url: values["url"],
            });
            try {
              if (values["description"] != temp_share_message.current) {
                await onUpdateMessage(values["description"]);
                toaster.show({
                  intent: "success",
                  message: "Message saved",
                });
                temp_share_message.current = values["description"];
              }
            } catch (err) {
              toaster.show({
                intent: "danger",
                message: "Error while saving the project",
              });
              console.error(err);
            }
            try {
              // router.push(
              //   {
              //     query: {
              //       ...router.query,
              //       text: values["description"],
              //     },
              //   },
              //   undefined,
              //   { shallow: true }
              // );
              await navigator.share({
                url: values["url"],
                title: `${meta.title}`,
                text,
              });
            } catch (err) {
              console.error(err);
            }
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            handleSubmit,
            handleChange,
            setFieldValue,
            isSubmitting,
          }) => {
            const { text: transformedMessage } = transformDescription(
              values["description"],
              {
                to: values["to"],
                url: values["url"],
              }
            );
            return (
              <form onSubmit={handleSubmit}>
                <FormGroup for="f-to" label="To">
                  <InputGroup
                    id="f-to"
                    name="to"
                    value={values["to"]}
                    onChange={(e) => {
                      handleChange(e);
                      const value = e.target.value;
                      const params = new URLSearchParams(
                        `?u=${encodeURIComponent(value)}`
                      );
                      setFieldValue(
                        "url",
                        value ? `${urlRaw}?${params.toString()}` : values["url"]
                      );
                    }}
                    placeholder="Who?"
                  />
                </FormGroup>
                {router.query["text"] && (
                  <Flex alignItems="center" mb={2}>
                    <Box flexShrink={0} sx={{ whiteSpace: "nowrap" }}>
                      <Button
                        small={true}
                        outlined={true}
                        text="Use last text template"
                        onClick={() => {
                          setFieldValue("description", router.query["text"]);
                        }}
                      />
                    </Box>
                    <Box flexGrow={1} ml={2}>
                      <Text ellipsize={true}>{router.query["text"]}</Text>
                    </Box>
                  </Flex>
                )}
                <FormGroup for="f-description" label="Message">
                  <TextArea
                    id="f-description"
                    name="description"
                    value={values["description"]}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    placeholder={`Dear ${
                      values["to"] ? values["to"] : "Who?"
                    }, bla bla bla`}
                    growVertically={true}
                    fill={true}
                  />
                </FormGroup>

                <Box textAlign="right">
                  <Button
                    type="button"
                    minimal={true}
                    small={true}
                    text="Variable Reference"
                    onClick={() => {
                      setFieldValue("isVarOpen", !values["isVarOpen"]);
                    }}
                  />
                </Box>
                <Box mb={3}>
                  <Collapse isOpen={values["isVarOpen"]}>
                    {[
                      ["to", values["to"]],
                      ["url", values["url"]],
                    ].map(([a, b]) => (
                      <Box key={a}>
                        <Box
                          className={Classes.CODE}
                          sx={{
                            display: "inline-block",
                          }}
                        >{`{{${a}}}`}</Box>{" "}
                        {b}
                      </Box>
                    ))}
                  </Collapse>
                </Box>

                <FormGroup label="Preview">
                  <Box
                    sx={{
                      whiteSpace: "pre-line",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: transformToPreview(transformedMessage),
                    }}
                  />
                </FormGroup>
                <Box sx={{ textAlign: "center" }}>
                  <Button
                    large={true}
                    text="Share"
                    type="submit"
                    loading={isSubmitting}
                  />
                </Box>
              </form>
            );
          }}
        </Formik>
      </Box>
      <Box as="footer" my={5} textAlign="center" color="gray.3">
        <div>Made with ❤ by Manjo.</div>
      </Box>
    </>
  );
};

export const getStaticPaths = async () => {
  if (process.env.NEXT_PHASE === "phase-production-build") {
    return {
      paths: [],
      fallback: "blocking",
    };
  }

  let { data } = await getInvitations({
    params: {
      fields: {
        slug: 1,
      },
    },
  });

  let paths = data.map((post) => ({
    params: {
      slug: post.slug,
    },
  }));

  return {
    paths,
    fallback: "blocking",
    // fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const { slug } = context.params;
  let { data } = await getInvitationBySlug(slug, {
    fields: {
      content: 0,
    },
  });
  return {
    props: {
      slug,
      share_message: _get(data, "share_message") || "",
      ...data,
    },
    revalidate: 120,
  };
};

export default DariID;
