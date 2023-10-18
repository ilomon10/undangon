import { Box, Flex } from "components/Grid";
import { RegisQRSettings } from "./Settings";
import _pick from "lodash/pick";
import { useNode } from "@craftjs/core";
import { useEffect, useMemo, useRef, useState } from "react";
import { Input } from "components/Input";
import QRCode from "qrcode";
import { useRouter } from "next/router";
import _get from "lodash.get";
import { Formik, useFormik } from "formik";
import axios from "axios";
import { useCounter } from "react-use";
import { IoAdd, IoCheckmarkCircle, IoRemove } from "react-icons/io5";

// name: undefined,
// attendance: true,
// number_of_persons: 1,

export const RegisQR = ({ field_name = "q" }) => {
  const { query: searchParams } = useRouter();

  const [QRImage, setQRImage] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [number_of_persons, { inc, dec }] = useCounter(1, 4, 1);

  const qrValue = useMemo(() => {
    return _get(searchParams, field_name);
  }, [searchParams, field_name]);

  const {
    connectors: { connect },
  } = useNode();

  useEffect(() => {
    if (!qrValue) return;
    async function fetch() {
      try {
        await axios.patch(`https://regis.manjo.space/invitees/${qrValue}`, {
          status: "read",
        });
      } catch (err) {}
      try {
        setQRImage(await QRCode.toDataURL(qrValue));
      } catch (err) {}
    }
    fetch();
  }, [qrValue]);

  return (
    <div ref={(ref) => connect(ref)}>
      <Box sx={{ width: "100%", textAlign: "center" }}>
        {QRImage && (
          <img style={{ width: "100%", maxWidth: 250 }} src={QRImage} />
        )}
        {qrValue && !QRImage && "Loading"}
      </Box>
      <Box
        sx={{
          borderRadius: 8,
          backgroundColor: "white",
          border: "1px solid #aaa",
          pt: 3,
          px: 3,
          mx: 3
        }}
      >
        {isSubmitted ? (
          <Box
            sx={{
              textAlign: "center",
              mb:3
            }}
          >
            <Box>
              <IoCheckmarkCircle color="#238551" size={72} />
            </Box>
            <Box sx={{ color: "#238551" }}>Submitted</Box>
          </Box>
        ) : (
          <Formik
            initialValues={{
              attendance: false,
            }}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const res = await axios.patch(
                  `https://regis.manjo.space/invitees/${qrValue}`,
                  {
                    status: "accepted",
                    total_person: values.attendance
                      ? number_of_persons
                      : undefined,
                  }
                );
                setIsSubmitted(true);
              } catch (err) {
                console.error(err);
              }
              setSubmitting(false);
            }}
          >
            {({ values, setFieldValue, handleSubmit, isSubmitting }) => (
              <form onSubmit={handleSubmit}>
                <Flex mb={3}>
                  <Box
                    mr={1}
                    p={2}
                    sx={{
                      cursor: "pointer",
                      backgroundColor: values["attendance"]
                        ? "#238551"
                        : "transparent",
                      width: "50%",
                      border: `1px solid #238551`,
                      borderRadius: 4,
                      textAlign: "center",
                      fontWeight: "bold",
                      color: values["attendance"] ? "white" : "#238551",
                    }}
                    onClick={() => {
                      setFieldValue("attendance", true);
                    }}
                  >
                    Yes, I will attend
                  </Box>
                  <Box
                    ml={1}
                    p={2}
                    sx={{
                      cursor: "pointer",
                      backgroundColor: !values["attendance"]
                        ? "#cd4246"
                        : "transparent",
                      width: "50%",
                      border: "1px solid #cd4246",
                      borderRadius: 4,
                      textAlign: "center",
                      fontWeight: "bold",
                      color: values["attendance"] ? "#cd4246" : "white",
                    }}
                    onClick={() => {
                      setFieldValue("attendance", false);
                    }}
                  >
                    No, I cant attend
                  </Box>
                </Flex>
                {!!values["attendance"] && (
                  <Flex sx={{ pb: 3 }}>
                    <Box
                      as="button"
                      type="button"
                      disabled={number_of_persons <= 1}
                      onClick={() => dec()}
                      p={2}
                      sx={{
                        width: "33.3%",
                        cursor: "pointer",
                        textAlign: "center",
                        border: "1px solid #aaa",
                        borderRadius: 4,
                      }}
                    >
                      <IoRemove size={24} />
                    </Box>
                    <Box
                      p={2}
                      sx={{
                        textAlign: "center",
                        width: "33.3%",
                      }}
                    >
                      <Box
                        sx={{
                          fontSize: 24,
                        }}
                      >
                        {number_of_persons}
                      </Box>
                      <Box>persons</Box>
                    </Box>

                    <Box
                      as="button"
                      type="button"
                      onClick={() => inc()}
                      disabled={number_of_persons >= 4}
                      p={2}
                      sx={{
                        width: "33.3%",
                        cursor: "pointer",
                        textAlign: "center",
                        border: "1px solid #aaa",
                        borderRadius: 4,
                      }}
                    >
                      <IoAdd size={24} />
                    </Box>
                  </Flex>
                )}
                <Box
                  as="button"
                  mb={3}
                  p={2}
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    cursor: "pointer",
                    textAlign: "center",
                    width: "100%",
                    border: "1px solid #aaa",
                    borderRadius: 4,
                  }}
                >
                  {isSubmitting ? "Loading" : "Confirm"}
                </Box>
              </form>
            )}
          </Formik>
        )}
      </Box>
    </div>
  );
};

RegisQR.craft = {
  name: "RegisQR",
  props: {
    field_name: "q",
  },
  related: {
    settings: RegisQRSettings,
  },
};
