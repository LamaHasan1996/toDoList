import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 345,
    height: 325,
  },
  archivedCard: {
    backgroundColor: "#c4c4c4!important",
  },
  title: {
    height: 60,
    fontSize: "22px!important",
    display: "-webkit-box",
    overflow: "hidden",
    textOverflow: "ellipsis",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: "2",
    width: "93%",
    "& .green": {
      color: "green",
    },
  },
  description: {
    height: 90,
    fontSize: "16px!important",
    display: "-webkit-box",
    overflow: "hidden",
    textOverflow: "ellipsis",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: "3",
  },
  date: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 8,
  },
  icon: {
    color: "#263661",
    fontSize: 22,
    marginRight: 8,
  },
  deleteIcon: {
    color: "red!important",
    marginLeft: "8px",
  },
  pointerIcon: {
    cursor: "pointer",
  },
  width7: {
    width: "7%",
  },
}));
export default useStyles;
