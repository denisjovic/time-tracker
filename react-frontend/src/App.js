import React, {useState, useEffect} from "react";
import './App.css'

const App = () => {
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const [taskName, setTaskName] = useState()
  const [taskDescription, setTaskDescription] = useState()

  useEffect(() => {
    let interval = null;

    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1000);
      }, 1000);
    } else if (!timerOn) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerOn]);


  return (
    <div className="Timers">
      <h2>TimeTracker</h2>
      {taskName && <h2>Task: {taskName} </h2>}
      <div id="display">
      <input type="text" placeholder="What are you working on?" value={taskName} onChange={e => setTaskName(e.target.value)}/>
        {/* add zero, than slice, for formatting */}
        <span>{("0" + Math.floor((time / 3600000))).slice(-1)}:</span>
        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
      </div>

      <div id="buttons">
        {!timerOn && time === 0 && (
          <button onClick={() => setTimerOn(true)}>Start</button>
        )}
        {timerOn && <button onClick={() => setTimerOn(false)}>Stop</button>}
        {!timerOn && time > 0 && (
          <button onClick={() => setTime(0)}>Reset</button>
        )}
        {!timerOn && time > 0 && (
          <button onClick={() => setTimerOn(true)}>Resume</button>
        )}
      </div>
    </div>
  );
};

export default App;