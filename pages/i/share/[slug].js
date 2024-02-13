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

  return text;
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

const default_share_message = `Kepada {{to}},\nDengan segala hormat, kami mengirimkan undangan elektronik ini :\n{{url}}\n\nKami mohon restu di hari pernikahan kami. Walaupun, keadaan pandemi Covid-19 dan dengan tetap menjaga protokol kesehatan, kami mengundang Anda untuk menghadiri upacara pernikahan. Anda masih bisa menjadi bagian dari Pernikahan kami dengan meninggalkan keinginan Anda.\n\n⏰ – January 01, 1999\n\nTerima kasih atas semua doa dan dukungannya. Ini akan menjadi hadiah yang luar biasa untuk kita.\n\nWith pray & love,\nJohn & Doe\n#Manjo`;

const DariID = ({ _id, slug, meta, share_message = default_share_message }) => {
  const router = useRouter();

  const urlRaw = `https://${APP_DOMAIN}/i/${slug}`;

  let temp_share_message = useRef(share_message);

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
        <title>Share Undangan:</title>
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
            description: share_message,
          }}
          onSubmit={async (values, { setSubmitting, ...rest }, b) => {
            const text = transformDescription(values["description"], {
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
          }) => (
            <form onSubmit={handleSubmit}>
              <FormGroup for="f-to" label="To">
                <InputGroup
                  id="f-to"
                  name="to"
                  value={values["to"]}
                  onChange={(e) => {
                    handleChange(e);
                    const value = e.target.value;
                    const params = new URLSearchParams(`?u=${value}`);
                    setFieldValue(
                      "url",
                      value ? `${urlRaw}?${params.toString()} ` : values["url"]
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
                    __html: transformToPreview(
                      transformDescription(values["description"], {
                        to: values["to"],
                        url: values["url"],
                      })
                    ),
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
          )}
        </Formik>
      </Box>
      <Box as="footer" my={5} textAlign="center" color="gray.3">
        <div>Made with ❤ by Manjo.</div>
      </Box>
    </>
  );
};

export const getStaticPaths = async () => {
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
  };
};

export default DariID;
