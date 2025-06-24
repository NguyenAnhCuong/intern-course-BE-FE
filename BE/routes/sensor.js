router.get('/my-data', verifyToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const [rows] = await db.promise().query(`
      SELECT s.*
      FROM sensor_logs s
      JOIN user_device_access a ON s.device_id = a.device_id
      WHERE a.user_id = ?
      ORDER BY s.timestamp DESC
      LIMIT 100
    `, [userId]);

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi máy chủ' });
  }
});
