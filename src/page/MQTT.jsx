

import React, { useState, useEffect } from "react";
import mqtt from "mqtt";

const MQTTMessenger = () => {
  const [message, setMessage] = useState("");
  const [client, setClient] = useState(null);

  useEffect(() => {
    const options = {
        clientId: "react_client_" + Math.random().toString(16).substr(2, 8),
      username: "asr",
      password: "Aa3023189"
      
    };

    const mqttClient = mqtt.connect("ws://192.168.1.90:9001", options);

    mqttClient.on("connect", () => {
      console.log("✅ متصل شد به Mosquitto");
    });

    mqttClient.on("error", (err) => {
      console.error("❌ خطا در اتصال:", err);
    });

    setClient(mqttClient);

    return () => {
      mqttClient.end();
    };
  }, []);

  const handleSend = () => {
    if (client && message) {
      client.publish("my/topic", message, { qos: 0 });
      
      setMessage("");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "2rem auto", textAlign: "center" }}>
      <h2>ارسال پیام با MQTT</h2>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="متن پیام"
        style={{
          padding: "10px",
          width: "80%",
          marginBottom: "1rem",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />
      <br />
      <button
        onClick={handleSend}
        style={{
          padding: "10px 20px",
          borderRadius: "8px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        ارسال
      </button>
    </div>
  );
};

export default MQTTMessenger;
