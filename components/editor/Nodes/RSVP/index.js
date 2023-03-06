import { Box, Flex } from "components/Grid";
import { RSVPSettings } from "./Settings";
import _pick from "lodash/pick";
import { Container } from "../Container";
import { Element, useNode } from "@craftjs/core";
import { Text } from "../Text";
import { useCallback, useEffect, useRef, useState } from "react";
import client from "components/client";
import { Button } from "components/Button";
import moment from "moment";
import { useDebounce } from "react-use";
import { useForm } from "react-hook-form";
import { Reveal } from "react-reveal";
import { Input } from "components/Input";

const transformMessage = (raw, opt) => {
  let text = raw;
  let data = {
    ...opt,
  };

  for (let key in data) {
    text = text.replace(`{{${key}}}`, data[key]);
  }

  return text;
};

// name: undefined,
// attendance: true,
// number_of_persons: 1,

export const RSVP = ({ children, message, phone_number }) => {
  const recaptchaRef = useRef();

  const {
    connectors: { connect },
  } = useNode();

  const { register, handleSubmit, watch } = useForm();

  const fields = watch();

  const transformedMessage = transformMessage(message || "", {
    name: fields["name"],
    attendance: fields["attendance"]
      ? "Saya akan hadir"
      : "Saya tidak akan hadir",
    persons: fields["number_of_persons"],
  });

  const url = `https://api.whatsapp.com/send?phone=${phone_number}&text=${transformedMessage}`;

  return (
    <div ref={(ref) => connect(ref)}>
      <Box sx={{ px: 3 }}>
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              borderRadius: 8,
              backgroundColor: "white",
              border: "1px solid #aaa",
              px: 3,
            }}
          >
            <Box sx={{ py: 2 }}>
              <Box>
                <Input
                  name="name"
                  ref={register({ required: true })}
                  fill
                  placeholder="Name"
                />
              </Box>
            </Box>

            <Flex as="label" for="f-attendance" alignItems="center">
              <Box>
                <Input
                  id="f-attendance"
                  name="attendance"
                  type="checkbox"
                  ref={register({ required: true })}
                  fill
                  placeholder="Attendance"
                />
              </Box>
              <Box ml={2}>Yes, I will attend</Box>
            </Flex>
            <Box sx={{ py: 2 }}>
              <Box>
                <Input
                  min={1}
                  max={10}
                  name="number_of_persons"
                  ref={register({ required: true })}
                  fill
                  type="number"
                  placeholder="Number of Persons"
                  sx={{ resize: "vertical" }}
                />
              </Box>
            </Box>
            <Flex sx={{ pb: 2 }}>
              <Box>
                <Button
                  as="a"
                  href={url}
                  target="_blank"
                  text="Send via Whatsapp"
                  type="submit"
                />
              </Box>
            </Flex>
          </Box>
        </form>
      </Box>
    </div>
  );
};

RSVP.craft = {
  name: "RSVP",
  props: {
    phone_number: "+62852xxxxxx",
    message: `Hai, saya {{name}} bersama {{persons}} orang ingin konfirmasi kehadiran undangan pernikahan John & Doe bahwa {{attendance}}.\nTerimakasih`,
  },
  related: {
    settings: RSVPSettings,
  },
};
