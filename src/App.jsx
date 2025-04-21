import { Canvas } from "@react-three/fiber";
import { useState, useEffect } from "react";
import "./App.css";
import MapCanvaer from "./page/MapCanvaer";
import MQTTMessenger from "./page/MQTT";
import Table from "./page/Table";

function App() {
  const [engineCount, setEngineCount] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [start, setStart] = useState(false);
  const [stop, setStop] = useState(false);
  const [direct, setDirect] = useState(true);
  const [engin, setEngin] = useState(null);
  const [movement, setMovement] = useState(null);
  const [mqttData, setMqttData] = useState([]);
  const [len, setLen] = useState();
  // const [changedIndex, setChangedIndex] = useState(null);

  // console.log(changedIndex);


  useEffect(() => {
    setStop(false);
    setStart(false);
    setMovement(null);
  }, [engin]);

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value);
    setEngineCount(isNaN(value) ? 0 : value);
  };

  const handleMqttData = (data) => {
    setMqttData(data);


    // data.forEach((item, index) => {
    //   const prevItem = mqttData.find((i) => (i = i.id === item.id));
    //   if (prevItem) {
    //     if (
    //       item.movement !== prevItem.movement ||
    //       item.speed !== prevItem.speed ||
    //       item.direction !== prevItem.direction
    //     ) 
    //     {
    //       setChangedIndex(index);
          
    //     }

    //   }

      // if(item.movement == true){
      //   setStart(true);
      //   setStop(false);
      // }else if(item.movement == false){
      //   setStart(false);
      //   setStop(true);
      // }
      // // if(item.speed !== 0){
      // //   setSpeed(item.speed)
      // // };
    // };

   
  };

  // useEffect(() => {
  //   setEngin(changedIndex);

    
  // }, [changedIndex, mqttData]);

  useEffect(() => {
    if (mqttData) {
      setLen(mqttData.length);
    } else {
      setLen();
    };
    
  }, [mqttData]);

  return (
    <>
      <div className="canva">
        <div className="web3">
          <Canvas>
            <MapCanvaer
              engineCount={engineCount}
              speed={speed}
              start={start}
              direct={direct}
              engin={engin}
              stop={stop}
              len={len}
            />
          </Canvas>
        </div>

        <div className="control">
          <div
            className="select"
            onChange={(e) => {
              setEngin(e.target.value);
            }}
          >
            <select name="" id="">
              <option hidden>Engin</option>
              {Array.from({ length: engineCount || len }, (_, i) => (
                <option key={i} value={i}>
                  Engin {i + 1}
                </option>
              ))}
            </select>
          </div>
          <div className="add_engin">
            <input
              type="number"
              id="engin"
              className="engin"
              placeholder="Add engin number"
              onChange={handleInputChange}
            />
            {/* <button>Add Engin</button> */}
          </div>

          <div>
            <input
              type="range"
              min={0.1}
              max={1.0}
              step={0.1}
              value={speed}
              onChange={(e) => {
                setSpeed(e.target.value);
              }}
            />
            <p>
              Speed <span>{speed * 65}</span>
            </p>
          </div>

          <div className="btn">
            <button
              className="btn1"
              onClick={() => {
                setStart(true);
                setStop(false);
                setMovement(true);
              }}
            >
              start
            </button>
            <button
              className="btn3"
              onClick={() => {
                setStop(true);
                setStart(false);
                setMovement(false);
              }}
            >
              Stop
            </button>
            <button
              className="btn2"
              onClick={() => {
                setDirect(!direct);
              }}
            >
              {direct ? "Right" : "Left"}
            </button>
          </div>
        </div>
        <Table mqttData={mqttData || []} />
      </div>

      <div>
        <MQTTMessenger
          engineCount={engineCount}
          speed={speed}
          direct={direct}
          engin={engin}
          movement={movement}
          start={start}
          stop={stop}
          onDataReceive={handleMqttData}
        />
      </div>
    </>
  );
}

export default App;
