import { Field } from "formik";
import { TextField } from "formik-material-ui";
import React from "react";

function TextFieldComponent(props) {
  return <Field component={TextField} {...props} />;
}

export default TextFieldComponent;
