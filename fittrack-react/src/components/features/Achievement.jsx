import React from 'react';

const Achievement = ({ title, desc, icon, isLocked, color }) => (
  <div className={`achievement-card ${isLocked ? 'achievement--locked' : ''}`} 
       style={{ borderLeft: `4px solid ${isLocked ? '#333' : color}` }}>
    <div className="achievement__icon">{icon}</div>
    <div className="achievement__info">
      <h4>{title}</h4>
      <p>{isLocked ? 'Заблокировано' : desc}</p>
    </div>
  </div>
);

export default Achievement;