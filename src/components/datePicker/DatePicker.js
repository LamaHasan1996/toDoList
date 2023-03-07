import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Field } from "formik";

export default function DatePickerComponent(props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Field component={DatePicker} {...props} />
    </LocalizationProvider>
  );
}
