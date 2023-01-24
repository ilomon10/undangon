import { Box, Flex } from "components/Grid";
import { GuestBookSettings } from "./GuestBookSettings";
import _pick from "lodash/pick";
import { Container } from "../Container";
import { Element, useNode } from "@craftjs/core";
import { Text } from "../Text";
import { useCallback, useEffect, useRef, useState } from "react";
import client from "components/client";
import { InputGroup, TextArea, Button } from "@blueprintjs/core";
import moment from "moment";
import { useDebounce } from "react-use";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { Reveal } from "react-reveal";

export const GuestBook = ({ children, token }) => {
  const recaptchaRef = useRef();

  const {
    connectors: { connect },
  } = useNode();

  const [items, setItems] = useState([]);

  const [loading, setLoading] = useState(false);

  const onComment = useCallback(
    async (data) => {
      const body = {
        title: data.title,
        content: data.content,
        token,
      };
      try {
        const res = await client.postComments(body);
        setItems((items) => [
          ...items,
          {
            ...res,
            date: moment(res._modified).format("MMMM DD, YYYY • HH:mm A"),
          },
        ]);
      } catch (err) {
        console.error(err);
      }
      reset();
    },
    [token]
  );

  useDebounce(
    () => {
      const fetch = async () => {
        let res = await client.getComments({
          filter: {
            token: token,
          },
        });
        setItems(
          res.map((comment) => ({
            ...comment,
            date: moment(comment._modified).format("MMMM DD, YYYY • HH:mm A"),
          }))
        );
      };
      fetch();
    },
    500,
    [token]
  );

  const { register, handleSubmit, errors, reset } = useForm();

  const executeRecaptcha = (event) => {
    setLoading(true);
    event.preventDefault();
    recaptchaRef.current.execute();
  };

  const onReCAPTCHAChange = async (captchaCode) => {
    if (captchaCode) {
      await handleSubmit(onComment)();
    }
    setLoading(false);
    recaptchaRef.current.reset();
  };

  return (
    <div ref={(ref) => connect(ref)}>
      <Box sx={{ px: 3 }}>
        {items.map((item) => (
          <Reveal key={item._id} bottom={true}>
            <Box
              sx={{
                borderRadius: 8,
                backgroundColor: "white",
                border: "1px solid #aaa",
                px: 3,
                mb: 3,
              }}
            >
              <Box sx={{ borderBottom: "1px solid #aaa", py: 2 }}>
                <Box>{item.title}</Box>
              </Box>
              <Box sx={{ py: 2 }}>
                <Box>{item.content}</Box>
              </Box>
              <Box sx={{ pb: 2 }}>
                <Box sx={{ fontSize: 0, color: "gray.5" }}>{item.date}</Box>
              </Box>
            </Box>
          </Reveal>
        ))}

        <form onSubmit={executeRecaptcha}>
          <Box
            sx={{
              borderRadius: 8,
              backgroundColor: "white",
              border: "1px solid #aaa",
              px: 3,
            }}
          >
            <Box sx={{ borderBottom: "1px solid #aaa", py: 2 }}>
              <Box>
                <InputGroup
                  name="title"
                  inputRef={register({ required: true })}
                  placeholder="Title"
                />
              </Box>
            </Box>
            <Box sx={{ py: 2 }}>
              <Box>
                <TextArea
                  name="content"
                  inputRef={register({ required: true })}
                  growVertically={true}
                  placeholder="Description"
                  fill
                />
              </Box>
            </Box>
            <Flex sx={{ pb: 2 }}>
              <Box>
                <Button text="Send" type="submit" loading={loading} />
              </Box>
              <Box
                sx={{
                  height: 30,
                  width: "100%",
                  ".grecaptcha-badge": {
                    mx: "auto",
                  },
                  "> div": {
                    mt: -3,
                    transform: "scale(0.5)",
                  },
                }}
              >
                <ReCAPTCHA
                  ref={recaptchaRef}
                  size="invisible"
                  badge="inline"
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                  onChange={onReCAPTCHAChange}
                />
              </Box>
            </Flex>
          </Box>
        </form>
      </Box>
    </div>
  );
};

GuestBook.craft = {
  name: "GuestBook",
  props: {
    token: undefined,
  },
  related: {
    settings: GuestBookSettings,
  },
};
