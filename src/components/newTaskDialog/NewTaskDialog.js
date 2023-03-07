import { Box, Button, IconButton, InputLabel } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Formik } from "formik";
import * as React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import * as Yup from "yup";
import useStyles from "../../styles/components/newTaskDialog/newTaskDialog";
import CustomTextAutoSize from "../autoSize/AutoSize";
import TextField from "../textField/TextField";
import DatePicker from "../datePicker/DatePicker";

export default function NewTaskDialog(props) {
  let {
    openFormDialog,
    setOpenFormDialog,
    addNewTask,
    updatedItem,
    updateTask,
  } = props;
  const dialogClasses = useStyles();
  const handleClose = () => {
    setOpenFormDialog(false);
  };
  let initialValues = {
    title: updatedItem?.title ? updatedItem?.title : "",
    description: updatedItem?.description ? updatedItem?.description : "",
    createdAt: updatedItem?.createdAt ? new Date(updatedItem?.createdAt) : null,
  };
  let validationSchema = Yup.object({
    title: Yup.string().required("required"),
    description: Yup.string().required("required"),
    createdAt: Yup.date()
      .typeError("required")
      .required("required")
      .min(new Date(), "Please Choose date after today"),
  });

  const onSubmit = (values) => {
    if (updatedItem && updatedItem?.id) updateTask(values);
    else addNewTask(values);
  };
  return (
    <Dialog open={openFormDialog} onClose={handleClose}>
      <DialogTitle>New Task</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <AiOutlineCloseCircle />
      </IconButton>
      <DialogContent>
        <DialogContentText>
          To Add New Task, please enter all Required Information.
        </DialogContentText>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize={true}
        >
          {(formik) => (
            <Box>
              <Box mb={2} mt={2}>
                <InputLabel
                  htmlFor="title"
                  required
                  className={dialogClasses.label}
                >
                  title
                </InputLabel>
                <TextField
                  name="title"
                  type="text"
                  id="title"
                  variant="outlined"
                  className={dialogClasses.input}
                />
              </Box>
              <Box mb={2} mt={2}>
                <InputLabel
                  htmlFor="description"
                  required
                  className={dialogClasses.label}
                >
                  description
                </InputLabel>
                <CustomTextAutoSize
                  name="description"
                  value={formik?.values?.description}
                  onChange={(e) => {
                    formik?.setFieldValue("description", e?.target?.value);
                  }}
                  type="text"
                  id="description"
                  variant="outlined"
                  className={dialogClasses.inputAutoSize}
                />
                {formik?.touched?.description && formik?.errors?.description ? (
                  <span
                    style={{
                      color: "#d32f2f",
                      margin: "3px 14px 0px",
                      fontSize: "0.75rem",
                    }}
                  >
                    {formik?.errors?.description}
                  </span>
                ) : null}
              </Box>
              <Box mb={2} mt={2}>
                <InputLabel
                  htmlFor="createdAt"
                  required
                  className={dialogClasses.label}
                >
                  start date
                </InputLabel>
                <DatePicker
                  name="createdAt"
                  id="createdAt"
                  className={dialogClasses.input}
                  onChange={(e) =>
                    formik?.setFieldValue("createdAt", new Date(e))
                  }
                />
                {formik?.touched?.createdAt && formik?.errors?.createdAt ? (
                  <span
                    style={{
                      color: "#d32f2f",
                      margin: "3px 14px 0px",
                      fontSize: "0.75rem",
                    }}
                  >
                    {formik?.errors?.createdAt}
                  </span>
                ) : null}
              </Box>
              <Button
                onClick={(e) => formik?.submitForm()}
                className={dialogClasses.submitBtn}
              >
                Submit
              </Button>
            </Box>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
