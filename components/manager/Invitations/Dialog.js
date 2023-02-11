import { Box, Button, Input, Card } from "@mantine/core";
import client from "components/client";
import { FetchAndSelect } from "components/Select/FetchAndSelect";
import { Formik } from "formik";
import { useCallback } from "react";
import * as Yup from "yup";
import _get from "lodash.get";

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
  slug: "",
  meta: {
    title: "",
    og_title: "",
    og_description: "",
  },
};

export const InvitationDialog = ({
  method = "add",
  onClose,
  onErrorSubmitted = () => {},
  onSubmitted = () => {},
  defaultValue = initialValue,
}) => {
  const onSubmit = useCallback(async (values, { setSubmitting }) => {
    let { template, ...data } = values;
    try {
      let res = await client.postInvitation(data);
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
        ...defaultValue,
        category: defaultValue.category._id,
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
            <Input.Wrapper label="Slug" error={errors["slug"]}>
              <Input
                name="slug"
                value={values["slug"]}
                onChange={handleChange}
                invalid={!!errors["slug"]}
              />
            </Input.Wrapper>
            <Input.Wrapper label="Name" error={errors["name"]}>
              <Input
                name="name"
                value={values["name"]}
                onChange={handleChange}
                invalid={!!errors["name"]}
              />
            </Input.Wrapper>
            <Input.Wrapper label="Category" error={errors["category"]}>
              <FetchAndSelect
                searchable={true}
                value={values["category"]}
                onChange={async (value) => {
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
            {method === "add" && (
              <Input.Wrapper
                label="Template"
                intent={errors["template"] && "danger"}
                helperText={errors["template"]}
              >
                <FetchAndSelect
                  id="f-template"
                  name="template"
                  initialValue={values["template"]}
                  value={values["template"]}
                  onChange={async (value, { data }) => {
                    if (!data) return;
                    await setFieldValue("template", value);
                    await setFieldValue("content", data.content);
                  }}
                  fetchCallback={async () => {
                    let response = await client.getTemplates({
                      populate: 1,
                    });
                    return response;
                  }}
                  onFetched={(items) => {
                    return items.map((item) => {
                      return {
                        label: item["name"],
                        info: item["category"]["name"],
                        value: item["_id"],
                        data: item,
                      };
                    });
                  }}
                />
              </Input.Wrapper>
            )}
            <Box fontWeight="bold" mt={3} mb={2}>
              Meta
            </Box>
            <Input.Wrapper label="Title" error={_get(errors, "meta.title")}>
              <Input
                name="meta.title"
                value={_get(values, "meta.title")}
                onChange={handleChange}
                invalid={!!_get(errors, "meta.title")}
              />
            </Input.Wrapper>
            <Input.Wrapper
              label="OG Title"
              error={_get(errors, "meta.og_title")}
            >
              <Input
                name="meta.og_title"
                value={_get(values, "meta.og_title")}
                onChange={handleChange}
                invalid={!!_get(errors, "meta.og_title")}
              />
            </Input.Wrapper>
            <Input.Wrapper
              label="OG Description"
              error={_get(errors, "meta.og_description")}
            >
              <Input
                name="meta.og_description"
                value={_get(values, "meta.og_description")}
                onChange={handleChange}
                invalid={!!_get(errors, "meta.og_description")}
              />
            </Input.Wrapper>
            <Card>{JSON.stringify(errors)}</Card>
          </div>
          <div>
            <Box textAlign="right">
              <Button
                intent="danger"
                variant="subtle"
                text="Cancel"
                onClick={() => onClose()}
              >
                Cancel
              </Button>
              <Button type="submit" loading={isSubmitting} color="primary">
                Submit
              </Button>
            </Box>
          </div>
        </form>
      )}
    </Formik>
  );
};
