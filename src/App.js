import "./styles.css";
import { useState, useEffect } from "react";

export default function App() {
  const [counter, setCounter] = useState(0);
  const [StCounter, setStCounter] = useState(false);
  const [hour, sethour] = useState(0);
  const [min, setmin] = useState(0);
  const [Second, setSecond] = useState(0);
  const [lap, setLap] = useState([]);

  useEffect(() => {
    if (StCounter) {
      setTimeout(() => {
        let count = counter;
        count++;
        setCounter(count);
      }, 15);
    }
    if (counter === 60) {
      let count = Second;
      count++;
      setSecond(count);
      setCounter(0);
    }
    if (Second === 60) {
      let count = min;
      count++;
      setmin(count);
      setSecond(0);
    }
    if (min === 60) {
      let count = hour;
      count++;
      sethour(count);
      setmin(0);
    }
  }, [StCounter, counter, min, hour, Second]);
  const resetCounter = () => {
    setStCounter(false);
    setTimeout(() => {
      setmin(0);
      sethour(0);
      setSecond(0);
      setCounter(0);
      setLap([]);
    }, 100);
  };
  const lapCounter = () => {
    let tempLap = `${hour < 10 ? `0${hour}` : hour}:${
      min < 10 ? `0${min}` : min
    }:${Second < 10 ? `0${Second}` : Second}:${
      counter < 10 ? `0${counter}` : counter
    }`;
    setLap([...lap, tempLap]);
    // alert(lap);
  };
  const btnStyle = {
    fontSize: 20,
    marginRight: 10
  };
  const HeaderSt = {
    fontSize: 30,
    fontWeight: 600,
    marginBottom: 20
  };
  const TimerContainer = {
    fontSize: 30,
    marginBottom: 10
  };
  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <div style={HeaderSt}>REACT STOP WATCH</div>
        <div style={TimerContainer}>
          {hour < 10 ? `0${hour}` : hour}:{min < 10 ? `0${min}` : min}:
          {Second < 10 ? `0${Second}` : Second}:
          {counter < 10 ? `0${counter}` : counter}
        </div>
        <div>
          <button style={btnStyle} onClick={() => setStCounter(true)}>
            Start
          </button>
          <button style={btnStyle} onClick={() => setStCounter(false)}>
            Stop
          </button>
          <button style={btnStyle} onClick={() => lapCounter()}>
            Lap
          </button>
          <button style={btnStyle} onClick={() => resetCounter()}>
            Reset
          </button>
        </div>
        {lap.length > 0 && (
          <div
            style={{
              marginTop: 20,
              overflow: "scroll",
              maxHeight: "60vh",
              border: "5px solid red",
              padding: 10
            }}
          >
            {lap.map((res, i) => {
              return (
                <div style={{ marginBottom: 10, fontSize: 16 }}>
                  Lap {i + 1}: {res}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
