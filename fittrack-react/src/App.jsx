import React from 'react';
import { workouts, achievements, userStats } from './data/mockData';
import Header from './components/layout/Header';
import WorkoutList from './components/features/WorkoutList';
import ProgressChart from './components/features/ProgressChart';
import Achievement from './components/features/Achievement';
import './App.css';
import { calculateCalories } from './utils/fitness';


console.group("FitTrack Debug");
console.log("Инициализация расчетов...");
console.table([
  { параметр: "Вес", значение: 70 },
  { параметр: "Результат (ккал)", значение: calculateCalories(70, 60, 5) }
]);
console.groupEnd();


function App() {
  const handleFinish = (workoutTitle) => {
    alert(`Поздравляем! Тренировка "${workoutTitle}" завершена.`);
  };

  return (
    <div className="app-wrapper">
      <Header title="FIT-TRACK" onSearch={(val) => console.log(val)} />

      <div className="main-layout">
        <section className="content-area">
          <div className="content-header">
            <h2 className="title-large">Программа тренировок</h2>
            {/* Шрифт Forum применится через класс subtitle */}
            <p className="subtitle">Выберите интенсивность и начните свой путь</p>
          </div>
          
          <WorkoutList workouts={workouts} onComplete={handleFinish} />
        </section>

        <aside className="right-panel">
          <div className="glass-widget">
            <h3 className="widget-title">Ваш прогресс</h3>
            <ProgressChart stats={userStats} />
          </div>
          
          <div className="glass-widget">
            <h3 className="widget-title">Достижения</h3>
            <div className="achievements-column">
              {achievements.map(a => (
                 <Achievement key={a.id} {...a} />
              ))}
            </div>
          </div>
        </aside>
      </div>

      <footer className="main-footer">
        <div className="footer__container">
          <span>FitTrack PRO © 2026</span>
          <span>Лабораторная работа №7</span>
        </div>
      </footer>
    </div>
  );
}

export default App;