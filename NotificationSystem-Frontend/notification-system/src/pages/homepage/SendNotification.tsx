import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { AccountCircle } from "@mui/icons-material";
import axios from "axios";
import formattedTime from "./DateFormat";
import { NotificationRequest } from "../../components/models/notification/notificationRequest";
import { BACKEND_BASE_URL } from "../../constant";

const SendNotif = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [email, setEmail] = useState("");
  const [context, setContext] = useState("");

  const sendNotification = async () => {
    try {
      const newNotification: NotificationRequest = {
        email: email,
        context: context,
        createdDate: formattedTime,
      };

      const response = await axios.post(
        BACKEND_BASE_URL + "/api/notifications/send",
        newNotification
      );

      handleClose();
      return response;
    } catch (e) {
      console.error("Error sending notification:", e);
    }
  };

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    height: 380,
    bgcolor: "background.paper",
    border: "2px solid green",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
  };
  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "flex-end", m: "45px" }}>
        <Button
          variant="contained"
          onClick={handleOpen}
          size="large"
          style={{ backgroundColor: "rgb(95, 81, 81)", color: "white" }}
        >
          + New Notification
        </Button >
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", m: "1px" }}>
            <Button
              onClick={handleClose}
              size="large"
            >
              <CancelIcon sx={{color: "rgb(95, 81, 81)",fontSize: '2rem' }}/>
            </Button>
          </Box>

          <Box
            sx={{
              fontWeight: "bold",
              position: "absolute",
              top: "0",
              left: "0",
              m: "25px",
            }}
          >
            New Notification
          </Box>

          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <AccountCircle sx={{ color: "action.active", mr: 1, my: -0.5 }} />
            <TextField
              id="input-with-sx"
              label="To"
              variant="standard"
              sx={{ width: "460px", height: "40px" }}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TextField
              id="filled-multiline-static"
              label="subject"
              multiline
              rows={4}
              defaultValue=""
              variant="filled"
              sx={{ width: "460px", height: "100px", left: " 35px" }}
              onChange={(e) => setContext(e.target.value)}
            />
          </Typography>
          <Box
            sx={{ position: "fixed", bottom: "25px", right: "90px", m: "1px" }}
          >
            <Button
              onClick={sendNotification}
              variant="contained"
              sx={{ backgroundColor: 'rgb(95, 81, 81)' }}
              size="large"
            >
              Send
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default SendNotif;
