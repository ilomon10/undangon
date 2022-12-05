import lz from "lzutf8";
import {
  Button,
  Callout,
  Classes,
  FormGroup,
  HTMLSelect,
  InputGroup,
} from "@blueprintjs/core";
import client from "components/client";
import { FetchAndSelect } from "components/Select/FetchAndSelect";
import { Formik } from "formik";
import { useCallback } from "react";
import * as Yup from "yup";
import { Box } from "components/Grid";
import _get from "lodash.get";

const Schema = Yup.object().shape({
  slug: Yup.string().required(),
  name: Yup.string().required(),
  template: Yup.string().required(),
  content: Yup.string().required(),
  category: Yup.string().required(),
  meta: Yup.object().shape({
    title: Yup.string().required(),
    og_title: Yup.string().required(),
    og_description: Yup.string().required(),
  }),
});

export const InvitationAddDialog = ({ onClose }) => {
  const onSubmit = useCallback(async (values, { setSubmitting }) => {
    let { template, ...data } = values;
    try {
      let res = await client.postInvitation(data);
      onClose();
    } catch (err) {
      console.error(err);
    }
    setSubmitting(false);
  }, []);
  return (
    <Formik
      validationSchema={Schema}
      initialValues={{
        name: "",
        content: "",
        category: "",
        slug: "",
        meta: {
          title: "",
          og_title: "",
          og_description: "",
        },
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
          <div className={Classes.DIALOG_BODY}>
            <FormGroup
              label="Slug"
              intent={errors["slug"] && "danger"}
              helperText={errors["slug"]}
            >
              <InputGroup
                name="slug"
                value={values["slug"]}
                onChange={handleChange}
                intent={errors["slug"] && "danger"}
              />
            </FormGroup>
            <FormGroup
              label="Name"
              intent={errors["name"] && "danger"}
              helperText={errors["name"]}
            >
              <InputGroup
                intent={errors["name"] && "danger"}
                name="name"
                value={values["name"]}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup
              label="Category"
              intent={errors["category"] && "danger"}
              helperText={errors["category"]}
            >
              <FetchAndSelect
                id="f-category"
                name="category"
                initialValue={values["category"]}
                value={values["category"]}
                onChange={async ({ value }) => {
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
            </FormGroup>
            <FormGroup
              label="Template"
              intent={errors["template"] && "danger"}
              helperText={errors["template"]}
            >
              <FetchAndSelect
                id="f-template"
                name="template"
                initialValue={values["template"]}
                value={values["template"]}
                onChange={async ({ value, data }) => {
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
            </FormGroup>
            <Box fontWeight="bold" mb={2}>
              Meta
            </Box>
            <FormGroup
              label="Title"
              intent={_get(errors, "meta.title") && "danger"}
              helperText={_get(errors, "meta.title")}
            >
              <InputGroup
                name="meta.title"
                value={_get(values, "meta.title")}
                onChange={handleChange}
                intent={_get(errors, "meta.title") && "danger"}
              />
            </FormGroup>
            <FormGroup
              label="OG Title"
              intent={_get(errors, "meta.og_title") && "danger"}
              helperText={_get(errors, "meta.og_title")}
            >
              <InputGroup
                name="meta.og_title"
                value={_get(values, "meta.og_title")}
                onChange={handleChange}
                intent={_get(errors, "meta.og_title") && "danger"}
              />
            </FormGroup>
            <FormGroup
              label="OG Description"
              intent={_get(errors, "meta.og_description") && "danger"}
              helperText={_get(errors, "meta.og_description")}
            >
              <InputGroup
                name="meta.og_description"
                value={_get(values, "meta.og_description")}
                onChange={handleChange}
                intent={_get(errors, "meta.og_description") && "danger"}
              />
            </FormGroup>
            <Callout>{JSON.stringify(errors)}</Callout>
          </div>
          <div className={Classes.DIALOG_FOOTER}>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
              <Button
                intent="danger"
                minimal
                text="Cancel"
                onClick={() => onClose()}
              />
              <Button
                type="submit"
                loading={isSubmitting}
                intent="primary"
                text="Create"
              />
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};
