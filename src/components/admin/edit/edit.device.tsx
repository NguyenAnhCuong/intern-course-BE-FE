"use client";

import {
  Box,
  Button,
  Container,
  TextField,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

// Constants
const DEVICE_TYPES = [
  { value: "device_temp", label: "Temperature" },
  { value: "device_gas", label: "Gas" },
];

const DEVICE_STATUS = [
  { value: "active", label: "Active" },
  { value: "deactive", label: "Deactive" },
];

type DeviceStatus = "active" | "deactive";
type DeviceType = "device_temp" | "device_gas";

const EditDevice = ({ id }: { id: string }) => {
  const router = useRouter();
  const { data: session } = useSession();

  const [loading, setLoading] = useState<boolean>(true);
  const [idSuffix, setIdSuffix] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [status, setStatus] = useState<DeviceStatus>("active");
  const [type, setType] = useState<DeviceType>("device_temp");

  const getPrefix = () => `${type}_`;

  useEffect(() => {
    if (session) fetchDevice();
  }, [id, session]);

  const fetchDevice = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/devices/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Không thể tải dữ liệu thiết bị");

      const data = await res.json();

      setName(data.name);
      setStatus(data.status);

      if (data.id?.startsWith("device_temp_")) {
        setType("device_temp");
        setIdSuffix(data.id.replace("device_temp_", ""));
      } else if (data.id?.startsWith("device_gas_")) {
        setType("device_gas");
        setIdSuffix(data.id.replace("device_gas_", ""));
      }
    } catch (error) {
      console.error(error);
      alert("Lỗi khi tải thiết bị.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      alert("Tên thiết bị không được để trống!");
      return;
    }

    const fullId = `${getPrefix()}${idSuffix}`;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/devices/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: fullId, name, status }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(`Lỗi: ${data.error || "Cập nhật thất bại"}`);
        return;
      }

      alert("Cập nhật thiết bị thành công!");
      router.push("/admin/devices");
    } catch (error) {
      console.error(error);
      alert("Lỗi khi gửi yêu cầu cập nhật");
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container>
      <Box sx={{ fontSize: { md: 24, xs: 16 }, fontWeight: 700 }}>
        Edit Device
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
            disabled
            label="Select device type"
            value={type}
          >
            {DEVICE_TYPES.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            sx={{ mx: 5 }}
            fullWidth
            disabled
            variant="standard"
            label="Device ID"
            value={`${getPrefix()}${idSuffix}`}
          />
        </div>

        <div>
          <TextField
            variant="standard"
            select
            label="Select device status"
            value={status}
            onChange={(e) => setStatus(e.target.value as DeviceStatus)}
          >
            {DEVICE_STATUS.map((option) => (
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
          <Button variant="outlined" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </Box>
    </Container>
  );
};

export default EditDevice;
