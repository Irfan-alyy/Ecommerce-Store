import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useDispatch } from "react-redux";
import { clearCart } from "../Redux/cartSlice";

const ConfirmDialog = () => {
    const dispatch=useDispatch();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (confirmed) => {
    setOpen(false);
    if (confirmed) {
     dispatch(clearCart())
      // Perform delete or any other action here
    }
  };

  return (
    <div>
      <Button variant="contained" color="warning" onClick={handleClickOpen}>
        Clear Cart
      </Button>

      <Dialog open={open} onClose={() => handleClose(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this item?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={() => handleClose(true)} color="error" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmDialog;
