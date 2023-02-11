import { Box, Button, Group, Input } from "@mantine/core";
import client from "components/client";
import { FetchAndSelect } from "components/Select/FetchAndSelect";
import { Formik } from "formik";
import { useCallback } from "react";
import * as Yup from "yup";

const Schema = Yup.object().shape({
  slug: Yup.string().required(),
  name: Yup.string().required(),
  category: Yup.string().required(),
  meta: Yup.object().shape({
    title: Yup.string().required(),
    og_title: Yup.string().required(),
    og_description: Yup.string().required(),
  }),
});

const initialValue = {
  _id: undefined,
  name: "",
  category: "",
};

export const TemplatesDialog = ({
  onClose,
  onErrorSubmitted = () => {},
  onSubmitted = () => {},
  defaultValue = initialValue,
}) => {
  const onSubmit = useCallback(async (values, { setSubmitting }) => {
    let data = values;
    try {
      let res = await client.postTemplate(data);
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
      initialValues={{
        _id: defaultValue._id,
        name: defaultValue.name,
        category: defaultValue.category,
      }}
      onSubmit={onSubmit}
    >
      {({
        values,
        handleSubmit,
        setFieldValue,
        handleChange,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <Input.Wrapper label="Name" mb={8}>
              <Input
                name="name"
                value={values["name"]}
                onChange={handleChange}
              />
            </Input.Wrapper>
            <Input.Wrapper label="Category" mb={8}>
              <FetchAndSelect
                searchable={true}
                value={values["category"]}
                onChange={async (value) => {
                  console.log(value);
                  await setFieldValue("category", value);
                }}
                fetchCallback={async () => {
                  let response = await client.getCategories();
                  return response;
                }}
                onFetched={(items) => {
                  return items.map((item) => {
                    return {
                      label: item["name"],
                      value: item["_id"],
                    };
                  });
                }}
              />
            </Input.Wrapper>
          </div>
          <div>
            <Group position="right">
              <Button
                intent="danger"
                variant="subtle"
                onClick={() => onClose()}
              >
                Cancel
              </Button>
              <Button type="submit" loading={isSubmitting}>
                Save
              </Button>
            </Group>
          </div>
        </form>
      )}
    </Formik>
  );
};
