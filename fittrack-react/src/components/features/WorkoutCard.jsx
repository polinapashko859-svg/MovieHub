import React from 'react';
import Card from '../ui/Card';
import Timer from '../ui/Timer';
import Button from '../ui/Button';
import ExerciseItem from './ExerciseItem'; 

const WorkoutCard = ({ workout, onComplete }) => {
  return (
    <Card title={workout.title} image={workout.image}>
      <p className="card__desc" style={{opacity: 0.6, fontSize: '14px', marginBottom: '20px'}}>
        {workout.description}
      </p>
      
      <div className="workout-meta" style={{display: 'flex', gap: '15px', color: '#00e5ff', marginBottom: '20px', fontWeight: 'bold'}}>
        <span>⚡ {workout.calories} kcal</span>
        <span>{workout.intensity}</span>
      </div>

        <ul className="exercise-list" style={{ listStyle: 'none', padding: 0, margin: '20px 0' }}>
          {workout.exercises.map((ex, i) => (
            <ExerciseItem key={i} name={ex} />
          ))}
        </ul>

      <div className="workout-footer" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Timer minutes={workout.duration} />

        <Button onClick={() => onComplete(workout.title)}>
          ЗАВЕРШИТЬ
        </Button>
      </div>
    </Card>
  );
};

export default WorkoutCard;