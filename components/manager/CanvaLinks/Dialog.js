import { Button, Card, Group, Input } from "@mantine/core";
import client from "components/client";
import { Formik } from "formik";
import { useCallback } from "react";
import * as Yup from "yup";
import _get from "lodash.get";

const Schema = Yup.object().shape({
  link: Yup.string().required(),
  name: Yup.string().required(),
});

export const CanvaLinksDialog = ({
  onClose,
  onSubmitted = () => {},
  onErrorSubmitted = () => {},
  defaultValue = {},
}) => {
  const onSubmit = useCallback(async (values, { setSubmitting }) => {
    let { template, ...data } = values;
    try {
      let res = await client.postCanvaLink(data);
      onSubmitted();
      onClose();
    } catch (err) {
      onErrorSubmitted();
      console.error(err);
    }
    setSubmitting(false);
  }, []);

  return (
    <Formik
      validationSchema={Schema}
      initialValues={{
        _id: defaultValue._id,
        name: defaultValue.name || "",
        link: defaultValue.link || "",
      }}
      onSubmit={onSubmit}
    >
      {({
        values,
        errors,
        handleSubmit,
        setFieldValue,
        handleChange,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <Input.Wrapper label="Name" error={errors["name"]}>
              <Input
                name="name"
                value={values["name"]}
                onChange={handleChange}
                invalid={!!errors["name"]}
              />
            </Input.Wrapper>
            <Input.Wrapper label="Link" error={errors["link"]}>
              <Input
                name="link"
                value={values["link"]}
                onChange={handleChange}
                invalid={!!errors["link"]}
              />
            </Input.Wrapper>
            <Card>{JSON.stringify(errors)}</Card>
          </div>
          <div>
            <Group>
              <Button color="red" variant="subtle" onClick={() => onClose()}>
                Cancel
              </Button>
              <Button type="submit" loading={isSubmitting}>
                Submit
              </Button>
            </Group>
          </div>
        </form>
      )}
    </Formik>
  );
};
