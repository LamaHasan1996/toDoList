import { AiOutlineCloseCircle } from "react-icons/ai";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <AiOutlineCloseCircle />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function ToDoDialog(props) {
  let { openDialog, setOpenDialog, displayedData } = props;

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openDialog}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {displayedData?.title}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>{displayedData?.description}</Typography>
        </DialogContent>
      </Dialog>
    </div>
  );
}
