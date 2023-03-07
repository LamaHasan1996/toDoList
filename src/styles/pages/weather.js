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
  weatherBox: {
    padding: 8,
    border: "1px solid #244B5A",
    borderRadius: 8,
  },
  label: {
    fontWeight: 700,
    color: "#244B5A",
  },
}));
export default useStyles;
