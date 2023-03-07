import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import clsx from "clsx";
import moment from "moment";
import { AiOutlineDelete } from "react-icons/ai";
import {
  BsCalendar2CheckFill,
  BsCalendarCheck,
  BsCalendarEvent,
} from "react-icons/bs";
import { CiRead } from "react-icons/ci";
import { TiInputChecked } from "react-icons/ti";
import useStyles from "../../styles/components/card/card";
import swal from "sweetalert2";
import { FiEdit2 } from "react-icons/fi";
import { TbSquareArrowDown } from "react-icons/tb";
export default function ToDoCard(props) {
  const cardClasses = useStyles();
  let {
    title,
    description,
    checked,
    createdAt,
    finishedAt,
    archievedAt,
    id,
    archived,
  } = props?.item;
  let {
    setOpenDialog,
    setDisplayedData,
    item,
    data,
    setData,
    setUpdatedItem,
    setOpenFormDialog,
    addToArcheive,
  } = props;

  return (
    <Card
      className={
        archived
          ? clsx(cardClasses.archivedCard, cardClasses.card)
          : cardClasses.card
      }
      key={id}
    >
      <CardActionArea>
        <CardContent>
          <Box display="flex" justifyContent={"space-between"}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              className={cardClasses.title}
            >
              {title} {checked && <TiInputChecked className="green" />}
            </Typography>

            <CiRead
              className={clsx(cardClasses.icon, cardClasses.width7)}
              onClick={(e) => {
                setDisplayedData(item);
                setOpenDialog(true);
              }}
            />
          </Box>
          <Typography
            variant="body2"
            color="text.secondary"
            className={cardClasses.description}
          >
            {description}
          </Typography>
          <Box height="85px">
            {" "}
            {createdAt ? (
              <Box className={cardClasses.date}>
                <BsCalendarEvent className={cardClasses.icon} />
                <Typography component="div">
                  {moment(createdAt)?.format("DD-MM-YYYY HH:mm")}
                </Typography>
              </Box>
            ) : null}
            {finishedAt ? (
              <Box className={cardClasses.date}>
                <BsCalendarCheck className={cardClasses.icon} />
                <Typography component="div">
                  {moment(finishedAt)?.format("DD-MM-YYYY HH:mm")}
                </Typography>
              </Box>
            ) : null}
            {archievedAt ? (
              <Box className={cardClasses.date}>
                <BsCalendar2CheckFill className={cardClasses.icon} />
                <Typography component="div">
                  {moment(archievedAt)?.format("DD-MM-YYYY HH:mm")}
                </Typography>
              </Box>
            ) : null}
          </Box>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <AiOutlineDelete
          className={clsx(
            cardClasses.deleteIcon,
            cardClasses.icon,
            cardClasses.pointerIcon
          )}
          onClick={(e) =>
            swal
              .fire({
                title: "Attention !",
                text: "Are You Sure?",
                icon: "warning",
                buttons: true,
                showCancelButton: true,
                cancelButtonText: "Cancel",
                confirmButtonText: "Ok",
                dangerMode: true,
              })
              .then((result) => {
                setData(data?.filter((item) => item?.id !== id));
              })
          }
        />
        <FiEdit2
          className={clsx(cardClasses.pointerIcon, cardClasses.icon)}
          onClick={(e) => {
            setUpdatedItem(item);
            setOpenFormDialog(true);
          }}
        />
        {!archived && (
          <TbSquareArrowDown
            className={clsx(cardClasses.pointerIcon, cardClasses.icon)}
            onClick={(e) => addToArcheive(item)}
          />
        )}
      </CardActions>
    </Card>
  );
}
