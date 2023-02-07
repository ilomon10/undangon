import {
  Button,
  Classes,
  FormGroup,
  HTMLSelect,
  InputGroup,
} from "@blueprintjs/core";
import client from "components/client";
import { FetchAndSelect } from "components/Select/FetchAndSelect";
import { Formik } from "formik";
import { useCallback } from "react";

export const TemplatesEditDialog = ({
  onClose,
  onErrorSubmitted = () => {},
  onSubmitted = () => {},
  defaultValue = {},
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
        category: defaultValue.category._id,
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
          <div className={Classes.DIALOG_BODY}>
            <FormGroup label="Name">
              <InputGroup
                name="name"
                value={values["name"]}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup label="Category">
              <FetchAndSelect
                id="f-category"
                name="category"
                initialValue={values["category"]}
                value={values["category"]}
                onChange={async ({ value }) => {
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
            </FormGroup>
          </div>
          <div className={Classes.DIALOG_FOOTER}>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
              <Button
                intent="danger"
                minimal
                text="Cancel"
                onClick={() => {
                  onClose();
                }}
              />
              <Button
                type="submit"
                loading={isSubmitting}
                intent="primary"
                text="Save"
              />
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};
