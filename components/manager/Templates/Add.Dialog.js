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

export const TemplatesAddDialog = ({ onClose }) => {
  const onSubmit = useCallback(async (values, { setSubmitting }) => {
    let data = values;
    console.log(data);
    try {
      let res = await client.postTemplate(data);
      console.log(res);
      onClose();
    } catch (err) {
      console.error(err);
    }
    setSubmitting(false);
  }, []);
  return (
    <Formik
      initialValues={{
        category: "",
        name: "",
        content: "",
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
                onClose={() => onClose()}
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
