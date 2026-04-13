import React from 'react';
import WorkoutCard from './WorkoutCard';


const WorkoutList = ({ workouts, onComplete }) => (
  <div className="workout-grid">
    {workouts.map(w => (
      <WorkoutCard key={w.id} workout={w} onComplete={onComplete}/>
    ))}
  </div>
);

export default WorkoutList;