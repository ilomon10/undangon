import { generateId } from "components/utils/generateId";
import { useContext, useReducer } from "react";
import { createContext } from "react";

export const GlobalFormContext = createContext();

const fieldsReducer = (fields, action) => {
  switch (action.type) {
    case "add":
      fields[action.field.name || generateId(6)] = action.field;
      return fields;
    case "remove":
      delete fields[action.field.name];
      return fields;
    case "edit":
      fields[action.field.name] = {
        ...fields[action.field.name],
        ...action.field,
      };
      return fields;
  }
};

export const GlobalFormProvider = ({ children }) => {
  const [fields, dispatchFields] = useReducer(fieldsReducer, {});

  return (
    <GlobalFormContext.Provider
      value={{
        fields,
        dispatchFields,
      }}
    >
      {children}
    </GlobalFormContext.Provider>
  );
};

export const useGlobalForm = () => {
  const globalForm = useContext(GlobalFormContext);
  return globalForm;
};
