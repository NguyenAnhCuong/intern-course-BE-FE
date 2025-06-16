const mqtt = require('mqtt');

const deviceId = 'device_gas_001';
const client = mqtt.connect('mqtt://broker.hivemq.com');

client.on('connect', () => {
  console.log(`${deviceId} connected`);

  setInterval(() => {
    const gasLevel = (Math.random() * 100).toFixed(2);
    const payload = JSON.stringify({
      deviceId,
      gas: parseFloat(gasLevel),
      timestamp: new Date().toISOString()
    });

    client.publish('iot/device/data', payload, { qos: 1 }, () => {
      console.log(`📤 [GAS] Sent: ${payload}`);
    });
  }, 5000);
});
