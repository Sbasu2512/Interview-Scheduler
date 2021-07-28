import { useState, useEffect } from "react";

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
/**setPerson(prevPerson => {
    return { 
      ...prevPerson, 
      age: prevPerson.age + 1 
    }
  }) */

  useEffect(() => {
    setMode(history[history.length - 1]);
  },[history])



  const transition = (newMode, replace = false) => {
    setMode(newMode);
    if (!replace) {
      setHistory(prevHistory => [...prevHistory, newMode]);
    } else {
      setMode(newMode);
    }
  };

  const back = () => {
    if (history.length > 1) {
      setHistory(prevHistory => prevHistory.pop()) ;
    }
  };

  return { mode, transition, back };
};
export default useVisualMode;
