const ExerciseItem = ({ name }) => (
  <li className="exercise-item">
    <span className="exercise-dot">▹</span> {name}
  </li>
);
export default ExerciseItem;