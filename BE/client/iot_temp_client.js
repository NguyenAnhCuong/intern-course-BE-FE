const mqtt = require('mqtt');

const deviceId = 'device_temp_001';
const client = mqtt.connect('mqtt://broker.hivemq.com');

client.on('connect', () => {
  console.log(`${deviceId} connected`);

  setInterval(() => {
    const temperature = (Math.random() * 10 + 25).toFixed(2);
    const payload = JSON.stringify({
      deviceId,
      temperature: parseFloat(temperature),
      timestamp: new Date().toISOString()
    });

    client.publish('iot/device/data', payload, { qos: 1 }, () => {
      console.log(`📤 [TEMP] Sent: ${payload}`);
    });
  }, 5000);
});
