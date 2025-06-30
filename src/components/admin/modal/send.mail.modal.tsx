"use client";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { useState } from "react";

interface SendMailModalProps {
  open: boolean;
  onClose: () => void;
}

const SendMailModal: React.FC<SendMailModalProps> = ({ open, onClose }) => {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    deviceId: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {};

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Send Email</DialogTitle>
      <DialogContent>
        <Box
          mt={2}
          display="flex"
          flexDirection="column"
          gap={2}
          sx={{ width: "300px" }}
        >
          <TextField
            label="Device ID"
            name="deviceId"
            value={formData.deviceId}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            required
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancle</Button>
        <Button
          onClick={() => {
            handleSubmit();
          }}
        >
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SendMailModal;
