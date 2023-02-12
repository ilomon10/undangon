import { Button, Input, Text } from "@mantine/core";
import { Box, Flex } from "components";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useCallback } from "react";

export default function Login() {
  const router = useRouter();

  const onSubmit = useCallback(() => {
    router.push("/manager");
  }, []);

  return (
    <Flex
      sx={{
        position: "fixed",
        inset: 0,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: 250,
        }}
      >
        <Text>Login</Text>
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          onSubmit={onSubmit}
        >
          {({ values, errors, handleSubmit, handleChange }) => (
            <form onSubmit={handleSubmit}>
              <Box>
                <Input.Wrapper mb={8} label="Username" labelFor="f-username">
                  <Input
                    id="f-username"
                    name="username"
                    onChange={handleChange}
                  />
                </Input.Wrapper>
                <Input.Wrapper mb={8} label="Password" labelFor="f-password">
                  <Input
                    id="f-password"
                    name="password"
                    onChange={handleChange}
                  />
                </Input.Wrapper>
                <Button type="submit">Login</Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
}
