const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const nodemailer = require("nodemailer");
const { verifyToken, requireAdmin } = require("../middleware/authMiddleware");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const { log } = require("console");

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
router.get("/devices/:id", verifyToken, async (req, res) => {
  const deviceId = req.params.id;
  const { id: userId, role } = req.user;

  console.log("User ID:", userId);
  console.log("Device ID:", deviceId);

  try {
    // Nếu là admin thì bỏ qua kiểm tra
    if (role !== "ADMIN") {
      const [permissions] = await pool.query(
        "SELECT * FROM user_device_permissions WHERE user_id = ? AND device_id = ? AND can_view = 1",
        [userId, deviceId]
      );

      console.log("Permissions:", permissions);

      if (permissions.length === 0) {
        return res
          .status(403)
          .json({ message: "Không có quyền truy cập thiết bị này" });
      }
    }

    const [devices] = await pool.query("SELECT * FROM devices WHERE id = ?", [
      deviceId,
    ]);

    if (devices.length === 0)
      return res.status(404).json({ message: "Không tìm thấy thiết bị" });

    res.json(devices[0]);
  } catch (err) {
    res.status(500).json({ message: "Lỗi máy chủ", err: err.message });
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

router.get("/users", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/users", async (req, res) => {
  const { username, email, password, role } = req.body;
  if (!username || !email || !password || !role) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [username, email, hashedPassword, role]
    );
    res.status(201).json({ message: "User created" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/register
router.post("/register", async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Thiếu email hoặc mật khẩu" });

  try {
    const [users] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (users.length > 0)
      return res.status(400).json({ message: "Email đã tồn tại" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO users (id, email, password, name, role) VALUES (?, ?, ?, ?, ?)",
      [uuidv4(), email, hashedPassword, name, "USER"]
    );

    res.status(201).json({ message: "Đăng ký thành công" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi máy chu", err: err.message });
  }
});

// POST /api/login
router.post("/login", async (req, res) => {
  const { name, password } = req.body;

  console.log(name, password);

  try {
    // Truy vấn người dùng theo name
    const [users] = await pool.query("SELECT * FROM users WHERE name = ?", [
      name,
    ]);

    console.log("Users found:", users);

    if (users.length === 0) {
      return res.status(400).json({ message: "Sai tên người dùng" });
    }

    const user = users[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Sai mật khẩu" });
    }

    // Tạo JWT token
    const token = jwt.sign(
      {
        id: user.id, // UUID
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES }
    );

    // Trả về token và role
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
      },
    });
  } catch (err) {
    console.error("Lỗi đăng nhập:", err);
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
});

router.post("/grant", verifyToken, requireAdmin, async (req, res) => {
  const { user_id, device_id } = req.body;

  if (!user_id || !device_id)
    return res.status(400).json({ message: "Thiếu user_id hoặc device_id" });

  try {
    await pool.query(
      "INSERT IGNORE INTO user_device_access (user_id, device_id) VALUES (?, ?)",
      [user_id, device_id]
    );
    res.json({ message: "Cấp quyền thành công" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi máy chủ", err: err.message });
  }
});

module.exports = router;
