import React from 'react';

const ProgressChart = ({ stats }) => (
  <div className="progress-chart">
    {stats.map((stat, i) => (
      <div key={i} className="stat-row">
        <div className="stat-info">
          <span>{stat.label}</span>
          <span>{stat.value}%</span>
        </div>
        <div className="stat-bar-bg">
          <div 
            className="stat-bar-fill" 
            style={{ width: `${stat.value}%`, backgroundColor: stat.color, boxShadow: `0 0 10px ${stat.color}` }}
          ></div>
        </div>
      </div>
    ))}
  </div>
);

export default ProgressChart;