import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  label: {
    color: "#244B5A!important",
    textTransform: "capitalize",
    "& .MuiInputLabel-asterisk": {
      color: "red",
    },
  },
  input: {
    width: "100%",
    "& .MuiInputBase-root .MuiInputBase-input": {
      height: 11,
    },
  },
  inputAutoSize: {
    borderRadius: "10px",
    width: "95%",
    background: "#FFFFFF",
    minHeight: "41px!important",
    padding: "16.5px 14px",
    maxWidth: "100%",
    minWidth: "80%",
  },
  submitBtn: {
    color: "#244B5A!important",
    border: "1px solid #244B5A !important",
    width: 130,
    textTransform: "capitalize !important",
  },
}));
export default useStyles;
