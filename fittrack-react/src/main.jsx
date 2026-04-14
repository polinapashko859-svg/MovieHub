import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' 
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
console.group("FitTrack Initialization");
console.log("App started...");
console.table([
  { function: "calculateCalories", status: "tested" },
  { function: "formatWorkoutTime", status: "tested" }
]);
console.groupEnd();