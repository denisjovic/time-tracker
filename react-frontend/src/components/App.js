import React, {useState, useEffect} from "react";
import '../App.css';

const App = () => {
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showTask, setShowTask] = useState(false);
  const [task, setTask] = useState("");

  const handleInput = (e) => {
    setInputValue(e.target.value);  
  }

  const handleTask = () => {
    setTask(inputValue)
    setShowTask(true)
    setInputValue("")

  }

 
  useEffect(() => {
    let interval = null;

    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1000);
      }, 1000);
    } else if (!timerOn) {
      clearInterval(interval);
    }

    // prevents memory leaks
    return () => clearInterval(interval);
  }, [timerOn]);


  return (
    <div className="timers">
      <h1>TimeTracker</h1>
      <div className="focus">
      <input type="text" placeholder="What are you working on?" value={inputValue} onChange={handleInput}/>
      <button type="submit" onClick={() => handleTask()}>Add task</button>
      </div>
      <div id="display">
           {/* add zero, plus slice, for formatting the counter*/}
        <span>{("0" + Math.floor((time / 3600000))).slice(-1)}:</span>
        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
      </div>

      <div id="buttons">
        {!timerOn && time === 0 && (
          <button id="start" onClick={() => setTimerOn(true)}>Start</button>
        )}
        {timerOn && <button onClick={() => setTimerOn(false)}>Stop</button>}
        {!timerOn && time > 0 && (
          <button onClick={() => setTime(0)}>Reset</button>
        )}
        {!timerOn && time > 0 && (
          <button onClick={() => setTimerOn(true)}>Resume</button>
        )}
          { showTask && <h3>Current focus: {task}</h3> }
      </div>
    </div>
  );
};

export default App;