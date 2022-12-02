import { Button, Classes, FormGroup, HTMLSelect, InputGroup } from "@blueprintjs/core"
import client from "components/client"
import { FetchAndSelect } from "components/Select/FetchAndSelect"
import { Formik } from "formik"
import { useCallback } from "react"

export const TemplatesAddDialog = () => {
  const onSubmit = useCallback(async (values, { setSubmitting }) => {
    let data = values;
    try {
      let res = await client.content.item.template({
        method: "POST",
        data: { data },
      });
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  }, []);
  return (
    <Formik
      initialValues={{
        category: "",
        name: "",
        content: ""
      }}
      onSubmit={onSubmit}
    >
      {({ values, handleSubmit, setFieldValue, handleChange }) =>
        <form onSubmit={handleSubmit}>
          <div className={Classes.DIALOG_BODY}>
            <FormGroup label="Name">
              <InputGroup name="name" value={values["name"]} onChange={handleChange} />
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
                  let response = await client.content.items.category({
                    method: "GET",
                  });
                  console.log(response);
                  return response;
                }}
                onFetched={(items) => {
                  return items.map((item) => {
                    return {
                      label: item["name"],
                      value: item["_id"]
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