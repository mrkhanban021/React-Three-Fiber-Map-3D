/* eslint-disable react-hooks/exhaustive-deps */


import React, { useState, useEffect } from "react";
import mqtt from "mqtt";
import { toast } from "react-toastify";

const MQTTMessenger = ({engineCount, speed, movement, direct, engin, onDataReceive}) => {
  const [client, setClient] = useState(null);
  const [motors, setMotors] = useState([]);
  const [data, setData] = useState(null)

  useEffect(()=>{
    if(engineCount > 0){
      const initialMotors = Array.from({length : engineCount}, (_, index)=>({
        id: index +1,
        movement: movement,
        speed: 0,
        direction : "forward"
      }));
      setMotors(initialMotors);
    }
    
  },[engineCount]);
  
  
  useEffect(()=>{
    if(engin !== null && motors[engin] !== undefined){
      setMotors((prevMotors)=>{
        const updtaeMotors = [...prevMotors];
        updtaeMotors[engin] = {
          ...updtaeMotors[engin],
          movement: movement,
          speed: speed,
          direction : direct
        }
        return updtaeMotors;
      });
    }
  },[engin, movement,speed,direct]);




  useEffect(() => {

    const options = {
        clientId: "react_client_" + Math.random().toString(16).substr(2, 8),
      username: "asr",
      password: "Aa3023189"
      
    };

    const mqttClient = mqtt.connect("ws://192.168.1.90:9001", options);

    mqttClient.on("connect", () => {
      toast.success("Conncted Mosquitto");
      mqttClient.subscribe("my/topic", (err)=>{
        if(err){
          toast.error("error");
        } else{
          toast.success(" Subscribed to topic: my/topic");
        }
      })
    });

    mqttClient.on("message", (topic , message)=>{
        const parsData = JSON.parse(message.toString());
        setData(parsData)
     
    });

    mqttClient.on("error", (err) => {
      toast.error("❌", err);
    });
    setClient(mqttClient);

    return () => {
      mqttClient.end();
    };
  
  }, []);


  useEffect(()=>{

   
    if(data && onDataReceive){
      onDataReceive(data)
    }
  },[data])




  useEffect(()=>{

    
    if(client && motors.length > 0){
      const messageToSend = JSON.stringify(motors)
      client.publish(`my/topic`, messageToSend, { qos: 0 });
    }

  },[motors, client])


  return (
    <>
    </>
  )
};

export default MQTTMessenger;
