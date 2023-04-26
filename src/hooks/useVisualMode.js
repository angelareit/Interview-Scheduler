import { useState } from "react";


// export default function useVisualMode(initial) {
//   const [mode, setMode] = useState(initial);
//   const [history, setHistory] = useState([initial]);

//   function transition(newMode, replace = false) {
//     setMode(newMode);
//     const newHistory = [...history];
//     if (replace) {
//       newHistory.pop();
//     }
//     newHistory.push(newMode);
//     setHistory(prev => ([...prev, newHistory]));
//   }

//   function back() {
//     const newHistory = [...history];
//     if (newHistory.length > 1) {
//       newHistory.pop();
//     }

//     setHistory(prev => ([...prev,newHistory]));
//     setMode(newHistory[newHistory.length - 1]);
//   }

//   return { mode, transition, back, history };
// }

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    setHistory(prev => replace ? [...prev.slice(0, -1), newMode]: [...prev, newMode]);
  }

  function back() {
    if (history.length > 1) {
      setHistory(prev => [...prev.slice(0,-1)]);
    }
  }

  return { mode: history[history.length - 1], transition, back, history };
}

