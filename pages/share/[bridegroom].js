import "normalize.css/normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import { FormGroup, InputGroup, Button, TextArea, Classes, Collapse } from "@blueprintjs/core";
import Head from "next/head";
import Template from "components/Template";
import Client from "components/client";
import moment from "moment";
import { useRouter } from "next/router";
import { Formik } from "formik";
import { Box } from "components";

const DariID = ({
  slug,
  post: {
    bride,
    groom,
    contract,
  }
}) => {
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
  return (
    <>
      <Head>
        <title>Undangan Pernikahan: {bride.nickname} dan {groom.nickname}</title>
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
            "date": moment(contract.date).format("dddd, DD MMMM YYYY"),
            "groom": groom.nickname,
            "bride": bride.nickname,
            "description": "Dear {{to}},\n\nWith all due respect, we send this e-invitation : \n{{url}}\n\nWe ask for your blessing on our wedding day. However, due to the circumstances of the Covid-19 pandemic and to acknowledge with health protocols, we apologize for not being able to invite you to attend the wedding ceremony. You can still be a part of our Wedding by leave your wishes . \n\n⏰ – {{date}}\n\nThank you for all the prayers and support. It will be a wonderful gift for us. \n\n\nWith pray & love,\n{{groom}} & {{bride}}\n\n\n#BaundangMe\n",
          }}
          onSubmit={async (values, { setSubmitting }) => {
            const text = transformDescription(values["description"], {
              to: values["to"],
              url: values["url"],
              date: values["date"],
              groom: values["groom"],
              bride: values["bride"],
            })
            console.log(text);
            try {
              await navigator.share({
                url: values["url"],
                title: `Undangan Pernikahan: ${groom.nickname} & ${bride.nickname}`,
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
                    setFieldValue("url", value ? `${urlRaw}?${params.toString()}` : values["url"]);
                  }}
                  placeholder="Who?"
                />
              </FormGroup>
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
                  className={Classes.CODE_BLOCK}
                  sx={{
                    whiteSpace: "pre-line"
                  }}
                >
                  {transformDescription(values["description"], {
                    to: values["to"],
                    url: values["url"],
                    date: values["date"],
                    groom: values["groom"],
                    bride: values["bride"],
                  })}
                </Box>
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
