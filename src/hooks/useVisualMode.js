import { useState } from "react";

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  // const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if (!replace) {
      const replacedMode = [...mode];
      replacedMode.pop()
      replacedMode.push(newMode)
      setMode(replacedMode);
      // history.push(newMode);
    } else {
      setMode([...mode, newMode]);
    }
  };

  const back = () => {
    const poppedArr = [...mode];
    if (poppedArr.length > 1) {
      poppedArr.pop();
      setMode(poppedArr);
    }
    setMode(poppedArr);
  };
  const currentMode = mode.slice(-1)[0];
  return { mode: currentMode, transition, back };
};
export default useVisualMode;
