import { Canvas } from "@react-three/fiber";
import { useState,useEffect } from "react";
import "./App.css";
import MapCanvaer from "./page/MapCanvaer";
import MQTTMessenger from "./page/MQTT";

function App() {

  const [engineCount, setEngineCount] = useState(0);
  const [speed , setSpeed] = useState(1);
  const [start, setStart] = useState(false);
  const [stop, setStop] = useState(false);
  const [direct , setDirect] = useState(false);
  const [engin , setEngin] = useState(null);
 
  console.log(start , stop);


  useEffect(()=>{
    setStop(false);
    setStart(false)
  },[engin])


  

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value);
    setEngineCount(isNaN(value) ? 0 : value);
  };


  return (
    <>
      <div className="canva">
        <div className="web3">
          <Canvas>
            <MapCanvaer engineCount={engineCount} speed={speed} start={start} direct={direct} engin={engin} stop={stop} />
          </Canvas>
        </div>

        <div className="control">

          <div className="select" onChange={(e)=>{setEngin(e.target.value)}}>
            <select name="" id="">
              <option hidden>Engin</option>
              {/* <option value={0}>Engin 1</option> */}
              {Array.from({length : engineCount}, (_,i) =>(
                <option key={i} value={i}>
                  Engin {i+1}
                </option>
              ))}
            </select>
          </div>
          <div className="add_engin">
            <input type="number" id="engin" className="engin" placeholder="Add engin number" onChange={handleInputChange}/>
            {/* <button>Add Engin</button> */}

          </div>

          <div>
            <input type="range" min={1} max={6} value={speed} onChange={(e)=>{setSpeed(e.target.value)}}/>
            <p>Speed <span>{speed}</span></p>
          </div>

          <div className="btn">
            <button className="btn1" onClick={()=>{setStart(true); setStop(false)}}>start</button>
            <button className="btn3" onClick={()=>{setStop(true); setStart(false)}}>Stop</button>
            <button className="btn2" onClick={()=>{setDirect(!direct)}}>{direct? "Right" : "Left"}</button>
          </div>
        </div>
      </div>

      <div>
        <MQTTMessenger/>
      </div>
    </>
  );
}

export default App;
