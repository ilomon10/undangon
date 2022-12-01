import { Button, Classes, FormGroup, HTMLSelect, InputGroup } from "@blueprintjs/core"
import client from "components/client"
import { FetchAndSelect } from "components/Select/FetchAndSelect"
import { Formik } from "formik"

export const TemplatesAddDialog = () => {
  return (
    <Formik
      initialValues={{
        category: "",
        name: "",
        content: ""
      }}
    >
      {({ values, handleSubmit, setFieldValue, handleChange }) =>
        <form onSubmit={handleSubmit}>
          <div className={Classes.DIALOG_BODY}>
            <FormGroup label="Template Name">
              <InputGroup />
            </FormGroup>
            <FormGroup label="Category">
              <FetchAndSelect
                id="f-category"
                name="category"
                initialValue={values["category"]}
                onChange={async ({ value }) => {
                  await setFieldValue("category", value);
                }}
                fetchCallback={() => {
                  return client.category();
                }}
                onFetched={(items) => {
                  return items.map((item) => {
                    return {
                      label: item["name"],
                      value: item["id"]
                    }
                  })
                }}
              />
            </FormGroup>
          </div>
          <div className={Classes.DIALOG_FOOTER}>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
              <Button type="submit" intent="danger" minimal text="Cancel" />
              <Button type="submit" intent="primary" text="Create" />
            </div>
          </div>
        </form>
      }
    </Formik>
  )
}