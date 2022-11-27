import { Button, Classes, FormGroup, InputGroup, Text } from "@blueprintjs/core";
import { Box, Flex } from "components";
import { BlueprintWrapper } from "components/BlueprintWrapper";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useCallback } from "react";

export default function Login() {

  const router = useRouter();

  const onSubmit = useCallback(() => {
    router.push("/manager");
  }, []);

  return (
    <BlueprintWrapper>
      <Flex sx={{
        position: "fixed",
        inset: 0,
        justifyContent: "center",
        alignItems: "center"
      }}>
        <Box sx={{
          maxWidth: 250
        }}>
          <Text className={Classes.HEADING}>Login</Text>
          <Formik initialValues={{
            username: "",
            password: ""
          }} onSubmit={onSubmit}>
            {({ values, errors, handleSubmit, handleChange }) =>
              <form onSubmit={handleSubmit}>
                <Box>
                  <FormGroup label="Username" labelFor="f-username">
                    <InputGroup id="f-username" name="username" onChange={handleChange} />
                  </FormGroup>
                  <FormGroup label="Password" labelFor="f-password">
                    <InputGroup id="f-password" name="password" onChange={handleChange} />
                  </FormGroup>
                  <Button text="Login" type="submit" />
                </Box>
              </form>}
          </Formik>
        </Box>
      </Flex>
    </BlueprintWrapper>
  )
};