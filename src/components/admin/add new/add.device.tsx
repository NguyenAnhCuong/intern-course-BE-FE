"use client";

import { Box, Button, Container } from "@mui/material";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { useRouter } from "next/navigation";

const deviceType = [
  {
    value: "device_temp",
    label: "Temperature",
  },
  {
    value: "device_gas",
    label: "Gas",
  },
];

const deviceStatus = [
  {
    value: "active",
    label: "Active",
  },
  {
    value: "deactive",
    label: "Deactive",
  },
];

const AddDevicePage = () => {
  const router = useRouter();
  const [idSuffix, setIdSuffix] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [status, setStatus] = useState<"active" | "deactive">("active");
  const [type, setType] = useState<"device_temp" | "device_gas">("device_temp");

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const prefix = `${type}_`;
    const input = e.target.value;
    const suffix = input.startsWith(prefix)
      ? input.slice(prefix.length)
      : input;
    setIdSuffix(suffix);
  };

  const getPrefix = () => `${type}_`;

  const handleSubmit = async () => {
    const fullId = `${getPrefix()}${idSuffix}`; // Gộp prefix và suffix

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/devices`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: fullId,
        name,
        status,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Device added successfully!");
      router.push("/admin/devices");
    } else {
      alert(`Error: ${data.error}`);
      return;
    }
  };

  return (
    <Container>
      <Box sx={{ fontSize: { md: 24, xs: 16 }, fontWeight: 700 }}>
        Add New Device
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 5,
          mt: 3,
          "& .MuiTextField-root": {
            width: { xs: "10ch", sm: "20ch", md: "28ch" },
          },
        }}
      >
        <div>
          <TextField
            variant="standard"
            select
            label="Select device type"
            value={type}
            onChange={(e) => {
              setType(e.target.value as "device_temp" | "device_gas");
              setIdSuffix(""); // reset lại suffix nếu đổi type
            }}
          >
            {deviceType.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            sx={{ mx: 5 }}
            fullWidth
            variant="standard"
            label="ID"
            value={`${getPrefix()}${idSuffix}`}
            onChange={handleIdChange}
          />
        </div>
        <div>
          <TextField
            variant="standard"
            select
            label="Select device status"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value as "active" | "deactive");
            }}
          >
            {deviceStatus.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            sx={{ mx: 5 }}
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Device Name"
          />
        </div>
        <div>
          <Button
            variant="outlined"
            onClick={() => {
              handleSubmit();
            }}
          >
            Submit
          </Button>
        </div>
      </Box>
    </Container>
  );
};

export default AddDevicePage;
