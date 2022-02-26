import "normalize.css/normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import { FormGroup, InputGroup, Button, TextArea, Text, Classes, Collapse } from "@blueprintjs/core";
import Head from "next/head";
import Client from "components/client";
import moment from "moment";
import { useRouter } from "next/router";
import { Formik } from "formik";
import { Box, Flex } from "components";

const htmlFormat = [
  { symbol: "*", open: "<b>", close: "</b>" },
  { symbol: "_", open: "<em>", close: "</em>" },
  { symbol: "~", open: "<del>", close: "</del>" },
]

const DariID = ({
  slug,
  post: {
    bride,
    groom,
    location_time_date,
    share_message
  }
}) => {

  const router = useRouter();
  
  const date = moment(location_time_date[0].date);

  const urlRaw = `https://baundang.me/pernikahan/${slug}`;
  const transformDescription = (raw, opt) => {
    let text = raw;
    let data = {
      to: "",
      url: "",
      ...opt
    }

    for (let key in data) {
      text = text.replace(`{{${key}}}`, data[key]);
    }

    return text;
  }

  const transformToPreview = (raw, opt) => {
    let text = raw;
    try {
      for (let { symbol, open, close } of htmlFormat) {
        if (!text) return text;

        const rx = `\\${symbol}([^\\${symbol}~]+)\\${symbol}`;
        const regex = new RegExp(rx, 'g');
        const match = text.match(regex);

        if (!match) return text;

        match.forEach(m => {
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
  }

  return (
    <>
      <Head>
        <title>Undangan Pernikahan: {groom.nickname} dan {bride.nickname}</title>
      </Head>
      <Box
        sx={{
          maxWidth: 512,
          mx: "auto",
          py: 4,
          px: 3,
          "textarea": {
            resize: "vertical"
          }
        }}
      >
        <Formik
          initialValues={{
            "isVarOpen": false,
            "to": "",
            "url": urlRaw,
            "date": date.format("dddd, DD MMMM YYYY"),
            "groom": groom.nickname,
            "bride": bride.nickname,
            "description": share_message,
          }}
          onSubmit={async (values, { setSubmitting }) => {
            const text = transformDescription(values["description"], {
              to: values["to"],
              url: values["url"],
              date: values["date"],
              groom: values["groom"],
              bride: values["bride"],
            })
            try {
              router.push({
                query: {
                  ...router.query,
                  text: values["description"],
                }
              }, undefined, { shallow: true });

              await navigator.share({
                url: values["url"],
                title: `Undangan Pernikahan: ${groom.nickname} & ${bride.nickname} `,
                text,
              });
            } catch (err) {
              console.error(err);
            }
            setSubmitting(false);
          }}
        >
          {({ values, errors, handleSubmit, handleChange, setFieldValue, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <FormGroup
                for="f-to"
                label="To"
              >
                <InputGroup
                  id="f-to"
                  name="to"
                  value={values["to"]}
                  onChange={(e) => {
                    handleChange(e);
                    const value = e.target.value;
                    const params = new URLSearchParams(`?untuk=${value}`);
                    setFieldValue("url", value ? `${urlRaw}?${params.toString()} ` : values["url"]);
                  }}
                  placeholder="Who?"
                />
              </FormGroup>
              {router.query["text"] &&
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
                  <Box flexGrow={1} ml={2} >
                    <Text ellipsize={true}>
                      {router.query["text"]}
                    </Text>
                  </Box>
                </Flex>
              }
              <FormGroup
                for="f-description"
                label="Message"
              >
                <TextArea
                  id="f-description"
                  name="description"
                  value={values["description"]}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  placeholder={`Dear ${values["to"] ? values["to"] : "Who?"}, bla bla bla`}
                  growVertically={true}
                  fill={true}
                />
              </FormGroup>

              <Box textAlign="right">
                <Button
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
                    ["date", values["date"]],
                    ["groom", values["groom"]],
                    ["bride", values["bride"]],
                  ].map(([a, b]) => (
                    <Box key={a}>
                      <Box
                        className={Classes.CODE}
                        sx={{
                          display: "inline-block",
                        }}
                      >{`{{${a}}}`}</Box> {b}
                    </Box>
                  ))}
                </Collapse>
              </Box>

              <FormGroup label="Preview">
                <Box
                  sx={{
                    whiteSpace: "pre-line"
                  }}
                  dangerouslySetInnerHTML={{
                    __html: transformToPreview(
                      transformDescription(values["description"], {
                        to: values["to"],
                        url: values["url"],
                        date: values["date"],
                        groom: values["groom"],
                        bride: values["bride"],
                      })
                    )
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
        <div>Made with ❤ by Ba Undang.</div>
      </Box>
    </>
  )
}

export default DariID;

export const getStaticPaths = async () => {
  let { data } = await Client.posts({
    params: { "_fields": "slug" }
  });
  let paths = data.map(post => ({ params: { bridegroom: post.slug } }))
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async (context) => {
  const { bridegroom } = context.params;
  let { data } = await Client.posts({
    params: {
      "_fields": "id,acf",
      "slug": bridegroom
    }
  });
  const post = {
    id: data[0].id,
    ...data[0].acf
  };

  post.gallery = post.gallery.map(({ id, url, name, alt, width, height }) => {
    return { id, url, name, alt, width, height };
  });

  return {
    props: {
      slug: bridegroom,
      post
    }
  }
}
