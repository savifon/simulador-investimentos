import React from "react";

import { Field, ErrorMessage } from "formik";

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
    <div className={error && touched && "error"}>
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
    </div>
  );
};

export default FieldInput;
