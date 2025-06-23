require("dotenv").config();
const express = require("express");
const mqtt = require("mqtt");
const nodemailer = require("nodemailer");
const mysql = require("mysql2/promise");
const cors = require("cors");

const app = express();

const port = 8000;
const deviceRouter = require("./routes/api.js");
app.use(cors());
app.use(express.json());
app.use("/api", deviceRouter); // gắn router

// ✅ Kết nối CSDL
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3307,
});

// ✅ Kết nối MQTT Broker
const mqttClient = mqtt.connect(
  process.env.MQTT_BROKER || "mqtt://broker.hivemq.com",
  {
    clientId: "server_" + Math.random().toString(16).substr(2, 8),
  }
);

mqttClient.on("connect", () => {
  console.log("✅ MQTT connected");
  mqttClient.subscribe("iot/device/data", { qos: 1 }, (err) => {
    if (err) console.error("❌ Subscribe error:", err.message);
    else console.log("📡 Subscribed to: iot/device/data");
  });
});

mqttClient.on("error", (err) => {
  console.error("❌ MQTT error:", err.message);
});

// ✅ Hàm gửi email cảnh báo
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendEmailAlert(data) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "lufyvsnaruto11@gmail.com", //  email
    subject: "🔥 Cảnh báo từ thiết bị IoT",
    text: `Thiết bị ${data.deviceId} báo nhiệt độ/gas cao: ${
      data.temperature || data.gas
    } lúc ${data.timestamp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("📧 Email alert sent");
  } catch (error) {
    console.error("❌ Gửi email lỗi:", error.message);
  }
}

// ✅ Hàm chọn bảng theo loại thiết bị
function getTableNameFromDeviceId(deviceId) {
  if (deviceId.startsWith("device_temp")) return "iot_temp_data";
  if (deviceId.startsWith("device_gas")) return "iot_gas_data";
  return "iot_data";
}

// ✅ Xử lý dữ liệu từ MQTT
mqttClient.on("message", async (topic, message) => {
  try {
    const data = JSON.parse(message.toString());
    console.log("📥 Nhận:", data);

    const formattedTimestamp = new Date(data.timestamp)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    const tableName = getTableNameFromDeviceId(data.deviceId);

    await pool.query(
      `INSERT INTO ${tableName} (device_id, temperature, gas, timestamp) VALUES (?, ?, ?, ?)`,
      [
        data.deviceId,
        data.temperature || null,
        data.gas || null,
        formattedTimestamp,
      ]
    );

    console.log(`💾 Dữ liệu lưu vào bảng ${tableName}`);

    // Gửi email nếu vượt ngưỡng
    if (
      (data.temperature && data.temperature > 35) ||
      (data.gas && data.gas > 80)
    ) {
      await sendEmailAlert(data);
    }
  } catch (err) {
    console.error("❌ Lỗi xử lý dữ liệu:", err.message);
  }
});

// ✅ API kiểm tra
app.get("/status", (req, res) => {
  res.json({ status: "✅ Server running and MQTT connected" });
});

app.listen(port, () => {
  console.log(`🚀 Server listening at http://localhost:${port}`);
});
