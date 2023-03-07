import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: 45,
    backgroundColor: theme?.palette?.mode === "dark" ? "#0a1929" : "#f1f1f1",
  },
  title: {
    textAlign: "center",
    fontSize: "40px !important",
    marginBottom: "32px !important",
    color: "#244B5A",
  },
  newBtn: {
    position: "absolute!important",
    color: "#244B5A!important",
    border: "1px solid #244B5A !important",
    width: 130,
    top: 65,
    right: 32,
    textTransform: "capitalize !important",
  },
  themeIcon: {
    border: "1px solid #244B5A",
    fontSize: 20,
    padding: 8,
    borderRadius: 6,
    color: "#244B5A",
  },
}));
export default useStyles;
