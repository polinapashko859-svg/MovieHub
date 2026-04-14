/**
 * @description Рассчитывает сожженные калории
 */
export const calculateCalories = (weight, duration, intensity = 5) => {
    if (weight <= 0 || duration <= 0) return 0;
    // Формула: Вес * (Время в часах) * Коэффициент интенсивности
    return Math.round(weight * (duration / 60) * intensity);
  };
  
  /**
   * @description Форматирует время тренировки в ММ:СС
   */
  export const formatWorkoutTime = (seconds) => {
    if (seconds < 0) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };