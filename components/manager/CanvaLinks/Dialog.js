import {
  Button,
  Callout,
  Classes,
  FormGroup,
  InputGroup,
} from "@blueprintjs/core";
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
  onErrorSubmitted,
  defaultValue = {},
}) => {
  const onSubmit = useCallback(async (values, { setSubmitting }) => {
    let { template, ...data } = values;
    try {
      let res = await client.postCanvaLink(data);
      onSubmitted();
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
          <div className={Classes.DIALOG_BODY}>
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
              label="Link"
              intent={errors["link"] && "danger"}
              helperText={errors["link"]}
            >
              <InputGroup
                intent={errors["link"] && "danger"}
                name="link"
                value={values["link"]}
                onChange={handleChange}
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
                text="Save"
              />
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};
