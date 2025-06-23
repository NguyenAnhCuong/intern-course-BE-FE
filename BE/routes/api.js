const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const nodemailer = require("nodemailer");

// Cấu hình Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// GET /devices: Lấy danh sách thiết bị
router.get("/devices", async (req, res) => {
  try {
    let [rows] = await pool.query("SELECT * FROM devices");

    return res.status(200).json({ EC: 0, data: rows });
  } catch (error) {
    res.status(500).json({ EC: 1, error: error.message });
  }
});

// GET /devices/:id: Lấy chi tiết thiết bị
router.get("/devices/:id", async (req, res) => {
  try {
    let [rows] = await pool.query("SELECT * FROM devices WHERE id = ?", [
      req.params.id,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Device not found" });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /devices: Thêm thiết bị mới
router.post("/devices", async (req, res) => {
  const { id, name, status } = req.body;
  if (!id || !name) {
    return res.status(400).json({ error: "ID and name are required" });
  }
  try {
    await pool.query(
      "INSERT INTO devices (id, name, status) VALUES (?, ?, ?)",
      [id, name, status || "active"]
    );
    res.status(201).json({ message: "Device created" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /devices/:id: Cập nhật thiết bị
router.put("/devices/:id", async (req, res) => {
  const { name, status } = req.body;
  try {
    const [result] = await pool.query(
      "UPDATE devices SET name = ?, status = ? WHERE id = ?",
      [name, status, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Device not found" });
    }
    res.json({ message: "Device updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /devices/:id: Xóa thiết bị
router.delete("/devices/:id", async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM devices WHERE id = ?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Device not found" });
    }
    res.json({ message: "Device deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /iot/data: Lấy dữ liệu IoT
router.get("/iot/data", async (req, res) => {
  const { deviceId, startTime, endTime } = req.query;
  let query = "SELECT * FROM iot_temp_data";
  let params = [];
  if (deviceId || startTime || endTime) {
    query += " WHERE";
    if (deviceId) {
      query += " device_id = ?";
      params.push(deviceId);
    }
    if (startTime) {
      query += deviceId ? " AND" : "";
      query += " timestamp >= ?";
      params.push(startTime);
    }
    if (endTime) {
      query += deviceId || startTime ? " AND" : "";
      query += " timestamp <= ?";
      params.push(endTime);
    }
  }
  try {
    const [rows] = await pool.query(query, params);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /alerts: Lấy danh sách alert
router.get("/alerts", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM alerts");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /alerts: Tạo alert thủ công
router.post("/alerts", async (req, res) => {
  const { deviceId, message, type } = req.body;
  if (!deviceId || !message) {
    return res
      .status(400)
      .json({ error: "Device ID and message are required" });
  }
  try {
    await pool.query(
      "INSERT INTO alerts (device_id, message, type) VALUES (?, ?, ?)",
      [deviceId, message, type || "email"]
    );
    if (type === "email" || !type) {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: "recipient-email@example.com",
        subject: "IoT Manual Alert",
        text: message,
      };
      await transporter.sendMail(mailOptions);
    }
    res.status(201).json({ message: "Alert created" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
