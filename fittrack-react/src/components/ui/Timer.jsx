import React from 'react';

const Timer = ({ minutes }) => (
  <div className="timer" onClick={() => alert(`Таймер запущен на ${minutes} мин.`)}>
    <span className="timer__icon">▶</span>
    <span className="timer__value" style={{fontWeight: 'bold'}}>{minutes}:00</span>
  </div>
);

export default Timer;