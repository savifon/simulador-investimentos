import React from "react";

import { Field, ErrorMessage } from "formik";
import { BoxField } from "./styles";

const FieldInput = ({
  type,
  label,
  name,
  className,
  readOnly,
  placeholder,
  error,
  touched,
}) => {
  return (
    <BoxField className={error && touched && "error"}>
      <label htmlFor={name}>{label}</label>
      <Field
        type={type ? type : "text"}
        name={name}
        id={name}
        className={className}
        readOnly={readOnly}
      />
      {placeholder && <span className="placeholder">{placeholder}</span>}
      <ErrorMessage name={name} component="span" className="error" />
    </BoxField>
  );
};

export default FieldInput;
