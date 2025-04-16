import styled from "./Table.module.css"

export default function Table({mqttData}) {
  return (
    <>
    <table className={styled.Table}>
      <thead className={styled.thead}>
        <tr>
            <th>ID</th>
            <th>Movement</th>
            <th>Speed</th>
            <th>Direction</th>
            <th>Current</th>
            <th>Sensor A</th>
            <th>Sensor B</th>
            <th>Sensor C</th>
            <th>Sensor D</th>
            <th>Sensor E</th>
        </tr>
      </thead>
      <tbody>
          {mqttData.map((motor, index)=>(
            <tr key={index}>
              <td>{index + 1}</td>
              <td> {!motor.movement ? "start" : "stop"} </td>
              <td> {motor.speed} RPM </td>
              <td>{ !motor.direction ? "backward" : "forward"}</td>
              <td>021 A </td>
              <td>--</td>
              <td>--</td>
              <td>--</td>
              <td>--</td>
              <td>--</td>
            </tr>
          ))}
      </tbody>
    </table>
    </>
  )
}
